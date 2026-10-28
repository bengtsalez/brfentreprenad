# BRF Entreprenad – hemsida

BRF Entreprenads hemsida. Informationsarkitekturen följer [docs/brfentreprenad-sitemap.md](docs/brfentreprenad-sitemap.md). Etapp 1 är publicerad: startsida, tjänsteöversikt, sju tjänsteområden, tre målgruppssidor, Så arbetar vi, Om oss, Kontakt och Så fungerar servicebokningen. `/build` är en intern katalog över byggdelarna.

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
  composables/             Navigation, huvudhandlingar och SEO
  content/                 Innehåll för tjänster, målgrupper och arbetsgångar
  layouts/default.vue      Sidhuvud och sidfot för publika sidor
  pages/                   Publika sidor. tjanster/[area]/ renderar tjänstesidor från content/
  build-page/              Byggsidans exempelinnehåll (påhittat, används inte på riktiga sidor)
  types/                   Typer för props (ui.ts) och innehåll (content.ts)
  utils/                   Små hjälpfunktioner (auto-importeras)
server/routes/sitemap.xml.ts  Teknisk sitemap med publicerade sidor
docs/                      Underlag: sitemap och innehållsdirektiv
public/                    Statiska filer: favicon, robots.txt, platshållarbilder
```

Komponenterna registreras automatiskt på filnamnet, oavsett mapp (`ui/UiButton.vue` → `<UiButton>`). Prefixen visar vilken nivå en komponent tillhör: `Ui*` för grundkomponenter, `Site*` för sidhuvud och sidfot, `*Section` för sidsektioner, `*Template` för sidmallar och `Build*` för byggsidan.

### Sidstruktur och publicering

`shared/site-structure.ts` innehåller alla sidor från underlaget, även de som inte publiceras ännu. Varje sida har en status:

- `published`: byggs, länkas i menyer och tas med i `sitemap.xml`.
- `planned`: ingår i målbilden men saknar innehåll eller underlag (t.ex. undertjänster i etapp 2 och 3, referensprojekt).
- `unconfirmed`: erbjudandet eller uppgifterna måste bekräftas först (installationer och teknik, integritetspolicy, kakor).

Menyer, sidfot och listor filtrerar bort allt som inte är publicerat, så det finns inga länkar till tomma sidor. Opublicerade tjänstesidor ger 404.

Så publiceras en undertjänst, t.ex. fönsterbyte:

1. Lägg till innehållet i `app/content/services.ts` under sökvägen `/tjanster/fonster-och-dorrar/fonsterbyte/`.
2. Sätt status till `published` i `shared/site-structure.ts`.

Mallen och routen (`pages/tjanster/[area]/[service].vue`) finns redan. Övriga sidor (t.ex. referensprojekt) behöver en egen sidfil i `app/pages/`.

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

## Bokningstjänst, formulär och domän

Funktioner som beror på uppgifter utanför projektet styrs med miljövariabler. Utan värde visas funktionen inte.

| Variabel                  | Effekt |
| ------------------------- | ------ |
| `NUXT_PUBLIC_BOOKING_URL` | Knappen "Boka service" länkar till den riktiga bokningstjänsten. Utan den heter knappen "Beställ ett servicearbete" och leder till kontaktformuläret. |
| `NUXT_PUBLIC_ACCOUNT_URL` | Lägger till "Mina ärenden" i huvudmenyn. |
| `NUXT_PUBLIC_SITE_URL`    | Produktionsdomänen. Ger kanoniska URL:er och genererar `sitemap.xml`. Lägg då även till `Sitemap: <domän>/sitemap.xml` i `public/robots.txt`. |

Variablerna läses vid bygget, så sajten måste byggas om när de ändras.

Bokningstjänsten (konto, ärenden, statusar) byggs inte här. Vyerna i underlagets avsnitt 9 finns listade i `bookingAppViews` i `shared/site-structure.ts` som målbild.

**Kontaktformuläret** på `/kontakt/` skickas till Netlify Forms (formulärnamn `kontakt`). Aktivera formulärdetektering under Forms i Netlify. Bekräftelsen visas bara när Netlify svarar att inskicket tagits emot. I utvecklingsläge och på byggsidan skickas ingenting.

## Innan lansering

- Publicera en integritetspolicy (kontaktformuläret samlar personuppgifter) och sidan om kakor. Båda kräver uppgifter om personuppgiftsansvarig och faktisk hantering.
- Lägg till organisationsnummer i `app/content/company.ts`.
- Sätt miljövariablerna ovan.
- Bilder: publika sidor använder inga bilder ännu. Använd bara bilder med användningsrätt, och beskriv inte generiska bilder som genomförda projekt.

Byggsidan `/build` har `noindex, nofollow` och egen layout. Kontaktuppgifter och referensprojekt i dess exempelinnehåll är påhittade och får inte användas på riktiga sidor.

## Netlify

Inställningarna finns i `netlify.toml`:

| Inställning       | Värde              |
| ----------------- | ------------------ |
| Build command     | `npm run generate` |
| Publish directory | `dist`             |
| Node-version      | `24` (`NODE_VERSION`) |

Sajten byggs statiskt, så inga serverless-funktioner behövs. Netlify väljer Nitro-presetet `netlify-static` automatiskt. Miljövariablerna ovan är valfria.
