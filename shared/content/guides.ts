/**
 * Guider i kunskapsdelen (/kunskap/ och /kunskap/[slug]/).
 *
 * Regler:
 * - Tekniska och juridiska påståenden ska gå att belägga med källorna i
 *   `sources`, som är kontrollerade det datum som anges.
 * - Inga priser, svarstider, garantier eller erfarenhetsbeskrivningar utan
 *   underlag från företaget.
 * - Ange en person som författare eller faktagranskare bara när uppdraget är
 *   bekräftat. Till dess står BRF Entreprenad som författare.
 * - `published` sätts till det datum guiden faktiskt publiceras. Utan det
 *   visas bara uppdateringsdatumet.
 * - Utkast (status "draft") byggs inte, länkas inte och tas inte med i
 *   sitemap.xml. Det som saknas står i `missing` och i UNDERLAG.md.
 */
import type { Contributor, Guide, GuideSource } from './types.ts'

const organisation: Contributor = { name: 'BRF Entreprenad', type: 'Organization' }

const checked = '2026-11-10'

const sources = {
  facadeChange: {
    title: 'Fasadändring (PBL kunskapsbanken)',
    publisher: 'Boverket',
    url: 'https://www.boverket.se/sv/PBL-kunskapsbanken/lov--byggande/anmalningsplikt/byggnader/fasadandring/',
    checked,
  },
  housingAct: {
    title: 'Bostadsrättslag (1991:614), 9 kap. 15 §',
    publisher: 'Sveriges riksdag',
    url: 'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/bostadsrattslag-1991614_sfs-1991-614/',
    checked,
  },
  basementWall: {
    title: 'Risker med fuktinträngning från mark till källarvägg',
    publisher: 'Boverket',
    url: 'https://www.boverket.se/sv/byggande/forebygg-fel-brister-skador/risker-byggande/risker-fuktskador/fuktrisker-for-grund/fuktrisker-med-kallare/risk-med-fuktintrangning-kallarvagg/',
    checked,
  },
  surfaceWater: {
    title: 'Risker med ytvatten',
    publisher: 'Boverket',
    url: 'https://www.boverket.se/sv/byggande/forebygg-fel-brister-skador/risker-byggande/risker-fuktskador/fuktrisker-for-grund/fuktrisker-med-kallare/risk-ytvatten/',
    checked,
  },
} satisfies Record<string, GuideSource>

const services = {
  facade: '/tjanster/fasad-balkong-och-tak/fasadrenovering/',
  balconies: '/tjanster/fasad-balkong-och-tak/balkongrenovering/',
  drainage: '/tjanster/mark-grund-och-utemiljo/dranering/',
  ground: '/tjanster/mark-grund-och-utemiljo/',
  turnkey: '/tjanster/totalentreprenad/',
}

export const guides: Guide[] = [
  {
    slug: 'kostnad-fasadrenovering-brf',
    status: 'published',
    title: 'Vad påverkar kostnaden för fasadrenovering i en BRF?',
    metaTitle: 'Vad kostar fasadrenovering i en BRF? Faktorerna som avgör',
    metaDescription: 'Fasadens material och skick, ytan, ställningen, detaljerna och eventuellt bygglov avgör kostnaden för en fasadrenovering. Så kan styrelsen förbereda beslutet.',
    summary: 'Faktorerna som avgör kostnaden, och vad styrelsen behöver ta ställning till innan beslut.',
    answer: 'Kostnaden styrs främst av fasadens material och skick, hur stor yta som berörs, hur ställningen kan placeras och vilka detaljer som behöver tas bort eller bytas. Ändras fasadens utseende kan bygglov krävas, vilket påverkar tidplanen. Ett pris går därför inte att ange utan en genomgång av den aktuella fasaden.',
    author: organisation,
    updated: checked,
    sections: [
      {
        title: 'Skicket avgör om lagning räcker',
        paragraphs: [
          'Den största frågan är om fasaden kan lagas där den är skadad eller om den behöver göras om på större ytor. Lagning av enstaka skador är ett mindre arbete. Omputsning, omfogning av hela fasader eller byte av panel kräver mer material, mer arbetstid och ofta ställning runt hela huset.',
          'Alla skador syns inte från marken. Puts som låter ihåligt, fukt bakom ytan eller skadade fästen upptäcks ibland först när ställningen står uppe. Därför behöver underlaget beskriva hur sådant hanteras. Hos oss godkänner styrelsen tilläggsarbeten skriftligt innan de utförs.',
        ],
      },
      {
        title: 'Puts, tegel och trä kräver olika åtgärder',
        paragraphs: [
          'Fasadens material styr vilka arbetsmoment som behövs och därmed kostnaden.',
        ],
        list: [
          'Puts: lagning av skadade partier, omputsning av hela eller delar av fasaden och avfärgning.',
          'Tegel: omfogning, byte av skadat tegel och reparation av murverket.',
          'Trä: byte av panel, foder och knutar, åtgärder på bakomliggande konstruktion och målning.',
        ],
      },
      {
        title: 'Yta, höjd och ställning',
        paragraphs: [
          'Fasadytan och byggnadens höjd avgör hur mycket ställning som behövs och hur länge den står. Hur ställningen kan placeras påverkar också: mot gata, mot gård, över entréer eller intill parkeringar.',
          'Behöver ställningen stå på gata eller trottoar ska det stämmas av med kommunen i god tid, eftersom det kan påverka när arbetet kan starta.',
        ],
      },
      {
        title: 'Detaljer och anslutningar',
        paragraphs: [
          'Fönsterbleck, sockel, stuprör, balkonginfästningar och belysning behöver ofta tas bort och sättas tillbaka eller bytas. Det är detaljer som påverkar hur vatten leds bort från fasaden och som därför bör ingå i bedömningen, även om de är en mindre del av ytan.',
        ],
      },
      {
        title: 'Bygglov när fasaden ändrar utseende',
        paragraphs: [
          'För ett flerbostadshus inom detaljplan krävs bygglov för fasadändring när ändringen görs på en fasad eller ett tak som vetter mot en allmän plats, till exempel en gata. Byte av kulör och byte av fasadbeklädnad räknas som fasadändring. Att byta till samma material och utförande räknas däremot som underhåll.',
          'Detaljplanen eller områdesbestämmelser kan innehålla andra regler, och för särskilt värdefulla byggnader gäller skärpta krav. Även när bygglov inte krävs ska ändringen utföras varsamt. Om föreningen vill ändra fasadens utseende behöver frågan därför utredas tidigt, så att handläggningen inte försenar projektet.',
        ],
      },
      {
        title: 'Samordning och etapper',
        paragraphs: [
          'Planerar föreningen också fönster, balkonger eller tak kan arbetena göras med samma ställning. Det kan minska den sammanlagda kostnaden för ställning och etablering och gör att de boende påverkas under en sammanhållen period.',
          'En fasadrenovering kan också delas upp i etapper, till exempel en fasad i taget. Det sprider kostnaden över tid men innebär att ställning och etablering behövs flera gånger.',
        ],
      },
    ],
    decisions: {
      title: 'Det här behöver styrelsen ta ställning till',
      lead: 'Svaren på de här frågorna gör underlaget tydligare och anbuden lättare att jämföra.',
      items: [
        { title: 'Vilket underlag finns?', description: 'Underhållsplan, besiktning eller tidigare utredning av fasaden. Saknas det kan en genomgång av fasaden vara första steget.' },
        { title: 'Vad ska göras nu och vad kan vänta?', description: 'Om hela fasaden ska åtgärdas eller bara de mest utsatta delarna, och vilka konsekvenser det får att vänta.' },
        { title: 'Ska fasaden se ut som i dag?', description: 'Ny kulör eller nytt material kan kräva bygglov. Samma material och utförande räknas som underhåll.' },
        { title: 'Ska andra åtgärder samordnas?', description: 'Fönster, balkonger och tak kan göras med samma ställning om tidplanerna går att samordna.' },
        { title: 'Krävs beslut på stämma?', description: 'Enligt bostadsrättslagen ska beslut om väsentliga förändringar av föreningens hus fattas på föreningsstämma, om inte stadgarna anger något annat. Kontrollera vad som gäller i era stadgar.' },
      ],
    },
    sources: [sources.facadeChange, sources.housingAct],
    services: [services.facade, services.balconies],
    inquiry: { flow: 'projekt', service: 'fasadrenovering' },
  },

  {
    // Utkast. Bedömningen av reparation eller byte är konstruktiv och ska
    // granskas av en ansvarig person på företaget innan publicering.
    slug: 'renovera-eller-byta-balkongplattor',
    status: 'draft',
    title: 'Renovera eller byta balkongplattor?',
    metaTitle: 'Renovera eller byta balkongplattor? Det här avgör',
    metaDescription: 'Skadornas omfattning, armeringens skick och infästningen avgör om balkongplattor kan repareras eller behöver bytas. Det här behöver styrelsen veta.',
    summary: 'Vad som avgör om befintliga balkongplattor kan repareras eller behöver bytas.',
    answer: 'Det avgörs av hur skadad betongen och armeringen är, hur plattan är infäst i byggnaden och vad en konstruktiv bedömning visar. Ytliga skador kan ofta lagas. Är armeringen kraftigt angripen eller bär plattan inte längre som den ska kan byte vara nödvändigt.',
    author: organisation,
    updated: checked,
    sections: [
      {
        title: 'Tecken på skador',
        paragraphs: [
          'Sprickor, avflagnad betong i kanter och på undersidan, rostfläckar och räcken som sitter löst är vanliga tecken på att balkongerna behöver undersökas.',
        ],
      },
      {
        title: 'Vad undersökningen behöver visa',
        paragraphs: [
          'En bedömning av balkongerna behöver visa hur stor del av betongen som är skadad, hur armeringen ser ut, hur plattan är infäst och hur räckena sitter. Först då går det att avgöra om reparation räcker.',
        ],
      },
      {
        title: 'Reparation',
        paragraphs: [
          'Vid reparation tas skadad betong bort, armeringen åtgärdas och plattan lagas. Ofta får plattan också ett nytt tätskikt eller ytskikt.',
        ],
      },
      {
        title: 'Byte',
        paragraphs: [
          'Vid byte rivs plattan och ersätts. Det är ett större ingrepp som påverkar fasaden och de boende under längre tid.',
        ],
      },
      {
        title: 'Räcken, infästningar och boende',
        paragraphs: [
          'Räckenas infästning sitter i plattan eller fasaden, så plattornas skick behöver vara känt innan nya räcken monteras. Under arbetet går balkongen inte att använda.',
        ],
      },
    ],
    sources: [sources.housingAct],
    services: [services.balconies, services.facade],
    inquiry: { flow: 'projekt', service: 'balkongrenovering' },
    missing: [
      'Faktagranskning av en namngiven person med ansvar för balkongprojekt, med godkännande att namnet visas.',
      'Företagets egen beskrivning av hur bedömningen av reparation eller byte görs i praktiken.',
      'Primärkälla eller verifierad tillverkar- eller branschdokumentation för tekniska påståenden.',
      'Godkännande att länka till Landskrona-projektet som exempel.',
    ],
  },

  {
    slug: 'fukt-i-kallaren',
    status: 'published',
    title: 'Fukt i föreningens källare: vad behöver undersökas?',
    metaTitle: 'Fukt i källaren i en BRF: vad behöver undersökas?',
    metaDescription: 'Fukt i källaren kan komma från marken, ytvatten, dränering, takavvattning eller inifrån. Så tar styrelsen reda på orsaken innan något åtgärdas.',
    summary: 'Vanliga orsaker till fukt i källare och vad som behöver undersökas innan styrelsen väljer åtgärd.',
    answer: 'Ta reda på varifrån fukten kommer innan något åtgärdas. Vanliga orsaker är markfukt som tränger in genom källarväggarna, ytvatten som rinner mot grunden, en dränering som inte fungerar och takavvattning som släpper vatten intill huset. Fukt kan också komma inifrån. Rätt åtgärd beror på orsaken.',
    author: organisation,
    updated: checked,
    sections: [
      {
        title: 'Tecken på fuktproblem',
        paragraphs: [
          'Fukt i källare märks ofta genom fuktfläckar, saltutfällningar, färg eller puts som flagnar och en unken lukt. Enligt Boverket är fukttransport från marken genom källarväggar en långsam process, och det kan ta många år innan problemet märks.',
          'Fuktskador kan ge lukt och sämre luftkvalitet inomhus och skada material som förvaras i källaren. Därför är det värt att ta tecknen på allvar tidigt.',
        ],
      },
      {
        title: 'Det här behöver undersökas',
        paragraphs: [
          'Boverket pekar ut flera faktorer som påverkar risken för fuktskador i källare. De är en bra utgångspunkt för vad en utredning bör omfatta.',
        ],
        list: [
          'Hur marken lutar närmast huset och om ytvatten rinner mot grunden.',
          'Hur takavvattningen fungerar och var stuprören släpper ut vattnet.',
          'Om det finns dränering, hur gammal den är och om den fungerar.',
          'Om dagvattenledningarna kan bli överbelastade vid kraftigt regn.',
          'Hur högt grundvattnet kan nå.',
          'Om träd och buskar nära huset kan växa in i dräneringsrör och dagvattenrör.',
          'Hur källarväggarna är fuktskyddade på utsidan.',
          'Vilken temperatur och ventilation källaren har, och vilka material som finns på insidan av väggarna.',
        ],
      },
      {
        title: 'Varför orsaken behöver vara känd först',
        paragraphs: [
          'En källaryttervägg behöver skyddas mot markfukt från utsidan. Att bara byta ytskikt på insidan löser inte problemet om fukten kommer utifrån, och fel material på insidan kan göra skadorna värre.',
          'Omvänt behövs inte alltid en ny dränering. Leds vattnet från stuprören bort eller justeras marklutningen kan det ibland räcka. En utredning av orsaken gör att föreningen inte lägger pengar på fel åtgärd.',
        ],
      },
      {
        title: 'När dränering är aktuell',
        paragraphs: [
          'Om utredningen visar att dräneringen inte fungerar eller saknas, är ny dränering med fuktskydd och isolering av grundmuren på utsidan en vanlig åtgärd. Det är ett markarbete som kräver schakt runt huset. Ytor som plattor, asfalt och planteringar behöver återställas efteråt, och vad som ingår i återställningen bör framgå av underlaget.',
        ],
      },
      {
        title: 'Det här kan styrelsen göra nu',
        paragraphs: [
          'Boverket rekommenderar att fastighetsägare regelbundet kontrollerar dräneringsrör och dagvattenledningar och besiktar grunden, och att fuktförhållandena i källarväggarna utreds vid renovering.',
        ],
        list: [
          'Notera var fukten syns och om den ökar efter regn eller under vissa årstider.',
          'Kontrollera att stuprören leder vattnet bort från huset.',
          'Se efter om marken närmast huset lutar mot fasaden.',
          'Samla befintliga underlag: underhållsplan, besiktningar, ritningar och tidigare åtgärder.',
          'Undvik att bygga om källarväggarnas insida innan orsaken är utredd.',
        ],
      },
    ],
    decisions: {
      title: 'Det här behöver styrelsen ta ställning till',
      items: [
        { title: 'Vem utreder orsaken?', description: 'En utredning av fukten bör komma före beslut om åtgärd. Bestäm vem som gör den och vad den ska omfatta.' },
        { title: 'Vilken åtgärd svarar mot orsaken?', description: 'Avledning av ytvatten, ny dränering, fuktskydd av grundmuren eller åtgärder inomhus beroende på vad utredningen visar.' },
        { title: 'Hur påverkas gården och de boende?', description: 'Schakt runt huset påverkar entréer, gångar och parkering. Etapper gör att ytor kan användas så långt det går.' },
        { title: 'Ska andra markarbeten samordnas?', description: 'Planerar föreningen att rusta upp gården eller entréerna kan dräneringen göras först, så att ytorna bara behöver läggas om en gång.' },
      ],
    },
    sources: [sources.basementWall, sources.surfaceWater],
    services: [services.drainage, services.ground],
    inquiry: { flow: 'projekt', service: 'dranering' },
  },

  {
    slug: 'checklista-offertforfragan-renovering',
    status: 'published',
    title: 'Checklista inför offertförfrågan på en större renovering',
    metaTitle: 'Checklista inför offertförfrågan på en renovering i en BRF',
    metaDescription: 'Det här bör en bostadsrättsförening ha med i en offertförfrågan på en större renovering, och så jämför styrelsen anbuden.',
    summary: 'Vad en offertförfrågan bör innehålla och hur styrelsen kan jämföra anbuden.',
    answer: 'En bra offertförfrågan beskriver vad som ska göras, vilka underlag som finns, vilken entreprenadform föreningen vill ha, vilka krav som gäller under arbetet och hur anbuden ska lämnas. Ju tydligare förfrågan är, desto lättare blir anbuden att jämföra.',
    author: organisation,
    updated: checked,
    sections: [
      {
        title: 'Beskriv behovet och omfattningen',
        paragraphs: [
          'Beskriv vad som ska göras, var och varför. Ange vilka delar av fastigheten som berörs och om något redan är bestämt, till exempel material eller utförande.',
          'Bifoga de underlag som finns: underhållsplan, besiktningar, ritningar och tidigare utredningar. Saknas underlag, skriv det. Då vet anbudsgivarna att de behöver göra egna bedömningar.',
        ],
      },
      {
        title: 'Välj entreprenadform',
        paragraphs: [
          'I en utförandeentreprenad tar föreningen fram beskrivningen av vad som ska byggas, och entreprenören utför arbetet enligt den. I en totalentreprenad ansvarar entreprenören för både projektering och utförande utifrån föreningens krav.',
          'Ange vilka standardvillkor avtalet ska bygga på. AB 04 används ofta för utförandeentreprenader och ABT 06 för totalentreprenader.',
        ],
      },
      {
        title: 'Tidplan och beslut',
        paragraphs: [
          'Ange när arbetet tidigast kan starta, om det finns perioder då arbete inte bör pågå och när föreningen kan fatta beslut. Enligt bostadsrättslagen ska beslut om väsentliga förändringar av föreningens hus eller mark fattas på föreningsstämma, om inte stadgarna anger något annat. Tidplanen behöver ta hänsyn till det.',
          'Om arbetet ändrar fasadens utseende kan bygglov krävas. Fråga hur anbudsgivaren hanterar det och vem som ansvarar för ansökan.',
        ],
      },
      {
        title: 'Krav under arbetet',
        paragraphs: [
          'Beskriv vad som gäller för de boende: arbetstider, tillgång till entréer och balkonger, var etablering och material får placeras och hur information till boende ska skötas.',
        ],
      },
      {
        title: 'Vad anbudet ska innehålla',
        paragraphs: [
          'Be om svar i samma struktur, så att anbuden går att jämföra.',
        ],
        list: [
          'Pris och exakt vad som ingår och inte ingår.',
          'Hur tilläggsarbeten beskrivs, prissätts och godkänns innan de utförs.',
          'Tidplan med etapper och hur länge de boende påverkas.',
          'Vem som är kontaktperson och projektledare.',
          'Vilka delar som utförs av underentreprenörer.',
          'Försäkringar och vilka standardvillkor anbudet bygger på.',
          'Betalningsplan.',
          'Referenser från liknande uppdrag.',
        ],
      },
      {
        title: 'Kontrollera och jämför',
        paragraphs: [
          'Kontrollera organisationsnummer och F-skatt och fråga efter referenser från liknande uppdrag. Ring gärna referenserna.',
          'Jämför anbuden på samma omfattning. Skiljer sig priserna mycket beror det ofta på att anbudsgivarna har tolkat omfattningen olika. Ställ då frågor innan ni väljer.',
        ],
      },
    ],
    decisions: {
      title: 'Checklista',
      lead: 'Gå igenom listan innan förfrågan skickas.',
      items: [
        { title: 'Omfattning', description: 'Vad ska göras, var och varför. Vad är redan bestämt.' },
        { title: 'Underlag', description: 'Underhållsplan, besiktningar, ritningar och tidigare utredningar bifogade, eller att de saknas.' },
        { title: 'Entreprenadform och villkor', description: 'Utförande- eller totalentreprenad och vilka standardvillkor som ska gälla.' },
        { title: 'Tidplan och beslut', description: 'Önskad start, perioder att undvika och när styrelse eller stämma kan fatta beslut.' },
        { title: 'Krav under arbetet', description: 'Arbetstider, tillgänglighet, etablering och information till boende.' },
        { title: 'Svarsstruktur', description: 'Vad anbudet ska innehålla och när det ska lämnas.' },
      ],
    },
    sources: [sources.housingAct, sources.facadeChange],
    services: [services.turnkey, services.facade, services.balconies, services.drainage],
    inquiry: { flow: 'projekt', service: 'annan-renovering' },
  },
]
