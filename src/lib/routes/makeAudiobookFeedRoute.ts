import { Scalars } from '@src/__generated__/graphql';

export const makeAudiobookFeedRoute = (
	languageRoute: string,
	bookId: Scalars['ID']
): string => `/${languageRoute}/books/${bookId}/feed.xml`;
