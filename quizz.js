let modeSwitcher = carte.querySelector(".mode-switcher");
let quizzBar;

let quizzNbTries = 0;
let score;
let question;

function printNewQuestion() {
    const rdm = Math.floor(Math.random() * json.length - 1);
    let dep = json[rdm];

    question = dep;

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

modeSwitcher.addEventListener("click", (e) => {
    if (isQuizzMode())
        return;

    quizzBar = document.createElement("div");
    quizzBar.classList.add("quizz-bar");
    document.body.appendChild(quizzBar);

    document.body.classList.add("quizz-mode");
    
    modeSwitcher.classList.add("hide");
    printNewQuestion();
    quizzNbTries = 0;

    let quizzClose = document.createElement("div");
    quizzClose.classList.add("quizz-close");

    quizzClose.addEventListener("click", (e) => {
        modeSwitcher.classList.remove("hide");

        quizzBar.remove();

        document.body.classList.remove("quizz-mode");
    });

    quizzBar.appendChild(quizzClose);

    quizzClose.appendChild(document.createElement("div"));
    quizzClose.appendChild(document.createElement("div"));

    score = {
        correct: 0,
        wrong: 0
    };
});

departements.forEach((departement) => {
    departement.addEventListener("click", (e) => {
        if (!isQuizzMode())
            return;

        if (!departement.classList.contains(question.id)) {
            quizzNbTries++;
            if (quizzNbTries > 2) {
                let departementToFind = document.getElementsByClassName("departement " + question.id);
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
        }, 400);

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
