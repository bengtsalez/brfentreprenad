<script setup lang="ts">
import type { LinkItem } from '~/types/content'

/** Brödsmulor. Sista ledet är den aktuella sidan och visas utan länk. */
defineProps<{
  items: LinkItem[]
}>()
</script>

<template>
  <nav aria-label="Brödsmulor" class="mb-8">
    <ol class="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-muted">
      <li v-for="(item, index) in items" :key="item.href" class="flex items-center gap-2">
        <span v-if="index > 0" aria-hidden="true">/</span>
        <span v-if="index === items.length - 1" aria-current="page" class="text-ink">{{ item.label }}</span>
        <a v-else :href="item.href" class="underline-offset-4 hover:text-ink hover:underline">{{ item.label }}</a>
      </li>
    </ol>
  </nav>
</template>
