<script>
	import ContextSection from './ContextSection.svelte';

	export let department;

	$: formatDepartementPrefix =
		department.prefix === ''
			? 'Le département de '
			: department.prefix.charAt(0).toUpperCase() + department.prefix.slice(1);
	$: pastParticipleSentence =
		department.prefix === 'les ' ? 'sont situés' : department.prefix === 'la ' ? 'est située' : 'est situé';
	$: departmentPronounAndVerb =
		department.prefix === 'les ' ? 'Ils ont' : department.prefix === 'la ' ? 'Elle a' : 'Il a';
</script>

<ContextSection>
	<section class="department">
		<h1>{department.name} ({department.id})</h1>
		<p>
			{formatDepartementPrefix}<b>{department.name}</b>
			{pastParticipleSentence} dans la région {department.region_name}. {departmentPronounAndVerb}
			pour préfecture <b>{department.prefecture_name}</b>.
		</p>
		{#each department.images as img}
			<img src={img.src} alt="Image du département {department.id}" />
		{/each}
	</section>
</ContextSection>

<svelte:head>
	<title>{formatDepartementPrefix}{department.name} - Géocartie</title>
</svelte:head>

<style>
	section > * {
		max-width: 100%;
	}

	section p {
		margin: 1em 0 0 0;
	}

	section img {
		margin-top: 1em;
	}
</style>
