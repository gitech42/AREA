<script lang="ts">
  import CreateArea from "../../components/elements-dashboard/CreateArea.svelte";
  import AreaDashboard from "../../components/elements-dashboard/AreaExist.svelte";
  import TopBar from "../../components/elements-dashboard/TopBar.svelte";
  import ApiService from "../../services/ApiServices";
  import type { Area } from "../../domain/area";
  import { onMount } from "svelte";

  let areas: Area[] = [];

  /**
   * Function to get cookie when user has been connected by Google or Github
   * @param name Name of cookie we need
   */
  function getCookie(name: string) {
    const value: string = `; ${document.cookie}`;
    const parts: string[] = value.split(`; ${name}=`);
    let access_token: string | undefined;
    let route: string = window.location.toString();

    if (
      parts.length === 2 &&
      (access_token = parts.pop()?.split(";").shift()) !== undefined &&
      localStorage.getItem("token")?.length === 0
    )
      localStorage.setItem("token", access_token);
    if (route.length > 31 && parts.length !== 2) {
      let test = route.slice(route.indexOf("access_token=") + 13);
      localStorage.setItem("token", test);
    }
    localStorage.setItem("user", "false");
  }
  getCookie("access_token");
  onMount(async () => {
    areas = await ApiService.getAreas();
  });
</script>

<TopBar />
<div class="center-container">
  <div class="container-area">
    <CreateArea onUpdate={async () => (areas = await ApiService.getAreas())} />
    {#each areas as area}
      <AreaDashboard
        {area}
        onUpdate={async () => (areas = await ApiService.getAreas())}
      />
    {/each}
  </div>
</div>

<style>
  .center-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .container-area {
    width: 95%;
    transition: 0.5s;
  }
  @media screen and (min-width: 321px) and (max-width: 600px) {
    .container-area {
      display: grid;
      place-items: center;
      grid-template-columns: repeat(auto-fill);
      transition: 0.8s;
    }
  }
  @media screen and (min-width: 601px) and (max-width: 1300px) {
    .container-area {
      width: 95%;
      display: grid;
      place-items: center;
      grid-template-columns: repeat(
        auto-fill,
        minmax(max(400px, calc(100% / 2)), 1fr)
      );
      transition: 0.8s;
    }
  }
  @media screen and (min-width: 1301px) {
    .container-area {
      display: grid;
      place-items: center;
      width: 85%;
      grid-template-columns: repeat(
        auto-fill,
        minmax(max(490px, calc(100% / 3)), 1fr)
      );
      transition: 0.8s;
    }
  }
</style>
