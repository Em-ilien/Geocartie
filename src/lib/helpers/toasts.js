import toast from 'svelte-french-toast';

const STYLE = "font-family: 'Roboto', 'Lato', sans-serif; box-shadow: 2px 2px 5px 3px #00000025";
const POSITION = 'top-right';
const QUIZZ_POSITION = 'bottom-right';

export function onClickLogin(e) {
	toast.error("La connexion n'est pas encore implémentée.", {
		style: STYLE,
		position: POSITION,
	});
}

export function onClickMenuNav(e, itemLabel) {
	toast.error('Le menu ' + itemLabel + " n'est pas encore implémenté.", {
		style: STYLE,
		position: POSITION,
	});
}

export function initQuizz(instruction) {
	toast.success(
		`Bienvenue dans le quizz ! Cherchez le département ${instruction.prefix}${instruction.name} (${instruction.id})`,
		{
			style: STYLE,
			position: QUIZZ_POSITION,
			duration: 5000,
		},
	);
}
