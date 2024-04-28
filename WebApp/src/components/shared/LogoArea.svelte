<script lang="ts">
  export let innerWidth: number = 0;

  export let fixSize: boolean = false;
  export let sizeWanted: number = 0;
  let size: number = 525;
</script>

<svelte:window bind:innerWidth />

{#if !fixSize}
  <div
    class="logo"
    style="--size:{(innerWidth > size ? size : innerWidth) / size};"
  >
    <div class="triangle">
      <div
        class="triangle-left"
        style="--size:{(innerWidth > size ? size : innerWidth) / size};"
      >
        <div class="triangle-left middle" />
      </div>
      <div
        class="triangle-right"
        style="--size:{(innerWidth > size ? size : innerWidth) / size};"
      />
    </div>
    <p
      class="area-style"
      style="--size:{(innerWidth > size ? size : innerWidth) / size};"
    >
      AREA
    </p>
  </div>
{:else}
  <div class="logo" style="--size:{sizeWanted / size};">
    <div class="triangle">
      <div class="triangle-left" style="--size:{sizeWanted / size};">
        <div class="triangle-left middle" />
      </div>
      <div class="triangle-right" style="--size:{sizeWanted / size};" />
    </div>
    <p class="area-style" style="--size:{sizeWanted / size};">AREA</p>
  </div>
{/if}

<style>
  .logo {
    width: calc(var(--size) * 525px);
    height: calc(var(--size) * 350px);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .triangle {
    display: flex;
    justify-content: space-between;
    width: calc(var(--size) * 450px);
    height: calc(var(--size) * 270px);
  }
  .triangle-right {
    margin-right: calc(var(--size) * 119px);
    height: calc(var(--size) * 300px);
    transform: rotate(135.4deg);
    width: calc(var(--size) * 2px);
    background: black;
  }
  .triangle-left {
    margin-left: calc(var(--size) * 119px);
    height: calc(var(--size) * 300px);
    transform: rotate(44.6deg);
    width: calc(var(--size) * 2px);
    background: black;
  }
  .middle {
    margin-left: calc(var(--size) * 50px);
    height: calc(var(--size) * 250px);
    transform: rotate(180deg);
  }
  .area-style {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: calc(var(--size) * 50px);
    line-height: calc(var(--size) * 60px);
    text-transform: uppercase;
    letter-spacing: calc(var(--size) * 50px);
    text-align: center;
    color: #000000;
    margin-left: calc(var(--size) * 50px);
    margin-top: auto;
  }
</style>
