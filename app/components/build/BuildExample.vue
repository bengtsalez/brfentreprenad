<script setup lang="ts">
/** Namngivet delexempel inuti en BuildShowcase, t.ex. "Inaktiverat läge". */
defineProps<{
  label: string
  note?: string
}>()
</script>

<template>
  <div class="space-y-4">
    <div>
      <h3 class="text-sm font-semibold text-ink-muted">
        {{ label }}
      </h3>
      <p v-if="note" class="text-sm text-ink-muted">
        {{ note }}
      </p>
    </div>
    <slot />
  </div>
</template>
