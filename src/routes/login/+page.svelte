<script>
    import NeonButton from "$lib/components/NeonButton.svelte";
    import { auth, user } from "$lib/firebase"
    import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        const user = await signInWithPopup(auth, provider);
        console.log(user);
    }
</script>

<h2>Login</h2>

{#if $user}
<h2 class="welcome-msg">Welcome, <span>{$user.displayName}</span></h2>
<p class="logged-in-msg">You are logged in</p>
<NeonButton click={() => signOut(auth)}>Log Out</NeonButton>
{:else}
<NeonButton click={signInWithGoogle}>Sign in with Google</NeonButton>
{/if}

<style>
    .welcome-msg > span{
        color: var(--detail-color);
    }    
</style>