import { AnalyticsBrowser } from '@segment/analytics-next';

// We can export this instance to share with rest of our codebase.
export const analytics = AnalyticsBrowser.load({
	writeKey: 'oTuJ7Ab15OkcWQH1nAQKcKewzi9sQL3k',
});
