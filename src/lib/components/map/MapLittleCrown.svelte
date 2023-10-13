<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let preview = false;

	$: prefixId = !preview ? 'FR-' : 'LC-';

	function onClick(e) {
		const departmentId = e.target.id.replace('FR-', '');
		dispatch('click', { departmentId });
	}
</script>

<!-- prettier-ignore -->
<g on:click={onClick}>
    <path id={prefixId + "75"} title="Paris" class="land" d="M311.53,141.03L314.45,141.07L315.23,143.69L315.23,143.69L317.16,145.98L311.9,146.11L311.9,146.11L307.49,143.87z" />
    <path id={prefixId + "92"} title="Hauts-de-Seine" class="land" d="M309.85,137.88L312.08,138.48L311.53,141.03L311.53,141.03L307.49,143.87L311.9,146.11L311.9,146.11L310.83,150.95L310.83,150.95L306.17,149.45L306.17,149.45L304.1,144.61L306.49,140.49L306.49,140.49z" />
    <path id={prefixId + "93"} title="Seine-Saint-Denis" class="land" d="M321.01,133.96L323.18,138.83L321.35,141.83L322.85,146.9L322.85,146.9L320.27,143.91L315.23,143.69L315.23,143.69L314.45,141.07L311.53,141.03L311.53,141.03L312.08,138.48L309.85,137.88L309.85,137.88L313.35,136.4L316.39,137.61z" />
    <path id={prefixId + "94"} title="Val-de-Marne" class="land" d="M315.23,143.69L320.27,143.91L322.85,146.9L322.85,146.9L323.63,149.63L321.89,154.08L321.89,154.08L319.52,151.12L315.35,152.47L310.83,150.95L310.83,150.95L311.9,146.11L311.9,146.11L317.16,145.98z" />
</g>
