<script lang="ts">
    let cls = "";
    export { cls as class };
</script>

<div
    class="flex min-w-max max-w-xs flex-col rounded-lg border border-border bg-foreground py-2 shadow-context-menu {cls}"
>
    <slot />
</div>
