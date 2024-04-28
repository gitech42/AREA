<script lang="ts">
  import LogoArea from "../../components/shared/LogoArea.svelte";
  import LoginInput from "../../components/forms/input-login/LoginInput.svelte";
  import ApiServices from "../../services/ApiServices";
  import ButtonLogin from "../../components/button/auth/ButtonLogin.svelte";

  let email: string = "";
  let res: number = 200;
</script>

<div class="position-form">
  <LogoArea />
  <div class="login-box">
    <LoginInput
      PlaceHolder="  Enter your email"
      type="text"
      bind:handleInput={email}
    />
    {#if res !== 200}
      <p class="font-message">We don't know this email, please sign up</p>
      <ButtonLogin
        name="Sign-up"
        onClick={() => (window.location.href = "/login?false")}
      />
    {:else}
      <ButtonLogin
        name="Send your password to this email"
        onClick={async () => {
          res = await ApiServices.forgetPassword(email);
          if (res === 200) {
            window.location.href = "/login";
          }
        }}
      />
    {/if}
  </div>
</div>

<style>
  .login-box {
    display: flex;
    height: 140px;
    width: 350px;
    justify-content: space-between;
    padding: 15px;
    flex-direction: column;
    align-items: center;
    background: rgba(217, 217, 217, 0.5);
  }
  .position-form {
    margin-top: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: hidden;
  }
  .font-message {
    font-size: 14px;
  }
</style>
