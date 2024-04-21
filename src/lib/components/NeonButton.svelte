<script>
    /**
   * @type {function}
   */
     export let click;
</script>

<button on:click={click()}><slot/></button>

<style>
    button{
        font-size: 1.2em;
        padding: 1em;
        min-width: 15vw;
        width: fit-content;
        max-width: 30vw;
        height: 7.5vh;
        color: white;
        background-color: var(--detail-color);
        border-radius: 10px;
        border: none;
        outline-style: solid;
        outline-width: medium;
        outline-color: white;
    }

    button:active{
        background-color: var(--accent-color);
    }
</style>