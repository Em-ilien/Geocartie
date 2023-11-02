import Tooltip from '$lib/components/general/Tooltip.svelte';

export function tooltip(element, params) {
	const { conditionFct, label } = params;

	let title;
	let tooltipComponent;

	function mouseOver(event) {
		if (!conditionFct()) return;

		// NOTE: remove the `title` attribute, to prevent showing the default browser tooltip
		// remember to set it back on `mouseleave`
		title = element.getAttribute('title');
		element.removeAttribute('title');

		tooltipComponent = new Tooltip({
			props: {
				title: label,
				x: event.pageX,
				y: event.pageY,
			},
			target: document.body,
		});
	}
	function mouseMove(event) {
		tooltipComponent?.$set({
			x: event.pageX,
			y: event.pageY,
		});
	}
	function mouseLeave() {
		tooltipComponent?.$destroy();
		// NOTE: restore the `title` attribute
		element.setAttribute('title', title);
	}

	element.addEventListener('mouseover', mouseOver);
	element.addEventListener('mouseleave', mouseLeave);
	element.addEventListener('mousemove', mouseMove);

	return {
		destroy() {
			element.removeEventListener('mouseover', mouseOver);
			element.removeEventListener('mouseleave', mouseLeave);
			element.removeEventListener('mousemove', mouseMove);

			if (tooltipComponent !== undefined) {
				tooltipComponent?.$destroy();
				// NOTE: restore the `title` attribute
				element.setAttribute('title', title);
			}
		},
	};
}
