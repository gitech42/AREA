<script lang="ts">
  import LogoArea from "../../components/shared/LogoArea.svelte";
  import Logout from "../button/dashboard/Logout.svelte";

  let innerWidth: number = 0;
</script>

<svelte:window bind:innerWidth />

<div class="top-bar-size">
  <div class="position-logo">
    {#if innerWidth > 400}
      <LogoArea fixSize={true} sizeWanted={innerWidth > 750 ? 170 : 100} />
    {/if}
  </div>
  <!-- <div class="position-avatar-username">
    <p class="style-text">Username</p>
  </div> -->
  <div class="position-logout">
    <Logout />
  </div>
</div>

<style>
  .top-bar-size {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .position-logo {
    opacity: 0;
  }
  /* 
    Unused but if i have mail of user we can use
  */
  /* .position-avatar-username {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 160px;
  } */
  .position-logout {
    margin-right: 10px;
    scale: 0.8;
  }
  @media screen and (min-width: 400px) and (max-width: 750px) {
    .position-logo {
      opacity: 1;
      margin-left: 20px;
    }
    .position-logout {
      margin-right: 40px;
    }
    /* .position-avatar-username {
      width: 200px;
    } */
  }
  @media screen and (min-width: 751px) and (max-width: 1350px) {
    .position-logo {
      opacity: 1;
      margin-left: 50px;
    }
    /* .position-avatar-username {
      width: 275px;
    } */
    .position-logout {
      margin-right: 90px;
      scale: 1;
    }
  }
  @media screen and (min-width: 1351px) {
    .top-bar-size {
      height: 130px;
    }
    .position-logo {
      opacity: 1;
      margin-left: 100px;
    }
    /* .position-avatar-username {
      width: 350px;
    } */
    .position-logout {
      margin-right: 140px;
      scale: 1;
    }
  }
</style>
