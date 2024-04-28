<script lang="ts">
  export let name: string = "";
  export let value: boolean = true;
  export let defaultValue: boolean = true;
</script>

<button on:click={() => (value = defaultValue)}
  >{name}
  {#if value === defaultValue}
    <hr class="divider" />
  {/if}
</button>

<style>
  button {
    position: relative;
    display: block;
    margin-right: auto;
    margin-left: auto;
    text-transform: uppercase;
    font-family: inherit;
    font-size: 13px;
    letter-spacing: 0.5px;
    background-color: transparent;
    border: none;
  }
  .divider {
    width: 70px;
    color: black;
    border: 1px solid;
  }
  @media screen and (min-width: 321px) {
    button {
      font-size: 16px;
    }
  }
</style>
