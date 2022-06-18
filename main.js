let carte = document.querySelector(".carte");
let departements = carte.querySelectorAll(".departement");
let infos = document.querySelector(".infos");

let smallCrown = carte.querySelector(".paris-petite-couronne");
let smallEnlargedCrown = carte.querySelector(".petite-couronne-agrandie");

let depInfos = {
    name: null,
    region: null,
    prefecture: null,
    images: null,
    buttonsLink: null,
    seeMoreImagesBtn: null,
    addImagesBtn: null
}

let defaultInfos = infos.querySelector(".default");

let infoBulle;

let json = getJSONFromFile("data/departements.json");



departements.forEach(departement => {
    let departementID = departement.classList[1];
    let depJSON = json.filter(function(data){ return data.id == departementID })[0];

    departement.addEventListener("click", (e) => {
        disactivePreviousActiveDepartements();
        
        departement.classList.add("active");

        updateDepInfosEl(depJSON);
    });

    departement.addEventListener("mousemove", (e) => {
        if (isQuizzMode())
            return;

        if (infoBulle == undefined)
            setupInfoBulle();

        infoBulle.innerHTML = depJSON.name + " (" + depJSON.id + ")<br><br>Région : " + depJSON.region_name + "<br>Préfecture : " + depJSON.prefecture_name;
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

for (const departement of smallEnlargedCrown.children) {
    departement.addEventListener("click", (e) => {
        smallCrown.classList.add("clignotement-on");
    });
}

carte.querySelectorAll("svg g path, svg g polyline").forEach(p => {
    p.addEventListener("click", (e) => {
        e.stopPropagation();
    });
});

carte.firstElementChild.addEventListener("click", (e) => {
    infos.remove();
    infos = document.createElement("div");
    infos.classList.add("infos");
    document.body.appendChild(infos);
    infos.appendChild(defaultInfos);

    disactivePreviousActiveDepartements();

    depInfos.name = null;
    
    carte.style.cursor = "unset";
    document.body.removeChild(infoBulle);
});

carte.addEventListener("mouseover", (e) => {
    if (e.target != carte && e.target != carte.firstElementChild)
        return;

    if (depInfos.name == null)
        return;
    
    carte.style.backgroundColor = "#eee";
    carte.style.cursor = "pointer";

    if (infoBulle == undefined)
        setupInfoBulle();

    infoBulle.innerHTML = "Afficher la page d'accueil";
    document.body.appendChild(infoBulle);
});

carte.addEventListener("mouseout", (e) => {
    if (e.target != carte && e.target != carte.firstElementChild)
        return;

    carte.style.backgroundColor = "#fff";
    carte.style.cursor = "unset";
});

carte.addEventListener("mousemove", (e) => {
    infoBulle.style.top = (e.clientY + window.scrollY + 30) + "px";
    infoBulle.style.left = (e.clientX + 10) + "px";
});



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

//Avertissement temporaire pour prévenir de la non-fiabilité des images TODO
let warningImages;
let warningImagesSignalement;
//End

function setupDepInfosEl() {
    infos.removeChild(defaultInfos);

    depInfos.name = document.createElement("h2");
    depInfos.name.classList.add("departement-name");
    infos.appendChild(depInfos.name);

    depInfos.region = document.createElement("p");
    depInfos.region.classList.add("region");
    depInfos.region.innerHTML = "Région : <span></span>";
    infos.appendChild(depInfos.region);

    depInfos.prefecture = document.createElement("p");
    depInfos.prefecture.classList.add("prefecture");
    depInfos.prefecture.innerHTML = "Préfecture : <span></span>";
    infos.appendChild(depInfos.prefecture);

    depInfos.images = document.createElement("div");
    depInfos.images.classList.add("images");
    infos.appendChild(depInfos.images);

    //Avertissement temporaire pour prévenir de la non-fiabilité des images TODO
    warningImages = document.createElement("p");
    warningImages.style.textAlign = "justify";
    warningImages.style.fontSize = "0.7em";
    warningImages.style.width = "75%";
    warningImages.style.margin = "0 auto 2em";
    warningImages.style.color = "#777";
    warningImages.innerHTML = "Avertissement : ces images ont été extraites par un algorithme qui a parcouru le Web à leur recherche. Certaines d'entre elles sont susceptibles ne pas être pertinentes, de dater, de ne pas être libres de droit voire d'être associées à tort à ce département. Cette mosaïque a pour but de vous faire une idée grossière du département. ";
    infos.appendChild(warningImages);
    warningImagesSignalement = document.createElement("a");
    warningImagesSignalement.innerText = "Signaler une image à supprimer.";
    warningImagesSignalement.target = "_blank";
    warningImages.appendChild(warningImagesSignalement);
    //End

    depInfos.buttonsLink = document.createElement("div");
    depInfos.buttonsLink.classList.add("buttons-link");
    infos.appendChild(depInfos.buttonsLink);

    depInfos.seeMoreImagesBtn = document.createElement("a");
    depInfos.seeMoreImagesBtn.classList.add("see-more-images-btn");
    depInfos.seeMoreImagesBtn.innerText = "Voir plus d'images sur Google";
    depInfos.seeMoreImagesBtn.target = "_blank";
    depInfos.buttonsLink.appendChild(depInfos.seeMoreImagesBtn);

    depInfos.addImagesBtn = document.createElement("a");
    depInfos.addImagesBtn.classList.add("ajouter-images");
    depInfos.addImagesBtn.innerText = "Suggérer l'ajout d'images";
    depInfos.addImagesBtn.href = "mailto:emilien@em-ilien.fr";
    depInfos.addImagesBtn.target = "_blank";
    depInfos.buttonsLink.appendChild(depInfos.addImagesBtn);
}

function updateDepInfosEl(depJSON) {
    if (depInfos.name == undefined)
        setupDepInfosEl();

    depInfos.name.innerHTML = depJSON.name + "<span>" + depJSON.id + "</span>";
    depInfos.region.children[0].innerText = depJSON.region_name;
    depInfos.prefecture.children[0].innerText = depJSON.prefecture_name;

    depInfos.images.innerText = "";

    depJSON.images.forEach((image) => {
        let imgEl = document.createElement("img");
        imgEl.src = image.src;
        imgEl.setAttribute("onclick", "window.open(`" + image.contextLink + "`, '_blank');");
        imgEl.setAttribute("description", image.description);
        depInfos.images.appendChild(imgEl);

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

    depInfos.seeMoreImagesBtn.href = "https://www.google.com/search?q=" + encodeURIComponent(depJSON.name + " département paysage") + "&tbm=isch";
    depInfos.addImagesBtn.setAttribute("onclick", "javascript:window.open(`mailto:emilien@em-ilien.fr?subject=Ajout%20d%27une%20image%20sur%20G%C3%A9ocartie&body=Monsieur%20Cosson%2C%0D%0A%0D%0A%0D%0AJ'ai%20d%C3%A9couvert%20l'application%20Web%20nomm%C3%A9e%20G%C3%A9ocartie%20que%20vous%20avez%20r%C3%A9alis%C3%A9e.%0D%0A%0D%0AJe%20vous%20adresse%20ce%20courriel%20afin%20de" + encodeURIComponent(" vous suggérer l'ajout d'images pour le département " + depJSON.id + " (" + depJSON.name + ") :\n\n- {LIEN_IMAGE}\n-\n-") + "%0D%0A%0D%0AJe%20devine%20l'attention%20que%20vous%20porterez%20%C3%A0%20mon%20message.%0D%0A%0D%0AMes%20sinc%C3%A8res%20salutations%2C%0D%0A%7BSIGNATURE%7D`, 'mail'); event.preventDefault();");
    
    //Avertissement temporaire pour prévenir de la non-fiabilité des images TODO
    warningImagesSignalement.setAttribute("onclick", "javascript:window.open(`mailto:emilien@em-ilien.fr?subject=Suppression%20d%27une%20image%20sur%20G%C3%A9ocartie&body=Monsieur%20Cosson%2C%0D%0A%0D%0A%0D%0AJ'ai%20d%C3%A9couvert%20l'application%20Web%20nomm%C3%A9e%20G%C3%A9ocartie%20que%20vous%20avez%20r%C3%A9alis%C3%A9e.%0D%0A%0D%0AJe%20vous%20adresse%20ce%20courriel%20afin%20de" + encodeURIComponent(" vous signaler une ou plusieurs images à supprimer pour le département " + depJSON.id + " (" + depJSON.name + ") :\n\n- {LIEN_IMAGE}\n-\n-") + "%0D%0A%0D%0AJe%20devine%20l'attention%20que%20vous%20porterez%20%C3%A0%20mon%20message.%0D%0A%0D%0AMes%20sinc%C3%A8res%20salutations%2C%0D%0A%7BSIGNATURE%7D`, 'mail'); event.preventDefault();");
    if (depJSON.verification)
        warningImages.style.display = "none";
    else
        warningImages.style.display = "block";
    //End
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
