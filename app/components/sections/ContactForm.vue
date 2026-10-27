<script setup lang="ts">
import type { SelectOption } from '~/types/content'

/**
 * Kontaktformulär med enkel klientvalidering.
 * Det finns ingen backend ännu: vid giltig inmatning visas ett
 * demonstrationsmeddelande och ingenting skickas.
 */
withDefaults(defineProps<{
  subjectOptions: SelectOption[]
  submitLabel?: string
}>(), {
  submitLabel: 'Skicka meddelande',
})

interface ContactFormValues {
  name: string
  association: string
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
  return { name: '', association: '', email: '', phone: '', subject: '', message: '', consent: false }
}

const values = reactive(emptyValues())
const errors = ref<FormErrors>({})
const status = ref<'idle' | 'invalid' | 'demo-sent'>('idle')
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

  status.value = 'demo-sent'
  Object.assign(values, emptyValues())
  await nextTick()
  successMessage.value?.focus()
}
</script>

<template>
  <form ref="form" novalidate class="space-y-6" @submit.prevent="onSubmit">
    <p class="text-sm text-ink-muted">
      Fält markerade med <span class="text-danger" aria-hidden="true">*</span> är obligatoriska.
    </p>

    <div class="grid gap-6 sm:grid-cols-2">
      <UiInput v-model="values.name" label="Namn" name="name" autocomplete="name" required :error="errors.name" />
      <UiInput
        v-model="values.association"
        label="Bostadsrättsförening"
        name="association"
        autocomplete="organization"
        hint="Valfritt"
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
        hint="Valfritt. Fyll i om du hellre vill bli uppringd."
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
      hint="Beskriv kort vad föreningen behöver hjälp med."
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
      <div v-if="status === 'demo-sent'" ref="successMessage" tabindex="-1" class="focus-visible:outline-offset-4">
        <UiAlert tone="success" title="Formuläret är korrekt ifyllt">
          Detta är en demonstration. Inget meddelande har skickats och inga uppgifter har sparats.
        </UiAlert>
      </div>
    </div>

    <UiButton type="submit">
      {{ submitLabel }}
    </UiButton>
  </form>
</template>
