<script>
	import BottomNavigation from './BottomNavigation.svelte';
	import { quizz } from '../../stores/quizzStore.js';
	import { fade, fly } from 'svelte/transition';

	import logo from '$lib/assets/images/logo.png';
	import QuizzInstruction from '../quizz/QuizzInstruction.svelte';
	import HeaderActionsList from './HeaderActionsList.svelte';
	import HeaderNav from './HeaderNav.svelte';
	import { preferences } from '../../stores/preferencesStore';

	let quizzWasDisabledSinceDelay = true;

	$: {
		if (!$quizz.enabled) {
			setTimeout(() => {
				quizzWasDisabledSinceDelay = true;
			}, 700);
		} else {
			quizzWasDisabledSinceDelay = false;
		}
	}

	$: isQuizzFocused = $quizz.enabled && $preferences.layout.contextSection.closed;

	let quizzInstructionWidth = '50vw';
	$: {
		if (isQuizzFocused) {
			setTimeout(() => {
				quizzInstructionWidth = '100vw';
			}, 700);
		} else {
			quizzInstructionWidth = '50vw';
		}
	}
</script>

<header style:justify-content={!isQuizzFocused ? 'space-between' : 'flex-end'}>
	{#if !isQuizzFocused}
		<div
			class="left-ctn"
			in:fly={{ y: 0, x: '-100%', duration: 700 }}
			out:fly={{ y: 0, x: '-100%', duration: 700 }}
		>
			<a href="/">
				<img src={logo} alt="Logo Géocartie" />
			</a>
			<a href="/">
				<img
					src="https://cdn.vin.co/_clients_folder/6041PY4NT8/6041py4nt8_logo_mauperier_institutionnel_png_97480_320.png"
					alt="Logo Maupérier"
				/>
			</a>
			<HeaderNav />
		</div>
	{/if}

	{#if !$quizz.enabled}
		{#if quizzWasDisabledSinceDelay}
			<div class="actions-transition" in:fly={{ y: 0, x: '100%', duration: 700 }}>
				<HeaderActionsList />
			</div>
		{/if}
	{:else}
		<div
			class="quizz-instruction-transition"
			in:fly={{ y: 0, x: '100%', duration: 700, delay: 700 }}
			out:fade={{ duration: 700 }}
			style:width={quizzInstructionWidth}
		>
			<QuizzInstruction />
		</div>
	{/if}
</header>

<BottomNavigation />

<style>
	header {
		display: flex;
		align-items: stretch;
		border-bottom: 1px solid #ddd;
		user-select: none;
	}

	header > .left-ctn {
		display: flex;
		align-items: stretch;
		/* gap: 6vw; */
		margin-left: 0.625em;
	}

	.quizz-instruction-transition {
		flex-shrink: 1;
		-webkit-transition: width 0.7s ease-in-out;
		-moz-transition: width 0.7s ease-in-out;
		-o-transition: width 0.7s ease-in-out;
		transition: width 0.7s ease-in-out;
		z-index: 2;
	}

	.actions-transition {
		margin-left: auto;
		display: flex;
		align-items: center;
		padding: 0.5em 0;
	}

	a {
		cursor: pointer;
		display: flex;
		align-items: center;
		width: fit-content;
		padding: 0.625em 0;
	}

	@media (max-width: 500px) {
		a {
			margin: auto;
		}
	}

	a img {
		object-fit: contain;
		width: 10em;
		max-height: 3em;
	}

	@media (max-width: 1000px) {
		header {
			flex-direction: row;
			flex-wrap: wrap;
		}
	}

	@media (max-width: 500px) {
		header {
			border: none;
			margin-top: 1.5625em;
		}

		header > div:first-child {
			flex-direction: column;
			margin-left: 0;
			gap: 1.25em;
		}
	}
</style>
