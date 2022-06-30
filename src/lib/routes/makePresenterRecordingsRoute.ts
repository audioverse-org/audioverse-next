import { Scalars } from '@src/__generated__/graphql';

export const makePresenterRecordingsRoute = (
	languageRoute: string,
	personId: Scalars['ID'],
	page: string | number = 1
): string =>
	`/${languageRoute}/presenters/${personId}/teachings${
		page > 1 ? `/page/${page}` : ''
	}`;
