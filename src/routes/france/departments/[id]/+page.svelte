<script>
	import DepartmentContextSection from './../../../../lib/components/contextsections/DepartmentContextSection.svelte';

	export let data;
</script>

<DepartmentContextSection department={data.department} />
