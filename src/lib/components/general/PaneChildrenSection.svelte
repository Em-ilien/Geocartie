<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let slot;
	export let defaultSize;
	export let closed;

	function reopen() {
		dispatch('open', this);
	}
</script>

<div bind:this={slot} style="width: {defaultSize}" class:closed>
	{#if !closed}
		<slot />
	{:else}
		<div on:click={reopen} on:keydown={reopen} tabindex="0" role="button">
			<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
				<path
					stroke-width="1.75"
					stroke-linecap="round"
					stroke-linejoin="round"
					d="m26.71 10.29-10-10a1 1 0 0 0-1.41 0l-10 10 1.41 1.41L15 3.41V32h2V3.41l8.29 8.29z"
				/>
			</svg>
		</div>
	{/if}
</div>

<style>
	div.closed {
		width: fit-content;
		overflow: hidden;
		background: #fff;
		margin-left: -2.75em;
		cursor: pointer;
	}

	div.closed:hover {
		margin-left: 0;
		transition: margin-left 0.125s ease-in-out;
	}

	svg {
		transform: rotate(90deg);
		width: 1.5em;
		fill: #bbb;
		margin: 1em 0.75em;
	}
</style>
