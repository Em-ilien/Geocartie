let modeSwitcher = carte.querySelector(".mode-switcher");

let quizzBar;

let quizzNbTries = 0;
let score = {};
let depToFind = {};
let departementsFound = [];
let mistakes = [];



modeSwitcher.addEventListener("click", (e) => {
    if (isQuizzMode())
        return;

    if (quizzBar == undefined) {
        setupQuizzBar();

        quizzNbTries = 0;

        score = {
            correct: 0,
            wrong: 0
        };
    }

    switchToQuizzMode();

    updateScore();
});

departements.forEach((departement) => {
    departement.addEventListener("click", (e) => {
        if (!isQuizzMode())
            return;

        if (!departement.classList.contains(depToFind.id)) {
            quizzNbTries++;
            if (quizzNbTries > 2) {
                let departementToFind = document.getElementsByClassName("departement " + depToFind.id);
                faireClignoter(departementToFind[0]);
            }
            return;
        }

        let success = document.createElement("span");
        success.classList.add("notification");
        success.classList.add("success");
        success.innerHTML = "Trouvé !";
        document.body.appendChild(success);
        
        if (quizzNbTries <= 2)
            score.correct++;
        else {
            score.wrong++;
            mistakes.push(depToFind);
        }

        setTimeout(() => {
            printNewQuestion();
            quizzNbTries = 0;
        }, 200);

        setTimeout(() => {
            success.remove();
        }, 2000);

        updateScore();
        departementsFound.push({depID: depToFind.id, quizzNbTries: quizzNbTries});
    });
});



function setupQuizzBar() {
    quizzBar = document.createElement("div");
    quizzBar.classList.add("quizz-bar");

    let quizzClose = document.createElement("div");
    quizzClose.classList.add("quizz-close");

    quizzClose.addEventListener("click", (e) => {
        closeQuizzMode();
    });

    quizzBar.appendChild(quizzClose);

    quizzClose.appendChild(document.createElement("div"));
    quizzClose.appendChild(document.createElement("div"));
}

function printNewQuestion() {
    if (mistakes.length > 0 && Math.random() < 0.1) {
        let mistake = mistakes.shift();
        depToFind = mistake;
    } else {
        do {
            const rdm = Math.floor(Math.random() * json.length);
            depToFind = json[rdm];
        } while (departementsFound.slice(-5).find(d => d.depID == depToFind.id) != undefined);
    }
    
    let p = quizzBar.querySelector("p");
    if (p == null) {
        p = document.createElement("p");
        quizzBar.appendChild(p);
    }

    p.innerText = (score.correct >= 3 ? "" : "Cherchez le département ") + depToFind.name + " (" + depToFind.id + ")";
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