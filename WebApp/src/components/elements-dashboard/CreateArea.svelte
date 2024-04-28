<script lang="ts">
  import FormCreateArea from "../forms/FormCreateArea.svelte";
  import BoxDashboard from "./BoxDashboard.svelte";
  import type { Service } from "../../domain/service";
  import { onMount } from "svelte";
  import ApiService from "../../services/ApiServices";

  export let onUpdate = () => {};
  let display: Boolean = false;
  let servicesPossible: Service[] = [];
  let pictures: string[] = [
    "public/assets/logo/coincap.png",
    "public/assets/logo/github.png",
    "public/assets/logo/google_calendar.png",
    "public/assets/logo/google.png",
    "public/assets/logo/joke.png",
    "public/assets/logo/pokemon.png",
    "public/assets/logo/pornhub.png",
    "public/assets/logo/weather.png",
    "public/assets/logo/youtube.png",
  ];
  onMount(async () => {
    servicesPossible = await ApiService.getServices();
  });
</script>

<BoxDashboard>
  <p class="title-box">add your area</p>
  <div class="box-area">
    <div class="box-logo">
      {#each servicesPossible as service, i}
        <img class="img-logo" src={pictures[i]} alt="" />
      {/each}
    </div>
    <hr class="divider" />
    <div class="box-action">
      {#each servicesPossible as service}
        {#each service.actions as possibility}
          <p class="text-acs">- {possibility.name}</p>
        {/each}
        {#each service.reactions as possibility}
          <p class="text-acs">- {possibility.name}</p>
        {/each}
      {/each}
    </div>
  </div>
  <button class="create-area-button" on:click={() => (display = true)}
    >Create Area</button
  >
</BoxDashboard>
{#if display}
  <div class="form-create-area">
    <FormCreateArea
      onClose={() => {
        onUpdate();
        display = false;
      }}
    />
  </div>
{/if}

<style>
  .title-box {
    text-align: center;
    font-size: 16px;
    letter-spacing: 5px;
    font-family: "Montserrat";
    text-transform: uppercase;
    color: rgba(0, 0, 0, 0.5);
  }
  .box-area {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    width: 95%;
    height: 82.5%;
  }
  .box-logo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    width: 95%;
  }
  .img-logo {
    max-width: 50px;
    max-height: 50px;
    min-width: 25px;
    min-height: 25px;
    object-fit: scale-down;
    margin: 5px;
  }
  .divider {
    width: 80%;
    border: 1px solid rgba(0, 0, 0, 0.6);
    color: black;
    transition: 0.2s;
  }
  .box-action {
    overflow: hidden;
    height: 210px;
  }
  .text-acs {
    -webkit-box-orient: vertical;

    margin-left: auto;
    margin-right: auto;
    margin-top: 2px;
    margin-bottom: 10px;
    padding-left: 15px;

    font-family: "Antonio";
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
  }
  .create-area-button {
    padding: 5px;
    border-radius: 5px;
    border: transparent;
  }
  .form-create-area {
    position: fixed;
    align-items: center;
    top: 55px;
  }
  @media screen and (min-width: 401px) and (max-width: 750px) {
    .form-create-area {
      transition: 0.2s;
      top: 75px;
    }
  }
  @media screen and (min-width: 751px) and (max-width: 1200px) {
    .form-create-area {
      transition: 0.2s;
      top: 115px;
    }
  }
  @media screen and (min-width: 1201px) and (max-width: 1350px) {
    .form-create-area {
      transition: 0.2s;
      top: 120px;
    }
  }
  @media screen and (min-width: 1351px) {
    .form-create-area {
      transition: 0.2s;
      top: 135px;
    }
  }
  @media screen and (min-width: 1501px) {
    .box-action {
      columns: 2;
    }
    .box-logo {
      width: 87.5%;
    }
  }
</style>
