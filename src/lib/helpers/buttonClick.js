import toast from 'svelte-french-toast';

const STYLE = "font-family: 'Roboto', 'Lato', sans-serif; box-shadow: 2px 2px 5px 3px #00000025";
const POSITION = "top-right";

export function onClickQuizz(e) {
    toast.error("Le Quizz n'est pas encore implémenté.", {
        style: STYLE,
        position: POSITION,
    });
}

export function onClickLogin(e) {
    toast.error("La connexion n'est pas encore implémentée.", {
        style: STYLE,
        position: POSITION,
    });
}