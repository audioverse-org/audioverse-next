import uniq from 'lodash/uniq';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import {
	BookFeedDescriptionFragment,
	getAudiobookFeedData,
	SequenceContentType,
} from '@/lib/generated/graphql';
import { generateFeed, sendRSSHeaders } from '@/lib/generateFeed';
import getIntl from '@/lib/getIntl';
import { getLanguageIdByRouteOrLegacyRoute } from '@/lib/getLanguageIdByRouteOrLegacyRoute';

export default (): void => void 0;

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

export async function getServerSideProps({
	params,
	res,
}: GetServerSidePropsContext<{ language: string; id: string }>): Promise<
	GetServerSidePropsResult<Record<string, unknown>>
> {
	const id = params?.id as string;
	const languageRoute = params?.language as string;

	const { sequence } = await getAudiobookFeedData({
		id,
	}).catch(() => ({
		sequence: null,
	}));
	if (
		!sequence ||
		sequence.language !== getLanguageIdByRouteOrLegacyRoute(languageRoute) ||
		(sequence.contentType !== SequenceContentType.Audiobook &&
			sequence.contentType !== SequenceContentType.StorySeason)
	) {
		return {
			notFound: true,
		};
	}

	if (res) {
		sendRSSHeaders(res);

		const feed = await generateFeed(
			languageRoute,
			{
				link: sequence.canonicalUrl,
				title: sequence.title,
				description: await formatBooksDescription(languageRoute, sequence),
				image: sequence.image?.url,
			},
			sequence.recordings.nodes || []
		);
		res.write(feed);

		res.end();
	}

	return {
		props: {},
	};
}
