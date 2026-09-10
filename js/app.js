import "./seed.js";
import {getData , addData, saveData, clearData} from "./storage.js";
const content = document.querySelector("#content");


function getCurrentUser() {
    const user = localStorage.getItem("smartbank_current_user");

    return user ? JSON.parse(user) : null;
}

function renderPage() {
    const page = window.location.hash.substring(1);
    //location represente l'url actuel , window = window of brower , .hash = #... , start with the second letter
    const currentUser = getCurrentUser();

    const protectedPages = [
        "dashboard",
        "offers",
        "credit",
        "rewards",
        "flash-sales",
        "profile",
        "history"
    ];

    if (protectedPages.includes(page) && !currentUser) {
        window.location.hash = "signin";
        return;
    }
    switch (page) {
        case "dashboard": {
            const currentUser = getCurrentUser();

            // Récupérer les données
            const simulations = getData("smartbank_simulations");
            const rewards = getData("smartbank_rewards");
            const history = getData("smartbank_history");

            // Garder seulement les données de l'utilisateur connecté
            const userSimulations = simulations.filter(
                simulation => simulation.userId === currentUser.id
            );

            const userRewards = rewards.filter(
                reward => reward.userId === currentUser.id
            );

            const userHistory = history.filter(
                item => item.userId === currentUser.id
            );

            // Les 5 dernières activités
            const recentHistory = userHistory.slice(-5).reverse();


            content.innerHTML = `
                <section class="dashboard">

                    <div class="dashboard-header">
                        <div>
                            <h1>Welcome, ${currentUser.name} 👋</h1>
                            <p>Voici un résumé de votre activité.</p>
                        </div>

                        <button id="logout-btn">Logout</button>
                    </div>

                    <div class="cards">

                        <div class="card">
                            <h3>Credit Simulations</h3>
                            <p class="stat">
                                ${userSimulations.length}
                            </p>
                        </div>

                        <div class="card">
                            <h3>Rewards</h3>
                            <p class="stat">
                                ${userRewards.length}
                            </p>
                        </div>

                        <div class="card">
                            <h3>Activities</h3>
                            <p class="stat">
                                ${userHistory.length}
                            </p>
                        </div>

                    </div>

                    <div class="card recent-activity">
                        <h2>Recent Activity</h2>

                        ${
                            recentHistory.length > 0
                                ? `
                                    <ul>
                                        ${recentHistory.map(item => `
                                            <li>
                                                <strong>${item.action}</strong>
                                                <span>${item.description}</span>
                                            </li>
                                        `).join("")}
                                    </ul>
                                `
                                : `
                                    <p>No recent activity.</p>
                                `
                        }

                    </div>

                    <div class="card profile-summary">
                        <h2>My Profile</h2>

                        <p>
                            <strong>Name:</strong>
                            ${currentUser.name}
                        </p>

                        <p>
                            <strong>Email:</strong>
                            ${currentUser.email}
                        </p>

                        <p>
                            <strong>Created at:</strong>
                            ${new Date(
                                currentUser.createdAt
                            ).toLocaleDateString("fr-FR")}
                        </p>
                    </div>

                </section>
            `;

            document
                .querySelector("#logout-btn")
                .addEventListener("click", logout);

            break;
        }

        case "offers": {
            const offers = getData("smartbank_offers");

            content.innerHTML = `
                <h1>Offers</h1>

                <div class="cards">
                    ${offers.map(offer => `
                        <div class="card">
                            <h2>${offer.title}</h2>

                            <p>
                                <strong>Description:</strong>
                                ${offer.description}
                            </p>

                            <p>
                                <strong>Interest rate:</strong>
                                ${offer.interestRate}%
                            </p>

                            <p>
                                <strong>Maximum amount:</strong>
                                ${offer.maxAmount} DH
                            </p>
                        </div>
                    `).join("")}
                </div>
            `;

            break;
        }

        case "credit":
            content.innerHTML = "<h1>Credit Simulator</h1>";
            break;

        case "rewards":
            content.innerHTML = "<h1>Rewards</h1>";
            break;

        case "flash-sales": {
    const flashSales = getData("smartbank_flash_sales");

            content.innerHTML = `
                <h1>Flash Sales</h1>

                <div class="cards">
                    ${flashSales.map(flashSale => `
                        <div class="card flash-sale-card">

                            <h2>${flashSale.title}</h2>

                            <p>
                                <strong>Description:</strong><br>
                                ${flashSale.description}
                            </p>

                            <span class="flash-sale-discount">
                                -${flashSale.discount}%
                            </span>

                            <div class="flash-sale-end">
                                <strong>End At:</strong>
                                ${new Date(flashSale.endAt).toLocaleString("fr-FR")}
                            </div>

                        </div>
                    `).join("")}
                </div>
            `;

            break;
        }

        case "profile":
            content.innerHTML = "<h1>Profile</h1>";
            break;

        case "history":
            content.innerHTML = "<h1>History</h1>";
            break;

        case "signup": 
            renderSignup();
            break;
            
        case "signin":
            renderSignin();
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

function renderSignin() {
    content.innerHTML = `
        <div class="signin-container">
            <h1>Welcome back</h1>

            <form id="signin-form">

                <div>
                    <label for="signin-email">Email</label>
                    <input
                        type="email"
                        id="signin-email"
                        name="email"
                        required
                    >
                </div>

                <div>
                    <label for="signin-password">Password</label>
                    <input
                        type="password"
                        id="signin-password"
                        name="password"
                        required
                    >
                </div>

                <button type="submit">Sign In</button>

            </form>

            <p id="signin-message"></p>
        </div>
    `;

    const form = document.querySelector("#signin-form");

    form.addEventListener("submit", handleSignin);
}

function handleSignin(event) {
    event.preventDefault();

    const email = document.querySelector("#signin-email").value;
    const password = document.querySelector("#signin-password").value;

    const users = getData("smartbank_users");

    const user = users.find(
        user => user.email === email && user.password === password
    );

    if (!user) {
        document.querySelector("#signin-message").textContent =
            "Email ou mot de passe incorrect.";
        return;
    }

    localStorage.setItem(
        "smartbank_current_user",
        JSON.stringify(user)
    );

    window.location.hash = "dashboard";
}

function logout(){
    clearData("smartbank_current_user");
    window.location.hash = "signin";
}

window.addEventListener("hashchange", renderPage);

renderPage();