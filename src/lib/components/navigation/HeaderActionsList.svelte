<script>
	import { quizz } from '../../stores/quizzStore.js';
	import ActionItem from './ActionItem.svelte';

	import accountIcon from '$lib/assets/icons/actions/account-icon.png';
	import codeIcon from '$lib/assets/icons/actions/code-icon.png';
	import contactIcon from '$lib/assets/icons/actions/contact-icon.png';
	import legalIcon from '$lib/assets/icons/actions/legal-icon.png';
	import quizzIcon from '$lib/assets/icons/actions/quizz-icon.png';

	import { onClickLogin } from '$lib/helpers/toasts.js';
</script>

<div class="actions">
	<ActionItem text="Se connecter" icon={accountIcon} on:click={onClickLogin} />
	<ActionItem text="Jouer au Quizz" icon={quizzIcon} on:click={() => quizz.enable()} title="Lance le mode quizz" />
	<div class="more">
		<ActionItem text="Nous contacter" icon={contactIcon} href="/contact" />
		<ActionItem text="Mentions légales" icon={legalIcon} href="/legal" />
		<ActionItem text="Code source" icon={codeIcon} href="https://github.com/Em-ilien/Geocartie" blank={true} />
	</div>
</div>

<style>
	.actions {
		margin: auto;
		display: flex;
		width: fit-content;
		flex-direction: row-reverse;
		padding: 0 1em;
		align-items: center;
		gap: 0.375em;
		align-self: flex-end;
		height: 100%;
	}

	.more {
		display: none;
	}

	@media (min-width: 1160px) {
		.more {
			display: inline-flex;
			flex-direction: row-reverse;
			align-items: flex-start;
			gap: 0.375em;
		}
	}

	@media (max-width: 500px) {
		.actions {
			display: none;
		}
	}
</style>
