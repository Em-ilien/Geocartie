<script>
    import HomePage from "./components/HomePage.svelte";
	import { Toaster } from 'svelte-french-toast';

    export let data = null;

    function onClick(e) {
        if (["SPAN", "I", "B", "P", "A", "H1", "H2"].includes(e.target.tagName))
            return;

        let selection = window.getSelection();
        selection.removeAllRanges();
    }
</script>

<div class="app" on:click={onClick}>
    <HomePage {data}/>
</div>

<Toaster />

<style>
    .app {
        display: flex;
        flex-direction: column;
        font-family: 'Roboto', 'Lato', sans-serif;
        overflow: hidden;
        max-width: 100vw;
        min-width: 100vw;
        max-height: 100vh;
        min-height: 100vh;
    }

    @media (max-width: 780px) {
        .app {
            max-height: unset;
            min-height: unset;
            overflow: auto;
        }
    }

    :global(*) {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        user-select: none;
    }
</style>