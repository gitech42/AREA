<script lang="ts">
  import BoxDashboard from "./BoxDashboard.svelte";
  import type { Area } from "../../domain/area";
  import ApiService from "../../services/ApiServices";
  import axios from "axios";

  export let onUpdate = () => {};
  export let area: Area;
</script>

<BoxDashboard>
  <div class="box-activate">
    <p class="text-style">Activation</p>
    <!-- <SwitchActivation value={area.active} /> -->
  </div>
  <div class="box-logo">
    <img
      class="logo"
      src={"public/assets/logo/" + area.action.fromService.logo}
      alt="logo service action"
    />
    <img
      style:object-fit="scale-down"
      style:width="75px"
      src={"public/assets/logo/arrow.png"}
      alt="arrow"
    />
    <img
      class="logo"
      src={"public/assets/logo/" + area.reaction.fromService.logo}
      alt="logo service reaction"
    />
  </div>
  <div class="box-text">
    <p class="text-style date">Area created: {area.dateCreated}</p>
    <p class="text-style objectif">
      When : {area.action.name} to {area.action.param[0] !== undefined
        ? area.action.param[0]
        : ""}
    </p>
    <p class="text-style objectif">
      So : {area.reaction.name} to {area.reaction.param[0]}
    </p>
  </div>
  <div class="button-position">
    <button
      class="create-area-button left"
      on:click={async () => {
        await ApiService.deleteArea(area);
        onUpdate();
      }}>Remove</button
    >
    {#if area.action.fromService.name === "Pornhub"}
      <input
        type="button"
        value="Click here for the video link"
        class="create-area-button right"
        on:click={async () => {
          const res = await axios.get(
            "http://localhost:8080/api/user/area/pornhub",
            {
              headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
              },
            }
          );
          window.location.href = res.data.name;
        }}
      />
    {/if}
  </div>
</BoxDashboard>

<style>
  .logo {
    width: 40px;
    height: 40px;
    object-fit: scale-down;
    margin: 5px;
  }
  .box-activate {
    display: flex;
    width: 150px;
    align-items: center;
    justify-content: space-between;
  }
  .box-logo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    transition: 0.25s;
    object-fit: scale-down;
  }
  .box-text {
    height: 210px;
    width: 90%;
  }
  .date {
    text-align: center;
  }
  .objectif {
    height: 62px;
    margin-top: 10px;
    text-align: left;
  }
  .text-style {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    white-space: pre-wrap;
    text-overflow: ellipsis;

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
  .left {
    margin-left: 10px;
    transition: 0.3s;
  }
  .right {
    transition: 0.3s;
    margin-right: 10px;
  }
  .button-position {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: -5px;
  }
  @media screen and (min-width: 321px) and (max-width: 600px) {
    .box-logo {
      width: 85%;
    }
    .left {
      margin-left: 40px;
    }
    .right {
      margin-right: 40px;
    }
  }
  @media screen and (min-width: 601px) and (max-width: 1000px) {
    .box-logo {
      width: 82.5%;
    }
    .left {
      margin-left: 50px;
    }
    .right {
      margin-right: 50px;
    }
    .objectif {
      margin-top: 20px;
    }
  }
  @media screen and (min-width: 1001px) {
    .box-logo {
      width: 75%;
    }
    .left {
      margin-left: 50px;
    }
    .right {
      margin-right: 50px;
    }
    .objectif {
      margin-top: 20px;
    }
  }
</style>
