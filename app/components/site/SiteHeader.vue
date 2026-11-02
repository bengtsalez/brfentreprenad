<script setup lang="ts">
import { normalizePath } from '#shared/site-structure'
import type { LinkItem, NavItem } from '~/types/content'

/**
 * Sidhuvud med huvudnavigation, kontaktknapp och mobilmeny.
 * Menyval med `children` blir en undermeny (disclosure-mönstret).
 * Brytpunkterna är containerqueries (@4xl osv.), så headern anpassar sig
 * efter sin egen bredd. Det gör att mobilmenyn kan visas även i en smal ram.
 */
defineProps<{
  navItems: NavItem[]
  contactLink: LinkItem
  logoHref?: string
}>()

const route = useRoute()
const isOpen = ref(false)
// Delas med mobilens kontaktlist, som döljs när menyn är öppen.
const menuOpenState = useState('mobile-menu-open', () => false)
watch(isOpen, (open) => {
  menuOpenState.value = open
})
const openSubmenu = ref<string>()
const menuId = useId()
const toggleButton = useTemplateRef<HTMLButtonElement>('toggleButton')
const desktopNav = useTemplateRef<HTMLElement>('desktopNav')

function isCurrent(href?: string) {
  return Boolean(href?.startsWith('/')) && normalizePath(route.path) === normalizePath(href!)
}

function hasCurrentChild(item: NavItem) {
  return item.children?.some(child => isCurrent(child.href)) ?? false
}

function submenuId(label: string) {
  return `${menuId}-${label.toLowerCase().replace(/\W+/g, '-')}`
}

function toggleMenu() {
  isOpen.value = !isOpen.value
}

function closeMenu({ returnFocus = false } = {}) {
  if (!isOpen.value) return
  isOpen.value = false
  if (returnFocus) toggleButton.value?.focus()
}

function toggleSubmenu(label: string) {
  openSubmenu.value = openSubmenu.value === label ? undefined : label
}

function closeSubmenu({ returnFocus = false } = {}) {
  if (!openSubmenu.value) return
  if (returnFocus) document.getElementById(`${submenuId(openSubmenu.value)}-button`)?.focus()
  openSubmenu.value = undefined
}

function onEscape() {
  if (openSubmenu.value) closeSubmenu({ returnFocus: true })
  else closeMenu({ returnFocus: true })
}

function onSubmenuFocusOut(event: FocusEvent) {
  const target = event.currentTarget as HTMLElement
  if (!target.contains(event.relatedTarget as Node | null)) closeSubmenu()
}

// Klick utanför stänger undermenyn (Safari fokuserar inte knappar vid klick).
function onDocumentClick(event: MouseEvent) {
  if (!desktopNav.value?.contains(event.target as Node)) closeSubmenu()
}

// Läsprogress visas på långa innehållssidor: tjänster och målgrupper.
const showProgress = computed(() => /^\/(tjanster\/.+|for-)/.test(route.path))

// Markering som glider mellan menyvalen vid hover. Första gången den visas
// hoppar den direkt till platsen i stället för att glida in från kanten.
const pill = ref({ left: 0, width: 0, visible: false, instant: true })

function movePill(event: MouseEvent) {
  const item = event.currentTarget as HTMLElement
  pill.value = { left: item.offsetLeft, width: item.offsetWidth, visible: true, instant: !pill.value.visible }
}

function hidePill() {
  pill.value.visible = false
}

// Efter en bit scroll blir headern lägre, halvgenomskinlig och får skugga.
const isScrolled = ref(false)

function onScroll() {
  isScrolled.value = window.scrollY > 8
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header
    class="@container sticky top-0 z-40 border-b text-ink [view-transition-name:site-header] motion-safe:transition-[background-color,border-color,box-shadow] motion-safe:duration-300 motion-safe:ease-premium"
    :class="isScrolled && !isOpen ? 'border-transparent bg-canvas/85 shadow-card backdrop-blur-md' : 'border-line bg-canvas'"
    @keydown.esc="onEscape"
  >
    <UiContainer
      class="flex items-center justify-between gap-6 motion-safe:transition-[min-height] motion-safe:duration-300 motion-safe:ease-premium"
      :class="isScrolled ? 'min-h-16' : 'min-h-18'"
    >
      <SiteLogo :href="logoHref" />

      <nav ref="desktopNav" aria-label="Huvudmeny" class="hidden @4xl:block">
        <ul class="relative flex items-center gap-1" @mouseleave="hidePill">
          <li
            aria-hidden="true"
            class="pointer-events-none absolute inset-y-0 left-0 rounded-control bg-subtle"
            :class="pill.instant ? 'transition-opacity duration-200' : 'transition-[translate,width,opacity] duration-300 ease-premium'"
            :style="{ width: `${pill.width}px`, translate: `${pill.left}px 0`, opacity: pill.visible ? 1 : 0 }"
          />
          <li
            v-for="item in navItems"
            :key="item.label"
            class="relative"
            @mouseenter="movePill"
            @focusout="onSubmenuFocusOut"
          >
            <template v-if="item.children">
              <button
                :id="`${submenuId(item.label)}-button`"
                type="button"
                class="relative inline-flex items-center gap-1.5 rounded-control px-3 py-2 font-semibold transition-colors hover:text-accent"
                :class="hasCurrentChild(item) ? 'text-accent' : 'text-ink'"
                :aria-expanded="openSubmenu === item.label"
                :aria-controls="submenuId(item.label)"
                @click="toggleSubmenu(item.label)"
              >
                {{ item.label }}
                <UiIcon
                  name="chevron-down"
                  size="sm"
                  class="motion-safe:transition-transform"
                  :class="openSubmenu === item.label && 'rotate-180'"
                />
              </button>
              <ul
                v-show="openSubmenu === item.label"
                :id="submenuId(item.label)"
                class="pop-in absolute top-full left-0 z-20 mt-2 min-w-72 rounded-card border border-line bg-surface p-2 shadow-card"
              >
                <li v-for="child in item.children" :key="child.href">
                  <a
                    :href="child.href"
                    :aria-current="isCurrent(child.href) ? 'page' : undefined"
                    class="block rounded-control px-3 py-2.5 font-semibold hover:bg-subtle hover:text-accent aria-[current=page]:text-accent"
                  >
                    {{ child.label }}
                  </a>
                </li>
              </ul>
            </template>
            <a
              v-else
              :href="item.href"
              :aria-current="isCurrent(item.href) ? 'page' : undefined"
              class="relative rounded-control px-3 py-2 font-semibold text-ink transition-colors hover:text-accent aria-[current=page]:text-accent"
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

    <div v-show="isOpen" :id="menuId" class="pop-in max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line @4xl:hidden">
      <UiContainer class="py-4">
        <nav aria-label="Huvudmeny">
          <ul class="divide-y divide-line">
            <li v-for="item in navItems" :key="item.label">
              <div v-if="item.children" class="py-3">
                <p class="eyebrow py-2">
                  {{ item.label }}
                </p>
                <ul>
                  <li v-for="child in item.children" :key="child.href">
                    <a
                      :href="child.href"
                      :aria-current="isCurrent(child.href) ? 'page' : undefined"
                      class="flex min-h-11 items-center justify-between py-2 font-semibold hover:text-accent aria-[current=page]:text-accent"
                      @click="closeMenu()"
                    >
                      {{ child.label }}
                      <UiIcon name="arrow-right" size="sm" class="text-ink-muted" />
                    </a>
                  </li>
                </ul>
              </div>
              <a
                v-else
                :href="item.href"
                :aria-current="isCurrent(item.href) ? 'page' : undefined"
                class="flex min-h-12 items-center justify-between py-3 text-lg font-semibold hover:text-accent aria-[current=page]:text-accent"
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

    <span v-if="showProgress" class="scroll-progress absolute inset-x-0 -bottom-px h-0.5 bg-accent" aria-hidden="true" />
  </header>
</template>
