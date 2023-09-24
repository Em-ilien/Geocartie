<script>
    import BottomNavigation from "./sections/BottomNavigation.svelte";
    import DefaultContextSection from "./sections/DefaultContextSection.svelte";
    import Header from "./sections/Header.svelte";
    import Map from "./sections/Map.svelte";

</script>

<Header />
<main>
    <DefaultContextSection />
    <Map />
</main>
<BottomNavigation />

<style>
    main {
        display: flex;
        flex-direction: row;
        align-items: stretch;
        justify-content: stretch;
        height: 100%;
        width: 100%;
    }

 
</style>