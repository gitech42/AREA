<script lang="ts" >
    export let PlaceHolder: string = "";
    export let type: string = "text";

    export let handleInput:string = "";

    const setType = (node: any) => {
        node.type = type;
    };
</script>

<input class="input-login" bind:value={handleInput} use:setType placeholder={PlaceHolder}>

<style>
    .input-login {
        width: 95%;
        height: 35px;
        font-size: 12px;
        border: 1px solid #FFFFFF;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.22);
        transition: 0.1s;
    }
    @media screen and (min-width:321px) {
        .input-login {
            height: 50px;
            width: 290px;
            font-size: 15px;
        }
    }
</style>