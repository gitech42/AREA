<script lang="ts">
    export let name:string = "";

    export let onClick: () => void;
</script>

<button on:click={() => onClick()}>{name}</button>

<style>
    button {
        width: 130px;
        height: 35px;
        margin-bottom: 10px;
        border: 1px solid #FFFFFF;
        border-radius: 4px;
        font-size: 12px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
        color: #2148C0;
        font-weight: bold;
        letter-spacing: 1px;
    }
    @media screen and (min-width:321px) {
        button {
            height: 50px;
            width: 200px;
            font-size: 17px;
        }
    }
</style>