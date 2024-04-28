<script lang="ts">
  import ApiService from "../../../services/ApiServices";
</script>

<button class="logout" on:click={async () => await ApiService.logout()}>Logout</button>

<style>
  .logout {
    background: url("https://dh3vbjnk0bnfa.cloudfront.net/static/centralauth/images/btn-login-hover.png")
      no-repeat 5px 5px #484b4f;
    width: 100px;
    cursor: pointer;
    border-radius: 50px;
    padding: 10px 20px 10px 0;
    color: White;
    font-size: 14px;
    text-align: left;
    text-indent: 40px;
    display: block;
    margin: 0 auto;

    /* Animations: */
    transition-timing-function: ease-in-out;
    transition-duration: 0.4s;
    transition-property: all;
  }

  .logout:hover {
    background-image: url("https://dh3vbjnk0bnfa.cloudfront.net/static/centralauth/images/btn-login.png");
    background-position: 65px 5px;
    text-indent: 15px;
  }
</style>
