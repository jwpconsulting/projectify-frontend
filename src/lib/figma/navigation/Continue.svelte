<script lang="ts">
    import { _ } from "svelte-i18n";
    import Button from "$lib/figma/buttons/Button.svelte";
</script>

<div
    class="flex flex-row items-center justify-between border-b-2 border-border bg-foreground py-4 px-6"
>
    <div class="flex flex-row items-center gap-12">
        <a href="/">
            <img src="/assets/logo/polylogo.svg" alt="" />
        </a>
        <div class="flex flex-row gap-4">
            <Button
                style={{ kind: "tertiary", icon: null }}
                color="blue"
                disabled={false}
                size="medium"
                label={$_("header.features")}
            />
            <Button
                style={{ kind: "tertiary", icon: null }}
                color="blue"
                disabled={false}
                size="medium"
                label={$_("header.solutions")}
            />
            <Button
                style={{ kind: "tertiary", icon: null }}
                color="blue"
                disabled={false}
                size="medium"
                label={$_("header.resources")}
            />
            <Button
                style={{ kind: "tertiary", icon: null }}
                color="blue"
                disabled={false}
                size="medium"
                label={$_("header.company")}
            />
            <a href="/signin">
                <Button
                    style={{ kind: "tertiary", icon: null }}
                    color="blue"
                    disabled={false}
                    size="medium"
                    label={$_("header.log-in")}
                />
            </a>
        </div>
    </div>
    <div>
        <a href="/dashboard">
            <Button
                style={{ kind: "primary" }}
                color="blue"
                disabled={false}
                size="medium"
                label={$_("header.continue-to-dashboard")}
            />
        </a>
    </div>
</div>
