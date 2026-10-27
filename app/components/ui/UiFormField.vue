<script setup lang="ts">
/**
 * Etikett, hjälptext och felmeddelande runt ett formulärfält.
 * Fältet läggs i sloten och får id och aria-attribut via slot-props.
 */
const props = defineProps<{
  label: string
  hint?: string
  error?: string
  required?: boolean
}>()

defineSlots<{
  default(props: { id: string, describedBy: string | undefined, invalid: boolean }): unknown
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
    <label :for="id" class="text-sm font-semibold">
      {{ label }}<span v-if="required" class="text-danger" aria-hidden="true"> *</span>
    </label>
    <p v-if="hint" :id="hintId" class="text-sm text-ink-muted">
      {{ hint }}
    </p>
    <slot :id="id" :described-by="describedBy" :invalid="Boolean(error)" />
    <p v-if="error" :id="errorId" class="flex items-start gap-1.5 text-sm font-semibold text-danger">
      <UiIcon name="error" size="sm" class="mt-0.5" />
      {{ error }}
    </p>
  </div>
</template>
