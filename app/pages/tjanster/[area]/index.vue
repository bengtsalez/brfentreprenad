<script setup lang="ts">
import { findPage } from '#shared/site-structure'
import { servicePages } from '~/content/services'

/** Huvudsida för ett tjänsteområde. Opublicerade områden ger 404. */
const route = useRoute()
const path = `/tjanster/${String(route.params.area)}/`
const page = findPage(path)
const content = servicePages[path]

if (page?.status !== 'published' || !content) {
  throw createError({ statusCode: 404, statusMessage: 'Sidan finns inte', fatal: true })
}
</script>

<template>
  <ServicePageTemplate v-if="page && content" :page="page" :content="content" />
</template>
