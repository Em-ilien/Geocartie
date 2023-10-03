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

    @media (max-width: 780px) {
        section {
            width: 100%!important;
            height: fit-content;
            margin-left: unset;
            box-shadow: unset;
        }
    }

    section > div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 3em;
        flex-grow: 1;
    }

    .context-section :global(h1),
    .context-section :global(h2),
    .context-section :global(p),
    .context-section :global(b),
    .context-section :global(i),
    .context-section :global(span) {
        user-select: text;
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