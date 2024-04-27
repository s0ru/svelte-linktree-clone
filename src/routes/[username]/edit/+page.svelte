<script>
    import { page } from "$app/stores"
    import UserLink from "$lib/components/UserLink.svelte";
    import NeonButton from "$lib/components/NeonButton.svelte";
    import { db, userData, user } from "$lib/firebase"
    import {
        arrayRemove,
        arrayUnion,
        doc,
        setDoc,
        updateDoc
    } from "firebase/firestore"
    import {writable} from "svelte/store"

    const icons = [
        "Twitter",
        "Youtube",
        "TikTok",
        "LinkedIn",
        "GitHub",
        "Custom"
    ]

    const formDefaults = {
        icon: "custom",
        title: "",
        url: "https://"
    }

    const formData = writable(formDefaults)
    
    let showForm = false

    $: urlIsValid = $formData.url.match(/^(ftp|http|https):\/\/[^ "]+$/)
    $: titleIsValid = $formData.title.length < 20 && $formData.title.length > 0
    $: formIsValid = urlIsValid && titleIsValid

    const addLink = async () => {
        if(!$user?.uid) return;
        const userRef = doc(db, "users", $user.uid)

        await updateDoc(userRef, {
            links: arrayUnion({
                ...$formData,
                id: Date.now().toString()
            })
        })

        formData.set({
            icon: "",
            title: "",
            url: ""
        })

        showForm = false
    }

    const deleteLink = async (/** @type {unknown} */ item) => {
        if(!$user?.uid) return;
        const userRef = doc(db, "users", $user.uid);
        await updateDoc(userRef, {
            links: arrayRemove(item)
        })
    }

    const cancelLink = () => {
        formData.set(formDefaults);
        showForm = false;
    }
</script>

<main>
    {#if $userData?.username === $page.params.username}
        <h1>Edit your profile</h1>

        <!-- SORTABLE LIST -->

        {#if showForm}
            <form on:submit|preventDefault={addLink}>
                <select name="icon" bind:value={$formData.icon}>
                    {#each icons as icon}
                        <option value={icon.toLowerCase()}>{icon}</option>
                    {/each}
                </select>
                <input name="title" type="text" placeholder="T i t l e" bind:value={$formData.title}/>
                <input name="url" type="text" placeHolder="U R L" bind:value={$formData.url}/>
                <div>
                    {#if !titleIsValid}
                        <p>Must have a valid title</p>
                    {/if}
                    {#if !urlIsValid}
                        <p>Must have a valid URL</p>
                    {/if}
                </div>
                <button disabled={!formIsValid} type="submit">Add Link</button>
                <button type="button" on:click={cancelLink}>Cancel</button>
            </form>
        {:else}
            <button on:click={() => (showForm = true)}>Add a link</button>
        {/if}
    {/if}
</main>