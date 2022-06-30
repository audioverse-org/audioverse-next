import { Scalars } from '@src/__generated__/graphql';

export const makePresenterAlsoAppearsInRoute = (
	languageRoute: string,
	personId: Scalars['ID'],
	page: string | number = 1
): string =>
	`/${languageRoute}/presenters/${personId}/appears${
		page > 1 ? `/page/${page}` : ''
	}`;
