<script lang="ts">
    import { Icon } from "@steeze-ui/svelte-icon";
    import type { IconSource } from "@steeze-ui/svelte-icon/types";
    import { createEventDispatcher } from "svelte";

    import CircleIcon from "$lib/funabashi/buttons/CircleIcon.svelte";

    export let label: string;
    export let icon: IconSource;
    export let filtered: boolean;
    export let open: boolean;

    const dispatch = createEventDispatcher();
    function click() {
        dispatch("click");
    }
</script>

<button
    on:click={click}
    class="flex w-full flex-row items-center justify-between gap-2 text-utility hover:text-base-content"
>
    <div class="flex flex-row items-center gap-4">
        <div class="flex flex-row items-center gap-2">
            <Icon src={icon} theme="outline" class="h-5 w-5" />
            <div class="font-bold">{label}</div>
        </div>
        {#if filtered}
            <div class="h-3 w-3 rounded-full bg-primary" />
        {/if}
    </div>
    <CircleIcon
        icon={open ? "up" : "down"}
        action={{ kind: "button", action: click }}
        size="medium"
    />
</button>
