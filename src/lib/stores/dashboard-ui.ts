import { browser } from "$app/env";
import { writable } from "svelte/store";

type DashboardSectionsLayout = "grid" | "list";

export const dashboardSectionsLayout =
    writable<DashboardSectionsLayout>("list");

const dashboardSectionsLayoutKey = "dashboardSectionsLayout";

if (browser) {
    dashboardSectionsLayout.set(
        (localStorage.getItem(
            dashboardSectionsLayoutKey
        ) as DashboardSectionsLayout) || "list"
    );

    dashboardSectionsLayout.subscribe((value) => {
        localStorage.setItem(dashboardSectionsLayoutKey, value);
    });

    window.addEventListener("storage", (event) => {
        if (event.key === dashboardSectionsLayoutKey) {
            dashboardSectionsLayout.set(
                event.newValue as DashboardSectionsLayout
            );
        }
    });
}
