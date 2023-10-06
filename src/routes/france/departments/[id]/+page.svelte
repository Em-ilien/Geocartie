<script>
    import DepartmentContextSection from '$lib/components/contextsections/DepartmentContextSection.svelte';
    import Map from '$lib/components/map/Map.svelte';
    
	export let data;
</script>

<DepartmentContextSection department={data.department} />
<Map />