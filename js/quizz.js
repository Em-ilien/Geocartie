let modeSwitcher = carte.querySelector(".mode-switcher");

let quizzBar;

let nbTries = 0;
let departementToFind = {};

let score;
let departementsToRework = [];

class DepartementToRework {
    constructor(id, amount) {
        this.id = id;
        this.amount = amount;
    }

    getId() {
        return this.id;
    }

    getAmount() {
        return this.amount;
    }

    setAmount(amount) {
        this.amount = amount;
    }
}


let foundDepartements = [
    {
        time: 0,
        departements: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "2A", "2B", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95"]
    } 
];
let lastAskedDepartement = [];

let userLoggedIn;

let loginPopup;



//When JS is loaded
window.addEventListener("load", () => {
    getVariablesFromSession();
});

modeSwitcher.addEventListener("click", (e) => {
    if (isQuizzModeEnabled())
        return;

    if (quizzBar == undefined) {
        setupQuizzBar();

        nbTries = 0;

        if (score == undefined)
            score = {
                correct: 0,
                wrong: 0
            };
    }

    switchToQuizzMode();

    updateScore();

    if (!userLoggedIn)
        showLoginPopupInvitation();
});

departements.forEach((departement) => {
    departement.addEventListener("click", (e) => {
        if (!isQuizzModeEnabled())
            return;

        if (!departement.classList.contains(departementToFind.id)) {
            nbTries++;
            if (nbTries > 2) {
                let departementEl = document.getElementsByClassName("departement " + departementToFind.id);
                doFlash(departementEl[0]);
            }
            return;
        }

        let success = document.createElement("span");
        success.classList.add("notification");
        success.classList.add("success");
        success.innerHTML = "Trouvé !";
        document.body.appendChild(success);
        
        if (nbTries <= 2) {
            score.correct++;
            departementsToRework.forEach(dep => {
                if (dep.id == departementToFind.id) {
                    if (dep.amount > 1) {
                        dep.amount = dep.amount - 1;
                    } else {
                        //Delete dep from departementsToRework
                        departementsToRework.splice(departementsToRework.indexOf(dep), 1);
                    }
                }
            });
        } else {
            score.wrong++;
            let found = false;
            departementsToRework.forEach(dep => {
                if (dep.id == departementToFind.id) {
                    dep.amount = 2;
                    found = true;
                }
            });
            if (!found) {
                let departementToRework = new DepartementToRework(departementToFind.id, 3);
                departementsToRework.push(departementToRework);
            }
        }

        if (lastAskedDepartement.length > 6)
            lastAskedDepartement.shift();
        lastAskedDepartement.push(departementToFind.id);

        setTimeout(() => {
            printNewQuestion();
            nbTries = 0;
        }, 200);

        setTimeout(() => {
            success.remove();
        }, 2000);

        updateScore();
        updateVariablesInSession();

        for (let i = 0; i < foundDepartements.length; i++) {
            if (foundDepartements[i].departements.includes(departementToFind.id)) {
                foundDepartements[i].departements.splice(foundDepartements[i].departements.indexOf(departementToFind.id), 1);
                if (foundDepartements[i+1] == undefined)
                    foundDepartements.push({
                        time: i+1,
                        departements: []
                    });
                
                foundDepartements[i+1].departements.push(departementToFind.id);
                break;
            }
        }
    });
});



function setupQuizzBar() {
    quizzBar = document.createElement("div");
    quizzBar.classList.add("quizz-bar");

    let quizzClose = document.createElement("div");
    quizzClose.classList.add("quizz-close");

    quizzClose.addEventListener("click", (e) => {
        document.querySelector(".burger-menu").style.top = "unset";
        closeQuizzMode();
    });

    quizzBar.appendChild(quizzClose);

    quizzClose.appendChild(document.createElement("div"));
    quizzClose.appendChild(document.createElement("div"));

    document.querySelector(".burger-menu").style.top = "7.5vh";
}

function getDepartementIDOfNewQuestion() {
    for (let i = 0; i < departementsToRework.length; i++) {
        const dep = departementsToRework[i];
        if (lastAskedDepartement.includes(dep.id))
            continue;
        
        return dep.id;
    }

    for (let k = 0; k < 10000; k++) {
        for (let i = 0; i < foundDepartements.length; i++) {
            for (let j = 0; j < 5; j++) {
                j++;
                const rdm = Math.floor(Math.random() * foundDepartements[i].departements.length);
                const dep = foundDepartements[i].departements[rdm];
                if (lastAskedDepartement.includes(dep))
                    continue;
                if (dep == undefined)
                    continue;

                return dep;
            }
        }
    }

    window.alert("Erreur : impossible de trouver un département à afficher");
}

function printNewQuestion() {
    departementToFind.id = getDepartementIDOfNewQuestion();
    departementToFind.name = json.filter(function(data){ return data.id == departementToFind.id })[0].name;
    
    let p = quizzBar.querySelector("p");
    if (p == null) {
        p = document.createElement("p");
        quizzBar.appendChild(p);
    }

    p.innerText = (score.correct >= 3 ? "" : "Cherchez le département ") + departementToFind.name + " (" + departementToFind.id + ")";
}

function updateScore() {
    let scoreElement = document.querySelector(".score");
    
    if (scoreElement == null) {
        scoreElement = document.createElement("span");
        scoreElement.classList.add("score");

        quizzBar.appendChild(scoreElement);
    }

    scoreElement.innerText = score.correct + "/" + (score.correct + score.wrong);
}

function switchToQuizzMode() {
    document.body.appendChild(quizzBar);

    document.body.classList.add("quizz-mode");
    
    modeSwitcher.classList.add("hide");
    printNewQuestion();
}

function closeQuizzMode() {
    modeSwitcher.classList.remove("hide");
    document.body.removeChild(quizzBar);
    document.body.classList.remove("quizz-mode");
}

function updateVariablesInSession() {
    const data = new FormData();
    data.append("score", JSON.stringify(score));
    data.append("departementsToRework", JSON.stringify(departementsToRework));
    data.append("foundDepartements", JSON.stringify(foundDepartements));

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "ajax/ajax_quizz_post_variables.php", true);
    xhr.responseType = "json";
    xhr.onload = function() {
        console.log(xhr.response);
        if (xhr.response.status == "success") {
            console.log("Variables updated in session");
        }
    }
    xhr.send(data);
}

function getVariablesFromSession() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "ajax/ajax_quizz_get_variables.php", true);
    xhr.responseType = "json";
    xhr.onload = function() {
        console.log(xhr.response);

        if (xhr.response.connected)
            userLoggedIn = true;
        else
            userLoggedIn = false;

        if (xhr.response.status == "success") {
            score = xhr.response.score;
            departementsToRework = xhr.response.departementsToRework;
            foundDepartements = xhr.response.foundDepartements;

            setupQuizzBar();
            nbTries = 0;
            switchToQuizzMode();        
            updateScore();
        } else if (xhr.response.status == "error" && xhr.response.message.includes("No data found")) {
            setupQuizzBar();
            nbTries = 0;        
            score = {
                correct: 0,
                wrong: 0
            };
            switchToQuizzMode();
            updateScore();
        }
    }
    xhr.send();
}

function showLoginPopupInvitation() {
    loginPopup = document.createElement("div");
    loginPopup.classList.add("login-popup-window");
    loginPopup.classList.add("window");
    document.body.appendChild(loginPopup);

    let popupTitle = document.createElement("h1");
    popupTitle.innerText = "Sauvegardez votre progression";
    loginPopup.appendChild(popupTitle);

    let xhr = new XMLHttpRequest();
    xhr.open("GET", "ajax/ajax_session.php", true);
    xhr.responseType = "json";
    xhr.onload = function(e) {
        if (xhr.response.status == "success") {
            let loginBtn = document.createElement("span");
            loginBtn.innerText = "Se connecter avec Google";
            loginBtn.classList.add("login-btn");
            loginBtn.classList.add("btn");
            loginPopup.appendChild(loginBtn);
            loginBtn.addEventListener("click", () => {
                closeLoginPopup();
                window.open("https://accounts.google.com/o/oauth2/v2/auth?scope=email&access_type=online&redirect_uri=" + xhr.response.redirectUri + "&response_type=code&client_id=" + xhr.response.clientId, "_self");
            });

            let dontLoginBtn = document.createElement("span");
            dontLoginBtn.innerText = "Continuer hors-ligne";
            dontLoginBtn.classList.add("dont-login-btn");
            dontLoginBtn.classList.add("btn");
            loginPopup.appendChild(dontLoginBtn);
            dontLoginBtn.addEventListener("click", () => {
                closeLoginPopup();
            });

            let loginDescription = document.createElement("p");
            loginDescription.innerText = "Votre score et autres données relatives au Quizz seront enregistrés entre chaque session. Optimal pour l'apprentissage !";
            loginPopup.appendChild(loginDescription);
        }
    }
    xhr.send();

    let loginClose = document.createElement("span");
    loginClose.classList.add("login-close-btn");
    loginClose.classList.add("btn");
    loginClose.innerText = "Fermer";
    loginClose.addEventListener("click", (e) => {
        closeLoginPopup();
    });
    loginPopup.appendChild(loginClose);

    setupFilterWall();
}

function closeLoginPopup() {
    document.body.removeChild(loginPopup);
    removeFilterWall();
}