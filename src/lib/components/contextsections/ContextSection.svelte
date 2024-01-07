<script>
	import { preferences } from '../../stores/preferencesStore';

	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';

	export let onClose = () => {
		goto('/');
	};
</script>

{#if !$preferences.layout.contextSection.closed}
	<section
		class="context-section"
		in:fly={{ x: '-100%', duration: 700, delay: 0 }}
		out:fly={{ x: '-100%', duration: 700, delay: 0 }}
	>
		<div class="close-ctn" on:click={onClose} title="Fermer">
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
				<path d="M6 18L18 6M6 6L18 18" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</div>
		<main>
			<div>
				<slot />
			</div>
			<footer>
				<nav>
					<a target="_blank" href="https://github.com/Em-ilien/Geocartie">Code source</a>
					<a href="/legal">Mentions légales</a>
					<a href="/contact">Nous contacter</a>
				</nav>
			</footer>
		</main>
	</section>
{:else}
	<div class="hamburger-ctn">
		<svg
			on:click={() => preferences.layout.contextSection.open()}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
		>
			<path
				d="M4 6H20M4 12H20M4 18H20"
				stroke="#999"
				stroke-width="1.75"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</div>
{/if}

<style>
	.context-section {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		background: #fff;
		flex-grow: 1;
		height: 100%;
		overflow-x: hidden;
		overflow-y: auto;
	}

	.context-section > main {
		display: flex;
		padding: 4em 8% 1em;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		gap: 5.5em;
		height: 100%;
	}

	.context-section > .close-ctn {
		width: 3em;
		height: 2.5em;
		position: fixed;
		align-self: flex-end;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		z-index: 1;
		background: #fff;
		padding: 0.5em;
		opacity: 0;
	}
	.context-section:hover .close-ctn {
		opacity: 1;
		transition: opacity 0.3s ease-in-out;
	}

	.context-section > .close-ctn:hover {
		background: #efefef;
		border-radius: 0.5em;
	}

	.context-section > .close-ctn svg {
		stroke: #bbb;
		stroke-width: 2;
	}

	@media (max-width: 780px) {
		.context-section {
			margin-left: unset;
			width: 100%;
			max-width: 100%;
			box-shadow: unset;
		}
		.context-section > main {
			height: fit-content;
			padding-bottom: 5em;
		}
		.context-section > .close-ctn {
			display: none;
		}
	}

	.context-section > main > div {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 3em;
		flex-grow: 1;
		max-width: 100%;
	}

	.context-section :global(section) {
		line-height: 1.42857143;
		color: #333;
		background-color: #fff;
		max-width: 100%;
	}

	.context-section :global(section h1) {
		font-size: 2.5em;
	}

	.context-section :global(section h2) {
		margin-top: 1.5em;
	}

	.context-section :global(section h3) {
		margin-top: 1.25em;
		margin-left: 1em;
	}

	.context-section :global(section ul li) {
		margin-left: 3em;
		margin-top: 0.25em;
	}

	.context-section :global(section p) {
		margin: 1em 0 0 1em;
	}

	.context-section :global(h1),
	.context-section :global(h2),
	.context-section :global(p),
	.context-section :global(a),
	.context-section :global(b),
	.context-section :global(i),
	.context-section :global(span) {
		user-select: text;
	}

	footer nav {
		display: inline-flex;
		align-items: flex-start;
	}

	footer nav a {
		padding: 1em 0.6875em;
		color: #000;
		font-size: 0.8em;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		text-decoration: none;
	}
	footer nav a:hover {
		text-decoration: underline;
	}

	.hamburger-ctn {
		position: relative;
	}

	.hamburger-ctn > svg {
		position: absolute;
		width: 3em;
		height: 2.5em;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		background: #fff;
		padding: 0.5em;
		margin: 0.5em;
		z-index: 1;
	}

	.hamburger-ctn:hover {
		background: #efefef;
		border-radius: 0.5em;
	}
</style>
