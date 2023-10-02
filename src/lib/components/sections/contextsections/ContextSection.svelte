<script>
    import FAQ from "../../molecules/FAQ.svelte";

    let questions = [
        {
            question: "Qu'est-ce que Géocartie ?",
            answer: "Géocartie est une application web permettant d'apprendre et de découvrir les départements français. Cette plateforme open-source comprend une carte interactive et un Quizz.",
        },
        {
            question: "Qu'est-ce que le Quizz ?",
            answer: "Le Quizz permet de s'entraîner à localiser les départements. Géocartie donne le nom d'un département : votre objectif est de le retrouver sur la carte. Cliquez sur le bouton \"Jouer au Quizz\" pour essayer.",
        },
        {
            question: "À quoi sert la connexion à son compte Google ?",
            answer: "Se connecter à son compte Google permet de sauvegarder ses scores et ses statistiques liées au Quizz. Le mode hors-ligne permet toujours de jouer au Quizz.",
        }
    ];

</script>

<section class="context-section">
    <div>
        <slot />
    </div>
    <footer>
        <nav>
            <a target="_blank" href="https://github.com/Em-ilien/Geocartie">Code source</a>
            <a href="/legal">Mentions légales</a>
            <a href="/contact">Nous contacter</a>
        </nav>
    </footer>
</section>

<style>
    section {
        display: flex;
        padding: 4em 4% 1em 4%;
        margin-left: 0.625em;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        gap: 5.5em;
        width: 50%;
        height: auto;
        flex-grow: 1;
        overflow-y: scroll;
        
        border-right: 1px solid #CCC;
        border-left: 1px solid #CCC;
        background: #FFF;
        box-shadow: 0 0 16px 0px rgba(0, 0, 0, 0.25);
    }

    section > div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 3em;
        flex-grow: 1;
    }

    footer nav {
        display: inline-flex;
        align-items: flex-start;
    }
    
    footer nav a {
        padding: 1em 0.6875em;
        color: #000;
        font-size: 0.8em;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        text-decoration: none;
    }
    footer nav a:hover {
        text-decoration: underline;
    } 
</style>