import { Scalars } from '@lib/generated/graphql';

export const makePresenterFeedRoute = (
	languageRoute: string,
	personId: Scalars['ID']
): string => `/${languageRoute}/presenters/${personId}/feed.xml`;
