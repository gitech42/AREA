<script lang="ts">
    export let color: string  = "";
    export let top: string  = "";
    export let bottom: string  = "";
    export let left: string  = "";
    export let right: string  = "";
</script>

<div class="circle" style="--color:{color}; left:{left}; top: {top}; right:{right}; bottom:{bottom};" />

<style>
    .circle {
        position: fixed;
        width: 1290px;
        height: 828px;
        border-radius: 50%;
        z-index: -1;
        filter: blur(200px);
        background: var(--color);
    }
</style>