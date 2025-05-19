// script.js - Caiet Virtual

// --- Toggle tema light/dark ---
const toggleThemeBtn = document.getElementById('toggle-theme');
if (toggleThemeBtn) {
    toggleThemeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });
}

// --- Aplică tema salvată la încărcarea paginii ---
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    }

    afiseazaNotite();
    actualizeazaDashboard();
    gestioneazaLectii();
});

// --- Funcție de sanitizare input simplă (evită tag-uri HTML) ---
function sanitizeInput(input) {
    const temp = document.createElement('div');
    temp.textContent = input;
    return temp.innerHTML;
}

// --- Funcție simplă de escapare HTML pentru siguranță la afișare ---
function escapeHtml(text) {
    return text.replace(/&/g, "&amp;")
               .replace(/</g, "&lt;")
               .replace(/>/g, "&gt;")
               .replace(/"/g, "&quot;")
               .replace(/'/g, "&#039;");
}

// --- Salvează notiță din editor ---
const saveNoteBtn = document.getElementById('save-note');
if (saveNoteBtn) {
    saveNoteBtn.addEventListener('click', () => {
        const titluRaw = document.getElementById('note-title').value;
        const continutRaw = document.getElementById('note-content').value;
        const categorieRaw = document.getElementById('note-category').value;

        const titlu = sanitizeInput(titluRaw.trim());
        const continut = sanitizeInput(continutRaw.trim());
        const categorie = sanitizeInput(categorieRaw.trim());

        if (titlu && continut) {
            const notita = {
                titlu,
                continut,
                categorie,
                data: new Date().toLocaleString(),
                favorit: false
            };

            const notite = JSON.parse(localStorage.getItem('notite') || '[]');
            notite.push(notita);
            localStorage.setItem('notite', JSON.stringify(notite));

            alert('Notiță salvată cu succes!');
            afiseazaNotite();
            actualizeazaDashboard();
        } else {
            alert('Completează titlul și conținutul notiței!');
        }
    });
}

// --- Export notițe în .txt ---
const saveAsTxtBtn = document.getElementById('save-as-txt');
if (saveAsTxtBtn) {
    saveAsTxtBtn.addEventListener('click', () => {
        const titluRaw = document.getElementById('note-title').value.trim();
        const continutRaw = document.getElementById('note-content').value.trim();

        if (titluRaw && continutRaw) {
            // Folosim titluRaw pentru numele fișierului fără escape (fișier text)
            const notaText = `Titlu: ${titluRaw}\n\nContinut:\n${continutRaw}`;
            const blob = new Blob([notaText], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${titluRaw}.txt`;
            a.click();
            URL.revokeObjectURL(url);
        } else {
            alert('Completează toate câmpurile pentru a salva notița!');
        }
    });
}

// --- Funcție debounce pentru optimizarea căutării ---
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// --- Afișează notițe în dashboard și caiet ---
function afiseazaNotite() {
    const lista = document.getElementById('notite-lista');
    if (!lista) return;

    const notite = JSON.parse(localStorage.getItem('notite') || '[]');

    if (notite.length === 0) {
        lista.innerHTML = '<p>Nu există notițe salvate.</p>';
        return;
    }

    lista.innerHTML = '';
    notite.forEach((n, i) => {
        const item = document.createElement('div');
        item.className = 'notita lectie';
        item.dataset.index = i;

        item.innerHTML = `
            <input type="text" class="edit-title" value="${escapeHtml(n.titlu)}" disabled />
            <textarea class="edit-content" rows="4" disabled>${escapeHtml(n.continut)}</textarea>
            <small><em>Materie: ${escapeHtml(n.categorie || 'Nedefinită')}</em></small>
            <div class="edit-buttons">
                <button class="edit-btn">Editează</button>
                <button class="save-btn" style="display:none;">Salvează</button>
                <button class="cancel-btn" style="display:none;">Renunță</button>
            </div>
            <small>Ultima modificare: ${n.data}</small>
        `;

        lista.appendChild(item);
    });

    // Adaugă event listeneri pentru butoanele editare, salvare, renunțare
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const container = e.target.closest('.notita');
            container.querySelector('.edit-title').disabled = false;
            container.querySelector('.edit-content').disabled = false;
            toggleEditButtons(container, true);
        });
    });

    document.querySelectorAll('.save-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const container = e.target.closest('.notita');
            const index = parseInt(container.dataset.index);
            const newTitleRaw = container.querySelector('.edit-title').value.trim();
            const newContentRaw = container.querySelector('.edit-content').value.trim();

            const newTitle = sanitizeInput(newTitleRaw);
            const newContent = sanitizeInput(newContentRaw);

            if (!newTitle || !newContent) {
                alert('Titlul și conținutul nu pot fi goale.');
                return;
            }

            const notite = JSON.parse(localStorage.getItem('notite') || '[]');
            notite[index] = {
                ...notite[index],
                titlu: newTitle,
                continut: newContent,
                data: new Date().toLocaleString()
            };

            localStorage.setItem('notite', JSON.stringify(notite));
            afiseazaNotite();
            actualizeazaDashboard();
        });
    });

    document.querySelectorAll('.cancel-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            afiseazaNotite();
        });
    });
}

function toggleEditButtons(container, editing) {
    container.querySelector('.edit-btn').style.display = editing ? 'none' : 'inline-block';
    container.querySelector('.save-btn').style.display = editing ? 'inline-block' : 'none';
    container.querySelector('.cancel-btn').style.display = editing ? 'inline-block' : 'none';
}

// --- Căutare notițe cu debounce pentru performanță ---
const searchBox = document.getElementById('search-notes');
if (searchBox) {
    searchBox.addEventListener('input', debounce(() => {
        const query = searchBox.value.toLowerCase();
        const lista = document.getElementById('notite-lista');
        const notite = JSON.parse(localStorage.getItem('notite') || '[]');
        const filtrate = notite.filter(n => n.titlu.toLowerCase().includes(query) || n.continut.toLowerCase().includes(query));

        lista.innerHTML = '';
        if(filtrate.length === 0) {
            lista.innerHTML = '<p>Nu există notițe care să corespundă căutării.</p>';
            return;
        }
        filtrate.forEach(n => {
            const div = document.createElement('div');
            div.className = 'notita';
            div.innerHTML = `<h3>${escapeHtml(n.titlu)}</h3><p>${escapeHtml(n.continut.substring(0,100))}...</p>`;
            lista.appendChild(div);
        });
    }, 300));
}

// --- Lecții interactive ---
function gestioneazaLectii() {
    const butoane = document.querySelectorAll('.start-lesson');
    const container = document.getElementById('lesson-details');
    if (!butoane.length || !container) return;

    const lectii = {
        1: 'Cornell este un sistem de notițe care împarte pagina în 3 zone: idei cheie, notițe și rezumat. Poți folosi bullet points și evidențieri pentru claritate.',
        2: 'Pentru organizarea ideilor, începe cu o schiță generală și apoi dezvoltă fiecare idee folosind concepte cheie și conexiuni logice.',
        3: 'Tehnica Pomodoro presupune să lucrezi 25 minute și să iei pauză 5. Repetă de 4 ori, apoi ia o pauză mai lungă. Ideal pentru concentrare.'
    };

    butoane.forEach(btn => {
        btn.addEventListener('click', () => {
            const nr = btn.dataset.lesson;
            container.innerHTML = `<p>${lectii[nr]}</p>`;
        });
    });
}

// --- Dashboard actualizare ---
function actualizeazaDashboard() {
    const total = document.getElementById('total-notes');
    const update = document.getElementById('last-update');
    const notite = JSON.parse(localStorage.getItem('notite') || '[]');

    if (total) total.textContent = notite.length;
    if (update && notite.length > 0) {
        update.textContent = notite[notite.length - 1].data;
    } else if (update) {
        update.textContent = '-';
    }
}

// --- Export notițe JSON backup ---
const exportBtn = document.getElementById('export-notes') || document.getElementById('download-backup');
if (exportBtn) {
    exportBtn.addEventListener('click', () => {
        const notite = JSON.parse(localStorage.getItem('notite') || '[]');
        const blob = new Blob([JSON.stringify(notite, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'notite_backup.json';
        a.click();
        URL.revokeObjectURL(url);
    });
}

// --- Ștergere toate notițele ---
const stergeBtn = document.getElementById('clear-all');
if (stergeBtn) {
    stergeBtn.addEventListener('click', () => {
        if (confirm('Sigur vrei să ștergi toate notițele?')) {
            localStorage.removeItem('notite');
            afiseazaNotite();
            actualizeazaDashboard();
        }
    });
}

// --- Previzualizare conținut notiță în editor ---
const noteContent = document.getElementById('note-content');
if (noteContent) {
    noteContent.addEventListener('input', () => {
        const preview = document.getElementById('note-preview-content');
        if(preview) preview.textContent = noteContent.value;
    });
}

// --- Curățare formular notiță ---
const clearNoteBtn = document.getElementById('clear-note');
if (clearNoteBtn) {
    clearNoteBtn.addEventListener('click', () => {
        document.getElementById('note-title').value = '';
        document.getElementById('note-content').value = '';
        const preview = document.getElementById('note-preview-content');
        if(preview) preview.textContent = '';
    });
}

// --- Salutare utilizator ---
document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start-btn");
    const userNameInput = document.getElementById("user-name-input");

    if (startBtn && userNameInput) {
        startBtn.addEventListener("click", () => {
            const userName = sanitizeInput(userNameInput.value.trim());
            if (!userName) {
                alert("Te rog să introduci numele tău.");
                return;
            }
            localStorage.setItem("userName", userName);
            alert(`Salut, ${userName}! Să începem notițele!`);
        });
    }
});

