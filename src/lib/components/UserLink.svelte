<script>
    export let icon = 'default'
    export let url = 'foo'
    export let title = 'fancy title'
</script>

<a href={url}>
    <img src={`/${icon}.png`} alt={icon} width="32" height="32"/>
    <span>{title}</span>
</a>