<script>
    import BottomNavigation from "./sections/BottomNavigation.svelte";
    import SpecificContextSection from "./sections/contextsections/SpecificContextSection.svelte";
    import Header from "./sections/Header.svelte";
    import Map from "./sections/Map.svelte";

    let dataState = null;
</script>

<Header />
<main>
    <SpecificContextSection {dataState}/>
    <Map />
</main>
<BottomNavigation />

<style>
    main {
        display: flex;
        flex-direction: row;
        align-items: stretch;
        justify-content: stretch;
        width: 100%;
        flex-grow: 1;
        flex-shrink: 1;
        overflow-y: hidden;
        height: fit-content;
    }

    @media (max-width: 780px) {
        main {
            flex-direction: column-reverse;
        }
    }

</style>