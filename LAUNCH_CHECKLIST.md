# Lanseringslista

Det som återstår innan webbplatsen kan lanseras. Allt i koden är implementerat och testat lokalt. Punkterna nedan kräver inställningar utanför repot eller uppgifter som bara företaget kan bekräfta.

Uppgifterna lämnas i `UNDERLAG.md`. Bilder läggs i `underlag/bilder/`.

## 1. Måste vara klart före lansering

### Netlify Forms

Formulären är definierade i `public/__forms.html` och skickas med JavaScript till `/__forms.html`. Ingen förfrågan har skickats till Netlify under utvecklingen, så mottagningen i drift är **inte verifierad**.

- [ ] Netlify: **Site configuration → Forms → Enable form detection**.
- [ ] Driftsätt en deploy preview och kontrollera att två formulär syns under Forms: `serviceforfragan` och `projektforfragan`. Det gamla formuläret `kontakt` används inte längre.
- [ ] Skicka en testförfrågan i varje flöde från deploy preview, märkt som test. Kontrollera att alla fält kommer fram: `flode`, `tjanst`, `namn`, `epost`, `telefon`, `organisation`, `ort`, `meddelande`, `kallsida`, `foregaende-sida`.
- [ ] **Forms → Form notifications**: lägg till e-postnotis per formulär till rätt mottagare (t.ex. serviceärenden och projektförfrågningar till olika personer).
- [ ] Kontrollera att spamfiltret är på (Netlify filtrerar med Akismet som standard). Formuläret har även ett dolt honeypotfält (`bot-field`).
- [ ] Bestäm hur länge inskick sparas i Netlify och rensa testinskicken.

### Domän

`https://www.brfentreprenad.se` är satt som standard i `nuxt.config.ts` (canonical, delning, `sitemap.xml`, `robots.txt`).

- [ ] Lägg till `www.brfentreprenad.se` som **primary domain** i Netlify och låt `brfentreprenad.se` omdirigera dit.
- [ ] Kontrollera HTTPS-certifikatet.
- [ ] Skicka in `https://www.brfentreprenad.se/sitemap.xml` i Google Search Console.
- [ ] Om sajten redan ligger ute på adressen: kontrollera att `/tjanster/byggservice/` omdirigeras till `/tjanster/fastighetsservice/` (regeln finns i `netlify.toml`).

### Integritet

- [x] Integritetspolicyn är publicerad (`/integritetspolicy/`) och länkad från formuläret och sidfoten. Den bygger på avsnitt 2 i `UNDERLAG.md`.
- [ ] Låt Jonas granska texten. Särskilt meningarna om överföring till USA (Netlify) och om lagring enligt bokföringslagen när en förfrågan leder till uppdrag, som är standardformuleringar och inte kommer från underlaget.
- [x] Organisationsnummer finns i `app/content/company.ts`, i sidfoten, på Om oss och i den strukturerade datan på startsidan.

## 2. Uppgifter som behöver bekräftas

Arbetssätt (`app/content/board-control.ts`) och personal (`app/content/staff.ts`) är ifyllda från `UNDERLAG.md` och visas som bekräftade.

### Bokningstjänst

Sidan `/sa-fungerar-servicebokningen/` och alla texter om konto och statusuppföljning är avpublicerade, eftersom bokningstjänsten inte finns ännu.

- [ ] När tjänsten finns: sätt `NUXT_PUBLIC_BOOKING_URL` (och vid behov `NUXT_PUBLIC_ACCOUNT_URL`) i Netlify och sidans status till `published`.

## 3. Saknat innehåll

### Referensprojekt

`/referensprojekt/` är publicerad med ett projekt (balkongrenovering i Landskrona). Beställarens namn visas inte eftersom godkännande saknas.

- [ ] Bekräfta eller rätta resultattexten för Landskrona-projektet. Den är ett förslag (se `UNDERLAG.md`, avsnitt 6).
- [ ] Fler projekt: fyll i ett nytt block i avsnitt 6 i `UNDERLAG.md` och lägg bilderna i `underlag/bilder/`. Projektet läggs sedan in i `app/content/references.ts` och bilderna, komprimerade, i `public/images/referenser/`. Sektionen visas automatiskt på startsidan och på de tjänstesidor projektet är kopplat till.
- [ ] Projektsidorna (`/referensprojekt/<slug>/`) finns inte i `sitemap.xml`, eftersom den bara listar sidorna i `shared/site-structure.ts`. Google hittar dem ändå via länkarna från översikten.

### Bilder

- [ ] Projektbilder med användningsrätt för startsida och tjänstesidor. Publika sidor har i dag bara personalbilder. Beskriv inte generiska bilder som genomförda projekt.
- [x] Delningsbild (1200 × 630 px) i `public/images/og.jpg`, används på alla sidor via `usePageSeo`. En sida kan ange en egen bild med `image`.

## 4. Mätning (valfritt)

Inget analysverktyg är installerat. Händelserna `phone_click`, `email_click`, `form_start`, `lead_submitted` och `form_error` skickas till `window.dataLayer` om det finns, och som DOM-händelsen `brf:track`. Inga personuppgifter eller fritexter skickas med.

- [ ] Välj verktyg (t.ex. Google Tag Manager, Plausible eller Matomo).
- [ ] Om verktyget sätter kakor eller behandlar personuppgifter: lägg till samtyckeshantering och publicera sidan om kakor (`/kakor/`) innan verktyget aktiveras.
- [ ] Räkna en lead bara på `lead_submitted`. `phone_click` betyder att länken klickats, inte att ett samtal skett.

## 5. Efter lansering

- [ ] Kör Lighthouse mot produktionsdomänen. Lokala mätvärden finns i slutredovisningen men är tagna mot en lokal server.
- [ ] Testa formulären på en riktig mobil (iOS och Android) med tangentbordet öppet.
