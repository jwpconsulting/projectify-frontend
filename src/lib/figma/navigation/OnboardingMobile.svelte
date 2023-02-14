<script lang="ts">
    import { _ } from "svelte-i18n";
    import Button from "$lib/figma/buttons/Button.svelte";
</script>

<div
    class="flex max-w-xs flex-row items-center justify-between border-b-2 border-border bg-foreground py-4 px-2"
>
    <a href="/">
        <img src="/assets/logo/polylogo.svg" alt="" />
    </a>

    <div>
        <a href="/dashboard">
            <Button
                style={{ kind: "tertiary", icon: null }}
                color="blue"
                disabled={false}
                size="medium"
                label={$_("header.skip")}
            />
        </a>
    </div>
</div>
