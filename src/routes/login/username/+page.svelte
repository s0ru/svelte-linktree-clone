<script>
    import AuthCheck from '$lib/components/AuthCheck.svelte'
    import NeonButton from '$lib/components/NeonButton.svelte';
    import { db, user } from '$lib/firebase'
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
            const ref = doc(db, "usernames", username);
            const exists = await getDoc(ref).then((doc) => doc.exists())
    
            isAvailable = !exists;
            loading = false;
        }, 500);
    }

    const saveUsername = async () => {}
</script>

<AuthCheck>
    <h2>Username</h2>
    <form on:submit|preventDefault={saveUsername}>
        <input type="text" placeholder="U s e r n a m e" bind:value={username} on:input={checkAvailable}/>
        <NeonButton click={() => {}}>Confirm @{username}</NeonButton>
    </form>
    <p>{username} is {#if !isAvailable}<span class="red">not</span>{/if} <span class={isAvailable ? 'green': 'red'}>available</span>.</p>
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

    .green{
        color: #39FF14;
        text-shadow: 1px -1px 5px #39FF14;
    }

    .red{
        color: #FF3131;
        text-shadow: 1px -1px 5px #FF3131;
    }
</style>