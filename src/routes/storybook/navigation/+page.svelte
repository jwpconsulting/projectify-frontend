<script lang="ts">
    import AvatarState from "$lib/figma/navigation/AvatarState.svelte";
    import AvatarVariant from "$lib/figma/navigation/AvatarVariant.svelte";
    import { fr, fc, users, user1, user2 } from "$lib/storybook";
    import type { AvatarVariantContent } from "$lib/figma/types";
    import { avatarStateSizes, avatarVariantSizes } from "$lib/figma/types";
    import Landing from "$lib/figma/navigation/Landing.svelte";
    import LandingMobile from "$lib/figma/navigation/LandingMobile.svelte";
    import Continue from "$lib/figma/navigation/Continue.svelte";
    import ContinueMobile from "$lib/figma/navigation/ContinueMobile.svelte";
    import Access from "$lib/figma/navigation/Access.svelte";
    import AccessMobile from "$lib/figma/navigation/AccessMobile.svelte";
    import Onboarding from "$lib/figma/navigation/Onboarding.svelte";
    import OnboardingMobile from "$lib/figma/navigation/OnboardingMobile.svelte";
    import Settings from "$lib/figma/navigation/Settings.svelte";

    const avatarV5Contents: AvatarVariantContent[] = [
        { kind: "assign", users: [user1, user2] },
        { kind: "assign", users: [null, user1] },
        { kind: "assign", users: [user2, null] },
        { kind: "multiple", users: [] },
        { kind: "multiple", users: [user1] },
        { kind: "multiple", users: [user1, user2, user1, user2, user1] },
    ];
</script>

Avatar V3
<div class={fc}>
    {#each avatarStateSizes as size}
        <div class="capitalize">
            {size}
        </div>
        <div class={fr}>
            {#each users as user}
                <div class="group">
                    <AvatarState {user} {size} />
                </div>
            {/each}
        </div>
    {/each}
</div>

Avatar V5
<div class={fc}>
    {#each avatarVariantSizes as size}
        <div class="capitalize">
            {size}
        </div>
        <div class={fr}>
            {#each avatarV5Contents as content}
                <div class="capitalize">
                    {content.kind}
                </div>
                <AvatarVariant {size} {content} />
            {/each}
        </div>
    {/each}
</div>

Header Landing desktop
<div>
    <Landing />
</div>

Header landing mobile
<div>
    <LandingMobile />
</div>

Header continue to dashboard desktop
<div>
    <Continue />
</div>

Header continue mobile
<div>
    <ContinueMobile />
</div>

Header access page desktop
<div>
    <Access />
</div>

Header access page mobile
<div>
    <AccessMobile />
</div>

Head skip onboarding desktop
<div>
    <Onboarding />
</div>

Header onboarding mobile
<div>
    <OnboardingMobile />
</div>

Header settings desktop
<div>
    <Settings user={user1} />
</div>
