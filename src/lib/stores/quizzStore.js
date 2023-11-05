import { writable } from 'svelte/store';
import { departments } from './../../routes/france/departments/data';

export const MAX_MISSED_TRIES = 3;

function createQuizz() {
	const { subscribe, set, update } = writable({
		enabled: false,
		questions: [],
		score: { goodAnswers: 0, wrongAnswers: 0 },
	});

	function loadNewInstruction(n) {
		let randomDepartment = (() => {
			let randomDepartment = undefined;
			do {
				randomDepartment = departments[Math.floor(Math.random() * departments.length)];
			} while (
				n.questions != undefined &&
				n.questions.some((question) => question.id == randomDepartment.id && question.tries < MAX_MISSED_TRIES)
			);
			return randomDepartment;
		})();

		return {
			id: randomDepartment.id,
			tries: [],
		};
	}

	return {
		subscribe, //NOTE: subscribe is used by svelte to listen to changes
		disable: () =>
			set({
				enabled: false,
				questions: [],
				score: { goodAnswers: 0, wrongAnswers: 0 },
			}),
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
					const res = {
						...n,
						questions: n.questions,
						score: n.score,
					};

					let currentQuestion = res.questions[res.questions.length - 1];
					currentQuestion.tries.push(id);

					if (currentQuestion.id == id) {
						if (currentQuestion.tries.length < MAX_MISSED_TRIES) {
							res.score.goodAnswers++;
						}
						res.questions.push(loadNewInstruction(n));
					} else if (currentQuestion.tries.length == MAX_MISSED_TRIES) {
						res.score.wrongAnswers++;
					}

					return res;
				}),
		},
	};
}

export const quizz = createQuizz();
