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
        gap: 71px;
    }

    nav ul li {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }

    nav ul li span {
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: normal; 
    }

    nav ul li img {
        width: 10px;
        height: 6px;
        flex-shrink: 0;
        fill: #000;
        stroke-width: 1px;
        stroke: #000; 
    }
</style>