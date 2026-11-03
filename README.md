# BRF Entreprenad – hemsida

BRF Entreprenads hemsida. Målet är kvalificerade förfrågningar från bostadsrättsföreningar och förvaltare, med två tydliga vägar in: fastighetsservice (mindre arbeten) och planerade renoveringar (projekt).

Publicerat: startsida, tjänsteöversikt, fem prioriterade tjänstesidor (fasadrenovering, balkongrenovering, dränering, fastighetsservice, porttelefoni och passersystem), sex övriga tjänsteområden, tre målgruppssidor, Så arbetar vi, Referensprojekt, Om oss, Kontakt och Integritetspolicy. Informationsarkitekturen bygger på [docs/brfentreprenad-sitemap.md](docs/brfentreprenad-sitemap.md). `/build` är en intern katalog över byggdelarna.

Det som återstår före lansering finns i [LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md).

Byggt med Nuxt 4, Vue 3 (`<script setup lang="ts">`), TypeScript och Tailwind CSS 4. Typsnitten (Inter och Space Grotesk) är självhostade via Fontsource. Inga andra beroenden används.

## Kom igång

Kräver Node.js 20 eller senare (Netlify bygger med Node 24).

```bash
npm install          # installera beroenden
npm run dev          # utvecklingsserver, öppna http://localhost:3000
npm run typecheck    # typkontroll med vue-tsc
npm run generate     # statiskt produktionsbygge till dist/
npm run preview      # förhandsgranska bygget lokalt
```

> TypeScript är låst till 6.x eftersom vue-tsc ännu inte stöder TypeScript 7.

## Struktur

```
shared/
  site-structure.ts        Alla sidor i målbilden med status och etapp (används av app och server)
app/
  assets/css/main.css      Designtokens, bastypografi och gemensamma utilities
  components/
    ui/                    Grundkomponenter: UiButton, UiCard, UiInput, UiSection …
    site/                  Sidhuvud, logotyp, brödsmulor och sidfot
    sections/              Återanvändbara sidsektioner: HeroSection, FaqSection …
    templates/             Sidmallar för tjänstesidor och målgruppssidor
    build/                 Hjälpkomponenter som bara används på byggsidan
  composables/             Navigation, huvudhandlingar, SEO och mätning (useTracking.ts)
  plugins/                 Mätning av klick på telefon- och e-postlänkar
  content/                 Innehåll: tjänster, målgrupper, arbetsgångar, förfrågningar
                           (inquiry.ts), styrelsens kontroll (board-control.ts),
                           referenser (references.ts), personal och företagsuppgifter
  layouts/default.vue      Sidhuvud och sidfot för publika sidor
  pages/                   Publika sidor. tjanster/[area]/ renderar tjänstesidor från content/
  build-page/              Byggsidans exempelinnehåll (påhittat, används inte på riktiga sidor)
  types/                   Typer för props (ui.ts) och innehåll (content.ts)
  utils/                   Små hjälpfunktioner (auto-importeras)
server/routes/sitemap.xml.ts  Teknisk sitemap med publicerade sidor
public/__forms.html        Formulärdefinitioner för Netlify Forms
docs/                      Underlag: sitemap och innehållsdirektiv
public/                    Statiska filer: favicon, robots.txt, platshållarbilder
```

Komponenterna registreras automatiskt på filnamnet, oavsett mapp (`ui/UiButton.vue` → `<UiButton>`). Prefixen visar vilken nivå en komponent tillhör: `Ui*` för grundkomponenter, `Site*` för sidhuvud och sidfot, `*Section` för sidsektioner, `*Template` för sidmallar och `Build*` för byggsidan.

### Sidstruktur och publicering

`shared/site-structure.ts` innehåller alla sidor från underlaget, även de som inte publiceras ännu. Varje sida har en status:

- `published`: byggs, länkas i menyer och tas med i `sitemap.xml`.
- `planned`: ingår i målbilden men saknar innehåll eller underlag (t.ex. undertjänster och servicebokningen, som beskriver ett konto som inte finns ännu).
- `unconfirmed`: erbjudandet eller uppgifterna måste bekräftas först (installationer och teknik, kakor).

Menyer, sidfot och listor filtrerar bort allt som inte är publicerat, så det finns inga länkar till tomma sidor. Opublicerade sidor förrenderas inte (`nitro.prerender.ignore` i `nuxt.config.ts`) och ger 404.

`priorityServices` i samma fil styr vilka tjänster som visas först i menyn, på startsidan och i tjänsteöversikten.

Så publiceras en undertjänst, t.ex. fönsterbyte:

1. Lägg till innehållet i `app/content/services.ts` under sökvägen `/tjanster/fonster-och-dorrar/fonsterbyte/`. Fyll gärna i `needs`, `scope`, `planning`, `costFactors`, `residents` och `inquiryService` som på de prioriterade sidorna.
2. Sätt status till `published` i `shared/site-structure.ts`.

Mallen och routen (`pages/tjanster/[area]/[service].vue`) finns redan. Referensprojekt läggs till i `app/content/references.ts` med bilder i `public/images/referenser/` (se LAUNCH_CHECKLIST.md).

Sektionerna får allt innehåll via props och slots. De innehåller ingen egen text, med undantag för etiketterna i kontaktformuläret.

### Rubriknivåer

Komponenter med rubriker har en `headingLevel`-prop. Underliggande rubriker, till exempel i kort, får automatiskt nästa nivå. Den visuella storleken styrs separat (`UiHeading size="lg"` eller klasserna `heading-xl` … `heading-xs`). På en riktig sida har heron normalt `h1` och övriga sektioner `h2`. På byggsidan används `h3`, eftersom sidan har egna rubriker ovanför.

## Ändra färger och typografi

Alla designtokens finns i `@theme`-blocket i `app/assets/css/main.css`:

- **Färger:** `--color-*`. Tailwind skapar utilities av dem, till exempel `bg-accent`, `text-ink` och `border-line`. Tailwinds standardpalett är avstängd, så bara projektets egna färger kan användas.
- **Mörka sektioner:** klassen `.theme-dark` i samma fil ger färgtokens nya värden. Uppdatera den när paletten ändras.
- **Typsnitt:** `--font-sans` (brödtext) och `--font-heading` (rubriker). Vilka vikter som laddas styrs av importerna i `css` i `nuxt.config.ts`. Just nu laddas Inter 400 och 600 samt Space Grotesk 600, alla med latin-subset.
- **Storlekar:** `--text-heading-*` och `--text-lead`. Rubrikklasserna `heading-*`, `lead`, `eyebrow` och `text-link` definieras som `@utility` längre ned i filen.
- **Bredder, avstånd och radier:** `--container-*` (`max-w-content`, `max-w-narrow`), `--spacing-*` (`px-gutter`, `py-section`) och `--radius-*` (`rounded-control`, `rounded-card`).

## Förfrågningar, domän och mätning

### Formulär

`ContactForm.vue` har två flöden med samma tekniska grund: `service` och `projekt`. De skickas till två formulär i Netlify Forms, `serviceforfragan` och `projektforfragan`. Tjänster, flödestexter och hjälpfunktionen `inquiryHref()` finns i `app/content/inquiry.ts`.

- På tjänstesidor är flödet låst och tjänsten förvald (`inquiryService` i `services.ts`).
- På kontaktsidan kan flöde och tjänst förväljas med `/kontakt/?typ=projekt&tjanst=fasadrenovering#forfragan`. Valet skrivs tillbaka i URL:en så att det finns kvar vid omladdning.
- Inskicket innehåller även källsida (`kallsida`) och föregående sida på webbplatsen (`foregaende-sida`).
- Netlify hittar formulären i `public/__forms.html`. **Fältnamnen där måste stämma med `ContactForm.vue`.**
- Bekräftelsen visas bara när Netlify svarat med status 200. Vid fel visas ett meddelande och inmatningen finns kvar. I utvecklingsläge och på byggsidan (`demo`) skickas ingenting.

### Mobil kontaktlist

`SiteMobileActionBar.vue` visar "Ring" och "Skicka förfrågan" längst ned på små skärmar. Den döljs högst upp på sidan, när ett formulärfält har fokus, när en sektion med `data-inquiry-section` syns och när mobilmenyn är öppen.

### Miljövariabler

| Variabel                  | Effekt |
| ------------------------- | ------ |
| `NUXT_PUBLIC_SITE_URL`    | Produktionsdomänen. Standard är `https://www.brfentreprenad.se`. Ger kanoniska URL:er, delningslänkar och `sitemap.xml`. |
| `NUXT_PUBLIC_BOOKING_URL` | Knappen för service blir "Boka service" och länkar till den riktiga bokningstjänsten. Utan den heter knappen "Skicka serviceförfrågan" och leder till formuläret. |
| `NUXT_PUBLIC_ACCOUNT_URL` | Lägger till "Mina ärenden" i huvudmenyn. |

Variablerna läses vid bygget, så sajten måste byggas om när de ändras.

### Mätning

`trackEvent()` i `app/composables/useTracking.ts` skickar `phone_click`, `email_click`, `form_start`, `lead_submitted` och `form_error` med tjänst, flöde och sida. Inga personuppgifter eller fritexter skickas. Händelserna hamnar i `window.dataLayer` om ett verktyg installeras, och som DOM-händelsen `brf:track`. Inget analysverktyg är aktiverat.

## Innan lansering

Se [LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md). Byggsidan `/build` har `noindex, nofollow`, egen layout och `X-Robots-Tag` i `netlify.toml`. Kontaktuppgifter och referensprojekt i dess exempelinnehåll är påhittade och får inte användas på riktiga sidor.

## Netlify

Inställningarna finns i `netlify.toml`:

| Inställning       | Värde              |
| ----------------- | ------------------ |
| Build command     | `npm run generate` |
| Publish directory | `dist`             |
| Node-version      | `24` (`NODE_VERSION`) |

Sajten byggs statiskt, så inga serverless-funktioner behövs. Netlify väljer Nitro-presetet `netlify-static` automatiskt. `netlify.toml` innehåller även omdirigeringen från `/tjanster/byggservice/` och `X-Robots-Tag` för interna sidor.
