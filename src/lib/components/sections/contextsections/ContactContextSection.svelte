<script>
    import ContextSection from "./ContextSection.svelte";
</script>

<ContextSection>
    <section class="legal">
        <h1>Contact</h1>

        <p>Pour me contacter, envoyez-moi un courriel à l'adresse <a href="mailto:emilien@em-ilien.fr">mailto:emilien@em-ilien.fr</a>.</p>    
    </section>
</ContextSection>

<style>
    .legal {
        line-height: 1.42857143;
        color: #333;
        background-color: #fff;
    }


    h1 {
        font-size: 2.5em;
    }

    h2 {
        margin-top: 1.5em;
    }

    h3 {
        margin-top: 1.25em;
        margin-left: 1em;
    }

    ul li {
        margin-left: 3em;
        margin-top: 0.25em;
    }

    p {
        margin: 1em 0 0 1em;
    }
</style>