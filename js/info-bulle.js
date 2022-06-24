let infoBulle;

document.body.addEventListener("mousemove", (e) => {
    if (e.target.getAttribute("info-bulle") == null)
        return;

    infoBulle.style.left = (10 + e.pageX) + "px";
    infoBulle.style.top = (20 + e.pageY) + "px";

    showInfoBulleFor(e.target);
});

document.addEventListener("DOMContentLoaded", () => {
    setupInfoBulle();
});

function setupInfoBulle() {
    infoBulle = document.createElement("div");
    infoBulle.id = "info-bulle";
    infoBulle.style.position = "absolute";
    infoBulle.style.zIndex = "1";
    infoBulle.style.backgroundColor = "white";
    infoBulle.style.border = "1px solid #555";
    infoBulle.style.borderRadius = "0.1em";
    infoBulle.style.padding = "0.5em";
    infoBulle.style.fontSize = "0.8em";
    infoBulle.style.fontWeight = "100";
    infoBulle.style.boxShadow = "0 0 10px 0 #00000080";
}

function showInfoBulleFor(targetEl) {
    if (document.body.contains(infoBulle))
        return;

    if (targetEl.getAttribute("info-bulle--is-disabled") != null && targetEl.getAttribute("info-bulle--is-disabled") == "true")
        return;

    infoBulle.innerHTML = targetEl.getAttribute("info-bulle");
    document.body.appendChild(infoBulle);

    targetEl.addEventListener("mouseout", () => {
        hideInfoBulle();
    });
}

function hideInfoBulle() {
    if (!document.body.contains(infoBulle))
        return;
    
    document.body.removeChild(infoBulle);
}