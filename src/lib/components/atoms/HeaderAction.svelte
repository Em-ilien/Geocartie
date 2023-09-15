<script>

    export let text = "";
    export let icon;

</script>

<div>
    <img src={icon} alt="Icône" />
    <span>{text}</span>
</div>

<style>
    div {
        display: flex;
        padding: 0.5625em 0.8125em;
        flex-direction: column;
        align-items: center;
        gap: 0.625em; 
    }

    img {
        width: 2rem;
        height: 2rem;
        object-fit: contain;
    }

    span {
        font-size: 0.75em;
        font-style: normal;
        font-weight: 400;
        line-height: normal; 
    }
</style>