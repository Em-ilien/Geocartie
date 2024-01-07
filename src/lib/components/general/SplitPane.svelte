<script>
	import { onMount } from 'svelte';
	import PaneChildrenSection from './PaneChildrenSection.svelte';

	export let defaultSizes = { a: '50%', b: '50%' };
	export let minSizes = { a: '20%', b: '20%' };
	export let closable = { a: false, b: false };
	export let callbacks = {
		a: {
			close: undefined,
			open: undefined,
		},
		b: {
			close: undefined,
			open: undefined,
		},
	};
	export let closed = { a: false, b: false };

	let pane;
	let gutter;
	let slotA;
	let slotB;

	onMount(() => {
		const startDragging = (e) => {
			e.preventDefault();
			window.addEventListener('mousemove', doDrag);
			window.addEventListener('mouseup', stopDragging);
		};

		const stopDragging = (e) => {
			window.removeEventListener('mousemove', doDrag);
			window.removeEventListener('mouseup', stopDragging);
		};

		const doDrag = (e) => {
			const rect = pane.getBoundingClientRect();
			const x = e.clientX - rect.left;

			const minA = (minSizes.a.replace('%', '') * rect.width) / 100;
			const minB = (minSizes.b.replace('%', '') * rect.width) / 100;

			if (x < 50 && closable.a) {
				closed.a = true;
				return;
			}

			if (x > rect.width - 50 && closable.b) {
				closed.b = true;
				return;
			}

			if (x < minA || x > rect.width - minB) return;

			if (closed.a && x > minA) {
				callbacks.a.open();
				closed.a = false;
			}

			if (closed.b && x < rect.width - minB) {
				callbacks.b.open();
				closed.b = false;
			}

			slotA.style.width = x + 'px';
			slotB.style.width = rect.width - x - gutter.clientWidth + 'px';
		};

		gutter.addEventListener('mousedown', startDragging);
	});

	$: {
		if (closed.a) {
			slotA.style.width = 'fit-content';
			slotB.style.width = '100%';
			callbacks.a.close();
		}
		if (closed.b) {
			slotB.style.width = 'fit-content';
			slotA.style.width = '100%';
			callbacks.b.close();
		}
	}

	function reopen(e) {
		if (closed.a) {
			closed.a = false;
			callbacks.a.open();
		}
		if (closed.b) {
			closed.b = false;
			callbacks.b.open();
		}
	}
</script>

<div class="split-pane" bind:this={pane}>
	<PaneChildrenSection bind:slot={slotA} defaultSize={defaultSizes.a} bind:closed={closed.a} on:open={reopen}>
		<slot name="a" />
	</PaneChildrenSection>

	<div class="gutter" bind:this={gutter}>
		<div class="border"></div>
	</div>

	<PaneChildrenSection bind:slot={slotB} defaultSize={defaultSizes.b} bind:closed={closed.b} on:open={reopen}>
		<slot name="b" />
	</PaneChildrenSection>
</div>

<style>
	.split-pane {
		display: flex;
		flex-direction: row;
		align-items: stretch;
		justify-content: stretch;
		width: 100%;
		height: 100%;
		flex-grow: 1;
		flex-shrink: 1;
		overflow-y: hidden;
	}

	.split-pane > :global(*) {
		flex-grow: 1;
		flex-shrink: 1;
		overflow-y: hidden;
		z-index: 2;
	}

	.split-pane > :global(* > *) {
		height: 100%;
	}

	.split-pane > .gutter {
		flex-grow: 0;
		flex-shrink: 0;
		width: 10px;
		background-color: transparent;
		cursor: ew-resize;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow-x: visible;
		box-shadow: 0 0 16px #00000040;
		border-right: 1px solid #ccc;
		z-index: 1;
	}

	.split-pane > .gutter > .border {
		width: 1px;
		height: 100%;
		height: 100%;
	}
</style>
