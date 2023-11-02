<script>
	import { departments } from '/src/routes/france/departments/data.js';
	import { initQuizz, quizzFinished } from '$lib/helpers/toasts.js';

	const MAX_MISSED_TRIES = 3;
	const DELAY_FLASHING = 300;
	const FLASHING_NUMBERS = 5;

	export let quizz;

	let instruction = {
		label: undefined,
		id: undefined,
		name: undefined,
		prefix: undefined,
		tries: 0,
	};
	let instructionsHistory = [];

	function onStopQuizz() {
		quizz.reset();
	}

	$: {
		if (quizz.answer) {
			checkNewUserAnswer(quizz.answer);
		}
	}

	const checkNewUserAnswer = (value) => {
		if (!instruction.id) return;
		if (!value) return;

		if (value != instruction.id) {
			instruction.tries++;
			if (instruction.tries == MAX_MISSED_TRIES) {
				quizz.score.totalAnswers++;
				showAnswer();
			}
			return;
		}

		if (instruction.tries < MAX_MISSED_TRIES) {
			quizz.score.goodAnswers++;
			quizz.score.totalAnswers++;
		}
		loadNewInstruction();
	};

	let loadNewInstruction = () => {
		if (instruction.id != undefined)
			instructionsHistory.push({
				id: instruction.id,
				tries: instruction.tries,
			});

		document.querySelector('.land.quizz-show-answer')?.classList.remove('quizz-show-answer');

		if (instructionsHistory.length == departments.length) {
			quizzFinished();
			onStopQuizz();
			return;
		}

		let randomDepartment = (() => {
			let randomDepartment = undefined;
			do {
				randomDepartment = departments[Math.floor(Math.random() * departments.length)];
			} while (
				instructionsHistory.some(
					(instruction) => instruction.id == randomDepartment.id && instruction.tries < MAX_MISSED_TRIES,
				)
			);
			return randomDepartment;
		})();

		instruction.label =
			'Cherchez ' +
			randomDepartment.prefix +
			randomDepartment.name +
			' sur la carte (' +
			randomDepartment.id +
			')';
		instruction.id = randomDepartment.id;
		instruction.name = randomDepartment.name;
		instruction.prefix = randomDepartment.prefix;
		instruction.tries = 0;
	};

	function showAnswer() {
		const departementId = ('0' + instruction.id).slice(-2);
		const departementElement = document.querySelector(`#FR-${departementId}`);
		let colorInRed = () => {
			departementElement.classList.add('quizz-show-answer');
		};
		let removeRedColor = () => {
			departementElement.classList.remove('quizz-show-answer');
		};

		for (let i = 0; i < FLASHING_NUMBERS; i++) {
			setTimeout(() => {
				removeRedColor();
				setTimeout(() => {
					if (instruction.id != departementId) return;
					colorInRed();
				}, DELAY_FLASHING / 2);
			}, DELAY_FLASHING * i);
		}
	}

	loadNewInstruction();
	initQuizz(instruction);
</script>

<section class="quizz-instruction">
	<span class="score">{`${quizz.score.goodAnswers} / ${quizz.score.totalAnswers}`}</span>

	<main>
		<p>{instruction.label}</p>
	</main>

	<button on:click={onStopQuizz}>
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
				fill="black"
			/>
		</svg>
	</button>
</section>

<style>
	.quizz-instruction {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: 1.25em;
		width: 100%;
		padding: 1em;
		background: linear-gradient(120deg, #90b2dbaa 0%, #cb8de6aa 80%);
		backdrop-filter: blur(2px);
		min-height: 100%;
		align-items: center;
	}

	.quizz-instruction main {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1.5em 2.5em;
		align-items: center;
		justify-content: center;
	}

	@media (max-width: 1000px) {
		.quizz-instruction {
			width: 100vw;
		}
	}

	.score {
		min-width: max-content;
	}

	button {
		background: none;
		box-shadow: none;
		border: none;
		cursor: pointer;
	}

	button:hover svg {
		transform: scale(1.2);
	}

	button svg {
		fill: #000;
	}
</style>
