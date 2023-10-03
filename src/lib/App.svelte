<script>
    import HomePage from "./components/HomePage.svelte";

    function onClick(e) {
        console.log(e.target.tagName)
        if (["SPAN", "I", "B", "P", "H1", "H2"].includes(e.target.tagName))
            return;

        //unselect user-selection
        var selection = window.getSelection();

        // Désélectionner tout
        selection.removeAllRanges();
    }
</script>

<div class="app" on:click={onClick}>
    <HomePage />
</div>

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