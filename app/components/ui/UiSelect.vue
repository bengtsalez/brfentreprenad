<script setup lang="ts">
import type { SelectOption } from '~/types/content'

const model = defineModel<string>({ default: '' })

withDefaults(defineProps<{
  label: string
  options: SelectOption[]
  /** Text för det tomma förvalet, t.ex. "Välj ett alternativ". */
  placeholder?: string
  name?: string
  hint?: string
  error?: string
  required?: boolean
  disabled?: boolean
}>(), {
  placeholder: 'Välj ett alternativ',
  name: undefined,
  hint: undefined,
  error: undefined,
})
</script>

<template>
  <UiFormField v-slot="{ id, describedBy, invalid }" :label="label" :hint="hint" :error="error" :required="required">
    <div class="relative">
      <select
        :id="id"
        v-model="model"
        :name="name"
        :required="required"
        :disabled="disabled"
        :aria-invalid="invalid ? 'true' : undefined"
        :aria-describedby="describedBy"
        class="field-control appearance-none pr-11"
      >
        <option value="" disabled>
          {{ placeholder }}
        </option>
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
      <UiIcon name="chevron-down" class="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ink-muted" />
    </div>
  </UiFormField>
</template>
