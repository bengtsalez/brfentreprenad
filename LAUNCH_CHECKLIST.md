# Lanseringslista

Det som återstår innan webbplatsen kan lanseras. Allt i koden är implementerat och testat lokalt. Punkterna nedan kräver inställningar utanför repot eller uppgifter som bara företaget kan bekräfta.

Uppgifterna under avsnitt 1 (Integritet), 2 och 3 lämnas i `UNDERLAG.md`. Bilder läggs i `underlag/bilder/`.

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

- [ ] Publicera en integritetspolicy (`/integritetspolicy/`). Formulären samlar namn, e-post, telefon och fritext. Policyn behöver personuppgiftsansvarig, ändamål, lagringstid (även i Netlify) och kontaktväg. Sätt sedan status `published` i `shared/site-structure.ts` och länka den från formuläret.
- [ ] Lägg till organisationsnummer i `app/content/company.ts` och i den strukturerade datan på startsidan.

## 2. Uppgifter som behöver bekräftas

### Arbetssätt ("Så behåller styrelsen kontroll över projektet")

Rutinerna finns i `app/content/board-control.ts`. Bara rutiner med `verified: true` visar vad styrelsen får.

| Punkt | Status | Att bekräfta |
| --- | --- | --- |
| Omfattning | Visas som bekräftad | Att styrelsen får ett skriftligt underlag med omfattning och upplägg före beslut. Bygger på tidigare text i `processes.ts`. |
| Tidplan | Visas som bekräftad | Att tidplanen ingår i underlaget före beslut. Bygger på tidigare text. |
| Information till boende | Ej bekräftad | Vem som skriver och skickar information till boende, i vilken form (lappar, e-post, möten) och när. |
| Ekonomisk uppföljning | Ej bekräftad | Hur ofta och i vilken form styrelsen får ekonomisk uppföljning under projektet. |
| Tilläggsarbeten | Ej bekräftad | Hur tilläggsarbeten (ÄTA) beskrivs, prissätts och godkänns innan de utförs. |
| Överlämning | Visas som bekräftad | Att det finns en gemensam slutgenomgång. Bekräfta även om dokumentation lämnas över, och i så fall vilken. |

Sätt `verified: true` och skriv `deliverable` för varje rutin som bekräftas.

### Personal

Personerna i `app/content/staff.ts` visas på startsidan, Så arbetar vi, Om oss och Kontakt.

- [ ] Bekräfta titlarna och vilka som är projektledare.
- [ ] Fyll i `responsibility` (ansvarsområde) per person när det är bekräftat.
- [ ] Bekräfta att alla fyra godkänner att namn, bild, telefon och e-post publiceras.

### Bokningstjänst

Sidan `/sa-fungerar-servicebokningen/` och alla texter om konto och statusuppföljning är avpublicerade, eftersom bokningstjänsten inte finns ännu.

- [ ] När tjänsten finns: sätt `NUXT_PUBLIC_BOOKING_URL` (och vid behov `NUXT_PUBLIC_ACCOUNT_URL`) i Netlify och sidans status till `published`.

## 3. Saknat innehåll

### Referensprojekt

Inga referenser finns i repot. Datamodell, sektion (`CaseStudySection`), projektsida (`/referensprojekt/<slug>/`) och översikt är klara men dolda. Per projekt behövs:

- [ ] Projektnamn och ort.
- [ ] Beställare och skriftligt godkännande att namnet får publiceras (annars visas det inte).
- [ ] Fastighetstyp och uppdrag.
- [ ] Utgångsläge, omfattning, genomförande och resultat.
- [ ] Vilket bolag som utförde arbetet och vilken roll det hade. Gäller särskilt projekt utförda av Byggproffs Skåne: relationen mellan bolagen och vem som var avtalspart ska bekräftas och beskrivas korrekt innan sådana projekt används.
- [ ] Minst en bild med användningsrätt, gärna före och efter, med beskrivande alternativtext.
- [ ] Kundomdöme, bara med personens godkännande (`approved: true`).

Publicera genom att lägga projekten i `app/content/references.ts` och sätta `/referensprojekt/` till `published` i `shared/site-structure.ts`. Sektionen visas då automatiskt på startsidan och på tjänstesidor som projektet är kopplat till.

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
