/**
 * "Så behåller styrelsen kontroll över projektet".
 *
 * Varje punkt beskriver vad styrelsen behöver ha klart för sig. `deliverable`
 * beskriver vad styrelsen konkret får och visas bara när företaget har bekräftat
 * rutinen (verified: true). Fram till dess formuleras texten som det som gås
 * igenom tillsammans, inte som ett löfte. Alla rutiner är bekräftade i UNDERLAG.md.
 */
import type { BoardControlItem } from '~/types/content'

export const boardControl: BoardControlItem[] = [
  {
    title: 'Omfattning',
    question: 'Vad ingår, och vad ingår inte?',
    description: 'Innan beslut går projektledaren igenom vad som ska göras, vilka delar av fastigheten som berörs och vad som ligger utanför uppdraget. Oklarheter som kräver utredning lyfts fram innan, inte under arbetet.',
    deliverable: 'Ett underlag med omfattning och upplägg som styrelsen kan fatta beslut på.',
    verified: true,
  },
  {
    title: 'Tidplan',
    question: 'När händer vad?',
    description: 'Tidplanen visar när arbetet startar, i vilken ordning delar av fastigheten berörs och vad som styr tiden, till exempel väder, material eller beslut på en stämma.',
    deliverable: 'En tidplan som är en del av underlaget före beslut.',
    verified: true,
  },
  {
    title: 'Information till boende',
    question: 'Hur och när får de boende veta?',
    description: 'Boende behöver veta när arbetet påverkar dem, vad de ska göra, till exempel tömma balkonger eller ge tillträde, och vem de vänder sig till. Hur informationen ska gå ut och vem som skickar den bestäms med styrelsen innan start.',
    deliverable: 'Ett avtal som anger vem som informerar de boende, hur och när.',
    verified: true,
  },
  {
    title: 'Ekonomisk uppföljning',
    question: 'Hur vet styrelsen var projektet står ekonomiskt?',
    description: 'Hur och hur ofta ekonomin följs upp under projektet bestäms tillsammans med styrelsen, så att den som ansvarar för föreningens ekonomi får de uppgifter som behövs.',
    deliverable: 'Ekonomisk uppföljning på byggmöten, etappvis enligt avtalet.',
    verified: true,
  },
  {
    title: 'Tilläggsarbeten',
    question: 'Vad händer om något oväntat dyker upp?',
    description: 'I äldre fastigheter kan dolda skador upptäckas när arbetet har börjat. Hur sådana tilläggsarbeten beskrivs, prissätts och godkänns av styrelsen ska vara bestämt innan projektet startar.',
    deliverable: 'Inga tilläggsarbeten utförs utan styrelsens skriftliga godkännande.',
    verified: true,
  },
  {
    title: 'Överlämning',
    question: 'Hur avslutas projektet?',
    description: 'Det utförda arbetet gås igenom tillsammans med styrelsen innan det lämnas över.',
    deliverable: 'En gemensam genomgång av det färdiga arbetet, och egenkontroller och dokumentation från projektet.',
    verified: true,
  },
]
