import { Scalars } from '@src/__generated__/graphql';

export const makePresenterFeedRoute = (
	languageRoute: string,
	personId: Scalars['ID']
): string => `/${languageRoute}/presenters/${personId}/feed.xml`;
