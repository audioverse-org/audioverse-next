import { Scalars } from '@src/__generated__/graphql';

export const makeCollectionPresentersRoute = (
	languageRoute: string,
	conferenceId: Scalars['ID'],
	page: string | number = 1
): string =>
	`/${languageRoute}/conferences/${conferenceId}/presenters${
		page > 1 ? `/page/${page}` : ''
	}`;
