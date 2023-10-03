<script>
    export let label;
</script>

<button>
    <slot name="icon" />
    <span>{label}</span>
</button>

<style>
    button {
        display: flex;
        padding: 0.6875em 1.25em 0.6875em 0.75em;
        align-items: center;
        gap: 0.8125em;
        border-radius: 0.75em;
        border: 1px solid #226BC2;
        background: #226BC2;
        cursor: pointer;
    }

    button:hover {
        box-shadow: 4px 4px 6px 0 rgba(0, 0, 0, 0.25);
        padding-right: 3em;
        transition: 0.5s cubic-bezier(0,0,0,1);
    }

    @media(hover: none) {
        button:hover {
            padding-right: 1.25em;
        }
    }

    button:active {
        box-shadow: inset 0 0 6px 0 rgba(0, 0, 0, 0.25)!important;
        transform: scale(0.95);
    }

    button img {
        width: 1.6875em;
        height: 1.6875em;
    }

    button span {
        color: #FFF;
        font-size: 1.25em;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        user-select: none;
    }
</style>