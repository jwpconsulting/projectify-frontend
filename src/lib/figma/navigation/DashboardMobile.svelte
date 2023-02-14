<script lang="ts">
    import { _ } from "svelte-i18n";
    import NotificationButton from "$lib/figma/buttons/NotificationButton.svelte";
    import UserAccount from "$lib/figma/buttons/UserAccount.svelte";
    import HamburgerMenu from "$lib/figma/buttons/HamburgerMenu.svelte";
    import SearchMobile from "$lib/figma/buttons/SearchMobile.svelte";
    import type { User } from "$lib/types/user";

    export let user: User;
</script>

<div
    class="flex max-w-xs flex-row items-center justify-between border-b-2 border-border bg-foreground py-4 px-2"
>
    <div class="flex flex-row gap-4">
        <HamburgerMenu isActive />
        <SearchMobile />
    </div>

    <div class="flex flex-row gap-4">
        <a href="/notifications">
            <NotificationButton isActive />
        </a>
        <UserAccount {user} />
    </div>
</div>
