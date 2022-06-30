import { Scalars } from '@src/__generated__/graphql';

export const makeBibleBookRoute = (
	languageRoute: string,
	bookId: Scalars['ID'],
	chapterNumber: Scalars['ID'] = 1
): string => `/${languageRoute}/bibles/${bookId + ''}/${chapterNumber}`;
