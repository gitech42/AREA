<script lang="ts">
  import LogoArea from "../../components/shared/LogoArea.svelte";
  import FormLogin from "../../components/forms/FormLogin.svelte";
  import ApiService from "../../services/ApiServices";

  /**
   * If the user is already logged in, redirect to dashboard page
   */
  if (ApiService.getUserStatus()) window.location.href = "/dashboard";
</script>

<div class="position-form">
  <LogoArea />
  <FormLogin />
</div>

<style>
  .position-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: hidden;
  }
</style>
