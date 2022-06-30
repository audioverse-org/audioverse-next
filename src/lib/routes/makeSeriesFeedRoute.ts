import { Scalars } from '@src/__generated__/graphql';

export const makeSeriesFeedRoute = (
	languageRoute: string,
	seriesId: Scalars['ID']
): string => `/${languageRoute}/series/${seriesId}/feed.xml`;
