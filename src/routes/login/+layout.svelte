<script>
    import { page } from "$app/stores"
    import AnimatedRoute from "$lib/components/AnimatedRoute.svelte";
</script>

<nav>
    <ul>
        <a href="/login">
            <div class="step" class:active={!$page.route.id?.match(/username|photo/g)}>1</div>
            Sing In
        </a>
        <a href="/login/username">
            <div class="step" class:active={$page.route.id?.includes('username')}>2</div>
            Choose Username
        </a>
        <a href="/login/photo">
            <div class="step" class:active={$page.route.id?.includes('photo')}>3</div>
            Upload Photo
        </a>
    </ul>
</nav>

<AnimatedRoute>
    <main>
        <div class="login-card">
            <slot></slot>
        </div>
    </main>
</AnimatedRoute>

<style>
    main{
       width: 100vw;
       height: fit-content;
       display: flex;
       justify-content: space-around;
       align-items: center;
    }

    .login-card{
        margin-top: 10vh;
        padding: 3em;
        border-radius: 10px;
        outline-style: solid;
        outline-color: var(--detail-color);
        width: 50vw;
        min-height: 30vh;
        height: auto;
        background-color: var(--card-background-color);

        box-shadow: inset 0 0 100px -50px var(--accent-color), 10px 10px 20px var(--accent-color);

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    nav{
        margin-top: 5vh;
    }
    ul{
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 5vw;
    }
    a{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1vh;
        color: white;
        text-decoration: none;
        color: inherit;
    }
    .step{
        width: 40px;
        height: 40px;
        border-radius: 20px;
        background-color: var(--card-background-color);
        outline-style: solid;
        outline-color: var(--detail-color);
        text-align: center;
        line-height: 40px;
    }

    .step.active{
        box-shadow: inset 0 0 20px var(--accent-color);
    }
</style>