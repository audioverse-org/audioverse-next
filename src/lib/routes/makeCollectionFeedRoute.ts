import { Scalars } from '@lib/generated/graphql';

export const makeCollectionFeedRoute = (
	languageRoute: string,
	conferenceId: Scalars['ID']
): string => `/${languageRoute}/conferences/${conferenceId}/feed.xml`;
