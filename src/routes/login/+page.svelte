<script>
    import { auth } from "$lib/firebase"
    import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        const user = await signInWithPopup(auth, provider);
        console.log(user);
    }
</script>

<h2>Login</h2>

<button class="login-btn" on:click={signInWithGoogle}>Sign in with Google</button>

<style>
    .login-btn{
        font-size: 1.2em;
        margin-top: 3vh;
        width: 15vw;
        height: 7.5vh;
        color: white;
        background-color: var(--detail-color);
        border-radius: 10px;
        border: none;
        outline-style: solid;
        outline-width: medium;
        outline-color: white;
    }

    .login-btn:active{
        background-color: var(--accent-color);
    }
</style>