import { Scalars } from '@lib/generated/graphql';

export const makeSeriesFeedRoute = (
	languageRoute: string,
	seriesId: Scalars['ID']
): string => `/${languageRoute}/series/${seriesId}/feed.xml`;
