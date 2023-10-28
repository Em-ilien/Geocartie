<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let text = '';
	export let icon;
	export let href = null;
	export let blank = null;

	function onClick(e) {
		dispatch('click', null);
	}
</script>

<a {href} target={blank ? '_blank' : ''} on:click={onClick}>
	<img src={icon} alt="Icône" />
	<span>{text}</span>
</a>

<style>
	a {
		display: flex;
		padding: 0.5625em 0.8125em;
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
