<script>
    import icon from '$lib/assets/icons/arrow.png';
</script>

<nav>
    <ul>
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
        gap: 3vw;
    }

    nav ul li {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 0.625em;
    }

    nav ul li span {
        font-size: 1.25em;
        font-style: normal;
        font-weight: 400;
        line-height: normal; 
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