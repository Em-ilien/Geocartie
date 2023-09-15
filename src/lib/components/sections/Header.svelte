<script>
    import logo from '$lib/assets/images/logo.png';
    import HeaderActionsList from '../molecules/HeaderActionsList.svelte';

 
    import HeaderNav from '../molecules/HeaderNav.svelte';

</script>

<header>
    <div>
        <img src={logo} alt="Logo Géocartie">

        <HeaderNav />
    </div>
    
    <HeaderActionsList />
</header>

<style>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        border-bottom: 1px solid #DDD; 
    }

    header > div:first-child {
        display: flex;
        align-items: center;
        gap: 5.875em;
        margin-left: 0.625em;
    }
</style>