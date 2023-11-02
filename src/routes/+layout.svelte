<script>
	import { setContext } from 'svelte';
	import App from '../lib/App.svelte';

	let quizzIsEnabled = false;

	function enableQuizz() {
		quizzIsEnabled = true;
	}

	setContext('enableQuizz', enableQuizz);
</script>

<App bind:quizzIsEnabled>
	<slot />
</App>
