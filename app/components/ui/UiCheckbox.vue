<script setup lang="ts">
const model = defineModel<boolean>({ default: false })

const props = defineProps<{
  label: string
  name?: string
  hint?: string
  error?: string
  required?: boolean
  disabled?: boolean
}>()

const id = useId()
const hintId = `${id}-hint`
const errorId = `${id}-error`

const describedBy = computed(() => {
  const ids = [props.hint ? hintId : '', props.error ? errorId : ''].filter(Boolean)
  return ids.length ? ids.join(' ') : undefined
})
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <div class="flex items-start gap-3">
      <input
        :id="id"
        v-model="model"
        type="checkbox"
        :name="name"
        :required="required"
        :disabled="disabled"
        :aria-invalid="error ? 'true' : undefined"
        :aria-describedby="describedBy"
        class="mt-0.5 size-5 shrink-0 cursor-pointer accent-accent disabled:cursor-not-allowed"
      >
      <label :for="id" class="cursor-pointer">
        {{ label }}<span v-if="required" class="text-danger" aria-hidden="true"> *</span>
      </label>
    </div>
    <p v-if="hint" :id="hintId" class="pl-8 text-sm text-ink-muted">
      {{ hint }}
    </p>
    <p v-if="error" :id="errorId" class="flex items-start gap-1.5 pl-8 text-sm font-semibold text-danger">
      <UiIcon name="error" size="sm" class="mt-0.5" />
      {{ error }}
    </p>
  </div>
</template>
