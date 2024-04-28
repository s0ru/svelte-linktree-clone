<script>
    export let icon = 'default'
    export let url = 'foo'
    export let title = 'fancy title'
</script>

<a href={url} target="_blank">
    <img src={`/${icon}.png`} alt={icon} width="32" height="32"/>
    <span>{title}</span>
</a>

<style>
    a{
        display: flex;
        gap: 1em;
        padding: 1em;
        height: fit-content;
        min-width: 400px;
        width: 30vw;
        align-items: center;
        background-color: var(--background-color);
        text-decoration: none;
        color: inherit;
        border-radius: 20px;
        margin-bottom: 1em;
        outline-style: solid;
        outline-width: thin;
        outline-color: var(--detail-color);
    }

    a:hover {
        box-shadow: inset 0 0 100px -50px var(--accent-color);
    }

    a:active{
        background-color: var(--accent-color);
    }
</style>