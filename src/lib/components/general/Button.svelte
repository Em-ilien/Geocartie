<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let label;
	export let size;
	export let title = null;

	function onClick(e) {
		dispatch('click', null);
	}

	$: hasIconSlot = !!$$slots.icon;
</script>

<button
	on:click={onClick}
	{title}
	style:padding={size * 0.0255 + 'em ' + size * 0.0463 + 'em ' + size * 0.0255 + 'em ' + size * 0.0278 + 'em'}
>
	{#if hasIconSlot}
		<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewbox="0 0 27 27" fill="none">
			<g clip-path="url(#clip0_557_14)">
				<slot name="icon" />
			</g>
			<defs>
				<clipPath id="clip0_557_14">
					<rect width="27" height="27" fill="white" />
				</clipPath>
			</defs>
		</svg>
	{/if}
	<span style:font-size={size * 0.0463 + 'em'}>{label}</span>
</button>

<style>
	button {
		display: flex;
		align-items: center;
		gap: 0.8125em;
		border-radius: 0.75em;
		border: 1px solid #226bc2;
		background: #226bc2;
		cursor: pointer;
	}

	button:hover {
		box-shadow: 4px 4px 6px 0 rgba(0, 0, 0, 0.25);
		padding-right: 3em;
		transition: 0.5s cubic-bezier(0, 0, 0, 1);
	}

	@media (hover: none) {
		button:hover {
			padding-right: 1.25em;
		}
	}

	button:active {
		box-shadow: inset 0 0 6px 0 rgba(0, 0, 0, 0.25) !important;
		transform: scale(0.95);
	}

	button span {
		color: #fff;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		user-select: none;
	}
</style>
