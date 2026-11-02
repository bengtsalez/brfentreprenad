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
  service: '/tjanster/fastighetsservice/',
  entrances: '/tjanster/portar-las-och-passage/',
  envelope: '/tjanster/fasad-balkong-och-tak/',
  windows: '/tjanster/fonster-och-dorrar/',
  ground: '/tjanster/mark-grund-och-utemiljo/',
  interior: '/tjanster/invandig-renovering/',
  turnkey: '/tjanster/totalentreprenad/',
}

const pages = {
  facade: '/tjanster/fasad-balkong-och-tak/fasadrenovering/',
  balconies: '/tjanster/fasad-balkong-och-tak/balkongrenovering/',
  drainage: '/tjanster/mark-grund-och-utemiljo/dranering/',
  intercom: '/tjanster/portar-las-och-passage/porttelefoni-och-passersystem/',
}

export const servicePages: Record<string, ServicePageContent> = {
  [areas.service]: {
    metaTitle: 'Fastighetsservice för bostadsrättsföreningar',
    metaDescription: 'Reparationer och mindre arbeten i trapphus, entréer, på fasader och gårdar för bostadsrättsföreningar och förvaltare från Halmstad till Falsterbo.',
    title: 'Fastighetsservice för bostadsrättsföreningar och förvaltare',
    lead: 'Reparationer och mindre arbeten i trapphus, entréer, på fasader, tak och gårdar. Ni beskriver vad som behöver åtgärdas, vi bedömer, planerar och utför arbetet.',
    intro: {
      title: 'När något behöver åtgärdas, men inte är ett projekt',
      paragraphs: [
        'Fastighetsservice är beställda reparationer och mindre arbeten: sådant som behöver göras men inte kräver en upphandling, ett stämmobeslut eller en egen projektorganisation.',
        'Ni skickar en serviceförfrågan med adress och beskrivning. Flera mindre arbeten på samma adress kan samlas i en förfrågan, så att de kan bedömas och planeras tillsammans. Visar det sig att arbetet är större än ett servicejobb säger vi det och föreslår hur det kan hanteras som projekt.',
      ],
    },
    needsTitle: 'Vanliga serviceärenden',
    needs: [
      { title: 'Dörrar som inte stänger', description: 'Entré- och källardörrar som tar i, inte går i lås eller där dörrstängaren slår igen för hårt.' },
      { title: 'Skador i trapphus och gemensamma utrymmen', description: 'Lister, foder, panel och väggar som behöver lagas eller bättringsmålas, till exempel efter en flytt eller en vattenskada.' },
      { title: 'Lösa plattor och trappsteg', description: 'Plattor, kantsten, trappsteg och räcken på gården eller vid entrén som har satt sig eller lossnat.' },
      { title: 'Mindre fasad- och takskador', description: 'Lös puts, skadade fogar, panel som behöver bytas eller hängrännor och stuprör som läcker.' },
      { title: 'Förråd, staket och grindar', description: 'Förrådsväggar, dörrar, staket och grindar som behöver repareras eller justeras.' },
      { title: 'Återställning efter skada', description: 'Återställning efter läckor, skadegörelse eller inbrott, när orsaken är åtgärdad.' },
    ],
    scope: {
      title: 'Vad ett serviceuppdrag kan omfatta',
      lead: 'Ett serviceuppdrag är avgränsat och går att beskriva i förväg. Det här är exempel på arbetsmoment.',
      items: [
        { title: 'Snickeri', description: 'Lister, foder, panel, förrådsväggar, mindre inredning och justering av dörrar och fönster.' },
        { title: 'Måleri och ytskikt', description: 'Spackling och bättringsmålning av väggar och tak, och mindre golvarbeten i gemensamma utrymmen.' },
        { title: 'Fasad och tak', description: 'Lagning av puts och fogar, byte av enstaka panelbrädor, hängrännor, stuprör och plåtdetaljer.' },
        { title: 'Mark och utemiljö', description: 'Omläggning av plattor, lagning av trappor, räcken, grindar och staket.' },
      ],
    },
    planning: {
      title: 'Så hanteras en serviceförfrågan',
      steps: [
        { title: 'Förfrågan', description: 'Ni beskriver vad som behöver åtgärdas, var i fastigheten det finns och om det brådskar.' },
        { title: 'Bedömning', description: 'Vi går igenom förfrågan och hör av oss om något behöver klargöras, till exempel tillträde, material eller om arbetet behöver ses på plats.' },
        { title: 'Besked och planering', description: 'Ni får besked om vad arbetet omfattar och när det kan utföras. Inget är bokat förrän tiden är bekräftad.' },
        { title: 'Utförande', description: 'Arbetet utförs och ni får besked när det är klart.' },
      ],
    },
    costFactors: {
      title: 'Vad som påverkar omfattning och kostnad',
      lead: 'Kostnaden för ett servicearbete beror på vad som behöver göras och under vilka förutsättningar. Det här påverkar mest.',
      items: [
        { title: 'Arbetets art och tidsåtgång', description: 'En justering tar kort tid. En lagning som kräver flera moment, torktid eller målning tar längre.' },
        { title: 'Material', description: 'Om material finns i lager eller behöver beställas, och om befintligt material behöver matchas.' },
        { title: 'Åtkomst', description: 'Arbete på höjd, i trånga utrymmen eller där något först behöver plockas undan tar mer tid.' },
        { title: 'Samordning', description: 'Flera arbeten på samma adress kan ofta utföras vid samma tillfälle.' },
      ],
    },
    residents: {
      title: 'Hur boende och styrelse påverkas',
      board: {
        title: 'För styrelsen eller förvaltaren',
        paragraphs: [
          'Ni behöver ange adress, beskriva felet och berätta hur vi får tillträde. Portkoder och nycklar hanteras separat och skrivs inte i förfrågan.',
          'Gäller arbetet flera saker på samma adress, beskriv gärna allt i en förfrågan.',
        ],
      },
      residents: {
        title: 'För de boende',
        paragraphs: [
          'Servicearbeten görs ofta i trapphus, entréer och andra utrymmen som används dagligen. Arbetet planeras så att utrymmena kan användas så långt det går.',
          'Om boende behöver informeras i förväg, till exempel om en entré stängs en stund, stämmer vi av det med er.',
        ],
      },
    },
    examplesTitle: 'Exempel på arbeten',
    examples: [],
    faq: [
      {
        question: 'Vilka arbeten räknas som service?',
        answer: 'Reparationer och mindre arbeten som går att beskriva och bedöma utan ett större projektunderlag, till exempel justering av dörrar, mindre snickerier, bättringsmålning och lagning av plattor. Mer omfattande arbeten hanteras som projekt.',
      },
      {
        question: 'Kan vi samla flera mindre arbeten i samma förfrågan?',
        answer: 'Ja. Beskriv allt som behöver göras på samma adress, så kan arbetena bedömas och planeras tillsammans.',
      },
      {
        question: 'Betyder en skickad förfrågan att arbetet är bokat?',
        answer: 'Nej. Förfrågan är början på ärendet. Tid för arbetet bekräftas efter att vi har gått igenom vad som behöver göras.',
      },
      {
        question: 'Behöver vi ett avtal eller ett konto för att skicka en förfrågan?',
        answer: 'Nej. Ni skickar förfrågan via formuläret eller ringer oss. Det krävs ingen registrering.',
      },
    ],
    related: [areas.entrances, pages.intercom, areas.windows, areas.interior],
    audiences: [audiences.brf, audiences.managers],
    primaryAction: 'service',
    inquiryService: 'fastighetsservice',
  },

  [pages.facade]: {
    metaTitle: 'Fasadrenovering för bostadsrättsföreningar',
    metaDescription: 'Fasadrenovering av puts-, tegel- och träfasader för bostadsrättsföreningar från Halmstad till Falsterbo. Underlag för styrelsen, tidplan och en projektledare genom hela projektet.',
    title: 'Fasadrenovering för bostadsrättsföreningar',
    lead: 'Renovering av puts-, tegel- och träfasader som ett samlat projekt. Ni får ett underlag att fatta beslut på och en projektledare som håller ihop arbetet från första genomgång till överlämning.',
    intro: {
      title: 'En fasad som skyddar huset',
      paragraphs: [
        'Fasaden skyddar byggnaden mot regn, vind och fukt. Med tiden släpper puts, fogar vittrar och träpanel ruttnar, och skadorna blir dyrare att åtgärda ju längre de får fortgå.',
        'En fasadrenovering berör alla boende, kräver ofta ställning och samordning av flera yrkesgrupper och behöver beslutas av styrelsen eller stämman. Därför hanteras den som ett projekt med en personlig projektledare. Mindre lagningar av puts, fogar och panel skickas i stället som en serviceförfrågan.',
      ],
    },
    needsTitle: 'Vanliga skäl till att en förening ser över fasaden',
    needs: [
      { title: 'Sprickor och lös puts', description: 'Puts som låter ihåligt, sprickor som växer eller bitar som har lossnat.' },
      { title: 'Vittrade fogar i tegel', description: 'Fogar som smular, saknas eller släpper in vatten i murverket.' },
      { title: 'Skadad träpanel', description: 'Panel med röta, sprickor eller färg som släpper, ofta längst ned och kring fönster.' },
      { title: 'Fuktfläckar och missfärgningar', description: 'Påväxt, saltutfällningar eller fuktfläckar som tyder på att vatten tar sig in.' },
      { title: 'Underhållsplanen säger att det är dags', description: 'Fasaden står i föreningens underhållsplan och styrelsen behöver ett underlag för beslut.' },
      { title: 'Andra åtgärder samtidigt', description: 'Föreningen planerar balkonger, fönster eller tak och vill samordna arbetet och ställningen.' },
    ],
    scope: {
      title: 'Vad uppdraget kan omfatta',
      lead: 'Omfattningen bestäms av fasadens material och skick. Det här är delar som ofta ingår.',
      items: [
        { title: 'Genomgång av fasaden', description: 'En bedömning av fasadens skick som grund för vad som behöver göras och vad som kan vänta.' },
        { title: 'Putsfasad', description: 'Lagning av skadad puts, omputsning av hela eller delar av fasaden och avfärgning.' },
        { title: 'Tegelfasad', description: 'Omfogning, byte av skadat tegel och reparation av murverk.' },
        { title: 'Träfasad', description: 'Byte av panel, foder och knutar, åtgärder på bakomliggande konstruktion och målning.' },
        { title: 'Detaljer runt fasaden', description: 'Fönsterbleck, sockel och andra detaljer som påverkar hur vatten leds bort från fasaden.' },
        { title: 'Tilläggsisolering', description: 'Isolering av fasaden kan utredas i samband med renoveringen, när det är aktuellt.' },
      ],
    },
    planning: {
      title: 'Så planeras och genomförs en fasadrenovering',
      steps: [
        { title: 'Genomgång', description: 'Projektledaren går igenom fasaden, föreningens önskemål och vad som är känt sedan tidigare, till exempel underhållsplan eller besiktning.' },
        { title: 'Underlag för beslut', description: 'Ni får ett underlag med omfattning, upplägg och tidplan som styrelsen kan presentera och fatta beslut på.' },
        { title: 'Förberedelser', description: 'Ställning, material, etappindelning och information till boende planeras innan arbetet startar.' },
        { title: 'Genomförande och överlämning', description: 'Projektledaren samordnar arbetet och håller er informerade. Det färdiga arbetet gås igenom med er innan det lämnas över.' },
      ],
    },
    costFactors: {
      title: 'Vad som påverkar omfattning och kostnad',
      lead: 'Två fasader är sällan lika. Det här är de faktorer som brukar påverka mest och som tas upp i underlaget.',
      items: [
        { title: 'Material och skick', description: 'Om fasaden kan lagas eller behöver göras om helt, och hur mycket som är skadat bakom ytan.' },
        { title: 'Fasadyta och höjd', description: 'Storleken på ytan och byggnadens höjd påverkar ställning, arbetstid och materialmängd.' },
        { title: 'Ställning och arbetsplats', description: 'Hur ställningen kan placeras, hur gatan och gården kan användas och om arbetet behöver delas i etapper.' },
        { title: 'Detaljer och anslutningar', description: 'Fönsterbleck, balkonger, stuprör och andra detaljer som behöver tas bort och sättas tillbaka eller bytas.' },
        { title: 'Tillstånd och krav', description: 'Ändras fasadens utseende eller ligger huset i en kulturmiljö kan det krävas kontakt med kommunen. Det utreds tidigt.' },
        { title: 'Samordning med andra åtgärder', description: 'Planerar föreningen även fönster, balkonger eller tak kan arbetena samordnas med samma ställning.' },
      ],
    },
    residents: {
      title: 'Hur boende och styrelse påverkas',
      board: {
        title: 'För styrelsen',
        paragraphs: [
          'Styrelsen behöver fatta beslut på ett tydligt underlag och veta vem som ansvarar under projektet. Projektledaren är er kontakt genom hela projektet.',
          'Beroende på projektets storlek och föreningens stadgar kan beslutet behöva tas på en stämma. Tidplanen anpassas efter hur och när föreningen fattar beslut.',
        ],
      },
      residents: {
        title: 'För de boende',
        paragraphs: [
          'Ställning framför fönster och balkonger, buller under vissa moment och avspärrade ytor på gården är vanligt under en fasadrenovering.',
          'Boende behöver veta i förväg när arbetet når deras del av huset, om balkonger behöver tömmas och vem de vänder sig till med frågor. Hur informationen går ut bestäms med styrelsen.',
        ],
      },
    },
    examplesTitle: 'Det här ingår i fasadrenovering',
    examples: [],
    faq: [
      {
        question: 'Hur vet vi om fasaden behöver renoveras?',
        answer: 'Lös puts, sprickor, vittrade fogar och fuktfläckar är vanliga tecken. En genomgång av fasaden visar vad som behöver åtgärdas nu och vad som kan vänta, och blir grunden för styrelsens beslut.',
      },
      {
        question: 'Kan vi renovera fasaden i etapper?',
        answer: 'Ofta ja, till exempel en fasad i taget. Etappindelning kan sprida kostnaden men innebär att ställning och etablering behövs flera gånger. Det vägs in i underlaget.',
      },
      {
        question: 'Behövs bygglov för fasadrenovering?',
        answer: 'Det beror på om fasadens utseende ändras och var huset ligger. Frågan utreds tidigt i projektet så att den inte påverkar tidplanen i onödan.',
      },
      {
        question: 'Kan fasaden renoveras samtidigt som balkongerna?',
        answer: 'Ja. Att samordna fasad och balkonger, eller fönster och tak, gör att samma ställning kan användas och att de boende påverkas under en sammanhållen period.',
      },
      {
        question: 'Vad behöver vi ha klart innan vi hör av oss?',
        answer: 'Inget särskilt. Har ni en underhållsplan, besiktning eller tidigare utredning är den bra att ha till hands, men ni kan höra av er tidigt i processen.',
      },
    ],
    related: [pages.balconies, areas.envelope, areas.windows, areas.turnkey],
    audiences: [audiences.brf, audiences.owners],
    primaryAction: 'project',
    inquiryService: 'fasadrenovering',
  },

  [pages.balconies]: {
    metaTitle: 'Balkongrenovering för bostadsrättsföreningar',
    metaDescription: 'Balkongrenovering för bostadsrättsföreningar från Halmstad till Falsterbo: balkongplattor, tätskikt, räcken och infästningar, planerat som ett projekt med projektledare.',
    title: 'Balkongrenovering för bostadsrättsföreningar',
    lead: 'Renovering av balkongplattor, tätskikt, räcken och infästningar. Projektet planeras så att styrelsen har ett tydligt underlag och de boende vet när deras balkong berörs.',
    intro: {
      title: 'Balkonger som är säkra att använda',
      paragraphs: [
        'Balkonger utsätts för regn, frost och salt. När betongen spricker, armeringen rostar eller räckena släpper i infästningarna behöver föreningen agera, både för boendes säkerhet och för att skadorna inte ska bli större.',
        'En balkongrenovering påverkar varje lägenhet med balkong och kräver samordning av ställning, arbetsmoment och information till boende. Därför hanteras den som ett projekt med en personlig projektledare.',
      ],
    },
    needsTitle: 'Vanliga skäl till balkongrenovering',
    needs: [
      { title: 'Sprickor och avflagnad betong', description: 'Betong som har spruckit eller släppt, ofta i kanterna och på undersidan av plattan.' },
      { title: 'Rostfläckar', description: 'Rost som tränger fram genom betongen kan tyda på att armeringen är angripen.' },
      { title: 'Räcken och infästningar', description: 'Räcken som sitter löst, har rostat eller inte längre känns säkra.' },
      { title: 'Vatten som rinner fel', description: 'Vatten som blir stående eller rinner ned på balkongen under eller längs fasaden.' },
      { title: 'Underhållsplan eller besiktning', description: 'En besiktning eller underhållsplanen visar att balkongerna behöver åtgärdas.' },
    ],
    scope: {
      title: 'Vad uppdraget kan omfatta',
      lead: 'Vad som behöver göras avgörs av balkongernas konstruktion och skick.',
      items: [
        { title: 'Genomgång av balkongerna', description: 'En bedömning av plattor, räcken och infästningar som grund för omfattningen.' },
        { title: 'Balkongplattor', description: 'Lagning av betongskador, kantreparationer och i vissa fall byte av plattor.' },
        { title: 'Tätskikt och avvattning', description: 'Nytt tätskikt eller ytbeläggning och åtgärder för hur vatten leds bort.' },
        { title: 'Räcken och infästningar', description: 'Renovering, förstärkning eller byte av räcken och deras infästningar.' },
        { title: 'Samordning med fasaden', description: 'När fasaden också ska renoveras kan arbetena samordnas med samma ställning.' },
      ],
    },
    planning: {
      title: 'Så planeras och genomförs en balkongrenovering',
      steps: [
        { title: 'Genomgång', description: 'Projektledaren går igenom balkongerna, föreningens önskemål och tidigare underlag som besiktningar.' },
        { title: 'Underlag för beslut', description: 'Ni får ett underlag med omfattning, upplägg och tidplan som styrelsen kan fatta beslut på.' },
        { title: 'Planering per balkong', description: 'Arbetet delas upp så att varje lägenhet vet när deras balkong berörs och vad som behöver tömmas.' },
        { title: 'Genomförande och överlämning', description: 'Projektledaren samordnar arbetet och håller er informerade. Det färdiga arbetet gås igenom med er innan det lämnas över.' },
      ],
    },
    costFactors: {
      title: 'Vad som påverkar omfattning och kostnad',
      lead: 'Det här är faktorerna som oftast avgör omfattningen och som tas upp i underlaget.',
      items: [
        { title: 'Antal balkonger och konstruktion', description: 'Hur många balkonger som berörs och hur de är uppbyggda, till exempel inspända plattor eller fristående konstruktioner.' },
        { title: 'Skadornas omfattning', description: 'Om betongen kan lagas eller om plattor behöver bytas, och hur mycket armering som är angripen.' },
        { title: 'Räcken', description: 'Om befintliga räcken kan renoveras eller behöver bytas, och vilket utförande föreningen väljer.' },
        { title: 'Åtkomst', description: 'Ställning, lift eller arbete från balkongerna, beroende på byggnadens höjd och omgivning.' },
        { title: 'Utseende och tillstånd', description: 'Ändras balkongernas utseende kan det krävas kontakt med kommunen. Det utreds tidigt.' },
      ],
    },
    residents: {
      title: 'Hur boende och styrelse påverkas',
      board: {
        title: 'För styrelsen',
        paragraphs: [
          'Styrelsen beslutar om omfattning och utförande, till exempel val av räcken. Projektledaren tar fram underlaget och är er kontakt under hela projektet.',
          'Balkonger kan vara föreningens ansvar medan vissa delar ligger på den boende enligt stadgarna. Gränsdragningen behöver vara tydlig innan arbetet startar.',
        ],
      },
      residents: {
        title: 'För de boende',
        paragraphs: [
          'Under arbetet går balkongen inte att använda och behöver vara tömd. Buller förekommer under vissa moment, till exempel när skadad betong tas bort.',
          'Boende behöver få veta i god tid när deras balkong berörs och hur länge. Hur informationen går ut bestäms med styrelsen.',
        ],
      },
    },
    examplesTitle: 'Det här ingår i balkongrenovering',
    examples: [],
    faq: [
      {
        question: 'Hur vet vi om balkongerna behöver renoveras?',
        answer: 'Sprickor, avflagnad betong, rostfläckar och lösa räcken är vanliga tecken. En genomgång visar vad som behöver göras och hur bråttom det är.',
      },
      {
        question: 'Hur länge kan de boende inte använda sina balkonger?',
        answer: 'Det beror på vilka åtgärder som behövs och hur arbetet delas upp. Tiden per balkong framgår av tidplanen innan arbetet startar.',
      },
      {
        question: 'Kan vi byta räcken utan att renovera plattorna?',
        answer: 'Ibland. Men räckenas infästning sitter i plattan eller fasaden, så plattornas skick behöver vara känt innan nya räcken monteras.',
      },
      {
        question: 'Kan balkongrenoveringen samordnas med fasaden?',
        answer: 'Ja. Görs arbetena samtidigt kan samma ställning användas och de boende påverkas under en sammanhållen period.',
      },
    ],
    related: [pages.facade, areas.envelope, areas.turnkey],
    audiences: [audiences.brf, audiences.owners],
    primaryAction: 'project',
    inquiryService: 'balkongrenovering',
  },

  [pages.drainage]: {
    metaTitle: 'Dränering av flerbostadshus',
    metaDescription: 'Dränering och grundisolering av flerbostadshus för bostadsrättsföreningar från Halmstad till Falsterbo. Planering av schakt, framkomlighet och information till boende.',
    title: 'Dränering av flerbostadshus',
    lead: 'Ny dränering och grundisolering runt flerbostadshus, planerad så att entréer, gångar och parkering går att använda så långt det är möjligt under arbetet.',
    intro: {
      title: 'Fukt i källaren har ofta sin orsak utanför huset',
      paragraphs: [
        'Dräneringen leder bort vatten från grunden. När den är gammal, igensatt eller saknas helt kan fukt tränga in i källarväggar och golv, med lukt, fläckar och skadade förråd som följd.',
        'Fukt kan också ha andra orsaker, som markens lutning, stuprör som släpper vatten intill huset eller läckande ledningar. Därför börjar arbetet med att ta reda på orsaken, så att rätt åtgärd görs.',
      ],
    },
    needsTitle: 'Vanliga skäl att se över dräneringen',
    needs: [
      { title: 'Fukt i källaren', description: 'Fuktfläckar, saltutfällningar eller unken lukt i källare och förråd.' },
      { title: 'Vatten vid kraftigt regn', description: 'Vatten som tränger in vid grunden eller blir stående intill huset.' },
      { title: 'Gammal dränering', description: 'Dräneringen är från husets byggår och har aldrig bytts eller kontrollerats.' },
      { title: 'Skador på källarväggar', description: 'Puts eller färg som släpper på insidan av källarväggarna.' },
      { title: 'Planerade markarbeten', description: 'Gården eller entréerna ska rustas upp och föreningen vill passa på att åtgärda dräneringen först.' },
    ],
    scope: {
      title: 'Vad uppdraget kan omfatta',
      lead: 'Omfattningen styrs av orsaken till fukten, grundens utförande och vad som finns i marken runt huset.',
      items: [
        { title: 'Utredning av fukten', description: 'Genomgång av var fukten finns och vad som kan orsaka den, innan åtgärder föreslås.' },
        { title: 'Schakt runt grunden', description: 'Schakt längs husets grund, med hänsyn till ledningar, träd och angränsande ytor.' },
        { title: 'Ny dränering', description: 'Nya dräneringsledningar, dränerande material och anslutning till dagvatten eller brunnar.' },
        { title: 'Fuktskydd och grundisolering', description: 'Skydd och isolering av grundmuren på utsidan.' },
        { title: 'Återställning av ytor', description: 'Återställning av gräs, plattor, asfalt och planteringar efter schakten.' },
      ],
    },
    planning: {
      title: 'Så planeras och genomförs en dränering',
      steps: [
        { title: 'Genomgång och orsak', description: 'Projektledaren går igenom fuktproblemen, grunden och omgivningen för att avgöra om dränering är rätt åtgärd.' },
        { title: 'Underlag för beslut', description: 'Ni får ett underlag med omfattning, upplägg och tidplan som styrelsen kan fatta beslut på.' },
        { title: 'Etapper och framkomlighet', description: 'Arbetet delas in i etapper så att entréer, cykelställ och parkering kan användas så långt det går.' },
        { title: 'Genomförande och överlämning', description: 'Schakt, dränering och återställning samordnas. Det färdiga arbetet gås igenom med er innan det lämnas över.' },
      ],
    },
    costFactors: {
      title: 'Vad som påverkar omfattning och kostnad',
      lead: 'En dränering är till stor del markarbete. Det här avgör omfattningen.',
      items: [
        { title: 'Grundens längd och djup', description: 'Hur långt runt huset det behöver schaktas och hur djupt grunden ligger.' },
        { title: 'Marken runt huset', description: 'Jordart, berg, träd och rötter påverkar hur schakten kan göras.' },
        { title: 'Ledningar och anslutningar', description: 'Befintliga ledningar i marken och var vattnet kan ledas bort.' },
        { title: 'Ytor som ska återställas', description: 'Plattor, asfalt, trappor och planteringar som behöver tas bort och läggas tillbaka.' },
        { title: 'Åtgärder på grundmuren', description: 'Om grundmuren behöver lagas, fuktskyddas eller isoleras när den ändå är frilagd.' },
      ],
    },
    residents: {
      title: 'Hur boende och styrelse påverkas',
      board: {
        title: 'För styrelsen',
        paragraphs: [
          'Styrelsen beslutar om åtgärden på ett underlag som beskriver orsak, omfattning och tidplan. Projektledaren är er kontakt under projektet.',
          'Planerar föreningen även att rusta upp gården eller entréerna kan det vara klokt att göra dräneringen först, så att ytorna bara behöver göras om en gång.',
        ],
      },
      residents: {
        title: 'För de boende',
        paragraphs: [
          'Under arbetet finns öppna schakt, maskiner och avspärrade ytor intill huset. Gångvägar till entréer kan behöva ledas om och parkering kan påverkas.',
          'Källarförråd längs ytterväggarna kan behöva tömmas eller flyttas från väggen. Boende behöver få veta i förväg vilka ytor som berörs och när.',
        ],
      },
    },
    examplesTitle: 'Det här ingår i dränering',
    examples: [],
    faq: [
      {
        question: 'Hur vet vi om dräneringen behöver bytas?',
        answer: 'Fukt i källaren, vatten vid grunden och en dränering som är lika gammal som huset är vanliga tecken. Fukt kan ha flera orsaker, så arbetet börjar med att ta reda på varför den uppstår.',
      },
      {
        question: 'Kan dräneringen göras i etapper?',
        answer: 'Ja. Arbetet görs ofta en sida av huset i taget, så att entréer och gångvägar går att använda under tiden.',
      },
      {
        question: 'Påverkas gården och planteringarna?',
        answer: 'Ja, ytorna närmast huset grävs upp och återställs efteråt. Vad som återställs och hur bestäms innan arbetet startar.',
      },
      {
        question: 'Kan vi passa på att isolera grunden?',
        answer: 'Ja. När grundmuren är frilagd kan fuktskydd och grundisolering göras i samma arbete.',
      },
    ],
    related: [areas.ground, pages.facade, areas.turnkey],
    audiences: [audiences.brf, audiences.owners],
    primaryAction: 'project',
    inquiryService: 'dranering',
  },

  [pages.intercom]: {
    metaTitle: 'Porttelefoni och passersystem för bostadsrättsföreningar',
    metaDescription: 'Byte, utbyggnad och service av porttelefoni, taggläsare och passersystem i flerbostadshus. För bostadsrättsföreningar och förvaltare från Halmstad till Falsterbo.',
    title: 'Porttelefoni och passersystem för flerbostadshus',
    lead: 'Byte, utbyggnad och service av porttelefoner, taggläsare och passersystem. Från en läsare som slutat fungera till ett nytt system i alla entréer.',
    intro: {
      title: 'Entrén ska fungera varje dag',
      paragraphs: [
        'Entrén används av boende, besökare, leveranser och servicepersonal. När porttelefonen slutar fungera eller en tagg inte längre fungerar märks det direkt.',
        'Ett fel i en enskild entré skickas som en serviceförfrågan. Ett byte av system i hela fastigheten planeras som ett projekt, eftersom det kräver beslut om funktioner, behörigheter och hur boende får nya taggar.',
      ],
    },
    needsTitle: 'Vanliga skäl att höra av sig',
    needs: [
      { title: 'Porttelefonen fungerar inte', description: 'Det går inte att ringa upp, ljudet är dåligt eller dörren öppnas inte från lägenheten.' },
      { title: 'Taggar och läsare krånglar', description: 'Läsare som inte reagerar, taggar som slutat fungera eller dörrar som inte låses upp.' },
      { title: 'Svårt att hantera behörigheter', description: 'Det är krångligt att spärra borttappade taggar eller ge hantverkare och leverantörer tillträde.' },
      { title: 'Systemet är gammalt', description: 'Reservdelar är svåra att få tag på eller systemet passar inte längre föreningens behov.' },
      { title: 'Fler dörrar ska ha passage', description: 'Föreningen vill ha taggläsare även på källare, cykelrum, tvättstuga eller miljörum.' },
    ],
    scope: {
      title: 'Vad uppdraget kan omfatta',
      lead: 'Det här är exempel på vad ett uppdrag kan innehålla, från service till ett nytt system.',
      items: [
        { title: 'Felsökning och service', description: 'Felsökning och reparation av porttelefoner, läsare, lås och dörrstängare.' },
        { title: 'Byte av porttelefon', description: 'Ny porttelefon i en eller flera entréer, inklusive anpassning av dörrpartiet vid behov.' },
        { title: 'Passersystem', description: 'Taggläsare och kodlås på entréer och gemensamma utrymmen, och hur behörigheter ska hanteras.' },
        { title: 'Utbyggnad', description: 'Fler dörrar med passage, till exempel källare, cykelrum och tvättstuga.' },
        { title: 'Dörrar och lås', description: 'Justering och byte av lås, dörrstängare och beslag så att dörren stänger och låser som den ska.' },
      ],
    },
    planning: {
      title: 'Så planeras ett byte av system',
      lead: 'Vid enstaka fel gäller samma väg som för andra serviceärenden. Vid byte av system i flera entréer ser det ut så här.',
      steps: [
        { title: 'Genomgång', description: 'Vi går igenom entréer, dörrar och hur föreningen vill använda systemet, till exempel vilka dörrar som ska ha passage.' },
        { title: 'Förslag och beslut', description: 'Ni får ett förslag på omfattning, upplägg och tidplan att fatta beslut på.' },
        { title: 'Behörigheter och information', description: 'Det bestäms vem som administrerar behörigheter, hur nya taggar delas ut och hur boende informeras.' },
        { title: 'Installation och överlämning', description: 'Systemet installeras entré för entré och gås igenom med er innan det lämnas över.' },
      ],
    },
    costFactors: {
      title: 'Vad som påverkar omfattning och kostnad',
      lead: 'Det här påverkar mest när ett system ska bytas eller byggas ut.',
      items: [
        { title: 'Antal entréer och dörrar', description: 'Hur många dörrar som ska ha porttelefon eller läsare.' },
        { title: 'Funktioner', description: 'Till exempel om porttelefonen ska kopplas till boendes mobiltelefoner och hur behörigheter ska administreras.' },
        { title: 'Befintliga dörrar och kablage', description: 'Om dörrpartier och kablage kan återanvändas eller behöver bytas eller kompletteras.' },
        { title: 'Antal taggar', description: 'Hur många taggar som behövs till boende, förvaltning och leverantörer.' },
      ],
    },
    residents: {
      title: 'Hur boende och styrelse påverkas',
      board: {
        title: 'För styrelsen',
        paragraphs: [
          'Vid ett nytt system behöver styrelsen bestämma vem som administrerar behörigheter, hur borttappade taggar spärras och hur hantverkare och leverantörer får tillträde.',
          'De frågorna gås igenom innan arbetet startar, så att ansvaret är tydligt när systemet är på plats.',
        ],
      },
      residents: {
        title: 'För de boende',
        paragraphs: [
          'Under bytet kan en entré behöva vara olåst eller bevakad en kortare tid. Arbetet planeras så att det går att ta sig in och ut.',
          'Boende behöver veta när systemet byts, hur de får sina nya taggar och vad som händer med de gamla.',
        ],
      },
    },
    examplesTitle: 'Det här ingår i porttelefoni och passersystem',
    examples: [],
    faq: [
      {
        question: 'Kan ni byta porttelefon i en enskild entré?',
        answer: 'Ja. Både enskilda byten och samordnade byten i flera entréer ingår.',
      },
      {
        question: 'Hur hanteras taggar och behörigheter vid byte av passersystem?',
        answer: 'Det bestäms tillsammans med er innan arbetet startar: vem som administrerar behörigheter, hur befintliga taggar hanteras och hur boende får information.',
      },
      {
        question: 'Är det ett servicearbete eller ett projekt?',
        answer: 'Fel i en enskild entré är ett servicearbete. Byte av system i flera entréer planeras som ett projekt. Är ni osäkra kan ni välja Vet inte ännu i formuläret.',
      },
      {
        question: 'Kan även källare och cykelrum få taggläsare?',
        answer: 'Ja. Passersystemet kan byggas ut till gemensamma utrymmen som källare, cykelrum, tvättstuga och miljörum.',
      },
    ],
    related: [areas.entrances, areas.service, areas.windows],
    audiences: [audiences.brf, audiences.managers],
    primaryAction: 'service',
    inquiryService: 'porttelefoni-och-passersystem',
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
        'Vi tar helhetsansvar för projektet, från genomgång av behov och förutsättningar till planering, genomförande och överlämning. Mindre reparationer av puts, fogar, panel och tak beställs i stället som fastighetsservice.',
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
        answer: 'Ja. Mindre puts-, fog- och panelreparationer samt mindre takreparationer, hängrännor och stuprör beställs som fastighetsservice.',
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
        'Ett enstaka fönster eller en dörr som behöver bytas beställs som ett servicearbete. Ni skickar en serviceförfrågan med adress och vad som behöver göras, och vi återkommer med besked om när arbetet kan utföras.',
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
        answer: 'Ja. Enstaka byten skickas som en serviceförfrågan med adress och beskrivning.',
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
    inquiryService: 'fonster-och-dorrar',
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
        answer: 'Ja. Mindre reparationer av plattor, gångar, trappor, räcken, grindar och staket beställs som fastighetsservice.',
      },
      {
        question: 'Kan ni göra entréer mer tillgängliga?',
        answer: 'Ja. Ramper, gångvägar och andra anpassningar nära entréer hör till området.',
      },
    ],
    related: [areas.envelope, areas.entrances, areas.turnkey],
    audiences: [audiences.brf, audiences.owners],
    primaryAction: 'project',
    inquiryService: 'mark-och-utemiljo',
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
    inquiryService: 'invandig-renovering',
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
    inquiryService: 'annan-renovering',
  },
}
