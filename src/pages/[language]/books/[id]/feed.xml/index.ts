import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { getAudiobookFeedData } from '~containers/audiobook/__generated__/detail';
import { generateFeed, sendRSSHeaders } from '~lib/generateFeed';
import getIntl from '~lib/getIntl';
import { getLanguageIdByRouteOrLegacyRoute } from '~lib/getLanguageIdByRouteOrLegacyRoute';
import { SequenceContentType } from '~src/__generated__/graphql';

export default (): void => void 0;

type BookFeedDescription = {
	title: string;
	recordings: {
		nodes:
			| {
					authors: {
						name: string;
					}[];
					narrators: {
						name: string;
					}[];
			  }[]
			| null;
	};
};

export const formatBooksDescription = async (
	languageRoute: string,
	sequence: BookFeedDescription
): Promise<string> => {
	const intl = await getIntl(languageRoute);
	const formatNameString = (persons: { name: string }[]) =>
		[...new Set(persons.map((p) => p.name))].join(', ');
	const recordings = sequence.recordings.nodes || [];
	return intl.formatMessage(
		{
			id: 'storyAlbumsFeed__description',
			defaultMessage: '{title}, by {authors}, narrated by {narrators}',
		},
		{
			title: sequence.title,
			authors: formatNameString(
				recordings.reduce<{ name: string }[]>(
					(carry, { authors }) => [...carry, ...authors],
					[]
				)
			),
			narrators: formatNameString(
				recordings.reduce<{ name: string }[]>(
					(carry, { narrators }) => [...carry, ...narrators],
					[]
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
