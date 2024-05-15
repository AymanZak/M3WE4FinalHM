// Costanti e variabili globali
const API_URL = 'https://6644997e6c6a6565870b3f91.mockapi.io/products/';
const PRODUCTS_CONTAINER_ID = 'products-list';

/**
 * Funzione chiamata all'avvio della pagina per mostrare i prodotti
 * 
 * Chiama la funzione "showUsers" ogni volta che si carica la pagina.
 */
window.onload = async () => {
    // Chiama la funzione "showProdtti" per mostrare i prodotti
    await showProducts();
}

/**
 * Funzione per ottenere i prodotti dall'API e mostrarli nella pagina.
 * 

 * La stringa viene infine assegnata all'elemento HTML con l'ID products-list".
 */
async function showProducts() {
    // Richiedi i prodotti dall'API
    const response = await fetch(API_URL);
    // Converte la risposta in JSON
    const products = await response.json();

    // Ottieni l'elemento HTML in cui mostrare i prodotti
    const productsContainer = document.getElementById(PRODUCTS_CONTAINER_ID);

    // Se l'elemento esiste...
    if (productsContainer) {
        // ...mostra i prodotti
        productsContainer.innerHTML = products.map(product => {
            // Crea un elemento HTML per l'utente
            return `
                <div class='col-12'>
                    <span>${products.categoria}</span> / 
                    <span>${products.modello}</span> / 
                    <span>${products.prezzo}</span> / 
                    <a class="btn btn-primary" href="./gestione.html?id=${products.id}">Modifica</a>
                </div>
            `;
        }).join('');
    }
}