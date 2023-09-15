<script>
    import HeaderAction from '../atoms/HeaderAction.svelte';


    import accountIcon from "$lib/assets/icons/actions/account-icon.png";
    import codeIcon from "$lib/assets/icons/actions/code-icon.png";
    import contactIcon from "$lib/assets/icons/actions/contact-icon.png";
    import legalIcon from "$lib/assets/icons/actions/legal-icon.png";
    import quizzIcon from "$lib/assets/icons/actions/quizz-icon.png";
</script>

<div class="actions">
    <HeaderAction text="Se connecter" icon={accountIcon} />
    <HeaderAction text="Joueur au Quizz" icon={quizzIcon} />
    <div class="more">
        <HeaderAction text="Nous contacter" icon={contactIcon} />
        <HeaderAction text="Mentions légales" icon={legalIcon} />
        <HeaderAction text="Code source" icon={codeIcon} />
    </div>
</div>

<style>
    .actions {
        display: inline-flex;
        flex-direction: row-reverse;
        padding: 0px 16px;
        align-items: flex-start;
        gap: 6px;
    }

    .more {
        display: none;
    }

    @media (min-width: 768px) {
        .more {
            display: inline-flex;
            flex-direction: row-reverse;
            align-items: flex-start;
            gap: 6px;
        }
    }
</style>