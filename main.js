let carte = document.querySelector(".carte");
let departements = carte.querySelectorAll(".departement");
let descriptionDepartements = carte.querySelector(".description");
let infos = document.querySelector(".infos");

let json = getJSONFromFile("data/departements.json");

let petiteCouronne = carte.querySelector(".paris-petite-couronne");
let petiteCouronneagrandie = carte.querySelector(".petite-couronne-agrandie");

let modeSwitcher = carte.querySelector(".mode-switcher");

let quizzNbEssais = 0;
let score;

function getJSONFromFile(url) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send();
    if (xhr.status != 200) {
        console.log(xhr.status + ': ' + xhr.statusText);
    } else {
        return JSON.parse(xhr.responseText);
    }
}

departements.forEach(departement => {
    let departementID = departement.classList[1];
    let departementInfos = json.filter(function(data){ return data.id == departementID })[0];

    departement.addEventListener("click", (e) => {
        let activeDepartement = carte.querySelector("svg .active");

        if (activeDepartement)
            activeDepartement.classList.remove("active");
        if (petiteCouronne.classList.contains("clignotement-on"))
            petiteCouronne.classList.remove("clignotement-on");
        
        departement.classList.add("active");
      
        infos.innerHTML = "";

        let infosDepartementName = document.createElement("h2");
        infosDepartementName.classList.add("departement-name");
        infosDepartementName.innerText = departementInfos.name;
        infos.appendChild(infosDepartementName);

        let infosDepartementID = document.createElement("span");
        infosDepartementID.innerText = departementInfos.id;
        infosDepartementName.appendChild(infosDepartementID);

        let infosDepartementRegion = document.createElement("p");
        infosDepartementRegion.classList.add("region");
        infosDepartementRegion.innerHTML = "Région : <span>" + departementInfos.region_name + "</span>";
        infos.appendChild(infosDepartementRegion);

        let infosDepartementPrefecture = document.createElement("p");
        infosDepartementPrefecture.classList.add("prefecture");
        infosDepartementPrefecture.innerHTML = "Préfecture : <span>" + departementInfos.prefecture_name + "</span>";
        infos.appendChild(infosDepartementPrefecture);

        let infosDepartementImages = document.createElement("div");
        infosDepartementImages.classList.add("images");
        infos.appendChild(infosDepartementImages);

        departementInfos.images.forEach((image) => {
            let imgEl = document.createElement("img");
            imgEl.src = image.src;
            imgEl.setAttribute("onclick", "window.open(`" + image.contextLink + "`, '_blank');");
            imgEl.setAttribute("description", image.description);
            infosDepartementImages.appendChild(imgEl);
    
            imgEl.addEventListener("mouseenter", (e) => {
                let description = document.querySelector(".description");
                description.innerHTML = e.target.getAttribute("description");
                description.classList.add("show");
                description.style.top = (e.clientY + window.scrollY) + "px";
                description.style.left = e.clientX + "px";
            });
    
            imgEl.addEventListener("mouseout", (e) => {
                let description = document.querySelector(".description");
                description.classList.remove("show");
            });
        });

        let buttonsLink = document.createElement("div");
        buttonsLink.classList.add("buttons-link");
        infos.appendChild(buttonsLink);

        let voirPlusImages = document.createElement("a");
        voirPlusImages.classList.add("voir-plus-images");
        voirPlusImages.innerText = "Voir plus d'images sur Google";
        voirPlusImages.href = "https://www.google.com/search?q=" + encodeURIComponent(departementInfos.name + " département paysage") + "&tbm=isch";
        voirPlusImages.target = "_blank";
        buttonsLink.appendChild(voirPlusImages);

        let ajouterImages = document.createElement("a");
        ajouterImages.classList.add("ajouter-images");
        ajouterImages.innerText = "Suggérer l'ajout d'images";
        ajouterImages.href = "https://www.google.com/search?q=" + encodeURIComponent(departementInfos.name + " département paysage") + "&tbm=isch";
        ajouterImages.target = "_blank";
        ajouterImages.setAttribute("onclick", "javascript:window.open(`mailto:emilien.cosson.etu@univ-lemans.fr?subject=Ajout%20d%27une%20image%20sur%20G%C3%A9ocartie&body=Monsieur%20Cosson%2C%0D%0A%0D%0A%0D%0AJ'ai%20d%C3%A9couvert%20l'application%20Web%20nomm%C3%A9e%20G%C3%A9ocartie%20que%20vous%20avez%20r%C3%A9alis%C3%A9e.%0D%0A%0D%0AJe%20vous%20adresse%20ce%20courriel%20afin%20de" + encodeURIComponent(" vous suggérer l'ajout d'images pour le département " + departementInfos.id + " (" + departementInfos.name + ") :\n\n- {LIEN_IMAGE}\n-\n-") + "%0D%0A%0D%0AJe%20devine%20l'attention%20que%20vous%20porterez%20%C3%A0%20mon%20message.%0D%0A%0D%0AMes%20sinc%C3%A8res%20salutations%2C%0D%0A%7BSIGNATURE%7D`, 'mail'); event.preventDefault();");
        buttonsLink.appendChild(ajouterImages);
    });

    departement.addEventListener("mousemove", (e) => {
        if (isQuizzMode())
            return;

        descriptionDepartements.innerHTML = departementInfos.name + " (" + departementInfos.id + ")<br><br>Région : " + departementInfos.region_name + "<br>Préfecture : " + departementInfos.prefecture_name;
        descriptionDepartements.classList.add("show");
        descriptionDepartements.style.top = (e.clientY + window.scrollY + 30) + "px";
        descriptionDepartements.style.left = (e.clientX + 10) + "px";
    });

    departement.addEventListener("mouseout", (e) => {
        if (isQuizzMode())
            return;

        descriptionDepartements.classList.remove("show");
    });
});

function faireClignoter(element) {
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            element.classList.add("clignotement-on");
        }, 2*i*100);

        setTimeout(() => {
            element.classList.remove("clignotement-on");
        }, 2*i*100+100);
    }
}

petiteCouronne.addEventListener("click", (e) => {
    faireClignoter(petiteCouronne);
    faireClignoter(petiteCouronneagrandie);
});

for (const dep of petiteCouronneagrandie.children) {
    dep.addEventListener("click", (e) => {
        petiteCouronne.classList.add("clignotement-on");
    });
}

let question;

function isQuizzMode() {
    return modeSwitcher.classList.contains("hide");
}

function printNewQuestion() {
    const rdm = Math.floor(Math.random() * json.length - 1);
    let dep = json[rdm];

    question = dep;
    
    let quizzBar = document.querySelector(".quizz-bar");

    let p = quizzBar.querySelector("p");
    if (p == null)
        p = document.createElement("p");

    p.innerText = "Trouvez le département " + dep.id + " (" + dep.name + ")";

    quizzBar.appendChild(p);

    quizzNbEssais = 0;
}

modeSwitcher.addEventListener("click", (e) => {
    if (isQuizzMode())
        return;

    let quizzBar = document.createElement("div");
    quizzBar.classList.add("quizz-bar");
    document.body.appendChild(quizzBar);

    document.body.style.marginTop = "3em";
    
    modeSwitcher.classList.add("hide");
    printNewQuestion();

    let quizzClose = document.createElement("div");
    quizzClose.classList.add("quizz-close");

    quizzClose.addEventListener("click", (e) => {
        modeSwitcher.classList.remove("hide");

        let quizzBar = document.querySelector(".quizz-bar");
        quizzBar.remove();

        document.body.style.marginTop = "unset";
    });

    quizzBar.appendChild(quizzClose);

    quizzClose.appendChild(document.createElement("div"));
    quizzClose.appendChild(document.createElement("div"));

    score = {
        correct: 0,
        wrong: 0
    };
});

function updateScore() {
    let scoreElement = document.querySelector(".score");
    if (scoreElement == null) {
        scoreElement = document.createElement("span");
        scoreElement.classList.add("score");

        let quizzBar = document.querySelector(".quizz-bar");
        quizzBar.appendChild(scoreElement);
    }

    scoreElement.innerText = "Score : " + score.correct + "/" + (score.correct + score.wrong);
}

departements.forEach((departement) => {
    departement.addEventListener("click", (e) => {
        if (!isQuizzMode())
            return;

        let quizzBar = document.querySelector(".quizz-bar");
        
        if (!departement.classList.contains(question.id)) {
            quizzNbEssais++;
            if (quizzNbEssais > 2) {
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
        }, 400);

        setTimeout(() => {
            success.remove();
        }, 2000);
        
        if (quizzNbEssais <= 2)
            score.correct++;
        else
            score.wrong++;

        updateScore();
    });
});
