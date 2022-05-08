let departements = document.body.querySelectorAll(".departement");
let descriptionDepartements = document.querySelector(".description");
let infos = document.body.querySelector(".infos");

let json = getJSONFromFile("data/departements.json");

let petiteCouronne = document.querySelector(".paris-petite-couronne");
let petiteCouronneagrandie = document.querySelector(".petite-couronne-agrandie");

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

        let voirPlusImages = document.createElement("a");
        voirPlusImages.classList.add("voir-plus-images");
        voirPlusImages.innerText = "Voir plus d'images sur Google";
        voirPlusImages.href = "https://www.google.com/search?q=" + encodeURIComponent(departementInfos.name + " département paysage") + "&tbm=isch";
        voirPlusImages.target = "_blank";
        infos.appendChild(voirPlusImages);
    });

    departement.addEventListener("mousemove", (e) => {
        descriptionDepartements.innerHTML = departementInfos.name + " (" + departementInfos.id + ")<br><br>Région : " + departementInfos.region_name + "<br>Préfecture : " + departementInfos.prefecture_name;
        descriptionDepartements.classList.add("show");
        descriptionDepartements.style.top = (e.clientY + window.scrollY + 30) + "px";
        descriptionDepartements.style.left = (e.clientX + 10) + "px";
    });

    departement.addEventListener("mouseout", (e) => {
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