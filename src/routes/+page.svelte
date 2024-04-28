<script>
    import NeonButton from "$lib/components/NeonButton.svelte";
    import { auth, userData, user } from "$lib/firebase";
    import { signOut } from 'firebase/auth'
</script>

<main>
    <h1>One URL</h1>
    <p class="error">To rule them all</p>
    <div class="landing-btns">
        {#if !$user}
            <a href="/login"><NeonButton click={() => {}}>LOGIN</NeonButton></a>
        {:else}
            <a href="/{$userData?.username}"><NeonButton click={() => {}}>@{$userData?.username}</NeonButton></a>
            <NeonButton click={() => signOut(auth)}>LOGOUT</NeonButton>
        {/if}
    </div>
</main>

<style>
    main{
        width: 100%;
        height: 90vh;
        display: flex;
        flex-direction: column;
        gap: 0.2em;
        align-items: center;
        justify-content: center;
    }

    .error{
        color: #FF3131;
        text-shadow: 1px -1px 5px #FF3131;
    }

    .landing-btns{
        display: flex;
        gap: 1em;
    }
</style>