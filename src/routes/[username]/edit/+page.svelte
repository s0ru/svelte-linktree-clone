<script>
    import { page } from "$app/stores";
    import UserLink from "$lib/components/UserLink.svelte";
    import SortableList from "$lib/components/SortableList.svelte";
    import { db, userData, user } from "$lib/firebase";
    import {
      arrayRemove,
      arrayUnion,
      doc,
      setDoc,
      updateDoc,
    } from "firebase/firestore";
    import { writable } from "svelte/store";
  
    const icons = [
      "Twitter",
      "YouTube",
      "TikTok",
      "LinkedIn",
      "GitHub",
      "Custom",
    ];

    const formDefaults = {
      icon: "custom",
      title: "",
      url: "https://",
    };

    const formData = writable(formDefaults);
  
    let showForm = false;
  
    $: urlIsValid = $formData.url.match(/^(ftp|http|https):\/\/[^ "]+$/);
    $: titleIsValid = $formData.title.length < 20 && $formData.title.length > 0;
    $: formIsValid = urlIsValid && titleIsValid;

    // @ts-ignore
    async function addLink(e) {
        if(!$user?.uid) return;
        const userRef = doc(db, "users", $user.uid);
  
        await updateDoc(userRef, {
            links: arrayUnion({
            ...$formData,
            id: Date.now().toString(),
            }),
        });
    
        formData.set({
            icon: "",
            title: "",
            url: "",
        });
    
        showForm = false;
    }

    // @ts-ignore
    function sortList(e) {
        if(!$user?.uid) return; 
        const newList = e.detail;
        const userRef = doc(db, "users", $user.uid);
        setDoc(userRef, { links: newList }, { merge: true });
    }

    // @ts-ignore
    async function deleteLink(item) {
      if(!$user?.uid) return;
      const userRef = doc(db, "users", $user.uid);
      await updateDoc(userRef, {
        links: arrayRemove(item),
      });
    }
  
    function cancelLink() {
      formData.set(formDefaults);
      showForm = false;
    }
  
</script>
  
<main>
    {#if $userData?.username == $page.params.username}
      <h1>Edit your Profile</h1>

        <SortableList list={$userData?.links} on:sort={sortList} let:item let:index>
            <div>
                <UserLink {...item} />
                <button on:click={() => deleteLink(item)}>Delete</button>
            </div>
      </SortableList>

      {#if showForm}
        <form on:submit|preventDefault={addLink}>
          <select name="icon" class="select select-sm" bind:value={$formData.icon}>
            {#each icons as icon}
              <option value={icon.toLowerCase()}>{icon}</option>
            {/each}
          </select>
          <input name="title" type="text" placeholder="Title" bind:value={$formData.title}/>
          <input name="url" type="text" placeholder="URL" bind:value={$formData.url}/>
          <div>
            {#if !titleIsValid}
              <p>Must have valid title</p>
            {/if}
            {#if !urlIsValid}
              <p>Must have a valid URL</p>
            {/if}
            {#if formIsValid}
              <p>Looks good!</p>
            {/if}
          </div>
  
          <button disabled={!formIsValid} type="submit">Add Link</button>
          <button type="button" on:click={cancelLink}>Cancel</button>
        </form>
      {:else}
        <button on:click={() => (showForm = true)}>Add a Link</button>
      {/if}
    {/if}
</main>