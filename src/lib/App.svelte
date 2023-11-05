<script>
	import Map from './components/map/Map.svelte';
	import Header from './components/navigation/Header.svelte';
	import { Toaster } from 'svelte-french-toast';

	function onClick(e) {
		if (['SPAN', 'I', 'B', 'P', 'A', 'H1', 'H2'].includes(e.target.tagName)) return;

		let selection = window.getSelection();
		selection.removeAllRanges();
	}
</script>

<div class="app" on:click={onClick} on:keydown={onClick} role={null}>
	<main>
		<slot />
		<Map />
	</main>
	<Header />
</div>

<Toaster />

<style>
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		user-select: none;
	}

	.app {
		display: flex;
		flex-direction: column-reverse;
		font-family: 'Roboto', 'Lato', sans-serif;
		overflow: hidden;
		max-width: 100vw;
		min-width: 100vw;
		max-height: 100vh;
		min-height: 100vh;
	}

	@media (max-width: 780px) {
		.app {
			max-height: unset;
			min-height: unset;
			overflow: auto;
		}
	}

	main {
		display: flex;
		flex-direction: row;
		align-items: stretch;
		justify-content: stretch;
		width: 100%;
		flex-grow: 1;
		flex-shrink: 1;
		overflow-y: hidden;
		height: fit-content;
	}

	@media (max-width: 780px) {
		main {
			flex-direction: column-reverse;
		}
	}
</style>
