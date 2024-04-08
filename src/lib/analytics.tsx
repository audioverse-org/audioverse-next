import { AnalyticsBrowser } from '@segment/analytics-next';

// We can export this instance to share with rest of our codebase.
export const analytics = AnalyticsBrowser.load({
	writeKey: process.env.NEXT_PUBLIC_SEGMENT_KEY || '',
});
