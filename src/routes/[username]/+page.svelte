<script lang="js">
    export let data;
</script>

<svelte:head>
    <title>@{data.username}</title>
    <meta name="description" content={data.bio} />
</svelte:head>

<main>
    <h1 class="accent-text">{data.username}</h1>

    <img src={data.photoURL ?? "/user.png"} alt="photoURL" width="256">
    <p>{data.bio ?? "no bio yet"}</p>

    <ul>
    </ul>
</main>

<style>
    main{
       width: 100vw;
       height: fit-content;
       display: flex;
       flex-direction: column;
       align-items: center;
    }

    .accent-text{
        color: var(--detail-color);
        text-shadow: 1px -1px 5px var(--detail-color);
    }

    img{
        filter: drop-shadow(10px 10px 20px var(--detail-color));
    }
</style>