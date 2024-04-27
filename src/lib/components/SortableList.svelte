<script>
    import { flip } from "svelte/animate";
    import { createEventDispatcher } from "svelte";

    export let list;
    let isOver = false;

    const dispatch = createEventDispatcher();

    // @ts-ignore
    function getDraggedParent(node){
        if(!node.dataset.index){
            return getDraggedParent(node.parentNode);
        }
        else{
            return {...node.dataset}
        }
    }

    // @ts-ignore
    function onDragStart(e) {
        const dragged = getDraggedParent(e.target);
        e.dataTransfer?.setData("source", dragged?.index.toString());
    }

    // @ts-ignore
    function onDragOver(e) {
        const id = e.target.dataset?.id;
        const dragged = getDraggedParent(e.target);
        isOver = dragged?.id ?? false;
    }

    // @ts-ignore
    function onDragLeave(e) {
        const dragged = getDraggedParent(e.target);
        isOver === dragged.id && (isOver = false);
    }
    
    // @ts-ignore
    function onDrop(e) {
        isOver = false;
        const dragged = getDraggedParent(e.target);
        reorder({
        from: e.dataTransfer?.getData("source"),
        to: dragged.index,
        });
    }

    // @ts-ignore
    const reorder = ({ from, to }) => {
        const newList = [...list];
        newList[from] = [newList[to], (newList[to] = newList[from])][0];

        dispatch("sort", newList);
    };
</script>

{#if list?.length}
  <ul>
    {#each list as item, index (item.id)}
      <li
        class:over={item.id === isOver}
        data-index={index}
        data-id={item.id}
        draggable="true"
        on:dragstart={onDragStart}
        on:dragover|preventDefault={onDragOver}
        on:dragleave={onDragLeave}
        on:drop|preventDefault={onDrop}
        animate:flip={{ duration: 300 }}
      >
        <slot {item} {index} />
      </li>
    {/each}
  </ul>
{:else}
  <p>No items</p>
{/if}
