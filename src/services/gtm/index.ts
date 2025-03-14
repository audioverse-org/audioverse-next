import { GtmRecordingViewFragment } from './__generated__/index';

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

export const gtmPushRecordingView = (recording: GtmRecordingViewFragment) => {
	gtmPushEvent('recording_view', {
		content_type: recording.contentType,
		item_id: recording.id,
		title: recording.title,
		presenter: recording.speakers.map((item) => item.name).join(';'),
		sponsor: recording.sponsor?.title,
		conference: recording.collection?.title,
		series: recording.sequence?.title,
	});
};
