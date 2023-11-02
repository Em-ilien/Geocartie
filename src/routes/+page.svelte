<script>
	import { getContext } from 'svelte';
	import DefaultContextSection from './../lib/components/contextsections/DefaultContextSection.svelte';

	let enableQuizz = getContext('enableQuizz');
</script>

<DefaultContextSection {enableQuizz} />
