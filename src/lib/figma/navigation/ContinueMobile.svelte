<script lang="ts">
    import { _ } from "svelte-i18n";
    import Button from "$lib/figma/buttons/Button.svelte";
    import HamburgerMenu from "$lib/figma/buttons/HamburgerMenu.svelte";
</script>

<div class="max-w-xs">
    <div
        class="flex flex-row items-center justify-between border-b-2 border-border bg-foreground py-4 px-2"
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
    <div class="py-4 px-2">
        <div class="mb-8 flex flex-col divide-y divide-border p-4">
            <div class="py-2">
                <a href="/features">
                    <Button
                        style={{ kind: "tertiary", icon: null }}
                        color="blue"
                        disabled={false}
                        size="medium"
                        label={$_("header.features")}
                    />
                </a>
            </div>
            <div class="py-2">
                <Button
                    style={{ kind: "tertiary", icon: null }}
                    color="blue"
                    disabled={false}
                    size="medium"
                    label={$_("header.solutions")}
                />
            </div>
            <div class="py-2">
                <Button
                    style={{ kind: "tertiary", icon: null }}
                    color="blue"
                    disabled={false}
                    size="medium"
                    label={$_("header.resources")}
                />
            </div>
            <div class="py-2">
                <Button
                    style={{ kind: "tertiary", icon: null }}
                    color="blue"
                    disabled={false}
                    size="medium"
                    label={$_("header.company")}
                />
            </div>
            <div class="py-2">
                <a href="/pricing">
                    <Button
                        style={{ kind: "tertiary", icon: null }}
                        color="blue"
                        disabled={false}
                        size="medium"
                        label={$_("header.pricing")}
                    />
                </a>
            </div>
        </div>
        <div class="px-4">
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
</div>
