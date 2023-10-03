<script>
    import icon from '$lib/assets/icons/arrow.png';

    import toast from 'svelte-french-toast';

    function onClick(e) {
        toast.error("Le menu n'est pas encore implémenté.", {
            style: "font-family: 'Roboto', 'Lato', sans-serif; box-shadow: 2px 2px 5px 3px #00000025",
            position: "top-right",
        });
    }
</script>

<nav>
    <ul on:click={onClick}>
        <li>
            <span>France</span>
            <img src={icon} alt="Icône flèche" />
        </li>
        <li>
            <span>Europe</span>
            <img src={icon} alt="Icône flèche" />
        </li>
        <li>
            <span>Monde</span>
            <img src={icon} alt="Icône flèche" />
        </li>
    </ul>
</nav>

<style>
    nav ul {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        list-style: none;
        height: 100%;
       
    }

    nav ul li {
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 0.625em;
        cursor: pointer;
        padding: 0 1.5vw;
    }

    nav ul li span {
        font-size: 1.1em;
        font-style: normal;
        font-weight: 400;
        line-height: normal; 
    }

    nav ul li:hover span {
        text-decoration: underline;
    }

    nav ul li img {
        width: 0.625em;
        height: 0.375em;
        flex-shrink: 0;
        fill: #000;
        stroke-width: 1px;
        stroke: #000; 
    }

    @media (max-width: 500px) {
        nav ul {
            padding: 0.5625em 1.625em;
            justify-content: space-between;
            border: 1px solid #DDD;
            border-left: none;
            border-right: none;
            width: 100vw;
        }
    }

    @media (max-width: 370px) {
        nav ul {
            padding: 0.5625em 5%;
        }
    }
</style>