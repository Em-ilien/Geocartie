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
    hideInfoBulle();
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

carte.addEventListener("mousemove", (e) => {
    if (infoBulle == undefined)
        return;
    
    if (infoBulle.innerText != "Afficher la page d'accueil")
        return;

    if (e.target == carte || e.target == carte.firstElementChild)
        return;

    hideInfoBulle();
});

carte.addEventListener("mouseout", (e) => {
    if (e.target != carte && e.target != carte.firstElementChild)
        return;

    carte.style.backgroundColor = "#fff";
    carte.style.cursor = "unset";
});

carte.addEventListener("mousemove", (e) => {
    if (infoBulle == undefined)
        return;
    
    infoBulle.style.top = (e.clientY + window.scrollY + 30) + "px";
    infoBulle.style.left = (e.clientX + 10) + "px";
});