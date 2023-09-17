<script>
    import ActionItem from '../atoms/ActionItem.svelte';

    import accountIcon from "$lib/assets/icons/actions/account-icon.png";
    import codeIcon from "$lib/assets/icons/actions/code-icon.png";
    import contactIcon from "$lib/assets/icons/actions/contact-icon.png";
    import legalIcon from "$lib/assets/icons/actions/legal-icon.png";
    import quizzIcon from "$lib/assets/icons/actions/quizz-icon.png";
</script>

<div class="actions">
    <ActionItem text="Se connecter" icon={accountIcon} />
    <ActionItem text="Jouer au Quizz" icon={quizzIcon} />
    <div class="more">
        <ActionItem text="Nous contacter" icon={contactIcon} />
        <ActionItem text="Mentions légales" icon={legalIcon} />
        <ActionItem text="Code source" icon={codeIcon} />
    </div>
</div>

<style>
    .actions {
        display: inline-flex;
        flex-direction: row-reverse;
        padding: 0 1em;
        align-items: flex-start;
        gap: 0.375em;
        align-self: flex-end;
    }

    .more {
        display: none;
    }

    @media (min-width: 1160px) {
        .more {
            display: inline-flex;
            flex-direction: row-reverse;
            align-items: flex-start;
            gap: 0.375em;
        }
    }

    @media (max-width: 500px) {
        .actions {
            display: none;
        }
    }
</style>