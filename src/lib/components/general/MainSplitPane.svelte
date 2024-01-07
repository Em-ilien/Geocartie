<script>
	import { preferences } from '../../stores/preferencesStore';
	import Map from '../map/Map.svelte';
	import SplitPane from './SplitPane.svelte';

	function closeContextSection() {
		preferences.layout.contextSection.close();
	}
	function openContextSection() {
		preferences.layout.contextSection.open();
	}

	$: isClosedSlotA = $preferences.layout.contextSection.closed;
</script>

<SplitPane
	minSizes={{ a: '20%', b: '30%' }}
	closable={{ a: true, b: false }}
	callbacks={{ a: { close: closeContextSection, open: openContextSection }, b: undefined }}
	closed={{ a: isClosedSlotA, b: false }}
>
	<main slot="a">
		<slot />
	</main>
	<div slot="b">
		<div class="map-ctn">
			<Map />
		</div>
	</div>
</SplitPane>

<style>
	.map-ctn {
		display: flex;
		flex-direction: row;
		align-items: stretch;
		justify-content: stretch;
		width: 100%;
		flex-grow: 1;
		flex-shrink: 1;
		overflow-y: hidden;
		height: 100%;
	}

	@media (max-width: 780px) {
		:global(body .app div.split-pane) {
			flex-direction: column-reverse !important;
		}

		:global(body .app div.split-pane > *) {
			width: 100% !important;
		}

		:global(body .app div.split-pane > .gutter) {
			height: 1px !important;
			width: 100% !important;
		}
	}
</style>
