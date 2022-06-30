import { Scalars } from '@src/__generated__/graphql';

export const makePresenterSequencesRoute = (
	languageRoute: string,
	personId: Scalars['ID'],
	page: string | number = 1
): string =>
	`/${languageRoute}/presenters/${personId}/sequences${
		page > 1 ? `/page/${page}` : ''
	}`;
