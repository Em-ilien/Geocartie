import { writable } from 'svelte/store';
import { departments } from './../../routes/france/departments/data';

export const MAX_MISSED_TRIES = 3;
export const QUIZZ_QUESTION_CHANGMENT_COOLDOWN = 1.25 * 1000;

function createQuizz() {
	const initialValue = () => {
		return {
			enabled: false,
			questions: [],
			score: { goodAnswers: 0, wrongAnswers: 0 },
		};
	};
	const { subscribe, set, update } = writable(initialValue());

	let cooldown = undefined;

	function loadNewInstruction(n) {
		//Supprimer les départements déjà trouvés
		let remainingDepartments = departments.filter(
			(department) =>
				!n.questions.some(
					(question) => question.id == department.id && question.tries.length < MAX_MISSED_TRIES,
				),
		);
		//Supprimer le dernier département que l'utilisateur a échoué à trouver le cas échéant
		remainingDepartments = remainingDepartments.filter(
			(department) => n.questions[n.questions.length - 1]?.id != department.id,
		);

		if (remainingDepartments.length == 0) return null;

		const randomDepartment = remainingDepartments[Math.floor(Math.random() * remainingDepartments.length)];
		return {
			id: randomDepartment.id,
			tries: [],
		};
	}
	function disable() {
		set(initialValue());
	}

	return {
		subscribe, //NOTE: subscribe is used by svelte to listen to changes
		disable: () => disable(),
		enable: () =>
			update((n) => {
				return {
					...n,
					enabled: true,
					questions: [loadNewInstruction(n)],
					score: {
						goodAnswers: 0,
						wrongAnswers: 0,
					},
				};
			}),
		currentQuestion: {
			addTry: (id) =>
				update((n) => {
					if (!n.enabled) return n;
					if (cooldown && cooldown > Date.now()) return n;

					const res = {
						...n,
						questions: n.questions,
						score: n.score,
					};

					let currentQuestion = res.questions[res.questions.length - 1];

					if (currentQuestion.id != id) {
						currentQuestion.tries.push({ id, missed: true });
						if (currentQuestion.tries.length == MAX_MISSED_TRIES) res.score.wrongAnswers++;
						return res;
					}

					currentQuestion.tries.push({ id, missed: false });

					if (currentQuestion.tries.length <= MAX_MISSED_TRIES) res.score.goodAnswers++;

					const newQuestion = loadNewInstruction(n);
					if (!newQuestion) return initialValue();

					cooldown = Date.now() + QUIZZ_QUESTION_CHANGMENT_COOLDOWN;
					res.cooldownActive = true;
					setTimeout(() => {
						update((n) => {
							return {
								...n,
								questions: [...n.questions, newQuestion],
								cooldownActive: false,
							};
						});
					}, QUIZZ_QUESTION_CHANGMENT_COOLDOWN);

					return res;
				}),
		},
	};
}

export const quizz = createQuizz();
