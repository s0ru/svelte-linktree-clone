<script>
    import { user } from '$lib/firebase'
</script>

{#if user}
    <slot></slot>
{:else}
    <p>You must be logged in to view this page. <a href="/login">LOGIN</a></p>
{/if}

<style>
    p > a {
        color: var(--detail-color);
    }
</style>