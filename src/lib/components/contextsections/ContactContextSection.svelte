<script>
	import { preferences } from '../../stores/preferencesStore';
	import ContextSection from './ContextSection.svelte';

	preferences.layout.contextSection.open();
</script>

<ContextSection>
	<section class="contact">
		<h1>Contact</h1>

		<p>
			Pour me contacter, envoyez-moi un courriel à l'adresse <a href="mailto:emilien@em-ilien.fr"
				>emilien@em-ilien.fr</a
			>.
		</p>
	</section>
</ContextSection>

<svelte:head>
	<title>Géocartie - Contact</title>
</svelte:head>
