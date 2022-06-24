carte.querySelectorAll("svg g path, svg g polyline").forEach(p => {
    p.addEventListener("click", (e) => {
        e.stopPropagation();
    });
});

[carte, carte.firstElementChild].forEach(el => {
    el.addEventListener("click", (e) => {
        infos.remove();
        infos = document.createElement("div");
        infos.classList.add("infos");
        document.body.appendChild(infos);
        infos.appendChild(defaultInfos);

        disactivePreviousActiveDepartements();

        depInfos.name = null;
        
        el.style.cursor = "unset";
        
        carte.setAttribute("info-bulle--is-disabled", "true");
        carte.firstElementChild.setAttribute("info-bulle--is-disabled", "true");
    });
});

carte.addEventListener("mouseover", (e) => {
    if (e.target != carte && e.target != carte.firstElementChild)
        return;

    if (depInfos.name == null)
        return;
    
    carte.style.backgroundColor = "#eee";
    carte.style.cursor = "pointer";

    carte.removeAttribute("info-bulle--is-disabled");
    carte.firstElementChild.removeAttribute("info-bulle--is-disabled");
});

carte.addEventListener("mouseout", (e) => {
    if (e.target != carte && e.target != carte.firstElementChild)
        return;

    carte.style.backgroundColor = "#fff";
    carte.style.cursor = "unset";
});