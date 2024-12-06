<script>
	import { goto } from '$app/navigation';
	import { quizz } from './../../stores/quizzStore.js';
	import { preferences } from '../../stores/preferencesStore';
	import ContextSection from './ContextSection.svelte';
	import TipTap from '../TipTap.svelte';

	export let department;

	$: formatDepartementPrefix =
		department.prefix === ''
			? 'Le département de '
			: department.prefix.charAt(0).toUpperCase() + department.prefix.slice(1);

	function closeContextSection() {
		if ($quizz.enabled) {
			preferences.layout.contextSection.close();
			return;
		}
		goto('/');
	}

	$: contentTiptap = `<p>Cette description pour le département <strong>${formatDepartementPrefix + department.name}</strong> est éditable ! 🌍️ </p>`;
</script>

<ContextSection onClose={closeContextSection}>
	<section class="department">
		<h1>{department.name} ({department.id})</h1>
		<TipTap bind:content={contentTiptap} editable={true} />
	</section>
</ContextSection>

<svelte:head>
	<title>{formatDepartementPrefix}{department.name} - Géocartie</title>
</svelte:head>

<style>
	:global(.context-section) {
		overflow-x: scroll !important;
	}

	section > * {
		max-width: 100%;
	}

	section p {
		margin: 1em 0 0 0;
	}

	section img {
		margin-top: 1em;
	}

	.department h1 {
		color: #226bc2;
		font-size: 1.5em;
	}
</style>
