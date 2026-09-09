import "./seed.js";
import {getData , addData} from "./storage.js";
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

        case "signup": 
            renderSignup();
            break;

        default:
            content.innerHTML = "<h1>Welcome to SmartBank</h1>";
    }
}

function renderSignup() {
    content.innerHTML = `
        <div class="signup-container">
            <h1>Create your account</h1>

            <form id="signup-form">

                <div>
                    <label for="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                    >
                </div>

                <div>
                    <label for="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                    >
                </div>

                <div>
                    <label for="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                    >
                </div>

                <button type="submit">Create account</button>

            </form>

            <p id="signup-message"></p>
        </div>
    `;

        const form = document.querySelector("#signup-form");

    form.addEventListener("submit", handleSignup);
}

function handleSignup(event) {
    event.preventDefault();

    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    const users = getData("smartbank_users");

    const emailExists = users.some(user => user.email === email);

    if (emailExists) {
        document.querySelector("#signup-message").textContent =
            "Cet email est déjà utilisé.";
        return;
    }

    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password,
        createdAt: new Date().toISOString()
    };

    addData("smartbank_users", newUser);

    document.querySelector("#signup-message").textContent =
        "Compte créé avec succès !";

    event.target.reset();
}

window.addEventListener("hashchange", renderPage);

renderPage();