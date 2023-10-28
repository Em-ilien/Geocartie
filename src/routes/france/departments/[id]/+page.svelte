<script>
	import Map from './../../../../lib/components/map/Map.svelte';
	import DepartmentContextSection from './../../../../lib/components/contextsections/DepartmentContextSection.svelte';
	import App from '../../../../lib/App.svelte';

	export let data;
</script>

<App>
	<DepartmentContextSection department={data.department} />
	<Map />
</App>
