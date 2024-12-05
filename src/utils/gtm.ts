declare global {
	interface Window {
		dataLayer: unknown[];
	}
}

export const gtmPushEvent = (
	event: string,
	params: Record<string, string | number | undefined>,
) => {
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({ event, ...params });
};
