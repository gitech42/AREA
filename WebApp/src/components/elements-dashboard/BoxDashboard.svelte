<div class="box">
  <slot />
</div>

<style>
  .box {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 350px;
    border-radius: 15px;
    border: 1px solid rgba(0, 0, 0, 0.6);
    margin-bottom: 10px;
    background: rgba(255, 255, 255, 0.75);
    transition: 0.25s;
    padding-bottom: 10px;
  }
  .box:hover {
    box-shadow: 7px 7px 5px rgb(88, 88, 88);
    border: 1px solid rgba(0, 0, 0, 0.9);
  }
  @media screen and (min-width: 401px) and (max-width: 1100px) {
    .box {
      width: 370px;
      transition: 0.2s;
    }
  }
  @media screen and (min-width: 1101px) and (max-width: 1500px) {
    .box {
      width: 400px;
      height: 350px;
      transition: 0.2s;
    }
  }
  @media screen and (min-width: 1501px) {
    .box {
      width: 475px;
      height: 350px;
      transition: 0.2s;
    }
  }
</style>
