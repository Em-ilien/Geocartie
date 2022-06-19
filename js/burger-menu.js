let menu = document.querySelector(".burger-menu");
let navWindow;

menu.addEventListener("click", (e) => {
    menu.classList.add("is-open");

    setupNavWidow();
});

function setupNavWidow() {
    navWindow = document.createElement("nav");
    navWindow.classList.add("nav-window");
    navWindow.classList.add("window");
    document.body.appendChild(navWindow);

    let closeBtn = document.createElement("span");
    closeBtn.classList.add("close-btn");
    closeBtn.classList.add("btn");
    closeBtn.innerText = "Fermer";
    navWindow.appendChild(closeBtn);
    closeBtn.addEventListener("click", () => {
        closeNavWindow();
        removeFilterWall();
    });

    setupInterfacesNav();

    let linksCtn = document.createElement("div");
    linksCtn.classList.add("links-ctn");
    navWindow.appendChild(linksCtn);

    let xhr = new XMLHttpRequest();
    xhr.open("GET", "ajax/ajax_session.php", true);
    xhr.responseType = "json";
    xhr.onload = function(e) {
        if (xhr.response.status == "success") {
            if (!xhr.response.connected) {
                let connexion = document.createElement("p");
                connexion.classList.add("connexion");
                connexion.innerHTML = '<a href="https://accounts.google.com/o/oauth2/v2/auth?scope=email&access_type=online&redirect_uri=' + xhr.response.redirectUri + '&response_type=code&client_id=' + xhr.response.clientId + '">'
                + 'Se connecter avec Google</a>';
                linksCtn.appendChild(connexion);
            } else {
                let deconnexion = document.createElement("p");
                deconnexion.classList.add("deconnexion");
                deconnexion.innerHTML = '<a href="logout.php">Se déconnecter</a>';
                linksCtn.appendChild(deconnexion);
            }
        }
    }
    xhr.send();

    let contactEl = document.createElement("p");
    contactEl.classList.add("link");
    contactEl.innerHTML = 'Contactez-moi';
    contactEl.addEventListener("click", (e) => {
        showEmailWindow("Message concernant Géocartie", "Monsieur Cosson,\n\n\n"
            + "J'ai découvert l'application Web nommée Géocartie que vous avez réalisée.\n\n"
            + "Je vous adresse ce courriel afin de {SAISISSEZ_UN_MOTIF}.\n\n"
            + "{VEUILLEZ_POURSUIVRE_VOTRE_MESSAGE}\n\n\n"
            + "Je devine l'attention que vous porterez à mon message.\n\n"
            + "Mes sincères salutations,\n{SIGNATURE}");
        
        e.preventDefault();
    });
    linksCtn.appendChild(contactEl);

    let mentionsLegalesEl = document.createElement("p");
    mentionsLegalesEl.innerHTML = '<a href="mentions-legales.php">Mentions légales</a>';
    linksCtn.appendChild(mentionsLegalesEl);

    let codeSourceEl = document.createElement("p");
    codeSourceEl.innerHTML = '<a target="_blank" href="https://github.com/em-ilien/geocartie">Code source</a>';
    linksCtn.appendChild(codeSourceEl);

    setupFilterWall();
}

function closeNavWindow() {
    if (document.querySelector(".nav-window") == null)
        return;
        
    document.body.removeChild(navWindow);
    
    removeFilterWall();
}

function setupInterfacesNav() {
    let interfacesNav = document.createElement("div");
    interfacesNav.classList.add("interfaces-nav");
    navWindow.appendChild(interfacesNav);
    
    let franceCtn = document.createElement("div");
    interfacesNav.appendChild(franceCtn);

    let franceTitle = document.createElement("h1");
    franceTitle.innerText = "France";
    franceCtn.appendChild(franceTitle);

    let europeCtn = document.createElement("div");
    interfacesNav.appendChild(europeCtn);

    let europeTitle = document.createElement("h1");
    europeTitle.innerText = "Europe";
    europeCtn.appendChild(europeTitle);

    let mondeCtn = document.createElement("div");
    interfacesNav.appendChild(mondeCtn);

    let mondeTitle = document.createElement("h1");
    mondeTitle.innerText = "Monde";
    mondeCtn.appendChild(mondeTitle);
    
    let regionsFrance = document.createElement("h2");
    franceCtn.appendChild(regionsFrance);
    regionsFrance.innerText = "Régions";

    let departementsFrance = document.createElement("h2");
    franceCtn.appendChild(departementsFrance);
    departementsFrance.innerText = "Départements";

    let villesFrance = document.createElement("h2");
    franceCtn.appendChild(villesFrance);
    villesFrance.innerText = "Villes";

    let paysEurope = document.createElement("h2");
    europeCtn.appendChild(paysEurope);
    paysEurope.innerText = "Pays";

    let capitalesEurope = document.createElement("h2");
    europeCtn.appendChild(capitalesEurope);
    capitalesEurope.innerText = "Capitales";

    let villesEurope = document.createElement("h2");
    europeCtn.appendChild(villesEurope);
    villesEurope.innerText = "Villes";

    let continentsMonde = document.createElement("h2");
    mondeCtn.appendChild(continentsMonde);
    continentsMonde.innerText = "Continents";

    let paysMonde = document.createElement("h2");
    mondeCtn.appendChild(paysMonde);
    paysMonde.innerText = "Pays";

    let capitalesMonde = document.createElement("h2");
    mondeCtn.appendChild(capitalesMonde);
    capitalesMonde.innerText = "Capitales";

}