declare global {
	interface Window {
		dataLayer: unknown[];
	}
}

export const gtmPushEvent = (event: Record<string, string | number>) => {
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push(event);
};
