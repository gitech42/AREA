<script lang="ts">
  import LoginInput from "./input-login/LoginInput.svelte";
  import ButtonLogin from "../button/auth/ButtonLogin.svelte";
  import ButtonSwitch from "../button/auth/ButtonSwitchForm.svelte";
  import ApiServices from "../../services/ApiServices";

  let username: string = "";
  let email: string = "";
  let error: string = "";
  let password: string = "";
  let cpassword: string = "";

  /**
   * Function to check if user input is empty
   * @return {boolean}
   */
  function formLoginIsEmpty(): Boolean {
    if (email.length === 0) return true;
    if (password.length === 0) return true;
    return false;
  }
  function formSignInIsEmpty(): Boolean {
    if (formLoginIsEmpty()) return true;
    if (cpassword.length === 0) return true;
    if (username.length === 0) return true;
    return false;
  }
  const getLocation = () => {
    return window.location
      .toString()
      .slice(window.location.toString().indexOf("?") + 1);
  };
  let connected: boolean = getLocation() === "false" ? false : true;
</script>

<div class="box-input">
  <div class="switch-login-register">
    <ButtonSwitch name="Login" defaultValue={true} bind:value={connected} />
    <ButtonSwitch name="Sign up" defaultValue={false} bind:value={connected} />
  </div>
  {#if error !== ""}
    <!-- Petit pictogramme -->
    <p class="text-error">{error}</p>
  {/if}
  {#if connected}
    <div class="login-box">
      <LoginInput PlaceHolder="  Email" type="email" bind:handleInput={email} />
      <LoginInput
        PlaceHolder="  Password"
        type="password"
        bind:handleInput={password}
      />
      <div class="raw-display">
        <button
          style:width="170px"
          class="font-forget-password"
          on:click={() =>
            (window.location.href = "http://localhost:8080/download")}
          >Download APK</button
        >
        <div class="position-forget-password">
          <button
            class="font-forget-password"
            on:click={() => (window.location.href = "/forget-password")}
            >Forget password</button
          >
        </div>
      </div>
      <div class="Oauth2-container">
        <button
          class="Oauth2-box"
          on:click={async () =>
            (window.location.href = await ApiServices.googleAuth())}
          >Login with Google<img
            src="public/assets/logo/google.png"
            alt=""
            style:width="22px"
          /></button
        >
        <button
          class="Oauth2-box"
          on:click={async () =>
            (window.location.href = await ApiServices.githubAuth())}
          >Login with Github<img
            src="public/assets/logo/github.png"
            alt=""
            style:width="22px"
          /></button
        >
      </div>
      <ButtonLogin
        name="Login"
        onClick={async () => {
          if (formLoginIsEmpty()) error = "Complet form";
          const res = await ApiServices.login(email, password);
          if (res.status === 200) window.location.href = "/dashboard";
          else error = res.message;
        }}
      />
    </div>
  {:else}
    <div class="login-box register">
      <LoginInput
        PlaceHolder="  Username"
        type="text"
        bind:handleInput={username}
      />
      <LoginInput
        PlaceHolder="  E-mail"
        type="email"
        bind:handleInput={email}
      />
      <LoginInput
        PlaceHolder="  Password"
        type="password"
        bind:handleInput={password}
      />
      <LoginInput
        PlaceHolder="  Confirm password"
        type="password"
        bind:handleInput={cpassword}
      />
      <div class="button-signup">
        <ButtonLogin
          name="Sign up and login"
          onClick={async () => {
            if (formSignInIsEmpty()) error = "Complet form";
            const res = await ApiServices.register(username, email, password);
            console.log("Res = ", res);
            if (res.status === 200) window.location.href = "/dashboard";
            else error = res.message;
          }}
        />
      </div>
    </div>
  {/if}
</div>

<style>
  .box-input {
    display: flex;
    width: 95%;
    flex-direction: column;
    background: rgba(217, 217, 217, 0.5);
  }
  .switch-login-register {
    display: flex;
    margin-bottom: 10px;
    margin-top: 15px;
  }
  .text-error {
    margin-top: 0;
    font-size: 13px;
    color: red;
  }
  .login-box {
    display: flex;
    height: 210px;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
  }
  .raw-display {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 95%;
  }
  .position-forget-password {
    width: 100%;
    height: 20px;
    align-items: center;
    display: flex;
    justify-content: right;
  }
  .font-forget-password {
    font-family: "Montserrat";
    font-style: normal;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.8);
    padding-right: 5px;
    background-color: rgba(0, 0, 0, 0);
    border: transparent;
    cursor: pointer;
  }
  .font-forget-password:hover {
    background-color: rgba(152, 152, 152, 0.5);
    border-radius: 5px;
  }
  .Oauth2-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 35px;
  }
  .Oauth2-box {
    display: inline-flex;
    align-items: center;
    width: 45%;
    border: transparent;
    border-radius: 5px;
    letter-spacing: 0;
    color: black;
    background-color: #ffffff;
    cursor: pointer;
  }
  .register {
    height: 237px;
  }
  .button-signup {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
  }
  @media screen and (min-width: 321px) {
    .box-input {
      align-items: center;
      max-width: 400px;
    }
    .switch-login-register {
      width: 300px;
      justify-content: space-between;
    }
    .login-box {
      height: 260px;
    }
    .position-forget-password {
      margin-top: -10px;
    }
    .register {
      height: 350px;
    }
  }
</style>
