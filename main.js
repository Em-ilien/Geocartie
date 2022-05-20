let carte = document.querySelector(".carte");
let departements = carte.querySelectorAll(".departement");
let departementsDesc = carte.querySelector(".description");
let infos = document.querySelector(".infos");

let smallCrown = carte.querySelector(".paris-petite-couronne");
let smallEnlargedCrown = carte.querySelector(".petite-couronne-agrandie");

let json = getJSONFromFile("data/departements.json");

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

departements.forEach(departement => {
    let departementID = departement.classList[1];
    let departementInfos = json.filter(function(data){ return data.id == departementID })[0];

    departement.addEventListener("click", (e) => {
        let activeDepartement = carte.querySelector("svg .active");

        if (activeDepartement)
            activeDepartement.classList.remove("active");
        if (smallCrown.classList.contains("clignotement-on"))
            smallCrown.classList.remove("clignotement-on");
        
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

        let seeMoreImagesBtn = document.createElement("a");
        seeMoreImagesBtn.classList.add("see-more-images-btn");
        seeMoreImagesBtn.innerText = "Voir plus d'images sur Google";
        seeMoreImagesBtn.href = "https://www.google.com/search?q=" + encodeURIComponent(departementInfos.name + " département paysage") + "&tbm=isch";
        seeMoreImagesBtn.target = "_blank";
        buttonsLink.appendChild(seeMoreImagesBtn);

        let addImagesBtn = document.createElement("a");
        addImagesBtn.classList.add("ajouter-images");
        addImagesBtn.innerText = "Suggérer l'ajout d'images";
        addImagesBtn.href = "https://www.google.com/search?q=" + encodeURIComponent(departementInfos.name + " département paysage") + "&tbm=isch";
        addImagesBtn.target = "_blank";
        addImagesBtn.setAttribute("onclick", "javascript:window.open(`mailto:emilien@emixocle.fr?subject=Ajout%20d%27une%20image%20sur%20G%C3%A9ocartie&body=Monsieur%20Cosson%2C%0D%0A%0D%0A%0D%0AJ'ai%20d%C3%A9couvert%20l'application%20Web%20nomm%C3%A9e%20G%C3%A9ocartie%20que%20vous%20avez%20r%C3%A9alis%C3%A9e.%0D%0A%0D%0AJe%20vous%20adresse%20ce%20courriel%20afin%20de" + encodeURIComponent(" vous suggérer l'ajout d'images pour le département " + departementInfos.id + " (" + departementInfos.name + ") :\n\n- {LIEN_IMAGE}\n-\n-") + "%0D%0A%0D%0AJe%20devine%20l'attention%20que%20vous%20porterez%20%C3%A0%20mon%20message.%0D%0A%0D%0AMes%20sinc%C3%A8res%20salutations%2C%0D%0A%7BSIGNATURE%7D`, 'mail'); event.preventDefault();");
        buttonsLink.appendChild(addImagesBtn);
    });

    departement.addEventListener("mousemove", (e) => {
        if (isQuizzMode())
            return;

        departementsDesc.innerHTML = departementInfos.name + " (" + departementInfos.id + ")<br><br>Région : " + departementInfos.region_name + "<br>Préfecture : " + departementInfos.prefecture_name;
        departementsDesc.classList.add("show");
        departementsDesc.style.top = (e.clientY + window.scrollY + 30) + "px";
        departementsDesc.style.left = (e.clientX + 10) + "px";
    });

    departement.addEventListener("mouseout", (e) => {
        if (isQuizzMode())
            return;

        departementsDesc.classList.remove("show");
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