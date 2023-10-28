<script>
	import App from '../../../../lib/App.svelte';
	import DepartmentContextSection from '$lib/components/contextsections/DepartmentContextSection.svelte';
	import Map from '$lib/components/map/Map.svelte';

	export let data;
</script>

<App>
	<DepartmentContextSection department={data.department} />
	<Map />
</App>
