let smallCrown = carte.querySelector(".paris-small-crown");
let smallEnlargedCrown = carte.querySelector(".small-enlarged-crown");

smallCrown.addEventListener("click", (e) => {
    doFlash(smallCrown);
    doFlash(smallEnlargedCrown);
});

for (const departement of smallEnlargedCrown.children) {
    departement.addEventListener("click", (e) => {
        smallCrown.classList.add("flashing-color-is-active");
    });
}