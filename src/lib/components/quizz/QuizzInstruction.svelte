<script>
    import {fade, fly} from "svelte/transition";

    import {quizzEnabled} from "$lib/store/store.js";
</script>

<div class="quizz-instruction-hider" in:fly={{y: 0, x: "100%", duration: 700}} out:fly={{y: 0, x: "100%", duration: 700}}>
    <section class="quizz-instruction" >
        <p>Bonjour</p>
        
        <button on:click={() => quizzEnabled.set(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z" fill="black"/>
            </svg>
        </button>
    </section>
</div>

<style>
    .quizz-instruction {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 1.25em;
        width: 50vw;
        padding: 0.4em 1em;
        background: linear-gradient(120deg, #90B2DBaa 0%, #cb8de6aa 80%);
        backdrop-filter: blur(2px);
        min-height: 100%;
    }

    .quizz-instruction-hider {
        background: #fff;
        box-shadow: 0 0 0 1px #fff;
        justify-self: flex-end;
    }

    button {
        background: none;
        box-shadow: none;
        border: none;
        cursor: pointer;
    }

    button:hover svg {
        transform: scale(1.2);
    }

    button svg {
        fill: #000;
    }
</style>