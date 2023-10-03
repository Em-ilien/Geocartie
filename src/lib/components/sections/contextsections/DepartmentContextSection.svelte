<script>
    import ContextSection from "./ContextSection.svelte";

    export let department;
    console.log(department);
</script>

<ContextSection>
    <section class="department">
        <h1>Département {department.id}</h1>
        <p>Le département de {department.name} est situé dans la région {department.region_name}. Il a pour préfecture {department.prefecture_name}.</p>    
        {#each department.images as img}
            <img src={img.src} alt="Image du département {department.id}"/>
        {/each}
    </section>
</ContextSection>