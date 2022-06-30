import { Scalars } from '@src/__generated__/graphql';

export const makeCollectionSequencesRoute = (
	languageRoute: string,
	conferenceId: Scalars['ID'],
	page: string | number = 1
): string =>
	`/${languageRoute}/conferences/${conferenceId}/sequences${
		page > 1 ? `/page/${page}` : ''
	}`;
