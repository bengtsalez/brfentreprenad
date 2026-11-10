# SEO och GEO: status

Genomförande av `docs/BRF_Entreprenad_SEO_GEO_Claude.md`. Senast uppdaterad 2026-11-10. Allt nedan är verifierat lokalt. Inget är driftsatt, och inget är kontrollerat mot Netlify, Search Console eller produktionsdomänen.

## Utgångsläge jämfört med granskningsunderlaget

Specifikationen utgick från commit 5913e2e. Den aktuella koden hade redan löst delar av uppdraget:

- Juridiskt namn och organisationsnummer var bekräftade och fanns i `app/content/company.ts`.
- Relationen till Byggproffs Skåne var bekräftad: "BRF Entreprenad är ett varumärke inom Byggproffs Skåne AB."
- Referenslistan var inte tom. Ett verkligt projekt (balkongrenovering i Landskrona) var publicerat, men projektsidan saknades i sitemap.xml.
- Bygget hade ingen global 200-fallback. Netlify använder `404.html` för okända adresser.
- `/verksamhetsomrade/` var planerad men saknade sida.

## Genomfört

### Gemensamt register för publicerade adresser

- `shared/routes.ts` är den enda källan för vad som är publicerat. Den styr förrendering (`nuxt.config.ts`), `sitemap.xml` och alla länkar som byggs med `publishedLinks()`.
- Innehåll som servern behöver ligger i `shared/content/` (referenser, guider, orter och typer). Serverkoden importerar inget från `app/`.
- Publiceringsregler: projekt kräver status `published` och minst en bild. Guider och orter kräver status `published`, och orter också lokalt innehåll. Översikter utan innehåll (`/referensprojekt/`, `/kunskap/`) tas bort ur sitemap och ger 404.
- `sitemap.xml` har XML-escaping och `lastmod` bara där ett verkligt datum finns (guidernas uppdateringsdatum).

### Metadata och strukturerad data

- Varumärket läggs till som titelns ändelse utan dubblering (`brandedTitle()`). Titlarna för Kontakt, Referensprojekt och Så arbetar vi är mer beskrivande.
- Canonical normaliseras till avslutande snedstreck och tar aldrig med parametrar.
- Företagsidentiteten (`GeneralContractor` med `@id` `https://www.brfentreprenad.se/#organization`) finns på startsidan, Om oss, Kontakt, Verksamhetsområde och guiderna. Den innehåller bara bekräftade uppgifter.
- `SiteBreadcrumbs` lägger ut `BreadcrumbList` från samma länkar som visas.
- Guider har `Article` med organisationen som författare och utgivare, `dateModified` och källorna som `citation`. `datePublished` utelämnas tills guiden har ett verkligt publiceringsdatum.
- JSON-LD serialiseras säkert (`<`, `>` och `&` kodas) och har fasta nycklar, så att block inte dubbleras.
- Projektsidan använder projektets bild för delning, med alternativtext och mått.
- `404.html` och `200.html` får `noindex` statiskt vid bygget.

### Innehåll

| Del | Status |
| --- | --- |
| Fem prioriterade tjänster | Fördjupade med en sektion för avvägningar (fasad, balkong, dränering, porttelefoni) och en checklista (fastighetsservice). Svaret om bygglov för fasad följer aktuell PBL. |
| Verksamhetsområde `/verksamhetsomrade/` | Publicerad. Bygger bara på området och kontoret. Länkad från sidfot, Om oss och startsidan. |
| Ortssidor | Modell, mall och route finns. Landskrona, Helsingborg och Malmö är utkast. |
| Kunskap `/kunskap/` | Publicerad med tre guider. Guiden om balkongplattor är ett utkast. |
| Referensprojekt | Projektsidan finns i sitemap, länkar till relevanta guider och till ortssidan när den publiceras. |
| Internlänkar | Tjänst → guide och projekt. Guide → tjänst, projekt och förvalt formulär. Projekt → tjänst och guide. |

### Mätning

- Händelserna `phone_click`, `email_click`, `form_start`, `lead_submitted` och `form_error` är oförändrade. De har nu även `landing_page`, första sidan i besöket.
- Formulären skickar fältet `landningssida`, så att förfrågningar i Netlify kan följas per landningssida och tjänst utan analysverktyg.
- Inga namn, telefonnummer, e-postadresser eller fritexter skickas i händelserna.

### Laddning

- Startsidans video läggs in först i webbläsaren och inte alls vid minskad rörelse. Den förrenderade sidan innehåller bara stillbilden, som är absolut placerad och inte ger layoutförskjutning.

## Faktagranskning

Kontrollerat 2026-11-10 mot primärkällor:

- Boverket, PBL kunskapsbanken, Fasadändring (senast ändrad 2026-07-01): bygglov krävs för fasadändring på flerbostadshus inom detaljplan när fasad eller tak vetter mot allmän plats (PBL 9 kap. 2 § 3, Lag 2025:974). Byte till samma material och utförande är underhåll.
- Boverket, Risker med fuktinträngning från mark till källarvägg och Risker med ytvatten (senast ändrade 2023-03-15).
- Bostadsrättslag (1991:614), 9 kap. 15 §, ändrad t.o.m. SFS 2026:847: väsentliga förändringar av hus eller mark beslutas på stämma, om inte stadgarna anger annat.
- AB 04 och ABT 06 nämns utan länk. Byggandets Kontraktskommitté arbetar med nya versioner som inte var antagna vid kontrollen.

## Körda kontroller

| Kontroll | Kommando | Resultat |
| --- | --- | --- |
| Typkontroll | `npm run typecheck` | Inga fel |
| Publiceringsregler | `npm test` | 10 av 10 tester godkända |
| Statiskt bygge | `npm run generate` | 70 förrenderade adresser, 27 indexerbara sidor |
| Genererat resultat | `npm run check:dist` | OK: 27 sidor, 1 677 internlänkar, 38 JSON-LD-block |

`check:dist` kontrollerar robots.txt, att sitemap och bygget stämmer överens, titel, metabeskrivning och canonical per sida, exakt en h1, tolkningsbar JSON-LD, brödsmulor mot BreadcrumbList, internlänkar, platshållare, noindex på interna sidor och att inga utkast finns i bygget. Ett negativt test (bruten länk, ändrad brödsmula, utkast i dist) gav tre fel som förväntat.

Lokalt med en server som efterliknar Netlify (404.html med status 404) och Chrome headless:

- Okända adresser, utkast och opublicerade sidor gav status 404 och en sida med titeln "Sidan finns inte" och `noindex`.
- Guide, verksamhetsområde och fasadsidan granskades i 500 px (Chrome headless minsta bredd) och 1280 px. Dokumentbredden var lika med fönsterbredden, så det fanns inget horisontellt överflöde.
- Alla internlänkar är vanliga `<a>` med hel sidladdning, så metadata kan inte ligga kvar från en tidigare sida.

## Inte verifierat

- Statuskoder, HTTPS, omdirigeringar och `X-Robots-Tag` på Netlify, inklusive deploy previews.
- Att Netlify registrerar fältet `landningssida`.
- Botskydd i Netlify och åtkomst för OAI-SearchBot i drift. `robots.txt` tillåter alla sökrobotar.
- Indexering och sökfrågor i Search Console.
- Skärmläsare och tangentbord på de nya sidorna utöver att de bara använder befintliga komponenter.
- Rendering på iPhone-bredd under 500 px.

## Återstår

Se `UNDERLAG.md` (avsnitt 8 till 11) och `LAUNCH_CHECKLIST.md` (avsnitt 3 till 5). Viktigast:

1. Granskning av de tre guiderna och ett verkligt publiceringsdatum.
2. Faktagranskare för guiden om balkongplattor.
3. Fasad- och dräneringsprojekt med bilder och godkännanden.
4. Lokal erfarenhet för Landskrona, Helsingborg och Malmö.
5. Verksamhetsområdets gränser.
6. Val av analystjänst och samtyckeshantering.
7. Search Console och kontroll av Google Business Profile.

## Uppföljning

- Förfrågningar per tjänst, flöde och landningssida: Netlify Forms (`tjanst`, `flode`, `kallsida`, `landningssida`). Orten anges av besökaren i fältet `ort`.
- Landningssidornas konvertering: `lead_submitted` per `landing_page` när ett analysverktyg finns. `phone_click` redovisas separat och betyder ett klick, inte ett samtal.
- Sökfrågor och indexering: Search Console, per sidtyp (tjänst, guide, projekt).
- Trafik från AI-sök går bara delvis att se, till exempel som hänvisningar från chatgpt.com. Den kan inte mätas fullständigt.
