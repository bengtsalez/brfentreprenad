<script setup lang="ts">
import { isPublished, sitePages } from '#shared/site-structure'
import { email, phone } from '~/content/company'
import {
  flowForService,
  inquiryFlows,
  inquiryServices,
  isInquiryFlow,
  isInquiryService,
  UNKNOWN_SERVICE,
} from '~/content/inquiry'
import type { InquiryFlow } from '~/types/content'

/**
 * Förfrågningsformulär för de två kontaktflödena: service och projekt.
 *
 * Inskicket går till Netlify Forms (formulären serviceforfragan och
 * projektforfragan). Netlify hittar formulären i public/__forms.html, som måste
 * ha exakt samma fältnamn som här. Bekräftelsen visas bara när Netlify har svarat
 * att uppgifterna tagits emot. I utvecklingsläge och med `demo` skickas ingenting.
 *
 * - `flow` låser flödet (t.ex. på en tjänstesida). Utan det väljer besökaren.
 * - `service` förväljer tjänst.
 * - `syncUrl` läser och skriver valet i URL:en (?typ=&tjanst=), så att det finns
 *   kvar vid omladdning och kan direktlänkas.
 */
const props = withDefaults(defineProps<{
  flow?: InquiryFlow
  service?: string
  syncUrl?: boolean
  demo?: boolean
}>(), {
  flow: undefined,
  service: undefined,
  syncUrl: false,
  demo: false,
})

interface InquiryValues {
  flow: InquiryFlow | ''
  service: string
  name: string
  email: string
  phone: string
  organisation: string
  city: string
  message: string
}

type FormErrors = Partial<Record<keyof InquiryValues, string>>
type Status = 'idle' | 'invalid' | 'sending' | 'sent' | 'demo-sent' | 'failed-network' | 'failed-server'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const TIMEOUT_MS = 15000

const route = useRoute()
const values = reactive<InquiryValues>({
  flow: props.flow ?? (props.service ? flowForService(props.service) ?? '' : ''),
  service: props.service && isInquiryService(props.service) ? props.service : UNKNOWN_SERVICE,
  name: '',
  email: '',
  phone: '',
  organisation: '',
  city: '',
  message: '',
})
const errors = ref<FormErrors>({})
const status = ref<Status>('idle')
const honeypot = ref('')
const referrerPath = ref('')
const sendsForReal = !props.demo && !import.meta.dev
const form = useTemplateRef<HTMLFormElement>('form')
const successMessage = useTemplateRef<HTMLDivElement>('successMessage')
const fieldId = useId()

const flowText = computed(() => (values.flow ? inquiryFlows[values.flow] : undefined))
const sourcePage = computed(() => route.path)
const serviceOptions = computed(() => {
  // Tjänster som hör till det valda flödet visas först.
  const rank = (flow?: InquiryFlow) => (!values.flow || !flow || flow === values.flow ? 0 : 1)
  return [...inquiryServices]
    .sort((a, b) => rank(a.flow) - rank(b.flow))
    .map(service => ({ value: service.value, label: service.label }))
})
const trackingContext = computed(() => ({
  service: values.service,
  flow: values.flow || undefined,
  page: sourcePage.value,
}))

// Valet av tjänst styr flödet när besökaren inte har valt själv.
watch(() => values.service, (service) => {
  if (props.flow || values.flow) return
  const flow = flowForService(service)
  if (flow) values.flow = flow
})

onMounted(() => {
  try {
    const referrer = document.referrer ? new URL(document.referrer) : undefined
    if (referrer?.origin === window.location.origin) referrerPath.value = referrer.pathname
  }
  catch {
    // Ogiltig referrer ignoreras.
  }

  if (!props.syncUrl) return
  const { typ, tjanst } = route.query
  if (!props.flow && isInquiryFlow(typ)) values.flow = typ
  if (isInquiryService(tjanst)) values.service = tjanst
})

// Valet skrivs till URL:en utan ny historikpost och utan att sidan scrollar.
watch(() => [values.flow, values.service] as const, ([flow, service]) => {
  if (!props.syncUrl || import.meta.server) return
  const url = new URL(window.location.href)
  if (flow) url.searchParams.set('typ', flow)
  else url.searchParams.delete('typ')
  if (service && service !== UNKNOWN_SERVICE) url.searchParams.set('tjanst', service)
  else url.searchParams.delete('tjanst')
  window.history.replaceState(window.history.state, '', url)
})

// "Startat formulär" registreras en gång, vid första inmatningen.
let hasStarted = false
watch(() => [values.name, values.email, values.phone, values.organisation, values.city, values.message], () => {
  if (hasStarted) return
  hasStarted = true
  trackEvent('form_start', trackingContext.value)
})

function validate(): FormErrors {
  const result: FormErrors = {}
  if (!values.flow) result.flow = 'Välj om förfrågan gäller ett servicearbete eller ett planerat projekt.'
  if (!values.name.trim()) result.name = 'Skriv ditt namn.'
  if (!values.email.trim()) result.email = 'Skriv din e-postadress, så att vi kan svara.'
  else if (!EMAIL_PATTERN.test(values.email.trim())) result.email = 'E-postadressen verkar ofullständig. Kontrollera att den ser ut som namn@forening.se.'
  if (!values.message.trim()) result.message = 'Beskriv kort vad ni behöver hjälp med.'
  return result
}

// Efter ett misslyckat försök uppdateras felen medan användaren rättar.
watch(values, () => {
  if (status.value === 'invalid') errors.value = validate()
})

const errorCount = computed(() => Object.keys(errors.value).length)

async function onSubmit() {
  if (status.value === 'sending') return

  errors.value = validate()
  if (errorCount.value > 0) {
    status.value = 'invalid'
    await nextTick()
    form.value?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
    return
  }

  if (sendsForReal) {
    status.value = 'sending'
    const result = await submitToNetlify()
    if (result !== 'ok') {
      status.value = result === 'network' ? 'failed-network' : 'failed-server'
      trackEvent('form_error', { ...trackingContext.value, reason: result })
      return
    }
    status.value = 'sent'
    trackEvent('lead_submitted', trackingContext.value)
  }
  else {
    status.value = 'demo-sent'
  }

  await nextTick()
  successMessage.value?.focus()
}

async function submitToNetlify(): Promise<'ok' | 'network' | 'server'> {
  const flow = values.flow as InquiryFlow
  const body = new URLSearchParams({
    'form-name': inquiryFlows[flow].formName,
    'bot-field': honeypot.value,
    'flode': flow,
    'tjanst': values.service,
    'namn': values.name.trim(),
    'epost': values.email.trim(),
    'telefon': values.phone.trim(),
    'organisation': values.organisation.trim(),
    'ort': values.city.trim(),
    'meddelande': values.message.trim(),
    'kallsida': sourcePage.value,
    'foregaende-sida': referrerPath.value,
  })

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const response = await fetch('/__forms.html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
      signal: controller.signal,
    })
    return response.ok ? 'ok' : 'server'
  }
  catch {
    return 'network'
  }
  finally {
    clearTimeout(timeout)
  }
}

function startOver() {
  Object.assign(values, { name: '', email: '', phone: '', organisation: '', city: '', message: '' })
  errors.value = {}
  status.value = 'idle'
  hasStarted = false
}

const isSent = computed(() => status.value === 'sent' || status.value === 'demo-sent')
</script>

<template>
  <div :data-track-flow="values.flow || undefined" :data-track-service="values.service">
    <div v-if="isSent" ref="successMessage" tabindex="-1" class="space-y-6 focus-visible:outline-offset-4">
      <UiAlert v-if="status === 'sent'" tone="success" title="Tack, vi har tagit emot er förfrågan">
        Det här händer nu:
      </UiAlert>
      <UiAlert v-else tone="info" title="Formuläret är korrekt ifyllt">
        Detta är en demonstration. Ingen förfrågan har skickats och inga uppgifter har sparats.
      </UiAlert>
      <ol v-if="flowText" role="list" class="space-y-3">
        <li v-for="(step, index) in flowText.nextSteps" :key="step" class="flex gap-3">
          <span class="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent" aria-hidden="true">{{ index + 1 }}</span>
          <span>{{ step }}</span>
        </li>
      </ol>
      <UiButton variant="secondary" size="sm" @click="startOver">
        Skicka en ny förfrågan
      </UiButton>
    </div>

    <form
      v-else
      ref="form"
      :name="flowText?.formName ?? 'forfragan'"
      novalidate
      class="space-y-6"
      :aria-busy="status === 'sending' ? 'true' : undefined"
      @submit.prevent="onSubmit"
    >
      <!-- Fälla för spam. Dold för alla och ska lämnas tom. -->
      <p class="hidden" aria-hidden="true">
        <label>Lämna tomt <input v-model="honeypot" name="bot-field" tabindex="-1" autocomplete="off"></label>
      </p>

      <p class="text-sm text-ink-muted">
        Fält markerade med <span class="text-danger" aria-hidden="true">*</span><span class="sr-only">stjärna</span> är obligatoriska. Övriga fält är valfria.
      </p>

      <fieldset
        v-if="!flow"
        class="space-y-3"
        :aria-describedby="errors.flow ? `${fieldId}-flow-error` : undefined"
      >
        <legend class="text-sm font-semibold">
          Vad gäller förfrågan?<span class="text-danger" aria-hidden="true"> *</span>
        </legend>
        <div class="grid gap-3 sm:grid-cols-2">
          <label
            v-for="(text, key, index) in inquiryFlows"
            :key="key"
            class="relative flex cursor-pointer gap-3 rounded-card border p-4 transition-colors hover:border-accent has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-focus"
            :class="values.flow === key ? 'border-accent bg-accent-soft' : errors.flow ? 'border-danger' : 'border-line-strong'"
          >
            <input
              v-model="values.flow"
              type="radio"
              name="flode"
              :value="key"
              class="mt-1 size-4 shrink-0 accent-accent focus-visible:outline-none"
              :aria-invalid="errors.flow && index === 0 ? 'true' : undefined"
              :aria-describedby="`${fieldId}-flow-${key}`"
            >
            <span class="space-y-1">
              <span class="block font-semibold">{{ text.label }}</span>
              <span :id="`${fieldId}-flow-${key}`" class="block text-sm text-ink-muted">{{ text.summary }}</span>
            </span>
          </label>
        </div>
        <p v-if="errors.flow" :id="`${fieldId}-flow-error`" class="flex items-start gap-1.5 text-sm font-semibold text-danger">
          <UiIcon name="error" size="sm" class="mt-0.5" />
          {{ errors.flow }}
        </p>
      </fieldset>

      <UiSelect
        v-model="values.service"
        label="Tjänst eller ärendetyp"
        name="tjanst"
        :options="serviceOptions"
        hint="Välj Vet inte ännu om ni är osäkra. Vi hjälper er att reda ut det."
        required
      />

      <UiTextarea
        v-model="values.message"
        :label="flowText?.messageLabel ?? 'Beskriv behovet'"
        name="meddelande"
        :hint="flowText?.messageHint ?? 'Beskriv kort vad ni behöver hjälp med och var fastigheten ligger. Skriv inte portkoder här.'"
        required
        :error="errors.message"
      />

      <div class="grid gap-6 sm:grid-cols-2">
        <UiInput v-model="values.name" label="Namn" name="namn" autocomplete="name" required :error="errors.name" />
        <UiInput
          v-model="values.email"
          label="E-post"
          type="email"
          name="epost"
          autocomplete="email"
          required
          :error="errors.email"
        />
        <UiInput
          v-model="values.phone"
          label="Telefon"
          type="tel"
          name="telefon"
          autocomplete="tel"
          hint="Om ni hellre vill bli uppringda."
          optional
        />
        <UiInput
          v-model="values.organisation"
          label="Förening eller organisation"
          name="organisation"
          autocomplete="organization"
          optional
        />
        <UiInput
          v-model="values.city"
          label="Ort där fastigheten ligger"
          name="ort"
          autocomplete="address-level2"
          hint="Hjälper oss att bedöma uppdraget."
          optional
          class="sm:col-span-2"
        />
      </div>

      <div aria-live="polite" class="empty:hidden">
        <UiAlert v-if="status === 'invalid' && errorCount > 0" tone="error" title="Förfrågan är inte skickad">
          Kontrollera {{ errorCount === 1 ? 'det markerade fältet' : `de ${errorCount} markerade fälten` }}. Det ni har skrivit finns kvar.
        </UiAlert>
        <UiAlert v-if="status === 'failed-network'" tone="error" title="Förfrågan kunde inte skickas">
          Vi fick ingen kontakt med servern, så förfrågan har inte kommit fram. Kontrollera internetanslutningen och försök igen. Det ni har skrivit finns kvar.
        </UiAlert>
        <UiAlert v-if="status === 'failed-server'" tone="error" title="Förfrågan kunde inte tas emot">
          Något gick fel hos oss och förfrågan har inte sparats. Försök igen om en stund, eller kontakta oss på
          <a :href="phone.href" class="text-link font-semibold">{{ phone.display }}</a> eller
          <a :href="`mailto:${email}`" class="text-link font-semibold">{{ email }}</a>. Det ni har skrivit finns kvar.
        </UiAlert>
      </div>

      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        <UiButton type="submit" :disabled="status === 'sending'">
          {{ status === 'sending' ? 'Skickar …' : (flowText?.submitLabel ?? 'Skicka förfrågan') }}
        </UiButton>
        <p class="text-sm text-ink-muted">
          Uppgifterna används bara för att besvara förfrågan.
          <a v-if="isPublished(sitePages.privacy.path)" :href="sitePages.privacy.path" class="text-link">Så hanterar vi personuppgifter</a>
        </p>
      </div>
    </form>
  </div>
</template>
