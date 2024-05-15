// Costante con l'URL dell'API
const url = 'https://6644997e6c6a6565870b3f91.mockapi.io/products/';

//const token = 'fdfgdfgdfgdfgkdljglkjlkjdeiwrweroiwer';

// estrai l'id dal permalink
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const paramId = urlParams.get('id');

// Funzione chiamata all'avvio della pagina per recuperare e mostrare i prodoti
// Questa funzione viene chiamata all'avvio della pagina e mostra tutti i prodoti presenti nell'API
window.onload = async () => {
    // Chiama la funzione showprdotti per mostrare tutti i prodoti
    // L'uso di await è necessario per attendere che la funzione showProdotti venga completata
    // prima di eseguire il successivo passo
    await showProducts(); // Mostra i prodoti
    // Chiama la funzione getValueForm per recuperare i dati del prodotto e da modificare
    // L'uso di await è necessario per attendere che la funzione getValueForm venga completata
    // prima di eseguire il successivo passo
    getValueForm(); // Recupera i dati del prodotto da modificare
}

// Funzione per creare un nuovo prodotto
// Questa funzione viene chiamata quando si vuole creare un nuovo prodotto
const createProduct = async () => {
    // Recupera i valori inseriti dal prodotto nel form
    const constantCategoria  = document.getElementById('categoria').value;
    const constantModello  = document.getElementById('modello').value;
    const constantPrezzo  = document.getElementById('prezzo').value;
    // Crea un nuovo oggetto prodotti
    const newProduct = { 
        Categoria:   constantCategoria,
        modello:   constantModello,
        prezzo:    constantPrezzo ,
        };

    // Invia una richiesta POST all'API con il nuovo prodotto
    // L'uso di await è necessario per attendere che la richiesta venga completata
    const res = await fetch(url, {
        method: "POST",
        headers: {
             "content-type": "application/json" ,
             //"Authorization" : `Brearer ${token}`,
            },
        body: JSON.stringify(newProduct),
    });

    // Se la richiesta ha avuto successo
    if (res.ok) {
        // Mostra un messaggio di conferma
        alert('Utente creato con successo!');
        // Chiama la funzione showprodotti per mostrare tutti i prodoti
        // L'uso di await è necessario per attendere che la funzione showprodotti venga completata
        // prima di eseguire il successivo passo
        await showProducts(); // Aggiorna la lista prodoti
    }
}

// Funzione per recuperare i dati di un prodotto da modificare
// Questa funzione viene chiamata quando si vuole modificare il prodotto esistente
const getValueForm = async (idInInput) => {
    // Se viene passato un id all'interno della funzione
    const id = idInInput || paramId;
    if (id) {
        // Invia una richiesta GET all'API per recuperare i dati del prodotto richiesto
        // L'uso di await è necessario per attendere che la richiesta venga completata
        const res = await fetch(url + id);
        // Converte la risposta in un oggetto JSON
        const product = await res.json();
        // Aggiorna i valori inseriti nel form con i dati del prodotto
        document.getElementById('categoria').value = product.categoria;
        document.getElementById('modello').value = product.modello;
        document.getElementById('prezzo').value = product.prezzo;
        document.getElementById('id').value = product.id;
    }
}

// Funzione per aggiornare il prodotto
// Questa funzione viene chiamata quando si vuole modificare il prodotto esistente
const updateProduct= async () => {
    // Recupera i valori inseriti dal prodotto nel form
    const id = document.getElementById('id').value;
    const categoria = document.getElementById('categoria').value;
    const modello = document.getElementById('modello').value;
    const prezzo = document.getElementById('prezzo').value;
    // Crea un nuovo oggetto prodotto con i nuovi dati
    const updatedProduct = { 
        categoria :categoria ,
        modello: modello,
        prezzo:prezzo
    };

    // Invia una richiesta PUT all'API per aggiornare il prodotto richiesto
    // L'uso di await è necessario per attendere che la richiesta venga completata
    const res = await fetch(url + id, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(updatedProduct),
    });

    // Se la richiesta ha avuto successo
    if (res.ok) {
        // Mostra un messaggio di conferma
        alert('Prodotto aggiornato con successo!');
        // Chiama la funzione showUsers per mostrare tutti i prodoti
        // L'uso di await è necessario per attendere che la funzione showUsers venga completata
        // prima di eseguire il successivo passo
        await showProducts(); // Aggiorna la lista prodotti
    }
}

// Funzione per eliminare il prodotto
// Questa funzione viene chiamata quando si vuole eliminare prodotto esistente
const deleteProducts = async () => {
    // Recupera l'id prdotto da eliminare
    const id = document.getElementById('id').value;
    // Invia una richiesta DELETE all'API per eliminare il prodoto richiesto
    // L'uso di await è necessario per attendere che la richiesta venga completata
    const res = await fetch(url + id, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
    });

    // Se la richiesta ha avuto successo
    if (res.ok) {
        // Mostra un messaggio di conferma
        alert('Prodotto eliminato con successo!');
        // Chiama la funzione showUsers per mostrare tutti i prodoti
        // L'uso di await è necessario per attendere che la funzione showUsers venga completata
        // prima di eseguire il successivo passo
        await showProducts(); // Aggiorna la lista i prodoti
    }
}

// Funzione per mostrare la lista i prodotti
// Questa funzione viene chiamata quando si vuole visualizzare la lista i prodotti presenti nell'API
const showProducts= async () => {
    // Invia una richiesta GET all'API per recuperare tutti i prodotti
    // L'uso di await è necessario per attendere che la richiesta venga completata
    const res = await fetch(url,
        //"Authorization" : `Brearer ${token}`,
    );
    // Converte la risposta in un oggetto JSON
    const products = await res.json();
    // Recupera l'elemento HTML in cui mostrare i prodotti
    const productsContainer = document.getElementById('products-list');

    // Se l'elemento esiste
    if (productsContainer) {
        // Mostra i prodotti nel contenitore HTML
        productsContainer.innerHTML = products.map((product) => `
            <div class='col-12'>
                <span>${product.categoria }</span> / 
                <span>${product.modello}</span> / 
                <span>${product.prezzo}</span> / 
                <a class="btn btn-primary" onclick="getValueForm(${product.id})">Modifica</a>
            </div>
        `).join('');
    }
}


function clearForm(){
    document.getElementById('categoria').value = '';
    document.getElementById('modello').value = '';
    document.getElementById('prezzo').value = '';
}