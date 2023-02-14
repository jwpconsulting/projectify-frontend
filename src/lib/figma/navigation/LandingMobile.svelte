<script lang="ts">
    import { _ } from "svelte-i18n";
    import HamburgerMenu from "$lib/figma/buttons/HamburgerMenu.svelte";
</script>

<div
    class=" flex max-w-xs flex-row items-center justify-between border-b-2 border-border bg-foreground py-4 px-2"
>
    <div>
        <a href="/">
            <img src="/assets/logo/polylogo.svg" alt="" />
        </a>
    </div>
    <div>
        <HamburgerMenu isActive />
    </div>
</div>
