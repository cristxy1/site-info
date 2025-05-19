# Caiet Virtual

Un spațiu educațional online unde poți lua notițe, organiza lecții, și învăța eficient. Proiectul oferă o interfață prietenoasă și funcționalități moderne pentru o experiență de studiu simplă și eficientă.

---

## Funcționalități principale

### 1. Editor de notițe cu salvare locală
- Creare și salvare notițe direct în browser, folosind LocalStorage.
- Validarea și sanitizarea inputurilor pentru prevenirea atacurilor XSS (Cross-Site Scripting).
- Editarea și actualizarea notițelor existente.
- Posibilitatea de a șterge toate notițele cu confirmare prealabilă.

### 2. Mod întunecat / luminos (Dark/Light Mode)
- Comutare ușoară între teme.
- Tema aleasă este salvată local și aplicată automat la încărcarea paginii.

### 3. Dashboard pentru organizarea notițelor
- Vizualizare rapidă a numărului total de notițe.
- Afișarea datei ultimei modificări a unei notițe.
- Căutare în timp real în notițe după titlu sau conținut.

### 4. Lecții interactive
- Lecții predefinite ce pot fi afișate printr-un clic pe butoane.
- Suport pentru multiple lecții cu conținut diferit.

### 5. Export și import notițe
- Exportarea notițelor în format JSON pentru backup.
- Exportarea notițelor individuale în format `.txt`.
- Importul și restaurarea notițelor dintr-un fișier JSON (poate fi extinsă).

### 6. Pagina de start cu introducerea numelui utilizatorului
- La prima vizită, utilizatorul trebuie să introducă numele.
- Numele este salvat local și folosit pentru personalizarea experienței (ex: mesaje de salut).

### 7. Previzualizare live a conținutului notiței în editor
- Când utilizatorul tastează în zona de conținut, textul este afișat simultan în zona de previzualizare.

---

## Tehnologii folosite

- **HTML5** și **CSS3** pentru structura și stilul paginilor.
- **JavaScript** pentru logica aplicației și manipularea DOM.
- **LocalStorage** pentru stocarea datelor local în browser.
- Metode simple de securizare a inputurilor (sanitizare și escapare HTML).

---

## Cum se folosește proiectul

1. Deschide `index.html` în browser.
2. Dacă este prima accesare, introdu numele tău în pagina de start.
3. Navighează în editor pentru a crea și edita notițe.
4. Folosește dashboard-ul pentru a vedea rezumatul și a căuta notițe.
5. Explorează lecțiile interactive pentru învățare suplimentară.
6. Salvează sau exportă notițele tale pentru backup sau partajare.
7. Activează mod întunecat/luminos pentru confort vizual.

---

## Instalare

Acest proiect nu necesită instalare specială sau server, deoarece rulează complet în browser.  
Pași:

1. Clonează repository-ul sau descarcă fișierele sursă.
2. Deschide `index.html` cu un browser modern (Chrome, Firefox, Edge).

---

Pentru întrebări sau sugestii, poți să mă contactezi la:  
- Email: alexandrucristiancaloianu@gmail.com  
- GitHub: (https://github.com/cristxy1)

---

*Mult succes cu Caiet Virtual!*