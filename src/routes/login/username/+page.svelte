<script>
    import AuthCheck from '$lib/components/AuthCheck.svelte'
    import NeonButton from '$lib/components/NeonButton.svelte';
    import { db, user, userData } from '$lib/firebase'
    import { doc, getDoc, writeBatch } from 'firebase/firestore'

    let username = ""
    let loading = false;
    let isAvailable = false;

    /**
   * @type {NodeJS.Timeout}
   */
    let debounceTimer;

    const checkAvailable = async () => {
        isAvailable = false;
        loading = true;
        /* Waits at least 500 ms of lack of user input before making queries */
        clearTimeout(debounceTimer)

        debounceTimer = setTimeout(async () => {
            if(!username) {loading = false; return;}
            const ref = doc(db, "usernames", username);
            const exists = await getDoc(ref).then((doc) => doc.exists())
    
            isAvailable = !exists;
            loading = false;
        }, 500);
    }

    const saveUsername = async () => {
        const batch = writeBatch(db);
        if(!$user) return
        batch.set(doc(db, "usernames", username), {uid: $user?.uid})
        batch.set(doc(db, "users", $user?.uid), {
            username,
            photoURL: $user?.photoURL ?? null,
            published: true,
            bio: 'Default bio',
            links: [
                {
                    title: 'Test link',
                    url: 'https://linktr.ee',
                    icon: 'custom'
                }
            ]
        })

        await batch.commit()
    }

    const re = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
  
    $: isValid = username?.length > 2 && username.length < 16 && re.test(username);
    $: isTouched = username.length > 0;
    $: isTaken = isValid && !isAvailable && !loading
</script>

<AuthCheck>
    <h2>Username</h2>
    {#if $userData?.username}
        <p>Your username is <span class="username-text">@{$userData.username}</span></p>
        <p class="error">Usernames cannot be changed.</p>
        <a class="username-text" href="/login/photo">Upload a profile picture</a>
    {:else}
        <form on:submit|preventDefault={saveUsername}>
            <input type="text" placeholder="U s e r n a m e" bind:value={username} on:input={checkAvailable}/>
            {#if isTouched && isValid && !isTaken}<NeonButton click={() => {}}>Confirm @{username}</NeonButton>{/if}
        </form>

        <p><span class="username-text">{username}</span><span class="cursor">|</span> is
        {#if loading}
            <span class="loading">...</span>
        {:else if !isValid || !isTouched}
            <span class="error">invalid</span>
        {:else if isTaken}
            <span class="error">taken</span>
        {:else}
            <span class="success">available</span>
        {/if}
        </p>
    {/if}
</AuthCheck>

<style>
    form{
        margin-top: 2vh;
        display: flex;
        width: 100%;
        gap: 2vw;
        justify-content: center;
        align-items: center;
    }
    input{
        height: 8vh;
        background-color: var(--background-color);
        color: white;
        font-size: 1.2em;
        font-style: italic;
        border-radius: 10px;
        width: 20vw;
        padding-left: 1em;
        border: none;
        outline-style: solid;
        outline-width: thin;
        outline-color: gray;
    }

    input:focus{
        outline-style: solid;
        outline-color: var(--detail-color);
        box-shadow: inset 0 0 100px -50px var(--accent-color);
    }
    .username-text{
        color: var(--detail-color);
    }
    .success{
        color: #39FF14;
        text-shadow: 1px -1px 5px #39FF14;
    }

    .loading{
        color: yellow;
        text-shadow: 1px -1px 5px yellow;
    }
    .error{
        color: #FF3131;
        text-shadow: 1px -1px 5px #FF3131;
    }

    .cursor{
        animation: blink 1s infinite;
    }

    @keyframes blink{
        0% {opacity: 0;}
        100% {opacity: 1;}
    }
</style>