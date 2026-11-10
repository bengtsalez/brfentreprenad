<script setup lang="ts">
useHead({
  // Varumärket läggs till som ändelse, men inte om titeln redan innehåller det.
  titleTemplate: title => brandedTitle(title),
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
