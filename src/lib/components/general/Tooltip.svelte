<script>
	export let title;
	export let x;
	export let y;
</script>
<div style="
		top: {y + 10}px;
		left: {x + 10}px;">{title}</div>

<style>
	div {
		border: 1px solid #ddd;
        box-shadow: 0 0 10px 0 #00000080;
		background: white;
		border-radius: 4px;
		padding: 4px;
		position: absolute;
        z-index: 1;
        font-family: 'Roboto', 'Lato', sans-serif;
	}
</style>