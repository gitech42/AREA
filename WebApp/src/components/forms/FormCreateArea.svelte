<script lang="ts">
  import { setDefaultArea, isEmpty, type Area } from "../../domain/area";
  import type { Service } from "../../domain/service";
  import ApiService from "../../services/ApiServices";
  import Input from "../elements-dashboard/Input.svelte";
  import { onMount } from "svelte";

  export let onClose = () => {};
  let newArea: Area = setDefaultArea();
  let servicesPossible: Service[] = [];
  let value: string[] = [];
  let numberParam: number = 0;
  let minutes: number = 0;

  onMount(async () => {
    servicesPossible = await ApiService.getServices();
  });
</script>

<form
  class="form"
  on:submit|preventDefault={async () => {
    /**
     * Convert minutes in milliseconds for timer param
     */
    newArea.action.parameters.forEach((element, i) => {
      if (element.localeCompare("timer") == 0) {
        minutes = +newArea.action.param[i];
        newArea.action.param[i] = (minutes *= 60000).toString();
      }
    });
    newArea.reaction.parameters.forEach((element, i) => {
      if (element.localeCompare("timer") == 0) {
        minutes = +newArea.reaction.param[i];
        newArea.reaction.param[i] = (minutes *= 60000).toString();
      }
    });
    /**
     * Delete empty slot in array
     */
    newArea.action.param = newArea.action.param.filter(Boolean);
    newArea.reaction.param = newArea.reaction.param.filter(Boolean);
    await ApiService.postArea(newArea);
    onClose();
  }}
>
  <p>Form to create AREA</p>
  <!-- Selector for service Action -->
  <div class="raw-display">
    <div class="disposition">
      <p class="text">Select your service action:</p>
      <select
        class="selector"
        on:change={() => {
          value = [];
          numberParam = 0;
          newArea.action = {
            require_param: false,
            parameters: [],
            param: [],
            name: "",
            fromService: {
              logo: "",
              name: "",
            },
          };
        }}
        bind:value={newArea.action.fromService.name}
      >
        {#each servicesPossible as service}
          {#if service.actions.length !== 0}
            <option value={service.information.name}
              >{service.information.name}
            </option>
          {/if}
        {/each}
      </select>
    </div>
  </div>

  <!-- Selector to choose an action from the selected service -->
  <div class="raw-display">
    <div class="disposition">
      <p class="text">Select your action:</p>
      <select class="selector" bind:value={newArea.action}>
        {#each servicesPossible as service}
          {#if service.information.name === newArea.action.fromService.name}
            {#each service.actions as action}
              <option value={action}>{action.name}</option>
            {/each}
          {/if}
        {/each}
      </select>
    </div>
  </div>

  <!-- Parameters for action if required -->
  <div class="raw-display">
    {#if newArea.action.require_param}
      <div class="grid">
        {#each newArea.action.parameters as paramerter, i}
          {#if !(i % 2)}
            <div class="box-parameters">
              <p style:text-align="center">
                {paramerter}
              </p>
              <div class="input-box">
                <Input
                  type={newArea.action.parameters[i + 1]}
                  bind:value={value[i]}
                  onUpdate={() => {
                    numberParam = newArea.action.parameters.length / 2 + 1;
                    newArea.action.param[i] = value[i];
                  }}
                />
              </div>
            </div>
          {/if}
        {/each}
      </div>
    {/if}
  </div>
  <!-- Selector for service Reaction -->
  <div class="raw-display">
    <div class="disposition">
      <p class="text">Select your service reaction:</p>
      <select
        class="selector"
        on:change={() => {
          numberParam = newArea.action.parameters.length / 2 + 1;
          value = value.slice(0, numberParam);
          newArea.reaction = {
            require_param: false,
            parameters: [],
            param: [],
            name: "",
            fromService: {
              logo: "",
              name: "",
            },
          };
        }}
        bind:value={newArea.reaction.fromService.name}
      >
        {#each servicesPossible as service}
          {#if service.reactions.length !== 0}
            <option value={service.information.name}
              >{service.information.name}</option
            >
          {/if}
        {/each}
      </select>
    </div>
  </div>

  <!-- Selector to choose an reaction from the selected service -->
  <div class="raw-display">
    <div class="disposition">
      <p class="text">Select your reaction:</p>
      <select class="selector" bind:value={newArea.reaction}>
        {#each servicesPossible as service}
          {#if service.information.name === newArea.reaction.fromService.name}
            {#each service.reactions as reaction}
              <option value={reaction}>{reaction.name}</option>
            {/each}
          {/if}
        {/each}
      </select>
    </div>
  </div>

  <!-- Parameters for reaction if required -->
  <div class="raw-display">
    {#if newArea.reaction.require_param}
      <div class="grid">
        {#each newArea.reaction.parameters as paramerter, i}
          {#if !(i % 2)}
            <div class="box-parameters">
              <p style:text-align="center">
                {paramerter}
              </p>
              <div class="input-box">
                <Input
                  type={newArea.reaction.parameters[i + 1]}
                  bind:value={value[numberParam + i]}
                  onUpdate={() => {
                    newArea.reaction.param[numberParam + i] =
                      value[numberParam + i];
                  }}
                />
              </div>
            </div>
          {/if}
        {/each}
      </div>
    {/if}
  </div>

  <div class="raw-display" style:justify-content="space-between">
    <button on:click={() => onClose()} class="save-button">Close</button>
    <button type="submit" disabled={isEmpty(newArea)} class="save-button"
      >Save</button
    >
  </div>
</form>

<style>
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    border-radius: 10px;
    background-color: rgb(255, 255, 255, 0.95);
  }
  .raw-display {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 95%;
  }
  .disposition {
    display: flex;
    flex-direction: column;
    padding: 5px;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, 160px);
    justify-content: center;
    width: 98%;
  }
  .box-parameters {
    align-items: center;
    justify-content: center;
    width: 150px;
    border: 1px solid;
    padding-bottom: 10px;
    border-color: black;
    border-radius: 5px;
    margin: 5px;
  }
  .input-box {
    text-align: center;
    justify-content: center;
  }
  .text {
    text-align: center;
  }
  .selector {
    width: 170px;
    padding: 7px 40px 7px 12px;
    width: 100%;
    border: 1px solid #e8eaed;
    border-radius: 5px;
    background: white;
    box-shadow: 0 1px 3px -2px #9098a9;
    cursor: pointer;
    font-size: 16px;
  }
  .save-button {
    margin: 20px;
    width: 60px;
    height: 30px;
    border-radius: 30px;
  }
  @media screen and (min-width: 341px) {
    .disposition {
      flex-direction: row;
      justify-content: space-between;
    }
  }
  @media screen and (min-width: 341px) and (max-width: 400px) {
    .text {
      text-align: left;
      margin-left: 10px;
      width: 50%;
    }
    .selector {
      width: 40%;
    }
  }
  @media screen and (min-width: 401px) and (max-width: 750px) {
    .form {
      width: 370px;
      transition: 0.2s;
    }
    .text {
      text-align: left;
      margin-left: 10px;
      width: 50%;
    }
    .selector {
      width: 40%;
    }
  }
  @media screen and (min-width: 751px) and (max-width: 1000px) {
    .form {
      width: 470px;
      transition: 0.2s;
    }
    .text {
      text-align: left;
      margin-left: 10px;
      width: 50%;
    }
    .selector {
      width: 40%;
    }
  }
  @media screen and (min-width: 1001px) {
    .form {
      width: 570px;
      transition: 0.2s;
    }
    .text {
      text-align: left;
      margin-left: 40px;
      width: 50%;
    }
    .selector {
      width: 40%;
    }
  }
</style>
