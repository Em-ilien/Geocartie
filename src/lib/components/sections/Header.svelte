<script>
    import logo from '$lib/assets/images/logo.png';
    import ActionsList from '../molecules/HeaderActionsList.svelte';
    import HeaderNav from '../molecules/HeaderNav.svelte';

</script>

<header>
    <div>
        <img src={logo} alt="Logo Géocartie" />
        <HeaderNav />
    </div>
    
    <ActionsList />
</header>

<style>
    header {
        display: flex;
        align-items: stretch;
        justify-content: space-between;
        border-bottom: 1px solid #DDD; 
    }

    header > div:first-child {
        display: flex;
        align-items: stretch;
        gap: 6vw;
        margin-left: 0.625em;
    }

    img {
        cursor: pointer;
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