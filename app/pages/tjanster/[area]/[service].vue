<script setup lang="ts">
import { findPage } from '#shared/site-structure'
import { servicePages } from '~/content/services'

/** Undertjänst inom ett område. Opublicerade undertjänster ger 404. */
const route = useRoute()
const path = `/tjanster/${String(route.params.area)}/${String(route.params.service)}/`
const page = findPage(path)
const content = servicePages[path]

if (page?.status !== 'published' || !content) {
  throw createError({ statusCode: 404, statusMessage: 'Sidan finns inte', fatal: true })
}
</script>

<template>
  <ServicePageTemplate v-if="page && content" :page="page" :content="content" />
</template>
