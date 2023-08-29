import { writable } from "svelte/store";

const seatUnit = 1;
const seatMax = 999;

export const seats = writable<number>(10);
export function seatMinus() {
    seats.update((n) => n - seatUnit);
}
export function seatAdd() {
    seats.update((n) => n + seatUnit);
}
seats.subscribe((n) => {
    if (n > seatMax) {
        seats.set(seatMax);
    }
});

export const numSteps = 5;
const firstStep = 0;
export const currentStep = writable<number>(firstStep);
export function gotoStep(step: number) {
    currentStep.set(step);
}
