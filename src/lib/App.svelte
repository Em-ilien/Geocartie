<script>
    import HomePage from "./components/HomePage.svelte";

</script>

<div class="app">
    <HomePage />
</div>

<style>
    .app {
        display: flex;
        flex-direction: column;
        font-family: 'Roboto', 'Lato', sans-serif;
        overflow: hidden;
        max-width: 100vw;
        max-height: 100vh;
    }

    :global(*) {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        user-select: none;
    }
</style>