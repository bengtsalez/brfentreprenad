<script setup lang="ts">
import { caseStudyPath } from '~/content/references'
import type { CaseStudy } from '~/types/content'
import type { HeadingLevel, SectionBackground } from '~/types/ui'

/**
 * Referensprojekt som stora bild- och textrader. Renderar ingenting utan
 * projekt, så sidor kan ta med sektionen innan det finns verkligt underlag.
 * Bolaget som utförde arbetet visas alltid.
 */
const props = withDefaults(defineProps<{
  title: string
  projects: CaseStudy[]
  eyebrow?: string
  lead?: string
  background?: SectionBackground
  headingLevel?: HeadingLevel
}>(), {
  eyebrow: undefined,
  lead: undefined,
  background: 'default',
  headingLevel: 2,
})

const projectHeadingLevel = computed(() => childHeadingLevel(props.headingLevel))
</script>

<template>
  <UiSection v-if="projects.length" :background="background">
    <UiSectionHeading :title="title" :eyebrow="eyebrow" :lead="lead" :level="headingLevel" />
    <ul class="mt-12 space-y-16">
      <li
        v-for="(project, index) in projects"
        :key="project.slug"
        class="reveal grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
      >
        <div class="overflow-hidden rounded-card" :class="index % 2 === 1 && 'lg:order-2'">
          <img
            :src="project.images[0]!.src"
            :alt="project.images[0]!.alt"
            :width="project.images[0]!.width"
            :height="project.images[0]!.height"
            loading="lazy"
            decoding="async"
            class="aspect-[3/2] w-full object-cover"
          >
        </div>
        <div class="space-y-4">
          <p class="eyebrow">
            {{ project.location }} · {{ project.assignment }}
          </p>
          <UiHeading :level="projectHeadingLevel" size="md">
            <a :href="caseStudyPath(project)" class="hover:text-accent">{{ project.title }}</a>
          </UiHeading>
          <p class="text-ink-muted">
            {{ project.startingPoint }}
          </p>
          <p class="text-sm">
            Utfört av {{ project.performedBy }}. Roll: {{ project.role }}.
          </p>
          <UiButton :href="caseStudyPath(project)" variant="text" arrow>
            Läs om projektet
          </UiButton>
        </div>
      </li>
    </ul>
  </UiSection>
</template>
