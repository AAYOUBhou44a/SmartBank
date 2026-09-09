// Clés utilisées dans le LocalStorage
const STORAGE_KEYS = {
    users: "smartbank_users",
    currentUser: "smartbank_current_user",
    offers: "smartbank_offers",
    simulations: "smartbank_simulations",
    rewards: "smartbank_rewards",
    flashSales: "smartbank_flash_sales",
    history: "smartbank_history"
};


// Récupérer une donnée
export function getData(key) {
    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : [];
}


// Sauvegarder une donnée
export function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}


// Ajouter une donnée
export function addData(key, item) {
    const data = getData(key);

    data.push(item);

    saveData(key, data);
}


// Supprimer toutes les données
export function clearData(key) {
    localStorage.removeItem(key);
}