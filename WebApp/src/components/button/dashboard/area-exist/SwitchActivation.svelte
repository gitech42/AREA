<script lang="ts">
  export let value: boolean = true;
</script>

<label class="switcher">
  <input type="checkbox" bind:checked={value} style="opacity: 0;" />
  <span class="circle" />
</label>

<style>
  .switcher {
    display: flex;
    height: 34px;
    width: 60px;
    border-radius: 34px;
    background-color: rgba(227, 227, 227, 0.9);
    border: 1px solid;
    cursor: pointer;
  }
  .circle {
    height: 28px;
    width: 28px;
    background-color: red;
    border-radius: 50%;
    margin-left: -16px;
    margin-top: 2px;
    transition: 0.4s;
  }
  input:checked + .circle {
    background-color: green;
    transform: translateX(26px);
  }
</style>
