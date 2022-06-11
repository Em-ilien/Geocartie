let carte = document.querySelector(".carte");
let departements = carte.querySelectorAll(".departement");
let infos = document.querySelector(".infos");

let smallCrown = carte.querySelector(".paris-petite-couronne");
let smallEnlargedCrown = carte.querySelector(".petite-couronne-agrandie");

let nameDepEl;
let regionDepEl;
let prefDepEl;
let imagesDepCtn;
let warningImages; //Avertissement temporaire pour prévenir de la non-fiabilité des images TODO
let warningImagesSignalement; //TODO
let buttonsLink;
let seeMoreImagesBtn;
let addImagesBtn;

let infoBulle;

let json = getJSONFromFile("data/departements.json");



departements.forEach(departement => {
    let departementID = departement.classList[1];
    let departementInfos = json.filter(function(data){ return data.id == departementID })[0];

    departement.addEventListener("click", (e) => {
        disactivePreviousActiveDepartements();
        
        departement.classList.add("active");

        updateDepInfosEl(departementInfos);
    });

    departement.addEventListener("mousemove", (e) => {
        if (isQuizzMode())
            return;

        if (infoBulle == undefined)
            setupInfoBulle();

        infoBulle.innerHTML = departementInfos.name + " (" + departementInfos.id + ")<br><br>Région : " + departementInfos.region_name + "<br>Préfecture : " + departementInfos.prefecture_name;
        document.body.appendChild(infoBulle);
        infoBulle.style.top = (e.clientY + window.scrollY + 30) + "px";
        infoBulle.style.left = (e.clientX + 10) + "px";
    });

    departement.addEventListener("mouseout", (e) => {
        if (isQuizzMode())
            return;

        if (infoBulle != undefined)
            document.body.removeChild(infoBulle);
    });
});

smallCrown.addEventListener("click", (e) => {
    faireClignoter(smallCrown);
    faireClignoter(smallEnlargedCrown);
});

for (const dep of smallEnlargedCrown.children) {
    dep.addEventListener("click", (e) => {
        smallCrown.classList.add("clignotement-on");
    });
}

function isQuizzMode() {
    return document.body.classList.contains("quizz-mode");
}

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

function disactivePreviousActiveDepartements() {
    let activeDepartement = carte.querySelector("svg .active");
        
    if (activeDepartement) 
        activeDepartement.classList.remove("active");
    if (smallCrown.classList.contains("clignotement-on"))
        smallCrown.classList.remove("clignotement-on");
}

function setupDepInfosEl() {
    infos.querySelector(".default").remove();

    nameDepEl = document.createElement("h2");
    nameDepEl.classList.add("departement-name");
    infos.appendChild(nameDepEl);

    regionDepEl = document.createElement("p");
    regionDepEl.classList.add("region");
    regionDepEl.innerHTML = "Région : <span></span>";
    infos.appendChild(regionDepEl);

    prefDepEl = document.createElement("p");
    prefDepEl.classList.add("prefecture");
    prefDepEl.innerHTML = "Préfecture : <span></span>";
    infos.appendChild(prefDepEl);

    imagesDepCtn = document.createElement("div");
    imagesDepCtn.classList.add("images");
    infos.appendChild(imagesDepCtn);

    warningImages = document.createElement("p"); //Temp TODO
    warningImages.style.textAlign = "justify";
    warningImages.style.fontSize = "0.7em";
    warningImages.style.width = "75%";
    warningImages.style.margin = "0 auto 2em";
    warningImages.style.color = "#777";
    warningImages.innerHTML = "Avertissement : ces images ont été extraites par un algorithme qui a parcouru le Web à leur recherche. Certaines d'entre elles sont susceptibles ne pas être pertinentes, dater, ne pas être libres de droit voire être associées à tort à ce département. Cette mosaïque a pour but de vous faire une idée grossière du département. ";
    infos.appendChild(warningImages);

    warningImagesSignalement = document.createElement("a"); //Temp TODO
    warningImagesSignalement.innerText = "Signaler une image à supprimer.";
    warningImagesSignalement.target = "_blank";
    warningImages.appendChild(warningImagesSignalement);

    buttonsLink = document.createElement("div");
    buttonsLink.classList.add("buttons-link");
    infos.appendChild(buttonsLink);

    seeMoreImagesBtn = document.createElement("a");
    seeMoreImagesBtn.classList.add("see-more-images-btn");
    seeMoreImagesBtn.innerText = "Voir plus d'images sur Google";
    seeMoreImagesBtn.target = "_blank";
    buttonsLink.appendChild(seeMoreImagesBtn);

    addImagesBtn = document.createElement("a");
    addImagesBtn.classList.add("ajouter-images");
    addImagesBtn.innerText = "Suggérer l'ajout d'images";
    addImagesBtn.href = "mailto:emilien.cosson.etu@univ-lemans.fr";
    addImagesBtn.target = "_blank";
    buttonsLink.appendChild(addImagesBtn);
}

function updateDepInfosEl(departementInfos) {
    if (nameDepEl == undefined)
        setupDepInfosEl();

    nameDepEl.innerHTML = departementInfos.name + "<span>" + departementInfos.id + "</span>";
    regionDepEl.children[0].innerText = departementInfos.region_name;
    prefDepEl.children[0].innerText = departementInfos.prefecture_name;

    imagesDepCtn.innerText = "";

    departementInfos.images.forEach((image) => {
        let imgEl = document.createElement("img");
        imgEl.src = image.src;
        imgEl.setAttribute("onclick", "window.open(`" + image.contextLink + "`, '_blank');");
        imgEl.setAttribute("description", image.description);
        imagesDepCtn.appendChild(imgEl);

        imgEl.addEventListener("mouseenter", (e) => {
            if (infoBulle == undefined)
                setupInfoBulle();

            infoBulle.innerHTML = e.target.getAttribute("description");
            document.body.appendChild(infoBulle);
            infoBulle.style.top = (e.clientY + window.scrollY) + "px";
            infoBulle.style.left = e.clientX + "px";
        });

        imgEl.addEventListener("mouseout", (e) => {
            if (infoBulle != undefined)
                document.body.removeChild(infoBulle);
        });
    });

    warningImagesSignalement.setAttribute("onclick", "javascript:window.open(`mailto:emilien.cosson.etu@univ-lemans.fr?subject=Suppression%20d%27une%20image%20sur%20G%C3%A9ocartie&body=Monsieur%20Cosson%2C%0D%0A%0D%0A%0D%0AJ'ai%20d%C3%A9couvert%20l'application%20Web%20nomm%C3%A9e%20G%C3%A9ocartie%20que%20vous%20avez%20r%C3%A9alis%C3%A9e.%0D%0A%0D%0AJe%20vous%20adresse%20ce%20courriel%20afin%20de" + encodeURIComponent(" vous signaler une ou plusieurs images à supprimer pour le département " + departementInfos.id + " (" + departementInfos.name + ") :\n\n- {LIEN_IMAGE}\n-\n-") + "%0D%0A%0D%0AJe%20devine%20l'attention%20que%20vous%20porterez%20%C3%A0%20mon%20message.%0D%0A%0D%0AMes%20sinc%C3%A8res%20salutations%2C%0D%0A%7BSIGNATURE%7D`, 'mail'); event.preventDefault();"); //Temp TODO
    seeMoreImagesBtn.href = "https://www.google.com/search?q=" + encodeURIComponent(departementInfos.name + " département paysage") + "&tbm=isch";
    addImagesBtn.setAttribute("onclick", "javascript:window.open(`mailto:emilien.cosson.etu@univ-lemans.fr?subject=Ajout%20d%27une%20image%20sur%20G%C3%A9ocartie&body=Monsieur%20Cosson%2C%0D%0A%0D%0A%0D%0AJ'ai%20d%C3%A9couvert%20l'application%20Web%20nomm%C3%A9e%20G%C3%A9ocartie%20que%20vous%20avez%20r%C3%A9alis%C3%A9e.%0D%0A%0D%0AJe%20vous%20adresse%20ce%20courriel%20afin%20de" + encodeURIComponent(" vous suggérer l'ajout d'images pour le département " + departementInfos.id + " (" + departementInfos.name + ") :\n\n- {LIEN_IMAGE}\n-\n-") + "%0D%0A%0D%0AJe%20devine%20l'attention%20que%20vous%20porterez%20%C3%A0%20mon%20message.%0D%0A%0D%0AMes%20sinc%C3%A8res%20salutations%2C%0D%0A%7BSIGNATURE%7D`, 'mail'); event.preventDefault();");
    
    //Temp TODO
    if (departementInfos.verification)
        warningImages.style.display = "none";
    else
        warningImages.style.display = "block";
}

function setupInfoBulle() {
    infoBulle = document.createElement("span");
    infoBulle.classList.add("info-bulle");
}

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
