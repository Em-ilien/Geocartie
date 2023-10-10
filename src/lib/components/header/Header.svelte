<script>
    import logo from '$lib/assets/images/logo.png';
    import QuizzInstruction from '../quizz/QuizzInstruction.svelte';
    import HeaderActionsList from './HeaderActionsList.svelte';
    import HeaderNav from './HeaderNav.svelte';

    import {quizzEnabled} from "$lib/store/store.js";

    let quizzIsEnabled = false;
    quizzEnabled.subscribe(value => {
        quizzIsEnabled = value;
        console.log(quizzIsEnabled);
    });
</script>

<header>
    <div>
        <a href="/">
            <img src={logo} alt="Logo Géocartie" />
        </a>
        <HeaderNav />
    </div>
    
    {#if !quizzIsEnabled}
        <HeaderActionsList />
    {:else}
        <QuizzInstruction />
    {/if}
</header>

<style>
    header {
        display: flex;
        align-items: stretch;
        justify-content: space-between;
        border-bottom: 1px solid #DDD;
        user-select: none;
    }

    header > div:first-child {
        display: flex;
        align-items: stretch;
        gap: 6vw;
        margin-left: 0.625em;
    }

    a {
        cursor: pointer;
        display: flex;
        align-items: center;
        width: fit-content;
    }

    @media (max-width: 500px) {
        a {
            margin: auto;
        }
    }
    
    a img {
        object-fit: contain;
        width: 10em;
    }

    @media (max-width: 780px) {
        header {
            flex-direction: column;
        }

        header > div:first-child {
            width: 100vw;
        }
    }

    @media (max-width: 500px) {
        header {
            border: none;
            margin-top: 1.5625em;
        }
        
        header > div:first-child {
            flex-direction: column;
            margin-left: 0;
            gap: 1.25em;
        }
    }
</style>