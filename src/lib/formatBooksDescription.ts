import { BookFeedDescriptionFragment } from './__generated__/formatBooksDescription';
import getIntl from '@lib/getIntl';
import uniq from 'lodash/uniq';

export const formatBooksDescription = async (
	languageRoute: string,
	sequence: BookFeedDescriptionFragment
): Promise<string> => {
	const intl = await getIntl(languageRoute);
	const getPersonNameString = (persons: { name: string }[]) => {
		return uniq(persons.map(({ name }) => name)).join(', ');
	};
	return intl.formatMessage(
		{
			id: 'storyAlbumsFeed__description',
			defaultMessage: '{title}, by {authors}, narrated by {narrators}',
		},
		{
			title: sequence.title,
			authors: getPersonNameString(
				(sequence.recordings.nodes || []).reduce(
					(carry, { authors }) => [...carry, ...authors],
					[] as { name: string }[]
				)
			),
			narrators: getPersonNameString(
				(sequence.recordings.nodes || []).reduce(
					(carry, { narrators }) => [...carry, ...narrators],
					[] as { name: string }[]
				)
			),
		}
	);
};
