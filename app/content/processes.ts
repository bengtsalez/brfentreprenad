/**
 * Arbetsgångar som återanvänds på flera sidor.
 * Texterna beskriver bara bekräftade delar: adress, behov, önskad starttid,
 * statusuppföljning, helhetsansvar och personlig projektledare.
 */
import type { ProcessStep, StatusExample } from '~/types/content'

export const serviceSteps: ProcessStep[] = [
  {
    title: 'Beställning',
    description: 'Ni anger adress, beskriver vad som behöver göras och önskar en starttid.',
  },
  {
    title: 'Bedömning',
    description: 'Vi går igenom beställningen och återkommer om något behöver klargöras, till exempel tillträde, material eller om arbetet behöver ses på plats.',
  },
  {
    title: 'Planering',
    description: 'Arbetet planeras in. I ärendets status ser ni om material inväntas och vilken vecka arbetet är inplanerat.',
  },
  {
    title: 'Utförande',
    description: 'Arbetet utförs och ni får besked när det är färdigt.',
  },
]

export const projectSteps: ProcessStep[] = [
  {
    title: 'Behov och förutsättningar',
    description: 'Vi går igenom vad som ska göras, fastighetens förutsättningar och era önskemål om omfattning och tid.',
  },
  {
    title: 'Underlag och upplägg',
    description: 'Vi tar fram ett underlag med omfattning, upplägg och tidplan som ni kan fatta beslut på.',
  },
  {
    title: 'Genomförande',
    description: 'Er personliga projektledare planerar och samordnar arbetet och håller er informerade under projektet.',
  },
  {
    title: 'Färdigställande',
    description: 'Det utförda arbetet gås igenom tillsammans med er innan det lämnas över.',
  },
]

export const bookingSteps: ProcessStep[] = [
  {
    title: 'Beskriv behovet',
    description: 'Ange adress och vad som behöver göras, till exempel byte av ett fönster.',
  },
  {
    title: 'Önska en starttid',
    description: 'Ange när ni önskar att arbetet startar. Planerad tid bekräftas efter genomgång.',
  },
  {
    title: 'Följ status',
    description: 'Se i ert konto var arbetet står, till exempel att material inväntas eller vilken vecka arbetet är inplanerat.',
  },
]

/** Illustration av status i kontot. Bygger på beställarens bekräftade exempel. */
export const statusExamples: StatusExample[] = [
  { work: 'Byte av fönster', status: 'Inväntar material' },
  { work: 'Justering av entrédörr', status: 'Inplanerat vecka 46, 2026', previousStatus: 'Inväntar material' },
]

export const statusCaption = 'Illustration av hur status visas i kontot. Exemplen är inte verkliga ärenden.'
