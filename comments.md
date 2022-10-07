# Applikationen overall:

### Varför vi valde HarperDB istället för t.ex. PostgreSQL:

Det kändes som en smidig lösning att använda HarperDB istället för PostgreSQL, då HarperDB har simplare installation, konfiguration och administration. 
Det hade även att göra lite med nyfikenhet. Vi har använt oss utav PostGres innan, och det var intressant att prova på något nytt när man får chansen. 


### Varför vi använde Socket.io:
Eftersom vi ville utveckla en realtids chatt-app, så kändes Socket.io som en bra lösning. Funktionaliteten i Socket.io överensstämde med det vi tänkte att vi ville få utfört. Vi undersökte inte andra alternativ i någon större utsträckning, då Socket.IO matchade vad vi sökte och vi ville testa det. 

Fördelen med det är att man begränsar framför allt requestsen som frontend behöver skicka, utan bygger mer på att frontend prenumererar på ett rum i chatten, och får uppdaterad data när servern får in ny data automatiskt istället. Vilket också matchar syftet med vår applikation.


### Varför vi valde Axios:
Vi valde att använda Axios för att vi kände att det var lite lättare att jobba med jämfört med Fetch. Delar av gruppen hade erfarenhet sedan innan, och detta gjorde att vi kunde komma igång med det relativt smidigt.


### Varför implementerade vi inte Privata Meddelanden
I grund och botten kände vi att tiden började springa iväg och vi skulle inte ha tillräckligt med tid för att få till en funktionalitet som vi skulle bli nöjda med.
Vi tog därmed ett gemensamt beslut att skala ner applikationens omfång och återgå till grundfunktionaliteten och se till så att den fungerade som den skulle. 

Vår idé för Privata Meddelanden innrbar att vi skulle, efter inloggning innan man valt ett rum, kunna klicka på en inloggad användares namn för att sedan föras vidare till en privat chatt med denna användare. 
Man skulle även kunna klicka på en annan användare inne i ett grupp-chattrum och tas till ett privat chattrum med denna användaren. 

# FrontEnd specifikt:

### Varför vi inte valde ett Style-bibliotek: 
Vi kände att vi ville fokusera på uppgiften i sig, snarare än att lära oss ett nytt designbibliotek. Därför var Tailwind ute ur leken. Detta eftersom vi hade fått spendera mycket tid till att lära oss tailwinds dokumentation istället för att spendera tid på "det som är viktigt".
Vi kände att vi ville göra stylen personlig, och ha fria tyglar att anpassa dess utseende som vi ville. 
Vi designade LandingPage först och därmed utgjorde den lite utav en mall för hur resten utav applikationen skulle se ut. 


### App.js: 
I App.js bestämde vi oss för att använda BrowserRouter för vi kände att det var en simpel enkel lösning på vad vi ville göra. 


### chatroom.js:
Här valde vi en lösning som vid en refresh skickar användaren till utloggningsskärmen. 

Vi har diskuterat olika lösningar, framförallt att via backend ha en bättre koll på vem som befinner sig var, och skydda mot detta lite mer centralt med ett användar system som kollar vem som är vem. I nu läget är dock detta helt frontend dependant, och därför är våra States sårbara för att just en refresh. 
Vi jobbade på en ytterliggare lösning, men valde att skapa en grundläggande lösning, med lösningen framför allt så att användaren inte får upp ett tomt chattrum helt plötsligt. 

Hade detta varit ett större och längre projekt, med en definierad målgrupp(vem ska använda chatt appen, är det för företag eller privatpersoner), hade man kunna ha detta som bas, och bygga ut utökat funktionalitet, och säkerhet med ett användarsystem där backend hanterar mer av detta. 


