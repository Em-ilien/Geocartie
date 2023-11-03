import { writable } from 'svelte/store';

function createQuizz() {
	const initialValue = {
		enabled: false,
		answer: undefined,
		score: {
			goodAnswers: 0,
			wrongAnswers: 0,
		},
	};

	const { subscribe, set, update } = writable(initialValue);

	return {
		subscribe,
		reset: () => set(initialValue),
		enable: () =>
			update((n) => {
				return {
					...n,
					enabled: true,
				};
			}),
		setAnswer: (answer) =>
			update((n) => {
				return {
					...n,
					answer,
				};
			}),
		score: {
			incrementGoodAnswers: () =>
				update((n) => {
					return {
						...n,
						score: {
							...n.score,
							goodAnswers: n.score.goodAnswers + 1,
						},
					};
				}),
			incrementWrongAnswers: () =>
				update((n) => {
					return {
						...n,
						score: {
							...n.score,
							wrongAnswers: n.score.wrongAnswers + 1,
						},
					};
				}),
		},
	};
}

export const quizz = createQuizz();
