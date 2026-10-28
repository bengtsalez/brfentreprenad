<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const notFound = props.error.statusCode === 404

useSeoMeta({
  title: notFound ? 'Sidan finns inte' : 'Något gick fel',
  robots: 'noindex',
})
</script>

<template>
  <NuxtLayout>
    <HeroCompactSection
      :eyebrow="notFound ? '404' : 'Fel'"
      :title="notFound ? 'Sidan finns inte' : 'Något gick fel'"
      :lead="notFound
        ? 'Sidan du söker finns inte eller har flyttats.'
        : 'Sidan kunde inte visas. Försök igen om en stund.'"
      :action="{ label: 'Till startsidan', href: '/' }"
    />
  </NuxtLayout>
</template>
