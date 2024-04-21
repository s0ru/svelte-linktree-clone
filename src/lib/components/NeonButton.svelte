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
        background-color: transparent;
        border-radius: 10px;
        border: none;
        outline-style: solid;
        outline-width: medium;
        outline-color: var(--detail-color);
        box-shadow: 0 0 10px var(--accent-color);
    }

    button:active{
        box-shadow: inset 0 0 100px -50px var(--accent-color);
    }
</style>