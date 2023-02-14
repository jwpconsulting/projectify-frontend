<script lang="ts">
    import { _ } from "svelte-i18n";
    import NotificationButton from "$lib/figma/buttons/NotificationButton.svelte";
    import AvatarWithHover from "$lib/figma/buttons/UserAccount.svelte";
    import type { User } from "$lib/types/user";

    export let user: User;
</script>

<div
    class="flex flex-row items-center justify-between border-b-2 border-border bg-foreground py-4 px-6"
>
    <a href="/">
        <img src="/assets/logo/polylogo.svg" alt="" />
    </a>

    <div class="flex flex-row gap-4">
        <a href="/notifications">
            <NotificationButton isActive />
        </a>
        <AvatarWithHover {user} />
    </div>
</div>
