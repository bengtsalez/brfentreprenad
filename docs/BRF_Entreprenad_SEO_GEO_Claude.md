# BRF Entreprenad: genomförande av SEO och GEO

Datum: 2026-11-10.
Repository: https://github.com/bengtsalez/brfentreprenad
Granskningsunderlag: main, commit 5913e2eed76d3a0eb44cd250730a309a7055e819. Detta är en historisk utgångspunkt. Läs aktuell kod och gitstatus innan du arbetar. Senare förändringar kan ha löst delar av uppdraget.

## Startprompt till Claude Code

Du arbetar i repositoryt brfentreprenad. Läs hela BRF_Entreprenad_SEO_GEO_Claude.md och följ projektets aktuella AGENTS.md och övriga relevanta instruktioner. Genomför de kodändringar och innehållsförbättringar som specifikationen beskriver. Stanna inte vid en plan.

Börja med att granska aktuell kod och identifiera vad som redan är implementerat. Bevara befintliga ändringar, design, fungerande kontaktflöden och publicerade adresser. Återanvänd projektets Nuxt-, Vue-, TypeScript- och Tailwind-struktur. Gör rimliga tekniska val själv och slutför alla delar som går att genomföra med befintliga uppgifter.

Prioritera gemensam SEO-hantering, sitemap för dynamiskt innehåll, strukturerad data, fördjupning av prioriterade tjänster, referensprojekt, lokal struktur, en kunskapsdel och mätbar väg till förfrågan. Saknat underlag får inte ersättas med påhittade projekt, priser, kundomdömen, företagsrelationer eller erfarenheter. Förbered sådana delar som interna utkast och samla exakt vad som saknas i underlagsdokumentet. Publicera färdigt, faktagranskat allmänt innehåll när det uppfyller kriterierna i specifikationen.

Kör relevanta kontroller och verifiera det genererade statiska bygget. Redovisa vad som är genomfört, vad som är verifierat, vad som saknar underlag och vad som kräver åtkomst till Netlify eller Search Console. Push eller produktionsdriftsättning ingår inte i denna prompt.

## 1. Mål och målgrupp

Öka antalet relevanta organiska besök, kvalificerade projektförfrågningar och serviceförfrågningar. Gör webbplatsens innehåll begripligt och användbart som källa i sökbaserade AI-svar. Ingen viss placering eller AI-rekommendation kan utlovas.

Primär målgrupp är styrelser i bostadsrättsföreningar. Sekundära målgrupper är fastighetsförvaltare och fastighetsägare. Verksamhetsområdet är enligt befintligt innehåll från Halmstad till Falsterbo. Bolagsuppgifter och erbjudanden ska hämtas från aktuellt bekräftat material i projektet.

Prioriterade tjänster:

1. Fasadrenovering.
2. Balkongrenovering.
3. Dränering av flerbostadshus.
4. Fastighetsservice som konkreta reparationer och mindre arbeten.
5. Porttelefoni och passersystem.

Denna ordning bygger på verksamhetens inriktning. Inga sökvolymer eller trafikprognoser har verifierats.

## 2. Bekräfta nuläget innan implementation

I den granskade versionen fanns följande. Kontrollera mot aktuell kod och återanvänd det som redan fungerar:

| Del | Tidigare identifierad plats |
| --- | --- |
| Central sidstruktur och publiceringsstatus | shared/site-structure.ts |
| SEO och FAQ-hjälpare | app/composables/usePageSeo.ts |
| Tjänsteinnehåll | app/content/services.ts |
| Tjänstemall | app/components/templates/ServicePageTemplate.vue |
| Referensdata och referensmall | app/content/references.ts, app/components/templates/CaseStudyTemplate.vue |
| Företagsuppgifter | app/content/company.ts |
| Mätbara kontakthändelser | app/composables/useTracking.ts |
| Sitemap | server/routes/sitemap.xml.ts |
| Statisk generering | nuxt.config.ts, netlify.toml |
| Underlag och lanseringspunkter | UNDERLAG.md, LAUNCH_CHECKLIST.md |

Utgångsläget hade 19 sidor med publicerad status, tom referenslista, ännu opublicerat verksamhetsområde och ingen ansluten analystjänst. Behandla detta som observationer från den angivna commiten, inte som säkra uppgifter om aktuell version eller drift.

## 3. Ramar för arbetet

* Behåll nuvarande grafiska profil, Space Grotesk för rubriker och etablerade komponenter.
* Använd befintliga sektioner, rader, text och projektbilder. Skapa ingen generell omdesign med ett nytt kortsystem.
* Bevara befintliga tjänsteadresser. Ändra URL endast när ett verifierat problem kräver det och inför då en exakt permanent omdirigering.
* Skriv naturlig svenska. Använd inte tankstreck som meningsavskiljare. Undvik överdrifter och upprepade ortslistor.
* Skapa inga påhittade svarstider, garantier, certifieringar, priser, projektresultat eller kundomdömen.
* Inför inga beroenden eller externa skript utan konkret behov. Lös uppgiften inom befintlig arkitektur när det är rimligt.
* Behåll de separata flödena för service och projekt. En förfrågan får inte beskrivas som bekräftad bokning.
* Respektera att ej färdiga sidor inte får bli indexerbara, navigerbara eller ingå i sitemap.
* Spara inget lösenord eller annan hemlighet i koden. Ändra inte externa kontoinställningar inom detta uppdrag.

## 4. Teknisk SEO

### 4.1 Gemensamma sidmetadata

Utveckla befintlig SEO-funktion i stället för att skapa konkurrerande lösningar.

* Säkerställ en unik, beskrivande titel och metabeskrivning per indexerbar sida.
* Lägg till en konsekvent varumärkesändelse där det passar utan dubblering. Exempel: Fasadrenovering för BRF i Skåne | BRF Entreprenad.
* Välj geografi efter sidans innehåll och faktiska täckning. Alla titlar ska inte innehålla samma orter.
* Använd en självpekande absolut canonical för varje publicerad huvudadress. Formulärparametrar och spårningsparametrar ska inte skapa egna canonical-adresser.
* Normalisera domän och avslutande snedstreck konsekvent med projektets routing och hosting.
* Behåll fungerande Open Graph- och delningsmetadata. Använd relevant projektbild på projektsidor när den finns.
* Säkerställ en logisk H1 och begriplig rubrikhierarki per sida.
* Kontrollera att titel, canonical och innehåll uppdateras korrekt även när användaren navigerar mellan dynamiska sidor utan omladdning.

### 4.2 Gemensamt register för sitemap och statisk generering

Tidigare sitemap utgick endast från publishedPages(). Enskilda referensprojekt fanns inte i det registret. Åtgärda detta för både projekt, ortssidor och guider.

* Skapa eller återanvänd en gemensam källa för publicerade adresser. Undvik separata manuella listor som kan glida isär.
* Ta med alla publicerade statiska sidor och publicerade dynamiska innehållssidor i sitemap.
* Förrendera samma dynamiska adresser i det statiska bygget. Förlita dig inte enbart på att länkcrawling råkar hitta dem.
* Placera gemensam data så att serverkod inte behöver importera klientberoende appkod. Följ Nuxt-projektets befintliga gränser.
* Exkludera byggsida, formulärdefinitioner, utkast, privata kundvyer, bokningsbekräftelser och parametersidor.
* Använd riktiga ändringsdatum om lastmod införs. Sätt inte alla sidor till dagens datum vid varje bygge.
* Säkerställ unik URL per post och giltig XML-escaping.
* Verifiera att robots.txt pekar på rätt produktionssitemap. Dokumentera hur annan domänkonfiguration hanteras så att canonical och sitemap inte motsäger varandra.

### 4.3 Strukturerad data

* Skapa en återanvändbar företagsidentitet med stabilt @id på produktionsdomänen.
* Återanvänd bekräftat namn, telefon, e-post, adress och verksamhetsområde. Lägg till juridiskt namn och organisationsnummer endast om verifierat underlag finns.
* Beskriv kopplingen till Byggproffs Skåne först när relationen är bekräftad. Överför inte dess projekt, omdömen eller meriter som BRF Entreprenads egna.
* Generera BreadcrumbList från samma data som de synliga brödsmulorna på tjänster, projekt, ortssidor och guider.
* På publicerade guider: använd relevant Article-data med riktig rubrik, författare eller granskare och verkliga datum. Utelämna obekräftade fält.
* Strukturerad data ska matcha synligt innehåll. Skapa inte betygsdata eller falska omdömen.
* Befintlig FAQ-data får finnas om den är korrekt. Utlova inga utökade sökresultat eller någon särskild GEO-effekt av FAQ-märkning.
* Serialisera JSON-LD säkert, inklusive innehåll med HTML-känsliga tecken. Undvik dubbla eller motstridiga objekt vid klientnavigering.

### 4.4 Indexering, bilder och laddning

* Kontrollera att viktigt innehåll och crawlbara länkar finns i genererad HTML.
* Behåll noindex på interna sidor. Kontrollera separat hur hela deploy previews hålls utanför indexering.
* Säkerställ riktiga 404-svar för saknade och opublicerade sidor. Använd inte en global 200-fallback som döljer fel.
* Kontrollera bilder för rätt dimensioner, beskrivande alttext och lämpliga filstorlekar. Ladda bilder längre ned vid behov.
* Undersök startsidans video och poster så att de inte fördröjer viktigt innehåll eller skapar layoutförskjutningar. Respektera reducerad rörelse.
* Robots.txt ska tillåta önskad sökindexering, inklusive OAI-SearchBot. Kontrollera även eventuellt botskydd om tillgång finns. Val om modellträning är ett separat beslut och ska inte ändras som en bieffekt.
* Prioritera inte llms.txt. Det är inget krav för att genomföra denna specifikation.

## 5. Fördjupa tjänstesidorna

Behåll den befintliga strukturen med behov, omfattning, planering, kostnadsfaktorer och påverkan på boende. Gör innehållet mer konkret där det finns sakunderlag.

| Tjänst | Fördjupning |
| --- | --- |
| Fasadrenovering | Lagning jämfört med större renovering, skillnader mellan puts, tegel och trä, anslutningar och samordning med fönster eller balkonger. |
| Balkongrenovering | Bedömning av skador, reparation jämfört med byte av platta, räcken, infästningar och genomförande med kvarboende. |
| Dränering | Undersökning av fuktorsak, ledningar, åtkomst, etapper, grundisolering och vad återställningen omfattar. |
| Fastighetsservice | Konkreta typer av reparationer, beställningsunderlag, samordning av flera arbeten och besked efter utförande. |
| Porttelefoni och passage | Befintligt system, kompatibilitet, kabeldragning, antal entréer, förvaltning av behörigheter och påverkan vid byte. |

Ge tydliga korta svar i början av viktiga avsnitt och utveckla sedan resonemanget. Använd tabeller och checklistor när de underlättar beslut. Tvinga inte in ett visst ordantal.

Tekniska och juridiska påståenden ska faktagranskas mot aktuella primärkällor, exempelvis Boverket eller verifierad tillverkardokumentation. Dokumentera källor och datum. Skriv inte generella löften om metod, ansvar eller anslutningslösningar som kräver projektspecifik bedömning.

Prisexempel, verklig tidsåtgång och egna metoder används bara med underlag. Annars förbättras kostnadsfaktorer och beslutspunkter utan påhittade siffror.

## 6. Referensprojekt

Flytta referensarbetet till nästa leverans. Börja med ett verkligt projekt inom fasad, balkong respektive dränering när sådant material finns.

Återanvänd befintlig projektmodell och mall. Komplettera bara där det behövs för:

* Ort, fastighetstyp, uppdrag och år.
* Utförande bolag, roll och korrekt beskrivning av relationen till BRF Entreprenad.
* Utgångsläge, omfattning, genomförande och resultat.
* Bilder med användningsrätt och korrekt alternativtext.
* Eventuell beställare och kundkommentar enligt befintliga publiceringsvillkor.
* Koppling till en eller flera tjänster och, när relevant, en ortssida.

Inför gemensam logik som gör att bara publiceringsklara projekt kan visas, länkas, förrenderas eller tas med i sitemap. Göm sektioner som saknar innehåll. Testa framtida dynamisk generering med en lokal testfixture om verkligt projekt saknas, och se till att fixture aldrig följer med i produktionen.

Om underlaget saknas ska referensdelen vara tekniskt klar, medan projektlistan förblir opublicerad. Skapa ingen publik exempelkund.

## 7. Verksamhetsområde och ortssidor

Skapa eller färdigställ /verksamhetsomrade/ med bekräftad täckning, kontorets verkliga läge och vilka tjänster som erbjuds inom området. Länka sidan naturligt från exempelvis om oss och sidfot.

Förbered en återanvändbar modell och mall för ortssidor. Prioritetsordning för underlag är Landskrona, Helsingborg och Malmö. Föreslagna adresser är /verksamhetsomrade/landskrona/, /verksamhetsomrade/helsingborg/ och /verksamhetsomrade/malmo/. Anpassa om aktuell kod redan har etablerat en annan konsekvent struktur.

Publicera varje ortssida först när den har ett eget användarvärde: verifierad lokal erfarenhet eller andra konkreta lokala förutsättningar, relevant erbjudande och en tydlig kontaktväg. Ange aldrig ett kontor i en ort där ni inte har ett.

Om lokal fakta saknas, skapa interna utkast och underlagsfrågor. Byt inte bara ortsnamn i samma text. Massproducera inte kombinationer av tjänst och ort.

## 8. Kunskapsdel för styrelser

Bygg en enkel kunskapsdel i projektets befintliga teknik. Använd typade innehållsfiler om det passar projektet. Ett nytt CMS krävs inte.

Föreslagen struktur: /kunskap/ och /kunskap/[slug]/. Återanvänd sidregister, publiceringsstatus, SEO, brödsmulor, sitemap och statisk generering.

Första fyra guiderna:

1. Vad påverkar kostnaden för fasadrenovering i en BRF?
2. Renovera eller byta balkongplattor?
3. Fukt i föreningens källare: vad behöver undersökas?
4. Checklista inför offertförfrågan på en större renovering.

Varje guide ska ha ett tydligt syfte, direkt svar eller introduktion, konkreta beslutspunkter, relevanta källor och länkar till passande tjänst och kontaktflöde. Lägg till projektlänkar när godkänt material finns.

Modellen ska stödja författare, faktagranskare, publiceringsdatum, uppdateringsdatum, källor, relaterade tjänster och publiceringsstatus. Namnge ingen person som faktagranskare utan att uppdraget är bekräftat. Visa bara verkliga datum och medverkande.

Skriv kompletta guider där bekräftade fakta och kontrollerade primärkällor räcker. Lämna guider som interna utkast om nödvändig faktagranskning eller sakunderlag saknas. Falska erfarenhetsbeskrivningar får inte ersätta underlag. Publicera ingen tom kunskapsöversikt.

## 9. Internlänkar och konkurrerande sidor

* Låt tjänsteområden introducera helheten och undertjänster svara på specifika köpbehov.
* Låt målgruppssidor handla om respektive beställares situation. De ska inte återge startsidans text.
* Ge startsidan rollen som övergripande erbjudande för bostadsrättsföreningar.
* Länka tjänst till relevant guide, projekt och ort där de är publicerade. Länka tillbaka när det är relevant för läsaren.
* Använd beskrivande ankartexter. Länka inte varje sida till allt annat.
* Ingen internlänk ska leda till ett utkast eller en saknad sida.
* Om aktuellt innehåll upprepar samma sökavsikt, förtydliga sidornas roller och metadata innan nya sidor skapas. Gör ingen automatisk massammanslagning eller URL-flytt.

## 10. Kontakt och mätning

Bevara händelserna phone_click, email_click, form_start, lead_submitted och form_error om de fortfarande används. Dokumentera tjänst, flöde och landningssida som icke personliga mätvärden.

* En lead registreras först när förfrågan faktiskt tagits emot enligt integrationens verifierade beteende.
* Ett telefonklick är inte ett genomfört samtal och ska redovisas separat.
* Koppla guide och projektsida till relevant förvalt tjänsteflöde.
* Skicka inga namn, telefonnummer, e-postadresser eller fritexter till analystjänster.
* Använd befintligt analysverktyg om ett sådant nu finns och är korrekt konfigurerat. Om verktyg saknas, förbered anslutningen och skriv exakt vilka inställningar som behövs. Inför ingen godtycklig spårning eller påhittad mätidentitet.
* Om analys kräver ytterligare samtyckeshantering ska den hanteras innan spårningen aktiveras. Kontrollera aktuell officiell dokumentation vid implementation.

Dokumentera uppföljning för organiska förfrågningar per tjänst och ort, landningssidornas konvertering samt sökfrågor och indexering i Search Console. Påstå inte att AI-trafik eller AI-påverkan kan mätas fullständigt.

## 11. Förbered spridning av projektmaterial

Skapa en kort intern rutin i docs/ för hur ett godkänt referensprojekt kan återanvändas som LinkedIn-inlägg, kort projektfilm och förslag på gemensamt reportage med leverantör eller beställare. Ange vilket underlag och vilka publiceringsgodkännanden som behövs.

Beskriv också en manuell kontroll av företagets riktiga Google Business Profile: korrekta uppgifter, kategorier, verksamhetsområde, bilder och omdömen. Skapa inga externa profiler, skicka inga förfrågningar och publicera inga inlägg inom koduppdraget.

## 12. Arbetsordning

1. Läs aktuell kod, instruktioner och gitstatus. Notera redan lösta delar och relevant avvikelse från granskningsunderlaget.
2. Genomför gemensam metadata, företagsidentitet, strukturerade brödsmulor samt samordnad sitemap och förrendering.
3. Fördjupa de fem prioriterade tjänsterna utan att införa obekräftade påståenden.
4. Färdigställ referensflödet och publicera endast projekt med befintligt godkänt underlag.
5. Skapa verksamhetsområdessida och förbered ortssidor med tydlig publiceringskontroll.
6. Bygg kunskapsdelen och skriv de fyra guiderna med faktagranskning och publiceringsstatus.
7. Koppla relevanta internlänkar, kontaktflöden och mätning.
8. Kör kontroller, granska genererat bygge och uppdatera underlags- och lanseringsdokument.

Fortsätt med oberoende uppgifter om någon del saknar underlag. Fråga bara om ett avgörande val inte går att lösa från projektets fakta. Samla annars saknat underlag i slutleveransen.

## 13. Verifiering och acceptanskriterier

Kör befintlig typkontroll, tillgängliga relevanta tester och statisk generering. Installera enligt låsfil och aktuell Node-konfiguration. Anta inte att README:s gamla kommandon är aktuella.

Kontrollera det genererade resultatet, inte bara källkoden:

* [ ] Alla avsedda publicerade sidor finns som statiskt innehåll med korrekt titel, canonical och huvudinnehåll.
* [ ] Sitemap innehåller unika absoluta adresser för samtliga publicerade innehållstyper och inga utkast.
* [ ] Dynamiska publicerade sidor förrenderas och kan öppnas direkt.
* [ ] Okända eller opublicerade adresser ger korrekt 404-beteende. Skilj lokal förhandsvisning från verifierat hostingsvar.
* [ ] JSON-LD kan parsas och motsvarar synliga uppgifter.
* [ ] Brödsmulornas länkar och strukturerade data stämmer överens.
* [ ] Navigation mellan dynamiska sidor ger rätt innehåll och metadata utan gamla rester.
* [ ] Inga brutna internlänkar, platshållarprojekt eller falska kontaktuppgifter introduceras.
* [ ] Referens-, orts- och guidesektioner döljs när innehåll saknas.
* [ ] Service och projekt har rätt förval och tydlig kontaktväg på mobil.
* [ ] Inga personuppgifter skickas i analysdata.
* [ ] Relevanta sidtyper granskas i mobil och desktop om renderingsverktyg finns.
* [ ] Laddning, video, bilder, tangentbordsnavigation och reducerad rörelse kontrolleras där förändringen berör dem.

Lägg till små meningsfulla automatiska kontroller för URL-registret, sitemap och publiceringsregler om projektet saknar dem. Välj befintlig testlösning eller ett enkelt skript som inte kräver ett stort nytt ramverk. Testdata får inte publiceras.

Gör inga verkliga produktionsinskick eller ändringar i externa konton som en bieffekt av verifieringen. Lokal kontroll är inte bevis på att Netlify-notiser, HTTPS, indexering eller Search Console fungerar i drift.

## 14. Slutleverans från Claude Code

Leverera ändringarna i aktuell arbetskopia och följande redovisning:

1. Genomförda ändringar och vilka sidor eller gemensamma funktioner de berör.
2. Körda kontroller med verkligt resultat. Markera tydligt sådant som inte kunde verifieras.
3. Publicerat innehåll jämfört med interna utkast.
4. Exakta kvarstående underlagsbehov och externa inställningar.
5. Kort rekommenderad ordning för nästa publicering.

Uppdatera UNDERLAG.md och LAUNCH_CHECKLIST.md utan att skriva över befintliga svar eller markera overifierade kontroller som klara. Lägg exempelvis till docs/seo-geo-status.md med genomförda kontroller och återstående punkter om motsvarande dokument saknas.

Viktigast att samla in är juridiskt bolagsnamn, organisationsnummer, relation till Byggproffs Skåne, tre riktiga referensprojekt, projektbilder, lokal erfarenhet per ort, bekräftade författare eller granskare samt vald analystjänst.

## 15. Officiella källor att kontrollera vid genomförandet

Verifiera aktuella anvisningar mot primärkällor. Dessa länkar är startpunkter och ersätter inte kontroll av aktuell dokumentation:

* Google om AI-funktioner och webbplatser: https://developers.google.com/search/docs/appearance/ai-features
* Google om sitemap: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
* Google om brödsmulor: https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
* Google om organisationer: https://developers.google.com/search/docs/appearance/structured-data/organization
* Google om otillåtna massidor: https://developers.google.com/search/docs/essentials/spam-policies
* OpenAI om sökrobotar: https://developers.openai.com/api/docs/bots
* Google om lokal synlighet: https://support.google.com/business/answer/7091

Undvik löften om ranking, särskilda AI-genvägar och onödiga tillägg. Arbetet ska resultera i en tydligare, verifierbar och tekniskt sökbar webbplats med fungerande vägar till förfrågan.
