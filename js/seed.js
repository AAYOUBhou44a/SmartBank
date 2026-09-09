import { saveData, getData } from "./storage.js";

const offers = [
    {
        id: 1,
        title: "Crédit Auto",
        description: "Financez votre nouvelle voiture",
        interestRate: 4.5,
        maxAmount: 100000
    },
    {
        id: 2,
        title: "Crédit Personnel",
        description: "Un financement adapté à vos projets",
        interestRate: 5.2,
        maxAmount: 80000
    }
];

const flashSales = [
    {
        id: 1,
        title: "AliExpress Flash Sale",
        description: "Jusqu'à 30% de réduction",
        discount: 30,
        endAt: "2026-09-10T18:00:00"
    }
];

if (getData("smartbank_offers").length === 0) {
    saveData("smartbank_offers", offers);
}

if (getData("smartbank_flash_sales").length === 0) {
    saveData("smartbank_flash_sales", flashSales);
}