<script setup lang="ts">
import type { SelectOption } from '~/types/content'

/**
 * Kontaktformulär med enkel klientvalidering.
 *
 * Med `formName` skickas formuläret till Netlify Forms. Netlify hittar formuläret
 * i den förrenderade HTML:en (data-netlify) och tar emot inskicket på "/".
 * Bekräftelsen visas bara när Netlify har svarat att uppgifterna tagits emot.
 * Utan `formName`, och alltid i utvecklingsläge, visas ett demonstrationsmeddelande
 * och ingenting skickas.
 */
const props = withDefaults(defineProps<{
  subjectOptions: SelectOption[]
  submitLabel?: string
  formName?: string
}>(), {
  submitLabel: 'Skicka meddelande',
  formName: undefined,
})

interface ContactFormValues {
  name: string
  association: string
  address: string
  email: string
  phone: string
  subject: string
  message: string
  consent: boolean
}

type FormErrors = Partial<Record<keyof ContactFormValues, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^\+?[\d\s-]{7,20}$/

function emptyValues(): ContactFormValues {
  return { name: '', association: '', address: '', email: '', phone: '', subject: '', message: '', consent: false }
}

const values = reactive(emptyValues())
const errors = ref<FormErrors>({})
const status = ref<'idle' | 'invalid' | 'sending' | 'sent' | 'failed' | 'demo-sent'>('idle')
const honeypot = ref('')
const sendsForReal = Boolean(props.formName) && !import.meta.dev
const form = useTemplateRef<HTMLFormElement>('form')
const successMessage = useTemplateRef<HTMLDivElement>('successMessage')

function validate(): FormErrors {
  const result: FormErrors = {}

  if (!values.name.trim()) result.name = 'Ange ditt namn.'

  if (!values.email.trim()) result.email = 'Ange din e-postadress.'
  else if (!EMAIL_PATTERN.test(values.email.trim())) result.email = 'Ange en giltig e-postadress, till exempel namn@forening.se.'

  if (values.phone.trim() && !PHONE_PATTERN.test(values.phone.trim())) {
    result.phone = 'Ange ett giltigt telefonnummer med siffror, till exempel 070-123 45 67.'
  }

  if (!values.subject) result.subject = 'Välj vad ärendet gäller.'

  if (!values.message.trim()) result.message = 'Skriv ett meddelande.'
  else if (values.message.trim().length < 10) result.message = 'Beskriv ärendet med minst 10 tecken.'

  if (!values.consent) result.consent = 'Du behöver godkänna att vi kontaktar dig om ärendet.'

  return result
}

// Efter ett misslyckat försök uppdateras felen medan användaren rättar.
watch(values, () => {
  if (status.value === 'invalid') errors.value = validate()
})

const errorCount = computed(() => Object.keys(errors.value).length)

async function onSubmit() {
  errors.value = validate()

  if (errorCount.value > 0) {
    status.value = 'invalid'
    await nextTick()
    form.value?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
    return
  }

  if (sendsForReal) {
    status.value = 'sending'
    status.value = (await submitToNetlify()) ? 'sent' : 'failed'
    if (status.value === 'failed') return
  }
  else {
    status.value = 'demo-sent'
  }

  Object.assign(values, emptyValues())
  await nextTick()
  successMessage.value?.focus()
}

async function submitToNetlify(): Promise<boolean> {
  const { consent, ...fields } = values
  const body = new URLSearchParams({
    'form-name': props.formName!,
    'bot-field': honeypot.value,
    ...fields,
    consent: consent ? 'ja' : 'nej',
  })

  try {
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    })
    return response.ok
  }
  catch {
    return false
  }
}
</script>

<template>
  <form
    ref="form"
    :name="formName"
    :data-netlify="formName ? 'true' : undefined"
    :netlify-honeypot="formName ? 'bot-field' : undefined"
    novalidate
    class="space-y-6"
    @submit.prevent="onSubmit"
  >
    <template v-if="formName">
      <input type="hidden" name="form-name" :value="formName">
      <!-- Fälla för spam. Dold för alla och ska lämnas tom. -->
      <p class="hidden" aria-hidden="true">
        <label>Lämna tomt <input v-model="honeypot" name="bot-field" tabindex="-1" autocomplete="off"></label>
      </p>
    </template>

    <p class="text-sm text-ink-muted">
      Fält markerade med <span class="text-danger" aria-hidden="true">*</span> är obligatoriska.
    </p>

    <div class="grid gap-6 sm:grid-cols-2">
      <UiInput v-model="values.name" label="Namn" name="name" autocomplete="name" required :error="errors.name" />
      <UiInput
        v-model="values.association"
        label="Förening eller företag"
        name="association"
        autocomplete="organization"
        optional
      />
      <UiInput
        v-model="values.address"
        label="Fastighetens adress"
        name="address"
        autocomplete="street-address"
        optional
        class="sm:col-span-2"
      />
      <UiInput
        v-model="values.email"
        label="E-post"
        type="email"
        name="email"
        autocomplete="email"
        required
        :error="errors.email"
      />
      <UiInput
        v-model="values.phone"
        label="Telefon"
        type="tel"
        name="phone"
        autocomplete="tel"
        required
        :error="errors.phone"
      />
    </div>

    <UiSelect
      v-model="values.subject"
      label="Vad gäller ärendet?"
      name="subject"
      :options="subjectOptions"
      placeholder="Välj ett område"
      required
      :error="errors.subject"
    />

    <UiTextarea
      v-model="values.message"
      label="Meddelande"
      name="message"
      hint="Beskriv kort vad ni behöver hjälp med och när ni önskar att arbetet startar. Skriv inte portkoder här."
      required
      :error="errors.message"
    />

    <UiCheckbox
      v-model="values.consent"
      label="Jag godkänner att BRF Entreprenad kontaktar mig om mitt ärende."
      name="consent"
      required
      :error="errors.consent"
    />

    <div aria-live="polite">
      <UiAlert v-if="status === 'invalid' && errorCount > 0" tone="error" title="Formuläret kunde inte skickas">
        Kontrollera {{ errorCount === 1 ? 'det markerade fältet' : `de ${errorCount} markerade fälten` }} och försök igen.
      </UiAlert>
      <UiAlert v-if="status === 'failed'" tone="error" title="Meddelandet kunde inte skickas">
        Något gick fel och vi har inte tagit emot uppgifterna. Försök igen om en stund.
      </UiAlert>
      <div v-if="status === 'sent'" ref="successMessage" tabindex="-1" class="focus-visible:outline-offset-4">
        <UiAlert tone="success" title="Tack, vi har tagit emot ert meddelande">
          Vi återkommer till er. Ett önskemål om starttid är inte en bekräftad planering.
        </UiAlert>
      </div>
      <div v-if="status === 'demo-sent'" ref="successMessage" tabindex="-1" class="focus-visible:outline-offset-4">
        <UiAlert tone="success" title="Formuläret är korrekt ifyllt">
          Detta är en demonstration. Inget meddelande har skickats och inga uppgifter har sparats.
        </UiAlert>
      </div>
    </div>

    <UiButton type="submit" :disabled="status === 'sending'">
      {{ status === 'sending' ? 'Skickar …' : submitLabel }}
    </UiButton>
  </form>
</template>
