import { writable } from 'svelte/store';

function createStore() {
	const initialValue = {
		layout: {
			contextSection: {
				closed: false,
			},
		},
	};

	const { subscribe, set, update } = writable(initialValue);

	return {
		subscribe,
		reset: () => set(initialValue),
		layout: {
			contextSection: {
				close: () =>
					update((n) => {
						return {
							...n,
							layout: {
								...n.layout,
								contextSection: {
									...n.layout.contextSection,
									closed: true,
								},
							},
						};
					}),
				open: () =>
					update((n) => {
						return {
							...n,
							layout: {
								...n.layout,
								contextSection: {
									...n.layout.contextSection,
									closed: false,
								},
							},
						};
					}),
			},
		},
	};
}

export const preferences = createStore();
