<script setup lang="ts">
import type { LinkItem } from '~/types/content'

/**
 * Fast kontaktlist längst ned på små skärmar med "Ring" och "Skicka förfrågan".
 * "Ring" visas bara när ett verifierat telefonnummer skickas in.
 *
 * Listen ska aldrig täcka formulär eller meddelanden. Den döljs därför
 * - högst upp på sidan, där heron redan har knappar,
 * - när ett formulärfält har fokus (tangentbordet är öppet),
 * - när en förfrågningssektion (data-inquiry-section) syns,
 * - när mobilmenyn är öppen.
 * Layouten har en bottenmarginal som motsvarar listens höjd.
 */
const props = defineProps<{
  inquiryLink: LinkItem
  phone?: { display: string, href: string }
}>()

const menuOpen = useState('mobile-menu-open', () => false)
const scrolledPastHero = ref(false)
const fieldFocused = ref(false)
const inquiryVisible = ref(false)
const hasInquirySection = ref(false)

const isVisible = computed(() =>
  scrolledPastHero.value && !fieldFocused.value && !inquiryVisible.value && !menuOpen.value,
)

// Finns ett formulär på sidan leder knappen dit i stället för till kontaktsidan.
const inquiryHref = computed(() => (hasInquirySection.value ? '#forfragan' : props.inquiryLink.href))

const route = useRoute()
let observer: IntersectionObserver | undefined

function isField(target: EventTarget | null) {
  return target instanceof HTMLElement && target.matches('input, textarea, select, [contenteditable="true"]')
}

function onFocusIn(event: FocusEvent) {
  if (isField(event.target)) fieldFocused.value = true
}

function onFocusOut(event: FocusEvent) {
  if (isField(event.target) && !isField(event.relatedTarget)) fieldFocused.value = false
}

function onScroll() {
  scrolledPastHero.value = window.scrollY > 320
}

function observeInquirySections() {
  observer?.disconnect()
  inquiryVisible.value = false
  const sections = document.querySelectorAll('[data-inquiry-section]')
  hasInquirySection.value = sections.length > 0
  if (!sections.length) return
  const visible = new Set<Element>()
  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) visible.add(entry.target)
      else visible.delete(entry.target)
    }
    inquiryVisible.value = visible.size > 0
  })
  sections.forEach(section => observer!.observe(section))
}

onMounted(() => {
  document.addEventListener('focusin', onFocusIn)
  document.addEventListener('focusout', onFocusOut)
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
  observeInquirySections()
})

watch(() => route.path, () => nextTick(observeInquirySections))

onBeforeUnmount(() => {
  document.removeEventListener('focusin', onFocusIn)
  document.removeEventListener('focusout', onFocusOut)
  window.removeEventListener('scroll', onScroll)
  observer?.disconnect()
})
</script>

<template>
  <div
    class="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-canvas/95 px-gutter pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-card backdrop-blur-md md:hidden motion-safe:transition-[translate,opacity] motion-safe:duration-300 motion-safe:ease-premium"
    :class="isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'"
    :inert="!isVisible"
    data-mobile-action-bar
  >
    <nav aria-label="Snabbkontakt" class="flex gap-3">
      <UiButton v-if="phone" :href="phone.href" variant="secondary" class="flex-1" :aria-label="`Ring ${phone.display}`">
        Ring
      </UiButton>
      <UiButton :href="inquiryHref" class="flex-[2]">
        Skicka förfrågan
      </UiButton>
    </nav>
  </div>
</template>
