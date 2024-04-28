<script lang="js">
    import UserLink from "$lib/components/UserLink.svelte";
    import NeonButton from "$lib/components/NeonButton.svelte";
    import {user, userData} from "$lib/firebase"
    import { page } from "$app/stores"

    export let data;
</script>

<svelte:head>
    <title>@{data.username}</title>
    <meta name="description" content={data.bio} />
</svelte:head>

<main>
    {#if $user && $userData?.username == $page.params.username}
        <a class="edit-btn" href="/{$userData?.username}/edit"><NeonButton click={() => {}}>EDIT</NeonButton></a>
    {/if}
    <h1 class="accent-text">{data.username}</h1>

    <img src={data.photoURL ?? "/user.png"} alt="photoURL" width="200">
    <p>{data.bio ?? "no bio yet"}</p>

    <ul>
        {#each data.links as item}
            <li>
                <UserLink {...item}/>
            </li>
        {/each}
    </ul>
</main>

<style>
    main{
       width: 100%;
       height: fit-content;
       display: flex;
       flex-direction: column;
       align-items: center;
    }

    .edit-btn{
        position: absolute;
        top: 1%;
        right: 1%;
    }

    .accent-text{
        color: var(--detail-color);
        text-shadow: 1px -1px 5px var(--detail-color);
    }

    img{
        filter: drop-shadow(10px 10px 20px var(--detail-color));
    }

    ul{
        width: 40vw;
        min-height: 30vh;
        height: auto;
        background-color: var(--card-background-color);
        outline-style: solid;
        outline-color: var(--detail-color);
        border-radius: 20px;
        box-shadow: inset 0 0 100px -50px var(--accent-color), 10px 10px 20px var(--accent-color);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1em;
    }

    li{
        list-style: none;
    }
</style>