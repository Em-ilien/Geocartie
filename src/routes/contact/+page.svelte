<script>

    import Header from "../../lib/components/sections/Header.svelte";
  
</script>
<Header />
  
<section class="contact">
    <h1>Contact</h1>

    <p>Pour me contacter, envoyez-moi un courriel à l'adresse <a href="mailto:emilien@em-ilien.fr">mailto:emilien@em-ilien.fr</a>.</p>
</section>
  
<style>
    :global(*) {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :global(body) {
        font-family: 'Roboto', 'Lato', sans-serif;
    }
    
    .contact {
        font-family: 'Roboto', 'Lato', sans-serif;
        font-size: 14px;
        line-height: 1.42857143;
        color: #333;
        background-color: #fff;
        padding: 1em 2em 20em;
    }

    h1 {
        font-size: 3em;
        margin-top: 1.5em;
    }

    p {
        margin: 1em 0 0 1em;
    }
</style>