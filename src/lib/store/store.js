import { writable } from 'svelte/store';

export const quizzEnabled = writable(false);

export const quizzAnswer = writable(undefined);
