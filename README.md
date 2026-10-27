# BRF Entreprenad – hemsida

Teknisk grund och komponentbibliotek för BRF Entreprenads nya hemsida. Projektet innehåller just nu bara en sida, `/build`: en intern katalog över de byggdelar som riktiga sidor senare sätts ihop av.

Byggt med Nuxt 4, Vue 3 (`<script setup lang="ts">`), TypeScript och Tailwind CSS 4. Typsnitten (Inter och Space Grotesk) är självhostade via Fontsource. Inga andra beroenden används.

## Kom igång

Kräver Node.js 20 eller senare (Netlify bygger med Node 24).

```bash
npm install          # installera beroenden
npm run dev          # utvecklingsserver, öppna http://localhost:3000/build
npm run typecheck    # typkontroll med vue-tsc
npm run generate     # statiskt produktionsbygge till dist/
npm run preview      # förhandsgranska bygget lokalt
```

`/` saknar innehåll tills en startsida skapas och visar därför 404.

> TypeScript är låst till 6.x eftersom vue-tsc ännu inte stöder TypeScript 7.

## Struktur

```
app/
  assets/css/main.css      Designtokens, bastypografi och gemensamma utilities
  components/
    ui/                    Grundkomponenter: UiButton, UiCard, UiInput, UiSection …
    site/                  Sidhuvud, logotyp och sidfot
    sections/              Återanvändbara sidsektioner: HeroSection, FaqSection …
    build/                 Hjälpkomponenter som bara används på byggsidan
  build-page/
    showcases.ts           Byggsidans egna rubriker och beskrivningar
    example-content.ts     Hårdkodat exempelinnehåll som skickas till sektionerna
  pages/build.vue          Byggsidan
  types/                   Typer för props (ui.ts) och innehåll (content.ts)
  utils/                   Små hjälpfunktioner (auto-importeras)
public/                    Statiska filer: favicon, robots.txt, platshållarbilder
```

Komponenterna registreras automatiskt på filnamnet, oavsett mapp (`ui/UiButton.vue` → `<UiButton>`). Prefixen visar vilken nivå en komponent tillhör: `Ui*` för grundkomponenter, `Site*` för sidhuvud och sidfot, `*Section` för sidsektioner och `Build*` för byggsidan.

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

## Från byggsida till riktiga sidor

1. Skapa en sida i `app/pages/`, till exempel `index.vue`.
2. Sätt ihop den med `SiteHeader`, sektionerna och `SiteFooter`. Använd motsvarande del i `pages/build.vue` som mall.
3. Ersätt exempelinnehållet med riktig text. Lägg innehållet direkt i sidan eller i en egen datafil, inte i `build-page/`.
4. Byt platshållarbilderna i `public/images/placeholders/` mot riktiga bilder.
5. Ändra länkar från ankare (`#kontakt`) till riktiga sökvägar när sidorna finns.

Byggsidan kan ligga kvar som referens. Den har `noindex, nofollow`. Kontaktformuläret skickar ingenting. Vid giltig inmatning visar det att formuläret bara är en demonstration. När en backend finns ersätts `onSubmit` i `components/sections/ContactForm.vue`.

Kontaktuppgifter och referensprojekt i exempelinnehållet är påhittade och måste bytas ut innan något publiceras.

## Netlify

Inställningarna finns i `netlify.toml`:

| Inställning       | Värde              |
| ----------------- | ------------------ |
| Build command     | `npm run generate` |
| Publish directory | `dist`             |
| Node-version      | `24` (`NODE_VERSION`) |

Sajten byggs statiskt, så inga serverless-funktioner behövs. Netlify väljer Nitro-presetet `netlify-static` automatiskt. Inga miljövariabler krävs.
