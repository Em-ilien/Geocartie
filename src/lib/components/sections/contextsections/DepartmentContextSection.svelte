<script>
    import ContextSection from "./ContextSection.svelte";

    export let department;

    $: formatDepartementName = department.prefix.charAt(0).toUpperCase() + department.prefix.slice(1) + department.name;
</script>

<ContextSection>
    <section class="department">
        <h1>Département {department.id}</h1>
        <p><b>{formatDepartementName}</b> est situé dans la région {department.region_name}. Il a pour préfecture <b>{department.prefecture_name}</b>.</p>    
        {#each department.images as img}
            <img src={img.src} alt="Image du département {department.id}"/>
        {/each}
    </section>
</ContextSection>

<style>
    section > * {
        max-width: 100%;
    }

    section p {
        margin: 1em 0 0 0;
    }

    section img {
        margin-top: 1em;
    }
</style>