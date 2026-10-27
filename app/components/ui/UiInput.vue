<script setup lang="ts">
const model = defineModel<string>({ default: '' })

withDefaults(defineProps<{
  label: string
  type?: 'text' | 'email' | 'tel'
  name?: string
  autocomplete?: string
  placeholder?: string
  hint?: string
  error?: string
  required?: boolean
  disabled?: boolean
}>(), {
  type: 'text',
  name: undefined,
  autocomplete: undefined,
  placeholder: undefined,
  hint: undefined,
  error: undefined,
})
</script>

<template>
  <UiFormField v-slot="{ id, describedBy, invalid }" :label="label" :hint="hint" :error="error" :required="required">
    <input
      :id="id"
      v-model="model"
      :type="type"
      :name="name"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :aria-invalid="invalid ? 'true' : undefined"
      :aria-describedby="describedBy"
      class="field-control"
    >
  </UiFormField>
</template>
