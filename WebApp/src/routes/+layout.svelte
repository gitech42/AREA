<script lang="ts">
    import Background from "../components/background/Background.svelte";
    import { browser } from '$app/environment';
</script>

{#if browser}
    <main>
        <slot></slot>
        <Background />
    </main>
{/if}

<style>
    :global(body) {
        margin: 0;
        background: #755BD1;
        overflow-x: hidden;
    }
    main {
        min-height: calc(100vh - 300px);
    }
</style>