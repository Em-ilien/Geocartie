let carte = document.querySelector(".carte");
let departements = carte.querySelectorAll(".departement");
let infos = document.querySelector(".infos");

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

let filterWall;

let json = getJSONFromFile("data/departements.json");

//TODO localhost
let adminModeEnabled = false;

//Avertissement temporaire pour prévenir de la non-fiabilité des images TODO
let warningImagesAlgorithm;
let warningImagesAlgorithmReport;
//End


departements.forEach(departement => {
    let departementID = departement.classList[1];
    let depJSON = json.filter(function(data){ return data.id == departementID })[0];

    departement.addEventListener("click", (e) => {
        disactivePreviousActiveDepartements();
        
        departement.classList.add("active");

        updateDepInfosEl(depJSON);
    });

    departement.setAttribute("info-bulle", "<p>" + depJSON.name + " (" + depJSON.id + ")</p><br><p>Région : " + depJSON.region_name + "</p><p>Préfecture : " + depJSON.prefecture_name + "</p>");
});



function isQuizzModeEnabled() {
    return document.body.classList.contains("quizz-mode");
}

function doFlash(element) {
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            element.classList.add("flashing-color-is-active");
        }, 2*i*100);

        setTimeout(() => {
            element.classList.remove("flashing-color-is-active");
        }, 2*i*100+100);
    }
}

function disactivePreviousActiveDepartements() {
    let activeDepartement = carte.querySelector("svg .active");
        
    if (activeDepartement) 
        activeDepartement.classList.remove("active");
    if (smallCrown.classList.contains("flashing-color-is-active"))
        smallCrown.classList.remove("flashing-color-is-active");
}

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
    warningImagesAlgorithm = document.createElement("p");
    warningImagesAlgorithm.style.textAlign = "justify";
    warningImagesAlgorithm.style.fontSize = "0.7em";
    warningImagesAlgorithm.style.width = "75%";
    warningImagesAlgorithm.style.margin = "0 auto 2em";
    warningImagesAlgorithm.style.color = "#777";
    warningImagesAlgorithm.innerHTML = "Avertissement : ces images ont été extraites par un algorithme qui a parcouru le Web à leur recherche. Certaines d'entre elles sont susceptibles ne pas être pertinentes, de dater, de ne pas être libres de droit voire d'être associées à tort à ce département. Cette mosaïque a pour but de vous faire une idée grossière du département. ";
    infos.appendChild(warningImagesAlgorithm);
    warningImagesAlgorithmReport = document.createElement("a");
    warningImagesAlgorithmReport.innerText = "Signaler une image à supprimer.";
    warningImagesAlgorithmReport.target = "_blank";
    warningImagesAlgorithm.appendChild(warningImagesAlgorithmReport);
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
    // depInfos.addImagesBtn.href = "mailto:emilien@em-ilien.fr";
    // depInfos.addImagesBtn.target = "_blank";
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
        imgEl.addEventListener("click", (e) => {
            window.open(image.contextLink, '_blank');
        });

        imgEl.setAttribute("description", image.description);
        depInfos.images.appendChild(imgEl);

        imgEl.setAttribute("info-bulle", "<p>" + image.description + "</p>");

        if (adminModeEnabled) {
            registerDeletingImagesGUI(imgEl, depJSON, image);
        }
    });

    depInfos.seeMoreImagesBtn.href = "https://www.google.com/search?q=" + encodeURIComponent(depJSON.name + " département paysage") + "&tbm=isch";
    let oldAddImagesBtn = depInfos.addImagesBtn;
    depInfos.addImagesBtn = oldAddImagesBtn.cloneNode(true);
    oldAddImagesBtn.parentNode.replaceChild(depInfos.addImagesBtn, oldAddImagesBtn);
    depInfos.addImagesBtn.addEventListener("click", (e) => showEmailWindowForAddImage(depJSON, e));
    
    //Avertissement temporaire pour prévenir de la non-fiabilité des images TODO
    let oldWarningImagesAlgorithmReport = warningImagesAlgorithmReport;
    warningImagesAlgorithmReport = oldWarningImagesAlgorithmReport.cloneNode(true);
    oldWarningImagesAlgorithmReport.parentNode.replaceChild(warningImagesAlgorithmReport, oldWarningImagesAlgorithmReport);
    warningImagesAlgorithmReport.addEventListener("click", (e) => showEmailWindowForRemoveImage(depJSON, e));

    if (depJSON.verification)
        warningImagesAlgorithm.style.display = "none";
    else
        warningImagesAlgorithm.style.display = "block";
    //End
}

function showEmailWindowForRemoveImage(depJSON, e) {
    showEmailWindow("Signalement d'une image à supprimer", "Monsieur Cosson,\n\n\n"
        + "J'ai découvert l'application Web nommée Géocartie que vous avez réalisée.\n\n"
        + "Je vous adresse ce courriel afin de signaler une image à supprimer pour le département " + depJSON.id + " (" + depJSON.name + ") :\n\n"
        + "- {LIEN_IMAGE}\n"
        + "- \n"
        + "- \n\n\n"
        + "Je devine l'attention que vous porterez à mon message.\n\n"
        + "Mes sincères salutations,\n"
        + "{SIGNATURE}");

    e.preventDefault();
}

function showEmailWindowForAddImage(depJSON, e) {
    showEmailWindow("Ajout d'une image sur Géocartie", "Monsieur Cosson,\n\n\n"
        + "J'ai découvert l'application Web nommée Géocartie que vous avez réalisée.\n\n"
        + "Je vous adresse ce courriel afin de vous suggérer l'ajout d'images pour le département " + depJSON.id + " (" + depJSON.name + ") :\n\n"
        + "- {LIEN_IMAGE}\n"
        + "- \n"
        + "- \n\n\n"
        + "Je devine l'attention que vous porterez à mon message.\n\n"
        + "Mes sincères salutations,\n"
        + "{SIGNATURE}");

    e.preventDefault();
}

function registerDeletingImagesGUI(imgEl, depJSON, image) {
    imgEl.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        let deleteImage = document.createElement("span");
        deleteImage.style.top = e.clientY + "px";
        deleteImage.style.left = e.clientX + "px";
        deleteImage.style.position = "absolute";
        deleteImage.style.backgroundColor = "white";
        deleteImage.style.border = "1px solid black";
        deleteImage.style.padding = "0.5em";
        deleteImage.style.fontSize = "0.8em";
        deleteImage.style.cursor = "pointer";
        deleteImage.innerText = "Supprimer cette image";
        deleteImage.addEventListener("click", (e) => {
            //Delete image from json
            let index = depJSON.images.indexOf(image);

            const data = new FormData();
            data.append("departement_id", depJSON.id);
            data.append("image_index", index);

            let xhr = new XMLHttpRequest();
            xhr.open("POST", "admin/ajax_delete_image.php", true);
            xhr.responseType = "json";
            xhr.onload = function (e) {
                if (xhr.response.status == "success") {
                    console.log("Success");
                    console.log(xhr.response);
                }
            };
            xhr.send(data);

            //Delete image from dom
            depInfos.images.removeChild(imgEl);
            //Delete image from JSON current departement
            depJSON.images.splice(index, 1);
        });
        document.body.appendChild(deleteImage);
    });
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

function setupFilterWall() {
    if (document.querySelector(".filter-wall") != null)
        return;

    filterWall = document.createElement("div");
    filterWall.classList.add("filter-wall");
    document.body.appendChild(filterWall);

    filterWall.addEventListener("click", () => {
        closeEmailWindow();
        closeNavWindow();
        closeLoginPopup();
    });
}

function removeFilterWall() {
    if (document.querySelector(".window") != null)
        return;

    if (filterWall == null || !document.body.contains(filterWall))
        return;
    
    document.body.removeChild(filterWall);
}