<script setup lang="ts">
import type { LinkItem } from '~/types/content'

/**
 * Sidhuvud med huvudnavigation, kontaktknapp och mobilmeny.
 * Brytpunkterna är containerqueries (@4xl osv.), så headern anpassar sig
 * efter sin egen bredd. Det gör att mobilmenyn kan visas även i en smal ram.
 */
defineProps<{
  navItems: LinkItem[]
  contactLink: LinkItem
  logoHref?: string
}>()

const isOpen = ref(false)
const menuId = useId()
const toggleButton = useTemplateRef<HTMLButtonElement>('toggleButton')

function toggleMenu() {
  isOpen.value = !isOpen.value
}

function closeMenu({ returnFocus = false } = {}) {
  if (!isOpen.value) return
  isOpen.value = false
  if (returnFocus) toggleButton.value?.focus()
}
</script>

<template>
  <header class="@container border-b border-line bg-canvas text-ink" @keydown.esc="closeMenu({ returnFocus: true })">
    <UiContainer class="flex min-h-18 items-center justify-between gap-6">
      <SiteLogo :href="logoHref" />

      <nav aria-label="Huvudmeny" class="hidden @4xl:block">
        <ul class="flex items-center gap-1">
          <li v-for="item in navItems" :key="item.href">
            <a
              :href="item.href"
              class="rounded-control px-3 py-2 font-semibold text-ink transition-colors hover:bg-subtle hover:text-accent"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-3">
        <div class="hidden @lg:block">
          <UiButton :href="contactLink.href" size="sm">
            {{ contactLink.label }}
          </UiButton>
        </div>
        <button
          ref="toggleButton"
          type="button"
          class="inline-flex min-h-10 items-center gap-2 rounded-control border border-line-strong px-3 text-sm font-semibold hover:bg-subtle @4xl:hidden"
          :aria-expanded="isOpen"
          :aria-controls="menuId"
          @click="toggleMenu"
        >
          <UiIcon :name="isOpen ? 'close' : 'menu'" />
          {{ isOpen ? 'Stäng' : 'Meny' }}
        </button>
      </div>
    </UiContainer>

    <div v-show="isOpen" :id="menuId" class="border-t border-line @4xl:hidden">
      <UiContainer class="py-4">
        <nav aria-label="Huvudmeny">
          <ul class="divide-y divide-line">
            <li v-for="item in navItems" :key="item.href">
              <a
                :href="item.href"
                class="flex min-h-12 items-center justify-between py-3 text-lg font-semibold hover:text-accent"
                @click="closeMenu()"
              >
                {{ item.label }}
                <UiIcon name="arrow-right" class="text-ink-muted" />
              </a>
            </li>
          </ul>
        </nav>
        <UiButton :href="contactLink.href" class="mt-4 w-full" @click="closeMenu()">
          {{ contactLink.label }}
        </UiButton>
      </UiContainer>
    </div>
  </header>
</template>
