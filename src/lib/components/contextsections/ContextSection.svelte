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
    .context-section {
        display: flex;
        padding: 4em 4% 1em 4%;
        margin-left: 0.625em;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        gap: 5.5em;
        width: calc(50% - 0.625em);
        max-width: calc(50% - 0.625em);
        overflow-x: hidden;
        height: auto;
        flex-grow: 1;
        overflow-y: scroll;
        
        border-right: 1px solid #CCC;
        border-left: 1px solid #CCC;
        background: #FFF;
        box-shadow: 0 0 16px 0px rgba(0, 0, 0, 0.25);
    }

    @media (max-width: 780px) {
        .context-section {
            width: 100%;
            max-width: 100%;
            height: fit-content;
            margin-left: unset;
            box-shadow: unset;
            padding-bottom: 5em;
        }
    }

    .context-section > div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 3em;
        flex-grow: 1;
        max-width: 100%;
    }

    .context-section :global(section) {
        line-height: 1.42857143;
        color: #333;
        background-color: #fff;
        max-width: 100%;
    }

    .context-section :global(section h1) {
        font-size: 2.5em;
    }

    .context-section :global(section h2) {
        margin-top: 1.5em;
    }

    .context-section :global(section h3) {
        margin-top: 1.25em;
        margin-left: 1em;
    }

    .context-section :global(section ul li) {
        margin-left: 3em;
        margin-top: 0.25em;
    }

    .context-section :global(section p) {
        margin: 1em 0 0 1em;
    }

    .context-section :global(h1),
    .context-section :global(h2),
    .context-section :global(p),
    .context-section :global(a),
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