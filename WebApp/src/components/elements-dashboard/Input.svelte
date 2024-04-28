<script lang="ts">
  export let type: string = "text";
  export let value: any = "";

  export let onUpdate = () => {};
  function typeAction(node: any) {
    node.type = type;
  }
</script>

<input
  use:typeAction
  bind:value
  required
  min="0"
  on:input={() => onUpdate()}
  style:width="90%"
/>
