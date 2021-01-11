import { writable } from 'svelte/store';

export const SelectedArchiveEntry = writable<File | null>(null);