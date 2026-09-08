const content = document.querySelector("#content");

function renderPage() {
    const page = window.location.hash.substring(1);
//location represente l'url actuel , window = window of brower , .hash = #... , start with the second letter
    switch (page) {
        case "dashboard":
            content.innerHTML = "<h1>Dashboard</h1>";
            break;

        case "offers":
            content.innerHTML = "<h1>Offers</h1>";
            break;

        case "credit":
            content.innerHTML = "<h1>Credit Simulator</h1>";
            break;

        case "rewards":
            content.innerHTML = "<h1>Rewards</h1>";
            break;

        case "flash-sales":
            content.innerHTML = "<h1>Flash Sales</h1>";
            break;

        case "profile":
            content.innerHTML = "<h1>Profile</h1>";
            break;

        case "history":
            content.innerHTML = "<h1>History</h1>";
            break;

        default:
            content.innerHTML = "<h1>Welcome to SmartBank</h1>";
    }
}

window.addEventListener("hashchange", renderPage);

renderPage();