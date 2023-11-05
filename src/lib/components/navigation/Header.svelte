<script>
	import BottomNavigation from './BottomNavigation.svelte';
	import { quizz } from '../../stores/quizzStore.js';
	import { fade, fly } from 'svelte/transition';

	import logo from '$lib/assets/images/logo.png';
	import QuizzInstruction from '../quizz/QuizzInstruction.svelte';
	import HeaderActionsList from './HeaderActionsList.svelte';
	import HeaderNav from './HeaderNav.svelte';

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
</script>

<header>
	<div>
		<a href="/">
			<img src={logo} alt="Logo Géocartie" />
		</a>
		<HeaderNav />
	</div>

	{#if !$quizz.enabled}
		{#if quizzWasDisabledSinceDelay}
			<div class="actions-transition" in:fly={{ y: 0, x: '100%', duration: 700 }}>
				<HeaderActionsList />
			</div>
		{/if}
	{:else}
		<div
			class="quizz-instruction-transition"
			in:fly={{ y: 0, x: '100%', duration: 700 }}
			out:fade={{ duration: 700 }}
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
		justify-content: space-between;
		border-bottom: 1px solid #ddd;
		user-select: none;
	}

	header > div:first-child {
		display: flex;
		align-items: stretch;
		gap: 6vw;
		margin-left: 0.625em;
	}

	.quizz-instruction-transition {
		flex-shrink: 1;
		width: 50vw;
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
