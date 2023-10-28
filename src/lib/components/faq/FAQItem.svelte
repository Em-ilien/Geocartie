<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let question;
	export let answer;
	export let active = false;

	let liEl;
	let answerHiderHeight = 0;

	function onClick(e) {
		active = !active;
		dispatch('click', { active, question, answer });

		setTimeout(() => {
			answerHiderHeight = 0;
			const answerElem = liEl.querySelector('.answer');

			const interval = setInterval(() => {
				if (answerElem.scrollHeight > answerHiderHeight) {
					answerHiderHeight += Math.min(10, answerElem.scrollHeight - answerHiderHeight);
				} else if (answerElem.scrollHeight < answerHiderHeight) {
					answerHiderHeight -= Math.min(10, answerHiderHeight - answerElem.scrollHeight);
				} else {
					clearInterval(interval);
				}
			});
		});
	}
</script>

<li bind:this={liEl} class:active>
	<div class="question" on:click={onClick}>
		<svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none">
			<path
				d="M8 1.32704L4.44755 5L1 1.32704L1.35897 1L4.44755 4.10692L7.64103 1L8 1.32704Z"
				fill="black"
				stroke="black"
			/>
		</svg>
		<span>{question}</span>
	</div>
	<div class="answer-hider" style:height={(active ? answerHiderHeight : '0') + 'px'}>
		<p class="answer">{answer}</p>
	</div>
</li>

<style>
	li .question {
		padding: 0.5em 0;
		margin-top: -0.5em;
		font-weight: bold;
		color: #000;
		font-size: 1em;
		font-style: normal;
		line-height: normal;
		align-items: center;
		display: flex;
		gap: 0.5625em;
		cursor: pointer;
	}
	li .question:hover {
		text-decoration-line: underline;
	}

	li .question svg {
		transform: rotate(0deg);
		transition: 0.15s ease-in-out;
	}
	li.active .question svg {
		transform: rotate(180deg);
		transition: 0.15s ease-in-out;
	}

	li .answer-hider {
		margin: 0.5em 0;
		height: 0;
		overflow: hidden;
		transition: 0.7s ease;
	}
	li.active .answer-hider {
		margin-bottom: 1em;
	}

	li .answer {
		padding: 0 1.75em;
		height: 0;
		overflow: hidden;
		z-index: -1;
		position: relative;
		opacity: 0;
		transition: 0.7s ease;
	}
	li.active .answer {
		height: auto;
		opacity: 1;
		z-index: unset;
	}
</style>
