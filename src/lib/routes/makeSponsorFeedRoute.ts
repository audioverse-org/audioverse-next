import { Scalars } from '@lib/generated/graphql';

export const makeSponsorFeedRoute = (
	languageRoute: string,
	sponsorId: Scalars['ID']
): string => `/${languageRoute}/sponsors/${sponsorId}/feed.xml`;
