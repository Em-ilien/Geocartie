<script>
	import { QUIZZ_QUESTION_CHANGMENT_COOLDOWN, quizz } from '../../stores/quizzStore';
	import { fade } from 'svelte/transition';
	import { departments } from '/src/routes/france/departments/data.js';

	import QuizzScore from './QuizzScore.svelte';

	$: currentQuizzQuestion = $quizz.questions[$quizz.questions.length - 1];
	$: currentQuestionId = currentQuizzQuestion?.id;

	let instructionLabel = { label: '', shown: false };
	$: {
		if (!$quizz.enabled) {
			instructionLabel = { label: 'À bientôt !', shown: true };
		} else {
			const currentDepartment = departments.find((department) => department.id === currentQuestionId);
			const label = `Cherchez ${currentDepartment?.prefix}${currentDepartment?.name} (${currentQuestionId})`;
			if (instructionLabel.label != label) {
				instructionLabel = { label, shown: true };
			}
		}
	}
	$: {
		if (
			$quizz.enabled &&
			currentQuizzQuestion.tries.length > 0 &&
			!currentQuizzQuestion.tries[currentQuizzQuestion.tries.length - 1].missed
		)
			instructionLabel.shown = false;
	}
</script>

<section class="quizz-instruction">
	<QuizzScore score={$quizz.score} />

	<main>
		{#if instructionLabel.shown}
			<span out:fade={{ duration: QUIZZ_QUESTION_CHANGMENT_COOLDOWN / 2 }}>
				{instructionLabel.label}
			</span>
		{/if}
	</main>

	<button on:click={() => quizz.disable()} title="Fermer le quizz">
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
		padding: 0 1em 0 0;
		background: linear-gradient(120deg, #90b2dbaa 0%, #cb8de6aa 80%);
		backdrop-filter: blur(2px);
		min-height: 100%;
		height: 100%;
		align-items: center;
	}

	.quizz-instruction main {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1.5em 2.5em;
		align-items: center;
		justify-content: center;
		font-size: 1.25em;
	}

	@media (max-width: 780px) {
		.quizz-instruction {
			width: 100vw;
		}
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
