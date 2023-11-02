<script>
	import ActionItem from './ActionItem.svelte';

	import accountIcon from '$lib/assets/icons/actions/account-icon.png';
	import quizzIcon from '$lib/assets/icons/actions/quizz-icon.png';

	import { onClickLogin } from '$lib/helpers/toasts.js';

	export let quizzIsEnabled = false;
</script>

<div class="bottom-navigation">
	<ActionItem text="Se connecter" icon={accountIcon} on:click={onClickLogin} />
	<ActionItem text="Jouer au Quizz" icon={quizzIcon} on:click={() => (quizzIsEnabled = true)} />
</div>

<style>
	.bottom-navigation {
		display: flex;
		width: 100vw;
		padding: 0 7.125em 0 7.125em;
		justify-content: center;
		align-items: flex-start;
		gap: 2.25em;
		position: fixed;
		bottom: 0;

		background: #fff;
		box-shadow: 0 -1px 4px 0 rgba(0, 0, 0, 0.25);
	}

	@media (min-width: 500px) {
		.bottom-navigation {
			display: none;
		}
	}
</style>
