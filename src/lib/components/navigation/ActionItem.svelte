<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let text = null;
	export let icon;
	export let href = null;
	export let blank = null;
	export let title = null;

	function onClick(e) {
		dispatch('click', null);
	}

	$: padding = text ? '0.5625em 0.8125em' : '0 0.8125em';
</script>

<a {href} target={blank ? '_blank' : ''} on:click={onClick} {title} style:padding>
	<img src={icon} alt="Icône" />
	{#if text}
		<span>{text}</span>
	{/if}
</a>

<style>
	a {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.625em;
		cursor: pointer;
		text-decoration: none;
		color: #000;
	}

	img {
		height: 1.325rem;
		object-fit: contain;
	}

	span {
		font-size: 0.75em;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		width: max-content;
	}
</style>
