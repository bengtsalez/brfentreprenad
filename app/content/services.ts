/**
 * Innehåll för tjänstesidorna, nyckel = sökväg i shared/site-structure.ts.
 * En tjänstesida visas bara om den både har innehåll här och status "published".
 *
 * Följ mallen i avsnitt 8 i underlaget och undvik nästan identiska texter.
 * Beskriv inga garantier, svarstider, priser eller certifieringar.
 */
import { sitePages } from '#shared/site-structure'
import type { ServicePageContent } from '~/types/content'

const audiences = {
  brf: sitePages.housingAssociations.path,
  managers: sitePages.propertyManagers.path,
  owners: sitePages.propertyOwners.path,
}

const areas = {
  service: '/tjanster/byggservice/',
  entrances: '/tjanster/portar-las-och-passage/',
  envelope: '/tjanster/fasad-balkong-och-tak/',
  windows: '/tjanster/fonster-och-dorrar/',
  ground: '/tjanster/mark-grund-och-utemiljo/',
  interior: '/tjanster/invandig-renovering/',
  turnkey: '/tjanster/totalentreprenad/',
}

export const servicePages: Record<string, ServicePageContent> = {
  [areas.service]: {
    metaTitle: 'Byggservice och reparationer för fastigheter',
    metaDescription: 'Beställda reparationer och mindre byggarbeten för bostadsrättsföreningar, förvaltare och fastighetsägare från Halmstad till Falsterbo.',
    title: 'Byggservice och reparationer',
    lead: 'Reparationer och mindre arbeten i trapphus, entréer, på fasader, tak och i utemiljön. Ni beställer, vi planerar och utför, och ni kan följa ärendet tills det är klart.',
    intro: {
      title: 'Mindre arbeten med samma ansvar',
      paragraphs: [
        'Byggservice är beställda reparationer och mindre arbeten: sådant som behöver åtgärdas men inte kräver ett eget projekt. Det kan vara en dörr som inte stänger, en skadad panel, lösa plattor eller bättringsmålning efter en vattenskada.',
        'Små arbetsmoment samlas här i stället för att delas upp på många tjänster. Ni beskriver vad som behöver göras, och vi bedömer, planerar och utför arbetet. Statusen för varje beställning syns i ert konto.',
      ],
    },
    examplesTitle: 'Exempel på arbeten',
    coordination: {
      title: 'När arbetet berör boende',
      paragraphs: [
        'Många servicearbeten görs i trapphus, entréer och andra utrymmen som används dagligen. Arbetet planeras så att utrymmena kan användas så långt det går, och vi stämmer av med er om boende behöver informeras i förväg.',
        'Ange vem som kan ge tillträde när ni beställer. Portkoder och nycklar hanteras separat och ska inte skrivas i beställningen.',
      ],
    },
    faq: [
      {
        question: 'Vilka arbeten räknas som service?',
        answer: 'Beställda reparationer och mindre arbeten som kan beskrivas och bedömas utan ett större projektunderlag, till exempel justering av dörrar, mindre snickerier, bättringsmålning och lagning av plattor. Mer omfattande arbeten hanteras som projekt.',
      },
      {
        question: 'Kan vi samla flera mindre arbeten i samma beställning?',
        answer: 'Ja. Beskriv gärna allt som behöver göras på samma adress, så kan arbetena bedömas och planeras tillsammans.',
      },
      {
        question: 'Betyder önskad starttid att arbetet sker då?',
        answer: 'Nej. Önskad starttid är ert önskemål. Planerad tid bekräftas efter genomgång och visas i ärendets status.',
      },
    ],
    related: [areas.entrances, areas.windows, areas.interior],
    audiences: [audiences.brf, audiences.managers],
    primaryAction: 'service',
  },

  [areas.entrances]: {
    metaTitle: 'Porttelefoni, passagesystem och lås',
    metaDescription: 'Installation, byte och service av porttelefoner, passagesystem, lås, dörrstängare och entrépartier i flerbostadshus och andra fastigheter.',
    title: 'Portar, lås och passage',
    lead: 'Porttelefoni, passagesystem, lås och entrépartier. Från en dörrstängare som behöver justeras till byte av passagesystem i flera entréer.',
    intro: {
      title: 'Entrén ska fungera varje dag',
      paragraphs: [
        'Entrén används av boende, besökare, leveranser och servicepersonal. När en port inte går i lås eller en porttelefon slutar fungera märks det direkt. Därför hanterar vi både enskilda reparationer och större byten.',
        'Vid byte av porttelefoni eller passagesystem går vi igenom hur behörigheter, taggar och koder ska hanteras innan arbetet startar, så att övergången blir tydlig för boende och förvaltning.',
      ],
    },
    examplesTitle: 'Det här ingår i området',
    coordination: {
      title: 'Under bytet',
      paragraphs: [
        'Arbete i entréer planeras så att det går att ta sig in och ut under arbetstiden, eller så att boende vet i förväg när en entré påverkas. Vi stämmer av med er hur och när boende ska informeras.',
      ],
    },
    faq: [
      {
        question: 'Kan ni byta porttelefon i en enskild entré?',
        answer: 'Ja. Området omfattar både enstaka byten och samordnade byten i flera entréer.',
      },
      {
        question: 'Hur hanteras taggar och behörigheter vid byte av passagesystem?',
        answer: 'Det bestäms tillsammans med er innan arbetet startar: vem som administrerar behörigheter, hur befintliga taggar hanteras och hur boende får information.',
      },
      {
        question: 'Ingår dörrautomatik och tillgänglighet vid entrén?',
        answer: 'Ja. Entrépartier, portar, dörrautomatik och tillgänglighet vid entrén hör till det här området.',
      },
    ],
    related: [areas.service, areas.windows, areas.ground],
    audiences: [audiences.brf, audiences.managers, audiences.owners],
    primaryAction: 'service',
  },

  [areas.envelope]: {
    metaTitle: 'Fasadrenovering, balkonger och tak',
    metaDescription: 'Renovering av fasader i puts, tegel och trä, balkongrenovering och takrenovering för flerbostadshus från Halmstad till Falsterbo.',
    title: 'Fasad, balkong och tak',
    lead: 'Renovering av fasader, balkonger och tak, planerad som ett sammanhållet projekt med en personlig projektledare.',
    intro: {
      title: 'Åtgärder som skyddar byggnaden',
      paragraphs: [
        'Fasad, balkonger och tak skyddar byggnaden mot väder och fukt. Åtgärderna är ofta omfattande, berör alla boende och kräver samordning av flera yrkesgrupper, ställningar och material.',
        'Vi tar helhetsansvar för projektet, från genomgång av behov och förutsättningar till planering, genomförande och överlämning. Mindre reparationer av puts, fogar, panel och tak beställs i stället som byggservice.',
      ],
    },
    examplesTitle: 'Det här ingår i området',
    coordination: {
      title: 'Påverkan på boende',
      paragraphs: [
        'Ställningar, buller och begränsad tillgång till balkonger påverkar vardagen under en längre tid. Tidplan och etapper planeras med hänsyn till boende, och projektledaren håller er informerade om vad som händer och när.',
      ],
    },
    faq: [
      {
        question: 'Kan fasad, balkonger och tak åtgärdas i samma projekt?',
        answer: 'Ja, när det är lämpligt kan åtgärderna samordnas, till exempel för att samma ställning ska kunna användas. Om det passar avgörs av byggnadens skick och er planering.',
      },
      {
        question: 'Utför ni mindre reparationer på fasad och tak?',
        answer: 'Ja. Mindre puts-, fog- och panelreparationer samt mindre takreparationer, hängrännor och stuprör beställs som byggservice.',
      },
      {
        question: 'Vem har vi kontakt med under projektet?',
        answer: 'Ni får en personlig projektledare som ansvarar för planering, samordning och återkoppling genom hela projektet.',
      },
    ],
    related: [areas.turnkey, areas.windows, areas.service],
    audiences: [audiences.brf, audiences.owners],
    primaryAction: 'project',
  },

  [areas.windows]: {
    metaTitle: 'Fönsterbyte, fönsterrenovering och dörrbyte',
    metaDescription: 'Byte av enstaka fönster eller samordnade fönsterbyten i hela fastigheter, fönsterrenovering och dörrbyten för föreningar och fastighetsägare.',
    title: 'Fönster och dörrar',
    lead: 'Byte av ett enstaka fönster eller samordnade byten i en hel fastighet, renovering av befintliga fönster och byte av dörrar.',
    intro: {
      title: 'Ett fönster eller hela fastigheten',
      paragraphs: [
        'Ett enstaka fönster eller en dörr som behöver bytas beställs som ett servicearbete. Ni anger adress, vad som behöver göras och önskad starttid, och följer sedan ärendet i ert konto.',
        'När fönster eller dörrar ska bytas i en hel fastighet blir det ett projekt. Då behövs produktval, en tidplan för hela fastigheten och information till boende, och ni får en personlig projektledare.',
        'Entrédörrar och portar hör till området portar, lås och passage.',
      ],
    },
    examplesTitle: 'Det här ingår i området',
    coordination: {
      title: 'Byten där människor bor',
      paragraphs: [
        'Fönster- och dörrbyten görs ofta i bostäder där människor bor. Boende behöver veta när arbetet sker och vad som ska vara åtkomligt. Tidpunkter och tillträde stäms av med er innan arbetet planeras in.',
      ],
    },
    faq: [
      {
        question: 'Kan vi beställa byte av ett enstaka fönster?',
        answer: 'Ja. Enstaka byten beställs som service, med adress, beskrivning och önskad starttid.',
      },
      {
        question: 'När blir ett fönsterbyte ett projekt?',
        answer: 'När byten ska göras i flera lägenheter eller i hela fastigheten och kräver gemensam planering, produktval och information till boende. Är ni osäkra på omfattningen kan vi gå igenom den tillsammans.',
      },
      {
        question: 'Renoverar ni befintliga fönster?',
        answer: 'Ja. Fönsterrenovering med renovering, målning och tätning hör till området.',
      },
    ],
    related: [areas.entrances, areas.envelope, areas.service],
    audiences: [audiences.brf, audiences.managers, audiences.owners],
    primaryAction: 'service',
  },

  [areas.ground]: {
    metaTitle: 'Dränering, mark och utemiljö för fastigheter',
    metaDescription: 'Dränering, dagvatten, fuktåtgärder, stensättning, innergårdar och tillgänglighetsanpassning för bostadsrättsföreningar och fastighetsägare.',
    title: 'Mark, grund och utemiljö',
    lead: 'Dränering, dagvatten och fuktåtgärder kring grunden, och upprustning av gårdar, gångar, trappor och entréer.',
    intro: {
      title: 'Från grunden till gården',
      paragraphs: [
        'Många markarbeten handlar om att skydda byggnaden: att leda bort vatten, åtgärda fukt och se till att grunden är dränerad och isolerad. Det kräver schakt, rätt underlag och hänsyn till det som redan finns i marken.',
        'Utemiljön är också den del av fastigheten som alla ser. Innergårdar, gångar, trappor och entréer ska vara säkra och tillgängliga för dem som bor och rör sig där.',
      ],
    },
    examplesTitle: 'Det här ingår i området',
    coordination: {
      title: 'Avstängda ytor och framkomlighet',
      paragraphs: [
        'Markarbeten påverkar framkomlighet, parkering och tillgången till entréer. Arbetet planeras i etapper där det behövs, så att boende vet vilka ytor som är avstängda och hur de tar sig fram.',
      ],
    },
    faq: [
      {
        question: 'Hur vet vi om fastigheten behöver ny dränering?',
        answer: 'Fukt i källare eller grund kan ha flera orsaker. Därför ingår utredning och förslag på åtgärder vid fuktproblem, så att rätt orsak åtgärdas.',
      },
      {
        question: 'Lagar ni även enstaka plattor och trappsteg?',
        answer: 'Ja. Mindre reparationer av plattor, gångar, trappor, räcken, grindar och staket beställs som byggservice.',
      },
      {
        question: 'Kan ni göra entréer mer tillgängliga?',
        answer: 'Ja. Ramper, gångvägar och andra anpassningar nära entréer hör till området.',
      },
    ],
    related: [areas.envelope, areas.entrances, areas.turnkey],
    audiences: [audiences.brf, audiences.owners],
    primaryAction: 'project',
  },

  [areas.interior]: {
    metaTitle: 'Renovering av trapphus, tvättstugor och gemensamma utrymmen',
    metaDescription: 'Invändig renovering av trapphus, tvättstugor, källare, förråd, miljörum och lokaler i flerbostadshus och andra fastigheter.',
    title: 'Invändig renovering',
    lead: 'Upprustning av trapphus, tvättstugor, källare, förråd, miljörum och lokaler, alltså utrymmen som används av alla i fastigheten.',
    intro: {
      title: 'Gemensamma utrymmen som fungerar',
      paragraphs: [
        'Gemensamma utrymmen slits hårt och används varje dag. En renovering kan gälla ytskikt och snickerier i ett trapphus, ny inredning i en tvättstuga eller ett miljörum som behöver fungera bättre.',
        'Ofta arbetar flera yrkesgrupper i samma utrymme. Vi samordnar arbetet, och er personliga projektledare håller ihop tidplan och återkoppling.',
      ],
    },
    examplesTitle: 'Det här ingår i området',
    coordination: {
      title: 'Utrymmen som används under arbetet',
      paragraphs: [
        'Trapphus och tvättstugor kan sällan stängas helt. Arbetet planeras så att boende vet när ett utrymme påverkas och hur de kan ta sig fram eller vilka utrymmen de kan använda under tiden.',
      ],
    },
    faq: [
      {
        question: 'Kan trapphusen renoveras ett i taget?',
        answer: 'Ja. Arbetet kan delas upp i etapper per trapphus eller entré, så att påverkan på boende begränsas.',
      },
      {
        question: 'Ingår installationer när en tvättstuga renoveras?',
        answer: 'Ytskikt och inredning ingår, och installationer samordnas i projektet. Hur ansvaret fördelas klargörs innan arbetet startar.',
      },
      {
        question: 'Kan ni anpassa lokaler i fastigheten?',
        answer: 'Ja. Anpassning av lokaler i fastigheten hör till området.',
      },
    ],
    related: [areas.service, areas.turnkey, areas.entrances],
    audiences: [audiences.brf, audiences.managers, audiences.owners],
    primaryAction: 'project',
  },

  [areas.turnkey]: {
    metaTitle: 'Totalentreprenad och projektledning för fastigheter',
    metaDescription: 'Större renoveringar, ombyggnader och tillbyggnader med helhetsansvar och personlig projektledare, från förstudie till färdigt arbete.',
    title: 'Totalentreprenad och projektledning',
    lead: 'Större renoveringar, ombyggnader och tillbyggnader där vi tar helhetsansvar och ni har en personlig projektledare från första genomgång till färdigt arbete.',
    intro: {
      title: 'En part med helhetsansvar',
      paragraphs: [
        'I en totalentreprenad ansvarar vi för både utförande och samordning. Ni behöver inte själva hålla ihop flera entreprenörer och yrkesgrupper, utan har en kontakt som ansvarar för helheten.',
        'Projektledaren tar fram tidplan, samordnar arbetet och håller er informerade. I tidiga skeden kan vi hjälpa till med behovsanalys, förstudie, budgetunderlag och projektering, så att beslut kan fattas på ett tydligt underlag.',
      ],
    },
    examplesTitle: 'Det här ingår i området',
    coordination: {
      title: 'Beslut i flera steg',
      paragraphs: [
        'Större projekt kräver ofta beslut i flera steg, i en styrelse, på en stämma eller hos en fastighetsägare. Underlagen tas fram så att de går att använda i de besluten, och tidplanen anpassas efter hur er organisation fattar beslut.',
      ],
    },
    faq: [
      {
        question: 'Vad är skillnaden mot att anlita flera hantverkare?',
        answer: 'I en totalentreprenad har en part ansvaret för helheten: samordning, tidplan och utförande. Ni får en kontakt och ett tydligt ansvar.',
      },
      {
        question: 'Kan ni hjälpa till innan projektet är beslutat?',
        answer: 'Ja. Behovsanalys, förstudie, budgetunderlag och projektering kan göras innan genomförandet beslutas.',
      },
      {
        question: 'Vad gör projektledaren?',
        answer: 'Projektledaren är er kontakt genom hela projektet och ansvarar för tidplan, samordning och återkoppling.',
      },
    ],
    related: [areas.envelope, areas.interior, areas.ground],
    audiences: [audiences.brf, audiences.owners, audiences.managers],
    primaryAction: 'project',
  },
}
