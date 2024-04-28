<script>
    import { page } from "$app/stores";
    import UserLink from "$lib/components/UserLink.svelte";
    import SortableList from "$lib/components/SortableList.svelte";
    import NeonButton from "$lib/components/NeonButton.svelte";
    import CloseIcon from "$lib/components/CloseIcon.svelte";
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
            icon: "custom",
            title: "",
            url: "https://",
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
        <div class="link">
          <UserLink {...item} />
          <button class="delete" on:click={() => deleteLink(item)}><CloseIcon/></button>
        </div>
      </SortableList>

      {#if showForm}
        <form on:submit|preventDefault={addLink}>
          <select name="icon" bind:value={$formData.icon}>
            {#each icons as icon}
              <option class="options" value={icon.toLowerCase()}>{icon}</option>
            {/each}
          </select>
          <input name="title" type="text" placeholder="T i t l e" bind:value={$formData.title}/>
          <input name="url" type="text" placeholder="URL" bind:value={$formData.url}/>
          <div>
            {#if !titleIsValid}
              <p class="error">Must have valid title</p>
            {/if}
            {#if !urlIsValid}
              <p class="error">Must have a valid URL</p>
            {/if}
            {#if formIsValid}
              <p class="success">Looks good!</p>
            {/if}
          </div>
          
          <div class="form-buttons">
            <button class="mini-button" disabled={!formIsValid} type="submit">Add Link</button>
            <button class="mini-button" type="button" on:click={cancelLink}>Cancel</button>
          </div>
        </form>
      {:else}
        <NeonButton click={() => (showForm = true)}>Add a Link</NeonButton>
      {/if}
    {:else}
        <p class="error">This is not yours, friend</p>
        <a href="/login"><NeonButton click={() => {}}>LOGIN</NeonButton></a>
    {/if}
</main>

<style>
  main{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .link{
    display: flex;
    max-width: 500px;
    gap: 1em;
  }

  .delete{
    background: none;
    border: none;
    color: white;
    width: 7%;
    margin-bottom: 3%;
  }

  .delete:hover{
    color: var(--detail-color);
  }

  .form-buttons{
    display: flex;
    justify-content: space-between;
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

  .mini-button{
    padding: 0.5em;
    min-width: 100px;
    min-height: 50px;
    color: white;
    background-color: transparent;
    border-radius: 10px;
    border: none;

    outline-style: solid;
    outline-width: medium;
    outline-color: var(--detail-color);
    box-shadow: 0 0 10px var(--accent-color);
  }

  .mini-button:hover{
    box-shadow: inset 0 0 100px -50px var(--accent-color);
  }

  .mini-button:disabled{
    outline-style: solid;
    outline-width: medium;
    outline-color: gray;
    box-shadow: none;
  }

  select{
    cursor: pointer;
    height: 8vh;
    width: 20vw;
    font-size: 1.2em;
    background: transparent;
    border: none;
    color: white;
    padding: 1em;

    outline-style: solid;
    outline-width: medium;
    outline-color: var(--detail-color);
    box-shadow: 0 0 10px var(--accent-color);
    border-radius: 10px;
  }

  option{
    color: inherit;
    background-color: var(--background-color);
  }

  p{
    text-align: center;
  }

  .success{
    color: #39FF14;
    text-shadow: 1px -1px 5px #39FF14;
  }  
  .error{
    color: #FF3131;
    text-shadow: 1px -1px 5px #FF3131;
  }
</style>