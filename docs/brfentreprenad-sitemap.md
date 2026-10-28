# BRF Entreprenad: sitemap och byggunderlag för Claude Code

Datum: 2026-10-27
Status: Förslag till komplett målstruktur, baserat på diskussion med beställaren.

## 1. Uppdrag till Claude Code

Använd dokumentet som informationsarkitektur och innehållsunderlag för BRF Entreprenads webbplats. Det är en målbild för hela webbplatsen, inte ett krav att publicera samtliga sidor samtidigt.

Läs befintligt repository och dess instruktioner innan implementation. Anpassa till befintligt ramverk och komponentstruktur. Webbplatsen ska använda Tailwind CSS och kunna hostas på Netlify. Använd Space Grotesk för rubriker. Innehåll kan vara hårdkodat i strukturerade datafiler.

Tidigare önskemål om enbart en byggsida gäller fortfarande tills beställaren uttryckligen utökar implementationsomfattningen. Detta dokument beskriver den framtida strukturen och ersätter inte automatiskt det beslutet. Finns ingen annan aktuell beställning, skapa eller uppdatera endast byggsidan och förbered innehållsstrukturen. Aktivera inte tomma sidor eller länkar till opublicerade sidor.

## 2. Bekräftade förutsättningar

* Företagsnamn: BRF Entreprenad.
* Målgrupper: bostadsrättsföreningar, fastighetsförvaltare och fastighetsägare.
* Verksamhetsområde: från Halmstad till Falsterbo.
* Brett erbjudande inom bygg, från konkreta servicearbeten till större renoveringar.
* Totalentreprenör med helhetsansvar och personliga projektledare.
* Service betyder i första hand beställda reparationer och mindre arbeten.
* Egen bokningstjänst för servicearbeten, exempelvis byte av fönster.
* Kunden anger adress, behov och önskad starttid.
* Kunden följer arbetets status på sitt konto, exempelvis ”Inväntar material” och ”Inplanerat vecka 46”.

HSB, Axlins och Balder är exempel på önskad typ av beställare. De är inte bekräftade kunder och får inte presenteras som referenser eller visas i en kundlogotypsrad utan verifiering.

## 3. Positionering och ton

Huvudbudskap:

> Byggservice och entreprenad för bostadsrättsföreningar, fastighetsägare och förvaltare.

Stödtext:

> Från enskilda reparationer till större renoveringar. Vi tar helhetsansvar med personlig projektledning från Halmstad till Falsterbo.

Tonen ska vara professionell, konkret och seriös. Skriv för både styrelseledamöter och professionella beställare. Beskriv vad kunden får hjälp med, hur arbetet går till och vem som ansvarar.

Undvik påhittade kundomdömen, projekt, garantier, certifieringar, svarstider, jourlöften, priser och statistik. Hitta inte på kontaktuppgifter eller organisationsnummer. Visa inga sådana platshållare på den publicerade webbplatsen.

## 4. Huvudnavigation

| Menyval | Destination | Funktion |
| --- | --- | --- |
| Tjänster | `/tjanster/` | Översikt med grupperade tjänster |
| För er | Målgruppsmeny | Tre målgruppssidor |
| Så arbetar vi | `/sa-arbetar-vi/` | Arbetssätt och ansvar |
| Referensprojekt | `/referensprojekt/` | Endast när verkliga projekt finns |
| Om oss | `/om-oss/` | Organisation och verksamhet |
| Kontakt | `/kontakt/` | Förfrågan om större arbeten och allmän kontakt |
| Boka service | `/boka-service/` | Primär handlingsknapp |
| Mina ärenden | `/mina-arenden/` | Inloggad tjänst |

Håll navigeringen överskådlig. Visa tjänster grupperade efter huvudområde. Alla undertjänster behöver inte finnas direkt i huvudmenyn.

## 5. Publik sitemap

### 5.1 Övergripande sidor

| URL | Sidnamn | Syfte |
| --- | --- | --- |
| `/` | Startsida | Förklara målgrupper, erbjudande, område och vägar vidare |
| `/tjanster/` | Våra tjänster | Samlad tjänsteöversikt |
| `/for-bostadsrattsforeningar/` | För bostadsrättsföreningar | Stöd för styrelsens beställning och projekt |
| `/for-fastighetsforvaltare/` | För fastighetsförvaltare | Servicebeställningar, samordning och återkoppling |
| `/for-fastighetsagare/` | För fastighetsägare | Underhåll och renovering av en eller flera fastigheter |
| `/sa-arbetar-vi/` | Så arbetar vi | Process från behov till färdigt arbete |
| `/boka-service/` | Boka service | Beställ eller begär ett konkret servicearbete |
| `/sa-fungerar-servicebokningen/` | Så fungerar servicebokningen | Förklara bokning, planering och status |
| `/referensprojekt/` | Referensprojekt | Verifierade uppdrag, publiceras när material finns |
| `/referensprojekt/[projektslug]/` | Enskilt referensprojekt | Behov, omfattning, genomförande och resultat |
| `/om-oss/` | Om BRF Entreprenad | Företag, kontaktpersoner och helhetsansvar |
| `/verksamhetsomrade/` | Från Halmstad till Falsterbo | Geografisk täckning och arbetssätt |
| `/kontakt/` | Kontakt | Projektförfrågan och kontaktvägar |
| `/vanliga-fragor/` | Vanliga frågor | Service, entreprenad, planering och beställning |
| `/integritetspolicy/` | Integritetspolicy | Information anpassad till faktisk personuppgiftshantering |
| `/kakor/` | Kakor | Anpassas till de kakor och mätverktyg som faktiskt används |

### 5.2 Byggservice & reparationer

Huvudsida: `/tjanster/byggservice/`

| Föreslagen undersida | Innehåll |
| --- | --- |
| `/tjanster/byggservice/snickeri/` | Mindre snickerier, lister, foder, panel, förråd och inredning |
| `/tjanster/byggservice/dorrar-och-fonster/` | Justering, tätning, beslag, mindre byten och reparationer |
| `/tjanster/byggservice/maleri-och-ytskikt/` | Bättringsmålning, spackling, väggar, tak och mindre golvarbeten |
| `/tjanster/byggservice/fasadservice/` | Mindre puts-, fog- och panelreparationer |
| `/tjanster/byggservice/takservice/` | Mindre takreparationer, hängrännor, stuprör och plåtdetaljer |
| `/tjanster/byggservice/markreparationer/` | Plattor, gångar, trappor, räcken, grindar och staket |
| `/tjanster/byggservice/skadeaterstallning/` | Återställning efter läckor, skadegörelse och inbrott |

Samla mycket små arbetsmoment på dessa sidor. Skapa inte egna sidor för exempelvis byte av ett handtag eller en enskild list.

### 5.3 Portar, lås & passage

Huvudsida: `/tjanster/portar-las-och-passage/`

| Föreslagen undersida | Innehåll |
| --- | --- |
| `/tjanster/portar-las-och-passage/porttelefoni/` | Installation, byte och service av porttelefoner |
| `/tjanster/portar-las-och-passage/passagesystem/` | Taggar, kodlås, digital passage och behörigheter |
| `/tjanster/portar-las-och-passage/las-och-dorrstangare/` | Lås, beslag, dörrstängare och funktion |
| `/tjanster/portar-las-och-passage/entrepartier-och-portar/` | Entrépartier, portar, dörrautomatik och tillgänglighet |

### 5.4 Fasad, balkong & tak

Huvudsida: `/tjanster/fasad-balkong-och-tak/`

| Föreslagen undersida | Innehåll |
| --- | --- |
| `/tjanster/fasad-balkong-och-tak/fasadrenovering/` | Övergripande fasadprojekt, puts, tegel och trä |
| `/tjanster/fasad-balkong-och-tak/putsfasad/` | Omputsning, putslagning och renovering |
| `/tjanster/fasad-balkong-och-tak/tegelfasad-och-omfogning/` | Fogar, tegelbyte och reparationer |
| `/tjanster/fasad-balkong-och-tak/trafasad-och-panelbyte/` | Panelbyte, foder, knutar och bakomliggande konstruktion |
| `/tjanster/fasad-balkong-och-tak/fasadmalning/` | Målning av fasader och tillhörande detaljer |
| `/tjanster/fasad-balkong-och-tak/tillaggsisolering/` | Isolering i samband med fasadåtgärder |
| `/tjanster/fasad-balkong-och-tak/balkongrenovering/` | Betong, tätskikt, räcken och balkongåtgärder |
| `/tjanster/fasad-balkong-och-tak/takrenovering/` | Takbyte, tätskikt och renovering |
| `/tjanster/fasad-balkong-och-tak/platarbeten-och-taksakerhet/` | Plåtdetaljer, avvattning och taksäkerhet |

### 5.5 Fönster & dörrar

Huvudsida: `/tjanster/fonster-och-dorrar/`

| Föreslagen undersida | Innehåll |
| --- | --- |
| `/tjanster/fonster-och-dorrar/fonsterbyte/` | Enstaka fönster och samordnade byten i hela fastigheter |
| `/tjanster/fonster-och-dorrar/fonsterrenovering/` | Renovering, målning och tätning |
| `/tjanster/fonster-och-dorrar/dorrbyte/` | Lägenhetsdörrar, säkerhetsdörrar och andra dörrbyten |

Entrépartier har sin huvudsida under portar, lås och passage. Länka dit i stället för att skapa dubbla sidor. Fönsterbyte ska erbjuda både ”Boka service” för enstaka byten och ”Diskutera ett projekt” för större omfattning.

### 5.6 Mark, grund & utemiljö

Huvudsida: `/tjanster/mark-grund-och-utemiljo/`

| Föreslagen undersida | Innehåll |
| --- | --- |
| `/tjanster/mark-grund-och-utemiljo/dranering/` | Dränering och grundisolering |
| `/tjanster/mark-grund-och-utemiljo/dagvatten/` | Avledning, ledningar och brunnar |
| `/tjanster/mark-grund-och-utemiljo/fuktatgarder/` | Utredning och föreslagna åtgärder vid fuktproblem |
| `/tjanster/mark-grund-och-utemiljo/stensattning-och-asfalt/` | Gångar, entréer, parkeringar och hårdgjorda ytor |
| `/tjanster/mark-grund-och-utemiljo/innergardar/` | Upprustning av gårdar och gemensam utemiljö |
| `/tjanster/mark-grund-och-utemiljo/trappor-murar-och-racken/` | Stödmurar, utomhustrappor, räcken, staket och grindar |
| `/tjanster/mark-grund-och-utemiljo/tillganglighetsanpassning/` | Ramper, gångvägar och entrénära anpassningar |
| `/tjanster/mark-grund-och-utemiljo/schakt-och-grundlaggning/` | Markberedning, schakt och grundarbeten |

### 5.7 Invändig renovering

Huvudsida: `/tjanster/invandig-renovering/`

| Föreslagen undersida | Innehåll |
| --- | --- |
| `/tjanster/invandig-renovering/trapphus/` | Måleri, golv, snickeri och samordnad upprustning |
| `/tjanster/invandig-renovering/tvattstugor/` | Ytskikt, inredning och samordning av installationer |
| `/tjanster/invandig-renovering/kallare-och-forrad/` | Källarutrymmen, förråd och gemensamma ytor |
| `/tjanster/invandig-renovering/miljorum-och-cykelrum/` | Ombyggnad och funktionell upprustning |
| `/tjanster/invandig-renovering/lokalanpassning/` | Anpassning av lokaler i fastigheten |

### 5.8 Installationer & teknik

Huvudsida: `/tjanster/installationer-och-teknik/`

Dessa tjänster är möjliga delar av ett brett erbjudande. Bekräfta faktisk leveransförmåga och ansvar före publicering. Beskriv egen personal och samarbetspartner korrekt.

| Föreslagen undersida | Innehåll |
| --- | --- |
| `/tjanster/installationer-och-teknik/el-och-belysning/` | Elservice, armaturer, trapphusbelysning och utebelysning |
| `/tjanster/installationer-och-teknik/vvs/` | Reparationer, ventiler, radiatorer och installationer |
| `/tjanster/installationer-och-teknik/avlopp/` | Avloppsservice och åtgärder |
| `/tjanster/installationer-och-teknik/ventilation/` | Service, rengöring och ombyggnadsåtgärder |
| `/tjanster/installationer-och-teknik/varme-och-energi/` | Värmesystem och energieffektiviserande åtgärder |
| `/tjanster/installationer-och-teknik/laddplatser/` | Samordning av laddinstallationer |
| `/tjanster/installationer-och-teknik/stambyte/` | Samordnade stambytesprojekt |
| `/tjanster/installationer-och-teknik/relining/` | Möjligt separat erbjudande efter bekräftelse |

### 5.9 Totalentreprenad & projektledning

Huvudsida: `/tjanster/totalentreprenad/`

| Föreslagen undersida | Innehåll |
| --- | --- |
| `/tjanster/totalentreprenad/storre-renoveringar/` | Samordnade renoveringar med flera yrkesgrupper |
| `/tjanster/totalentreprenad/ombyggnad-och-tillbyggnad/` | Ombyggnader och tillbyggnader |
| `/tjanster/totalentreprenad/projektledning/` | Personlig projektledare, tidplan och samordning |
| `/tjanster/totalentreprenad/forstudie-och-projektering/` | Behovsanalys, förstudie, budgetunderlag och projektering |

Underhållsplaner är en möjlig framtida tjänst och ska inte framställas som ett bekräftat erbjudande ännu.

## 6. Sidor och innehåll som kräver särskilt beslut

Följande ingår inte automatiskt i det bekräftade erbjudandet:

* Lägenhetsservice och återställning vid avflyttning på förvaltarens beställning.
* Köks- och badrumsrenovering som separat tjänsteområde.
* Jour, akututryckning eller garanterad inställelsetid.
* Fastighetsdrift, rondering och generell felanmälan från boende.
* Trappstädning, trädgårdsskötsel och snöröjning.
* Underhållsplaner, besiktningar och formella kontrolluppdrag.
* Solceller, hissar, brandskydd, sanering och rivning som separata erbjudanden.

Förbered möjlighet att utöka tjänstestrukturen, men publicera inga löften om dessa tjänster utan bekräftelse. Ett brett byggutbud betyder inte automatiskt att alla specialisttjänster utförs i egen regi.

## 7. Startsida: rekommenderad innehållsordning

1. Tydlig huvudrubrik, målgrupper och verksamhetsområde. Primär knapp ”Boka service”, sekundär ”Diskutera ett projekt”.
2. Kort beskrivning av helhetsansvar och personlig projektledning.
3. Tjänsteområden presenterade som redaktionella sektioner, bildytor eller tydliga länklistor.
4. Bokningstjänsten: ange behov och adress, önska starttid, följ status på kontot.
5. Separata ingångar för föreningar, förvaltare och fastighetsägare.
6. Så arbetar vi, från beställning till färdigställande.
7. Verifierade projekt och kundomdömen när sådant underlag finns.
8. Geografiskt område från Halmstad till Falsterbo.
9. Vanliga frågor och avslutande kontaktväg.

Designen ska kännas professionell och seriös. Undvik återkommande rutnät med generiska kort. Använd tydlig typografi, luft, avdelande linjer och varierade sektioner. Visa bara bilder med korrekt användningsrätt. Generiska bilder får inte beskrivas som genomförda projekt.

## 8. Gemensam innehållsmall för tjänstesidor

Varje publicerad tjänstesida ska innehålla:

1. En unik H1 med tjänsten tydligt beskriven.
2. Kort introduktion anpassad till fastigheter och beställarnas behov.
3. Exempel på vanliga arbeten och vad som kan ingå.
4. Hur beställning, bedömning, planering och utförande går till.
5. Information om samordning och påverkan på boende där det är relevant.
6. Relevanta verifierade projekt eller dokumentation när underlag finns.
7. Några konkreta frågor och svar.
8. Relaterade tjänster och relevant målgruppssida.
9. Tydlig nästa handling.

På servicesidor är ”Boka service” primär handling. På större entreprenadsidor är ”Diskutera ett projekt” primär handling. Undvik nästan identiska texter på många sidor.

## 9. Servicebokning och inloggad sitemap

### 9.1 Avgränsning

Den egna bokningstjänsten är en bekräftad del av erbjudandet. Exakt teknisk plattform, befintlig URL och integration är inte angivna. Återanvänd den befintliga tjänsten om sådan finns. Bygg inte ett nytt ärendesystem eller välj databas och autentisering utan att först kontrollera befintlig lösning och aktuell implementationsbeställning.

Om enbart den publika webbplatsen byggs, länka till den riktiga tjänsten när URL finns. Visa inte en fungerande bokning eller inloggning om den bakomliggande funktionen saknas. Eventuella prototyper ska vara tydligt märkta som demonstrationer och inte samla verkliga beställningar.

### 9.2 Föreslagna applikationsvyer

Dessa är målbild för bokningstjänsten, inte publika innehållssidor.

| URL | Vy | Innehåll |
| --- | --- | --- |
| `/logga-in/` | Logga in | Tillgång till kundens konto |
| `/boka-service/` | Ny servicebeställning | Adress, behov och önskad starttid |
| `/boka-service/bekraftelse/` | Mottagningsbekräftelse | Bekräfta mottaget ärende, inte bindande starttid |
| `/mina-arenden/` | Ärendeöversikt | Kundens arbeten med adress och status |
| `/mina-arenden/[arende-id]/` | Ärendedetalj | Beskrivning, aktuell status och planerad tid |
| `/mitt-konto/` | Kontouppgifter | Föreslagen framtida vy för kontakt- och bolagsuppgifter |

### 9.3 Bokningsformulär

Bekräftade kärnfält:

* Adress.
* Behov eller beskrivning av arbetet.
* Önskad starttid.

Rekommenderade kompletteringar:

* Tjänstekategori.
* Förening eller företag.
* Beställarens namn, e-post och telefon.
* Fastighetsbeteckning, lägenhetsnummer eller berörd entré vid behov.
* Bilder och relevanta dokument.
* Kontaktperson för tillträde.
* Fakturareferens eller arbetsordernummer.
* Valet flexibel starttid.

Begär inte portkoder i öppna fritextfält. Bestäm en säker rutin för tillträdesinformation. Skilj alltid önskad starttid från bekräftad planering. Beställaren ska förstå om formuläret är en förfrågan eller en bindande beställning; avtalsflödet är ännu inte fastställt.

### 9.4 Föreslagna statusar

| Status | Betydelse |
| --- | --- |
| Mottaget | Ärendet har kommit in |
| Under genomgång | Behov och förutsättningar bedöms |
| Inväntar godkännande | Åtgärd eller pris behöver godkännas |
| Inväntar material | Material inväntas inför arbetet |
| Inplanerat | Planerad vecka visas, exempelvis vecka 46, 2026 |
| Pågående | Arbetet har påbörjats |
| Slutfört | Arbetet är färdigställt |
| Pausat | Arbete avvaktar, med synlig förklaring |
| Avbokat | Ärendet har avslutats utan genomförande |

”Inväntar material” och planering per vecka är bekräftade exempel. Övriga statusar är föreslagna. Statusflödet behöver kunna hantera att ett arbete återgår till planering. Visa kalenderår tillsammans med vecka för att undvika oklarhet.

### 9.5 Ärendeöversikt och detaljer

Bekräftat behov: kunden ska kunna följa aktuell status för sitt arbete.

Rekommenderad vidareutveckling:

* Lista eller tabell med ärendenummer, adress, arbete, status och planerad vecka.
* Filter på fastighet och status för professionella förvaltare.
* Ärendehistorik och senaste uppdatering.
* Ansvarig kontaktperson.
* Dokumentation och färdigbilder.
* Notiser vid statusändring.
* Flera användare per organisation och flera fastigheter.

Åtkomst ska kontrolleras på serversidan. En beställare får endast se ärenden som personen eller organisationen har behörighet till. Att dölja länkar eller använda svårgissade ärendenummer är inte åtkomstkontroll. Kundens privata ärendeuppgifter ska inte finnas i publika datafiler.

## 10. Sökbarhet och internlänkning

* Använd korta, stabila URL:er med gemener och utan svenska specialtecken.
* Ge varje publik sida unik sidtitel, metabeskrivning och en tydlig H1.
* Använd brödsmulor på tjänstesidor och referensprojekt.
* Länka från huvudområde till undertjänster och tillbaka.
* Länka från målgruppssidor till relevanta tjänster och bokning.
* Låt varje tjänst ha en huvudsaklig URL. Återanvänd länken när tjänsten passar flera områden.
* Skapa en teknisk `sitemap.xml` som bara innehåller publicerade, indexerbara sidor med kanonisk URL.
* Inkludera inte inloggning, konton, ärenden, bekräftelsesidor eller utkast i `sitemap.xml`.
* Sätt `noindex` på inloggning, kontovyer och bekräftelsesidor. Skydda privata vyer med faktisk autentisering; `noindex` är inte ett integritetsskydd.
* Använd endast strukturerad data som motsvarar verifierade uppgifter och synligt innehåll.
* Börja med en områdessida. Skapa inte många snarlika ortssidor utan lokalt relevant innehåll.
* Bestäm produktionsdomän från projektets verkliga konfiguration. Hitta inte på en domän.

## 11. Publiceringsordning

Detta är en rekommenderad ordning efter att genomförande av hela webbplatsen har beställts.

### Etapp 1: grundstruktur

Startsida, tjänsteöversikt, bekräftade huvudområden, tre målgruppssidor, arbetssätt, om oss, kontakt och förklaring av servicebokningen. Bokningslänk kopplas till faktisk tjänst. Publicera relevant integritetsinformation för funktioner som aktiveras.

### Etapp 2: prioriterade tjänstesidor

Byggservice, fönsterbyte, porttelefoni, passagesystem, fasadrenovering, balkongrenovering, takrenovering, dränering, trapphusrenovering och totalentreprenad. Prioriteringen är ett förslag och förutsätter att tjänsterna kan levereras och beskrivas konkret.

### Etapp 3: fördjupning

Resterande bekräftade undertjänster, verifierade referensprojekt och utökad geografisk information. Installationer och specialområden aktiveras först när omfattning och leveransansvar är bekräftade.

## 12. Klart när

För den del som faktiskt beställs ska följande gälla:

* Målgrupperna BRF, förvaltare och fastighetsägare framgår tydligt.
* Området Halmstad till Falsterbo framgår.
* Service och större entreprenader har tydliga vägar vidare.
* Bokningstjänsten förklaras med adress, behov, önskad starttid och statusuppföljning.
* Inga opublicerade sidor har aktiva länkar.
* Inga obekräftade tjänster, referenser eller kontaktuppgifter framställs som fakta.
* Webbplatsen fungerar på mobil och med tangentbord, med tydliga fokusmarkeringar och formuläretiketter.
* Bokningar och kontaktformulär visar framgång endast när uppgifterna verkligen tagits emot.
* Privata ärenden kräver korrekt behörighet och finns inte i publik sitemap.
* Befintliga byggkontroller körs för den genomförda ändringen.

