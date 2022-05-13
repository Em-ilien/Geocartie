let carte = document.querySelector(".carte");
let departements = carte.querySelectorAll(".departement");
let descriptionDepartements = carte.querySelector(".description");
let infos = document.querySelector(".infos");

let json = getJSONFromFile("data/departements.json");

let petiteCouronne = carte.querySelector(".paris-petite-couronne");
let petiteCouronneagrandie = carte.querySelector(".petite-couronne-agrandie");

let modeSwitcher = document.querySelector(".mode-switcher");

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
        let activeDepartement = document.querySelector(".active");
        if (activeDepartement)
            activeDepartement.classList.remove("active");
        if (petiteCouronne.classList.contains("active-paris"))
            petiteCouronne.classList.remove("active-paris");
        
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


petiteCouronne.addEventListener("click", (e) => {
    for (let i = 0; i < 10; i++) {
        if (i % 2 == 0) {
            setTimeout(() => {
                petiteCouronneagrandie.classList.add("active-paris");
                petiteCouronne.classList.add("active-paris");
            }, i*100);
        } else {
            setTimeout(() => {
                petiteCouronneagrandie.classList.remove("active-paris");
                petiteCouronne.classList.remove("active-paris");
            }, i*100);
        }	
    }
});

for (const dep of petiteCouronneagrandie.children) {
    dep.addEventListener("click", (e) => {
        petiteCouronne.classList.add("active-paris");
    });
}

let question;

function isQuizzMode() {
    return modeSwitcher.classList.contains("active")
}

function getNewQuestion() {
    const rdm = Math.floor(Math.random() * json.length - 1);
    let dep = json[rdm];

    question = dep;
    return "Trouvez le département " + dep.name + " (" + dep.id + ")";
}

modeSwitcher.addEventListener("click", (e) => {
    if (isQuizzMode())
        modeSwitcher.classList.remove("active");
    else {
        modeSwitcher.classList.add("active");

        let quizzEl = document.createElement("div");
        quizzEl.classList.add("quizz");
        document.body.appendChild(quizzEl);

        let questionQuizz = document.createElement("p");
        questionQuizz.innerHTML = getNewQuestion();
        quizzEl.appendChild(questionQuizz);
    }
});

departements.forEach((departement) => {
    departement.addEventListener("click", (e) => {
        if (isQuizzMode()) {
            let quizzEl = document.querySelector(".quizz");
    
            let questionQuizz = quizzEl.children[0];

            if (departement.classList.contains(question.id)) {
                questionQuizz.innerHTML = getNewQuestion();
            } else
                questionQuizz.innerHTML = "Trouvez le département " + question.name + " (" + question.id + ")";
        }
    });
});