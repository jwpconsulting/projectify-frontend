import Sarus from "@anephenix/sarus";
import type { Unsubscriber, Subscriber, Readable } from "svelte/store";
import { writable } from "svelte/store";

import vars from "$lib/env";

import { browser } from "$app/environment";
import type { RepositoryContext } from "$lib/types/repository";
import type { SubscriptionType, WsResource } from "$lib/types/stores";

interface Message {
    type: string;
    uuid: string;
    data: unknown;
}

interface WsMessage {
    message: Message;
    timeStamp: number;
}

// A svelte store subscriber that received WSMessages
type WsSubscriber = Subscriber<WsMessage>;

const wsSubscriptionStores = new Map<string, WsSubscriptionStore>();

type WsSubscriptionStore = Readable<WsMessage>;

function makeWsSubscriptionStore(url: string): WsSubscriptionStore {
    const subscribers = new Set<WsSubscriber>();

    const onMessage = (event: MessageEvent<string>) => {
        const message: Message = JSON.parse(event.data) as Message;
        const { timeStamp } = event;
        subscribers.forEach((run) => run({ message, timeStamp }));
    };

    const sarus = new Sarus({
        url,
        eventListeners: {
            open: [console.debug.bind(null, "Connection opened to", url)],
            close: [console.debug.bind(null, "Connection closed to", url)],
            error: [console.error.bind(null, "Connection error for", url)],
            message: [onMessage],
        },
    });

    const unsubscribe = (run: WsSubscriber): void => {
        subscribers.delete(run);
        if (subscribers.size > 0) {
            return;
        }
        sarus.disconnect();
        wsSubscriptionStores.delete(url);
        console.debug("Cleaned up store for", url);
    };
    const subscribe = (run: WsSubscriber): Unsubscriber => {
        subscribers.add(run);
        return () => unsubscribe(run);
    };
    return {
        subscribe,
    };
}

function getSubscriptionFor(url: string): WsSubscriptionStore {
    const store = wsSubscriptionStores.get(url);
    if (store) {
        return store;
    }
    const newStore: WsSubscriptionStore = makeWsSubscriptionStore(url);
    wsSubscriptionStores.set(url, newStore);
    return newStore;
}

export function getSubscriptionForCollection(
    collection: string,
    uuid: string
): WsSubscriptionStore {
    let wsEndPoint = vars.WS_ENDPOINT;
    if (wsEndPoint.startsWith("/ws")) {
        wsEndPoint = `ws://${location.host}${wsEndPoint}`;
    }
    const wsURL = `${wsEndPoint}/${collection}/${uuid}/`;

    return getSubscriptionFor(wsURL);
}

/* Subscribable WS Store
 *
 *  ┌─────┐   loadUuid  ┌─────┐ ──────────────┐
 *  │Start│────────────►│Ready│               │ subscription update:
 *  └─────┘             └─────┘ ◄─────────────┘ updateSubscribers()
 *                        ▲ │
 *                        │ │ loadUuid
 *                        │ │
 *                        └─┘
 *
 * This thing basically just passes on ws updates to subscribers, plus
 * one initial load
 */

type Subscribers<T> = Set<Subscriber<T>>;
type WsStoreState<T> =
    | {
          kind: "start";
          subscribers: Subscribers<T>;
      }
    | {
          kind: "ready";
          uuid: string;
          subscribers: Subscribers<T>;
          unsubscriber: Unsubscriber;
          value: T;
      };

type RepoGetter<T> = (
    url: string,
    repositoryContext?: RepositoryContext
) => Promise<T>;

export function createWsStore<T>(
    collection: SubscriptionType,
    getter: RepoGetter<T>
): WsResource<T> {
    type State = WsStoreState<T>;
    let state: State = { kind: "start", subscribers: new Set() };

    const receiveWsMessage = (message: WsMessage): void => {
        if (state.kind === "start") {
            throw new Error("State.kind is start");
        }
        const value: T = message.message.data as T;
        state = {
            ...state,
            value,
        };
        updateSubscribers(state);
    };

    const loadSubscription = (uuid: string): Unsubscriber => {
        const store = getSubscriptionForCollection(collection, uuid);
        return store.subscribe(receiveWsMessage);
    };

    const updateSubscribers = (state: State & { kind: "ready" }) => {
        state.subscribers.forEach((subscriber) => subscriber(state.value));
    };

    const removeSubscriber = (subscriber: Subscriber<T>) => {
        state.subscribers.delete(subscriber);
        if (state.subscribers.size > 0) {
            return;
        }
        if (state.kind === "start") {
            return;
        }
        state.unsubscriber();
    };

    const loadUuid = async (
        uuid: string,
        repositoryContext?: RepositoryContext
    ): Promise<T> => {
        // Fetch value early, since we need it either way
        const value = await getter(uuid, repositoryContext);
        // Then, when we find out we have already initialized for this uuid,
        // we can skip the queue and return early without cleaning up an
        // existing subscription.
        if (state.kind === "ready" && uuid === state.uuid) {
            state = {
                ...state,
                value,
            };
        } else {
            // On the other hand, if the uuid is changing, we need to unsubscribe
            // and create a new sub, as follows:
            // We need to unsubscribe from the old ws thing before adding
            // a new subscription here, if we are already initalized.
            if (state.kind === "ready") {
                state.unsubscriber();
            }
            const unsubscriber = loadSubscription(uuid);
            // Since further reloads are independent of any fetch (the data comes
            // from ws), we don't have to store the repositoryContext as part of
            // the state. It's important that we don't reuse a user supplied
            // fetch (aka repositoryContext) after page navigation, since in server
            // side mode this is not guaranteed to work: SvelteKit might unload it.
            state = {
                ...state,
                kind: "ready",
                uuid,
                unsubscriber,
                value,
            };
        }
        // Either way, we absolutely need to update our subscribers.
        updateSubscribers(state);
        // And the caller of this method is definitely waiting for their result
        return value;
    };

    const subscribe = (run: Subscriber<T>): Unsubscriber => {
        // This is surprisingly easy to implement!
        // https://github.com/sveltejs/svelte/blob/8e76ef156e2bdd2a1e7a506a593c2d5f58c498b5/packages/svelte/src/runtime/store/index.js#L86
        state.subscribers.add(run);
        if (state.kind === "ready") {
            run(state.value);
        } else {
            console.debug("Subscribed", run, "but no value there yet");
        }
        return () => removeSubscriber(run);
    };
    return {
        subscribe,
        loadUuid,
    };
}
// Online connection

export const online = writable(true);

if (browser) {
    setTimeout(() => {
        online.set(navigator.onLine);
    }, 1000);

    window.addEventListener("offline", () => {
        online.set(false);
    });

    window.addEventListener("online", () => {
        online.set(true);
    });
}
