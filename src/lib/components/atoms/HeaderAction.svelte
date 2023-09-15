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
        padding: 9px 13px;
        flex-direction: column;
        align-items: center;
        gap: 10px; 
    }

    img {
        width: 2rem;
        height: 2rem;
        object-fit: contain;
    }

    span {
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal; 
    }
</style>