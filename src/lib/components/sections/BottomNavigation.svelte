<script>
    import ActionItem from "../atoms/ActionItem.svelte";
    
    import accountIcon from "$lib/assets/icons/actions/account-icon.png";
    import quizzIcon from "$lib/assets/icons/actions/quizz-icon.png";
</script>

<div class="bottom-navigation">
    <ActionItem text="Se connecter" icon={accountIcon} />
    <ActionItem text="Jouer au Quizz" icon={quizzIcon} />
</div>

<style>
    .bottom-navigation {
        display: flex;
        width: 100vw;
        padding: 0 7.125em 0.375em 7.125em;
        justify-content: center;
        align-items: flex-start;
        gap: 2.25em;

        background: #FFF;
        box-shadow: 0 -1px 4px 0 rgba(0, 0, 0, 0.25);
    }

    @media (min-width: 500px) {
        .bottom-navigation {
            display: none;
        }
    }
</style>