<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    
    export let question;
    export let answer;
    export let active = false;

    function onClick() {
        active = !active;
        dispatch('click', { active, question, answer });
    }
</script>


<li class:active>
    <div class="question" on:click={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none">
            <path d="M8 1.32704L4.44755 5L1 1.32704L1.35897 1L4.44755 4.10692L7.64103 1L8 1.32704Z" fill="black" stroke="black"/>
        </svg>
        <span>{question}</span>
    </div>
    <p class="answer">{answer}</p>
</li>

<style>
    li .question {
        padding: 0.6em 0;
        font-weight: bold;
        color: #000;
        font-size: 1em;
        font-style: normal;
        line-height: normal;
        align-items: center;
        display: flex;
        gap: 0.5625em;
        cursor: pointer;
    }
    li .question:hover {
        text-decoration-line: underline;
    }
    
    li .question svg {
        transform: rotate(0deg);
        transition: 0.15s ease-in-out;
    }
    li.active .question svg {
        transform: rotate(180deg);
        transition: 0.15s ease-in-out;
    }

    li .answer {
        margin-top: 0.5em;
        padding: 0 0.5em;
        height: 0;
        overflow: hidden;
        z-index: -1;
        position: relative;
        opacity: 0;
        -webkit-transition: .7s ease;
        -moz-transition: .7s ease;
        -o-transition: .7s ease;
        transition: .7s ease;
        margin: 0;
    }
    li.active .answer {
        height: auto;
        opacity: 1;
        z-index: 1;
        padding: 0.5em 1.25em;
        margin: 0 0.5em 0.5em;
    }
</style>