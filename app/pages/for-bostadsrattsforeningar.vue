<script setup lang="ts">
import { sitePages } from '#shared/site-structure'
import { audiencePages } from '~/content/audiences'

const path = sitePages.housingAssociations.path
const content = audiencePages[path]!
</script>

<template>
  <AudiencePageTemplate :path="path" :content="content" />
</template>
