let modeSwitcher = carte.querySelector(".mode-switcher");

let quizzBar;

let quizzNbTries = 0;
let score = {};
let depToFind = {};



modeSwitcher.addEventListener("click", (e) => {
    if (isQuizzMode())
        return;

    if (quizzBar == undefined)
        setupQuizzBar();

    switchToQuizzMode();
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
        
        setTimeout(() => {
            printNewQuestion();
            quizzNbTries = 0;
        }, 200);

        setTimeout(() => {
            success.remove();
        }, 2000);
        
        if (quizzNbTries <= 2)
            score.correct++;
        else
            score.wrong++;

        updateScore();
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
    const rdm = Math.floor(Math.random() * json.length);
    let dep = json[rdm];
    
    depToFind.id = dep.id;

    let p = quizzBar.querySelector("p");
    if (p == null) {
        p = document.createElement("p");
        quizzBar.appendChild(p);
    }

    p.innerText = "Trouvez le département " + dep.id + " (" + dep.name + ")";
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
    quizzNbTries = 0;

    score = {
        correct: 0,
        wrong: 0
    };
}

function closeQuizzMode() {
    modeSwitcher.classList.remove("hide");
    document.body.removeChild(quizzBar);
    document.body.classList.remove("quizz-mode");
}