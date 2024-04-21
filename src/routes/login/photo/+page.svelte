<script>
    import AuthCheck from "$lib/components/AuthCheck.svelte"
    import UploadIcon from "$lib/components/UploadIcon.svelte"
    import {user, userData, storage, db} from "$lib/firebase"
    import {doc, updateDoc} from "firebase/firestore"
    import {getDownloadURL, ref, uploadBytes } from "firebase/storage"

    /**
   * @type {String}
   */
    let previewURL;
    let uploading = false;

    const upload = async (/** @type any */ e) => {
        if(!$user?.uid) return;

        uploading = true
        const file = e.target.files[0];
        previewURL = URL.createObjectURL(file);

        const storageRef = ref(storage, `users/${$user.uid}/profile.png`)
        const result = await uploadBytes(storageRef, file)
        const url = await getDownloadURL(result.ref);

        await updateDoc(doc(db, "users", $user.uid), {photoURL: url});
        uploading = false;
    }
</script>

<AuthCheck>
    <h2>Upload a profile picture</h2>
    <form>
        <img src={previewURL ?? $userData?.photoURL ?? "/user.png"} alt="photoURL" width=256 height="256" />
        {#if false}
            <input on:change={upload} id="photoURL" type="file" accept="image/png, image/jpeg, image/gif, image/webp" />
            <label for="photoURL" class="custom-upload"><UploadIcon /> Choose a file</label>
        {:else}
            <div class="loading-bar">
                <div class="thumb"></div>
            </div>
        {/if}
    </form>
</AuthCheck>

<style>
    form{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    input[type="file"]{
        display: none;
    }

    .custom-upload{
        margin-top: 2vh;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1em;
        font-size: 1.2em;
        padding: 1em;
        min-width: 15vw;
        width: fit-content;
        max-width: 30vw;
        color: white;
        background-color: transparent;
        border-radius: 10px;
        border: none;
        outline-style: solid;
        outline-width: medium;
        outline-color: var(--detail-color);
        box-shadow: 0 0 10px var(--accent-color);
    }

    .custom-upload:hover{
        box-shadow: inset 0 0 100px -50px var(--accent-color);
    }

    .custom-upload:active{
        background-color: var(--accent-color);
    }

    .loading-bar{
        margin-top: 2vh;
        width: 30vw;
        height: 3vh;
        outline-style: solid;
        outline-color: var(--background-color);
        background: transparent;
    }

    .loading-bar .thumb{
        position: relative;
        top: 0;
        left: 0;
        height: 100%;
        width: 5vw;
        background-color: var(--detail-color);
        box-shadow: 0 0 10px var(--accent-color);
        animation: loading 1s infinite;
    }

    @keyframes loading{
        0%{
            left: 0;
        }
        90%{
            left: 85%;
        }
        100%{
            left: 85%;
        }
    }
</style>