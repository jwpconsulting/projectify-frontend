// SPDX-License-Identifier: AGPL-3.0-or-later
/*
 *  Copyright (C) 2023 JWP Consulting GK
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as published
 *  by the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import type {
    UserConfig,
    ProxyOptions,
    PluginOption,
    UserConfigExport,
} from "vite";
import type { ConfigEnv } from "vite";
import { loadEnv } from "vite";

const pluginDefaults: PluginOption[] = [sveltekit()];

const configDefaults: UserConfig = {
    esbuild: {
        // It could be useful to drop console etc. here using the following
        // config
        // drop: ["console", "debugger"],
    },
    build: {
        target: ["es2020"],
    },
};

async function getPluginOptions(mode: string): Promise<PluginOption[]> {
    if (mode !== "staging") {
        return pluginDefaults;
    }
    const { visualizer } = await import("rollup-plugin-visualizer");
    return [
        ...pluginDefaults,
        visualizer({
            emitFile: true,
            filename: "bundle.html",
        }),
    ];
}

function getFromEnv(env: Record<string, string>, key: string): string {
    const value = env[key];
    if (!value) {
        throw new Error(`Expected ${key} to be in env`);
    }
    return value;
}

function getProxyConfig(
    env: Record<string, string>,
): Record<string, ProxyOptions> | undefined {
    if (env.VITE_USE_LOCAL_PROXY === undefined) {
        return undefined;
    }
    return {
        "/ws": {
            target: getFromEnv(env, "VITE_PROXY_WS_ENDPOINT"),
            changeOrigin: true,
            ws: true,
            rewrite: (path: string) => path.replace(/^\/ws/, ""),
        },
        "/api": {
            target: getFromEnv(env, "VITE_PROXY_API_ENDPOINT"),
            changeOrigin: true,
            rewrite: (path: string) => path.replace(/^\/api/, ""),
        },
    };
}

const config: UserConfigExport = defineConfig(async ({ mode }: ConfigEnv) => {
    const env = loadEnv(mode, process.cwd());

    return {
        ...configDefaults,
        plugins: await getPluginOptions(mode),
        server: {
            proxy: getProxyConfig(env),
        },
    };
});

export default config;
