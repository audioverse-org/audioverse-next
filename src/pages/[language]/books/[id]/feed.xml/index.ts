import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { SequenceContentType } from '@src/__generated__/graphql';
import { generateFeed, sendRSSHeaders } from '@lib/generateFeed';
import { getLanguageIdByRouteOrLegacyRoute } from '@lib/getLanguageIdByRouteOrLegacyRoute';
import { getAudiobookFeedData } from '@containers/audiobook/__generated__/detail';
import { formatBooksDescription } from '@lib/formatBooksDescription';

export default (): void => void 0;

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
