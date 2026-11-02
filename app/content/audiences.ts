/** Innehåll för de tre målgruppssidorna, nyckel = sökväg i shared/site-structure.ts. */
import { sitePages } from '#shared/site-structure'
import type { AudiencePageContent } from '~/types/content'

export const audiencePages: Record<string, AudiencePageContent> = {
  [sitePages.housingAssociations.path]: {
    metaTitle: 'Fastighetsservice och renovering för bostadsrättsföreningar',
    metaDescription: 'Stöd för styrelsen i bostadsrättsföreningar: servicebeställningar, renoveringar och större projekt med helhetsansvar från Halmstad till Falsterbo.',
    eyebrow: 'För bostadsrättsföreningar',
    title: 'En entreprenör för föreningens fastighet',
    lead: 'Styrelsen ansvarar för fastigheten men har sällan tid att samordna hantverkare. Vi hjälper till med allt från enskilda reparationer till större renoveringar, med helhetsansvar och personlig projektledning.',
    needs: {
      title: 'Det vi hjälper styrelsen med',
      paragraphs: [
        'Uppdragen i en förening varierar. Ibland gäller det en dörr som behöver justeras, ibland en fasad eller ett trapphus som ska renoveras. Oavsett storlek ska styrelsen veta vad som är beställt, vem som ansvarar och var arbetet står.',
      ],
      list: [
        'Servicearbeten som beskrivs i en förfrågan, utan krav på konto',
        'En kontaktperson som håller ihop arbetet',
        'Personlig projektledare vid större projekt',
        'Underlag som styrelsen kan fatta beslut på',
      ],
    },
    servicesTitle: 'Tjänster som föreningar ofta behöver',
    servicesLead: 'Ett urval av områdena. Alla tjänster finns i tjänsteöversikten.',
    services: [
      '/tjanster/fastighetsservice/',
      '/tjanster/portar-las-och-passage/',
      '/tjanster/fasad-balkong-och-tak/',
      '/tjanster/invandig-renovering/',
      '/tjanster/fonster-och-dorrar/',
      '/tjanster/totalentreprenad/',
    ],
    collaboration: {
      title: 'Tydligt för hela styrelsen',
      paragraphs: [
        'Beslut i en förening fattas ofta gemensamt. Därför beskriver vi omfattning, upplägg och tidplan så att underlaget går att presentera för hela styrelsen.',
        'Vid arbeten som påverkar boende stämmer vi av med styrelsen hur och när de boende ska informeras.',
      ],
    },
    faq: [
      {
        question: 'Kan styrelsen beställa mindre arbeten utan ett större projekt?',
        answer: 'Ja. Reparationer och mindre arbeten skickas som en serviceförfrågan med adress, behov och önskad starttid.',
      },
      {
        question: 'Var arbetar ni?',
        answer: 'Från Halmstad i norr till Falsterbo i söder. Hör av er om ni är osäkra på om er fastighet ligger inom området.',
      },
      {
        question: 'Vem har styrelsen kontakt med under ett projekt?',
        answer: 'Vid större projekt får ni en personlig projektledare som är er kontakt genom hela projektet.',
      },
    ],
    primaryAction: 'project',
  },

  [sitePages.propertyManagers.path]: {
    metaTitle: 'Fastighetsservice för fastighetsförvaltare',
    metaDescription: 'Reparationer, mindre arbeten och större åtgärder för fastighetsförvaltare med uppdrag från Halmstad till Falsterbo.',
    eyebrow: 'För fastighetsförvaltare',
    title: 'Servicearbeten med en tydlig kontakt',
    lead: 'Som förvaltare behöver ni kunna lämna över ett ärende och få besked om vad som händer. Vi utför reparationer, mindre arbeten och större åtgärder i de fastigheter ni förvaltar.',
    needs: {
      title: 'Beställning, samordning och återkoppling',
      paragraphs: [
        'Förvaltarens vardag består av många ärenden på olika adresser. Varje beställning hanteras som ett eget ärende med adress, beskrivning och önskad starttid.',
        'Vi återkommer när något behöver klargöras och när arbetet är planerat, så att ni kan ge besked vidare till fastighetsägare och boende.',
      ],
      list: [
        'Förfrågan med adress, behov och önskad starttid',
        'Besked om tillträde, material och planering',
        'Flera mindre arbeten på samma adress kan samlas',
        'Större åtgärder med personlig projektledare',
      ],
    },
    servicesTitle: 'Vanliga beställningar från förvaltare',
    servicesLead: 'Ett urval av områdena. Alla tjänster finns i tjänsteöversikten.',
    services: [
      '/tjanster/fastighetsservice/',
      '/tjanster/portar-las-och-passage/',
      '/tjanster/fonster-och-dorrar/',
      '/tjanster/invandig-renovering/',
      '/tjanster/mark-grund-och-utemiljo/',
    ],
    collaboration: {
      title: 'Från beställning till planerad vecka',
      paragraphs: [
        'Vi återkommer om något behöver klargöras innan arbetet planeras, till exempel tillträde eller material. Önskad starttid är ett önskemål tills planeringen är bekräftad.',
        'När en åtgärd är större än ett servicearbete tar vi fram ett underlag som ni kan stämma av med fastighetsägaren.',
      ],
    },
    faq: [
      {
        question: 'Kan vi skicka flera ärenden samtidigt?',
        answer: 'Ja. Beskriv gärna alla arbeten på samma adress i en förfrågan, så kan de bedömas och planeras tillsammans.',
      },
      {
        question: 'Är önskad starttid bekräftad när vi har beställt?',
        answer: 'Nej. Den önskade starttiden är ert önskemål. Planerad tid bekräftas först när arbetet är inplanerat.',
      },
      {
        question: 'Tar ni större uppdrag i fastigheter vi förvaltar?',
        answer: 'Ja. Större renoveringar hanteras som projekt med en personlig projektledare.',
      },
    ],
    primaryAction: 'service',
  },

  [sitePages.propertyOwners.path]: {
    metaTitle: 'Underhåll och renovering för fastighetsägare',
    metaDescription: 'Underhåll, reparationer och renovering av en eller flera fastigheter, med helhetsansvar och personlig projektledare från Halmstad till Falsterbo.',
    eyebrow: 'För fastighetsägare',
    title: 'Underhåll och renovering av era fastigheter',
    lead: 'Oavsett om ni äger en fastighet eller flera hjälper vi till med både enskilda reparationer och större renoveringar, med en part som tar helhetsansvar.',
    needs: {
      title: 'Från enskild åtgärd till större projekt',
      paragraphs: [
        'Behoven i en fastighet skiftar över tid. Vissa åtgärder är enskilda reparationer, andra är planerade renoveringar av fasader, tak eller gemensamma utrymmen.',
        'Mindre arbeten beställs som service. Större åtgärder hanteras som projekt där en personlig projektledare ansvarar för planering, samordning och återkoppling.',
      ],
      list: [
        'En part med helhetsansvar',
        'Personlig projektledare vid större projekt',
        'Förfrågan utan krav på konto eller avtal',
        'Uppdrag från Halmstad till Falsterbo',
      ],
    },
    servicesTitle: 'Områden för fastighetsägare',
    servicesLead: 'Ett urval av områdena. Alla tjänster finns i tjänsteöversikten.',
    services: [
      '/tjanster/totalentreprenad/',
      '/tjanster/fasad-balkong-och-tak/',
      '/tjanster/mark-grund-och-utemiljo/',
      '/tjanster/fonster-och-dorrar/',
      '/tjanster/invandig-renovering/',
      '/tjanster/fastighetsservice/',
    ],
    collaboration: {
      title: 'Underlag för beslut',
      paragraphs: [
        'Inför större åtgärder kan vi hjälpa till med behovsanalys, förstudie och budgetunderlag, så att ni kan prioritera och fatta beslut på ett tydligt underlag.',
        'Under genomförandet håller projektledaren er informerade om tidplan och förändringar.',
      ],
    },
    faq: [
      {
        question: 'Tar ni uppdrag i en eller flera fastigheter?',
        answer: 'Båda. Vi tar uppdrag i enskilda fastigheter och i flera fastigheter inom området från Halmstad till Falsterbo.',
      },
      {
        question: 'Kan ni hjälpa till innan ett projekt är beslutat?',
        answer: 'Ja. Behovsanalys, förstudie, budgetunderlag och projektering kan göras innan genomförandet beslutas.',
      },
      {
        question: 'Hur beställer vi mindre arbeten?',
        answer: 'Skicka en serviceförfrågan med adress, vad som behöver göras och önskad starttid. Vi återkommer om något behöver klargöras innan arbetet planeras.',
      },
    ],
    primaryAction: 'project',
  },
}
