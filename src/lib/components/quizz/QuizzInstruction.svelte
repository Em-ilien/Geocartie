<script>
	import { onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';

	import { quizzEnabled, quizzAnswer } from '$lib/store/store.js';
	import { departments } from '/src/routes/france/departments/data.js';
	import { initQuizz } from '$lib/helpers/toasts.js';
	import Button from '../general/Button.svelte';

	const MAX_MISSED_TRIES = 3;

	let goodAnswers = 0;
	let answers = 0;

	$: scoreStr = `${goodAnswers} / ${answers}`;

	let instruction = {
		label: undefined,
		id: undefined,
		name: undefined,
		prefix: undefined,
		tries: 0,
	};

	$: questionFailed = instruction.tries >= MAX_MISSED_TRIES;

	function onStopQuizz() {
		quizzEnabled.set(false);
	}

	const unsubscribe = quizzAnswer.subscribe((value) => {
		if (!instruction.id) return;
		if (!value) return;

		if (value != instruction.id) {
			instruction.tries++;
			if (instruction.tries == MAX_MISSED_TRIES) {
				answers++;
			}
			return;
		}

		goodAnswers++;
		answers++;
		loadNewInstruction();
	});

	onDestroy(unsubscribe);

	function loadNewInstruction() {
		const randomDepartment = departments[Math.floor(Math.random() * departments.length)];

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
	}

	let answerShowed = false;
	function showAnswer() {
		answerShowed = true;
		const departementId = ('0' + instruction.id).slice(-2);
		const departementElement = document.querySelector(`#FR-${departementId}`);
		departementElement.classList.add('quizz-show-answer');
		const handler = () => {
			departementElement.classList.remove('quizz-show-answer');
			answerShowed = false;
			departementElement.removeEventListener('click', handler);
		};
		departementElement.addEventListener('click', handler);
	}

	loadNewInstruction();
	initQuizz(instruction);
</script>

<section class="quizz-instruction">
	<span class="score">{scoreStr}</span>

	<main>
		<p>{instruction.label}</p>

		{#if questionFailed && !answerShowed}
			<div in:fade={{ duration: 200 }}>
				<Button label="Afficher la bonne réponse" on:click={showAnswer} />
			</div>
		{/if}
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
