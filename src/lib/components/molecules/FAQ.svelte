<script>
    import FaqItem from "../atoms/FAQItem.svelte";

    export let questions;

    function onClick(event) {
        questions.forEach(question => {
            if (question.question === event.detail.question)
                return;

            question.active = false;
        });
    }
</script>

<ul class="faq">
    {#each questions as question, i}
    <FaqItem question={question.question} answer={question.answer} bind:active={question.active} on:click={onClick} />
    {/each}
</ul>

<style>
    .faq {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        justify-content: stretch;
        align-items: stretch;
        gap: 0.2em;
    }
</style>