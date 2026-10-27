<script setup lang="ts">
const model = defineModel<string>({ default: '' })

withDefaults(defineProps<{
  label: string
  name?: string
  rows?: number
  placeholder?: string
  hint?: string
  error?: string
  required?: boolean
  disabled?: boolean
}>(), {
  name: undefined,
  rows: 5,
  placeholder: undefined,
  hint: undefined,
  error: undefined,
})
</script>

<template>
  <UiFormField v-slot="{ id, describedBy, invalid }" :label="label" :hint="hint" :error="error" :required="required">
    <textarea
      :id="id"
      v-model="model"
      :name="name"
      :rows="rows"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :aria-invalid="invalid ? 'true' : undefined"
      :aria-describedby="describedBy"
      class="field-control resize-y"
    />
  </UiFormField>
</template>
