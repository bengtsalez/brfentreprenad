<script setup lang="ts">
import { sitePages } from '#shared/site-structure'
import { projectSteps, serviceSteps } from '~/content/processes'

usePageSeo({
  title: 'Så arbetar vi',
  description: 'Så går servicearbeten och större projekt till hos BRF Entreprenad: beställning, planering, genomförande, helhetsansvar och personlig projektledning.',
  path: sitePages.process.path,
})

const { actions } = useSiteNavigation()
</script>

<template>
  <div>
    <HeroCompactSection
      eyebrow="Arbetssätt"
      title="Så arbetar vi"
      lead="Ett tydligt arbetssätt för både servicearbeten och större projekt. Ni ska veta vad som är beställt, vem som ansvarar och var arbetet står."
    />

    <ProcessSection
      eyebrow="Servicearbeten"
      title="Från beställning till utfört arbete"
      lead="Reparationer och mindre arbeten beställs med adress, behov och önskad starttid."
      :steps="serviceSteps"
    />

    <TextSection
      title="Önskad starttid och planerad tid"
      background="subtle"
      :paragraphs="[
        'När ni beställer anger ni när ni önskar att arbetet startar. Det är ett önskemål, inte en bekräftad tid. Planerad tid sätts efter genomgång och visas i ärendets status, till exempel som en vecka och ett år.',
      ]"
    >
      <p>
        <a :href="sitePages.bookingGuide.path" class="text-link font-semibold">Så fungerar servicebokningen</a>
      </p>
    </TextSection>

    <ProcessSection
      eyebrow="Större projekt"
      title="Från behov till färdigt arbete"
      lead="Renoveringar och ombyggnader planeras som projekt med en personlig projektledare."
      :steps="projectSteps"
    />

    <TextSection
      title="Helhetsansvar och personlig projektledning"
      background="subtle"
      :paragraphs="[
        'Som totalentreprenör ansvarar vi för både utförande och samordning av de yrkesgrupper som behövs. Ni har en part att vända er till.',
        'Vid större projekt får ni en personlig projektledare. Projektledaren tar fram tidplan, samordnar arbetet och håller er informerade, och är er kontakt genom hela projektet.',
      ]"
      :list="[
        'En part ansvarar för helheten',
        'En namngiven kontakt vid större projekt',
        'Tidplan och återkoppling under arbetet',
        'Avstämning om information till boende',
      ]"
    />

    <CtaSection
      title="Vill ni gå igenom ett kommande arbete?"
      text="Berätta vad som behöver göras, så föreslår vi hur det kan läggas upp."
      :primary-action="actions.project"
      :secondary-action="actions.service.href === actions.project.href ? undefined : actions.service"
    />
  </div>
</template>
