<script>
	import { onDestroy } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	import { quizzEnabled, quizzAnswer } from '$lib/store/store.js';
	import { departments } from '/src/routes/france/departments/data.js';
	import { onQuizzFalseAnswer, onQuizzTrueAnswer, initQuizz } from '$lib/helpers/toasts.js';

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

	function onStopQuizz() {
		quizzEnabled.set(false);
	}

	const unsubscribe = quizzAnswer.subscribe((value) => {
		if (!instruction.id) return;
		if (!value) return;

		if (value != instruction.id) {
			instruction.tries++;
			if (instruction.tries >= 3) {
				answers++;
				loadNewInstruction();
				onQuizzFalseAnswer(instruction);
			} else {
				onQuizzFalseAnswer();
			}
			return;
		}

		goodAnswers++;
		answers++;
		loadNewInstruction();
		onQuizzTrueAnswer(instruction);
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

	loadNewInstruction();
	initQuizz(instruction);
</script>

<div
	class="quizz-instruction-hider"
	in:fly={{ y: 0, x: '100%', duration: 700 }}
	out:fly={{ y: 0, x: '100%', duration: 700 }}
>
	<section class="quizz-instruction">
		<span class="score">{scoreStr}</span>

		<p>{instruction.label}</p>

		<button on:click={onStopQuizz}>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
					fill="black"
				/>
			</svg>
		</button>
	</section>
</div>

<style>
	.quizz-instruction {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: 1.25em;
		width: 50vw;
		padding: 0.4em 1em;
		background: linear-gradient(120deg, #90b2dbaa 0%, #cb8de6aa 80%);
		backdrop-filter: blur(2px);
		min-height: 100%;
	}

	@media (max-width: 780px) {
		.quizz-instruction {
			width: 100vw;
		}
	}

	.quizz-instruction-hider {
		background: #fff;
		box-shadow: 0 0 0 1px #fff;
		justify-self: flex-end;
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
