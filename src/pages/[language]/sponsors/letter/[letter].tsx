import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import Sponsors, { SponsorsProps } from '@containers/sponsor/list';
import { LANGUAGES, REVALIDATE } from '@lib/constants';
import {
	getSponsorListPageData,
	getSponsorListPathsData,
} from '@lib/generated/graphql';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import getLanguageIds from '@lib/getLanguageIds';
import { makeSponsorListRoute } from '@lib/routes';

export default Sponsors;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string; letter: string }>): Promise<
	GetStaticPropsResult<SponsorsProps>
> {
	const language = getLanguageIdByRoute(params?.language);
	const letter = params?.letter as string;
	const { sponsors, sponsorLetterCounts } = await getSponsorListPageData({
		language,
		startsWith: letter,
	}).catch(() => ({
		sponsors: {
			nodes: [],
		},
		sponsorLetterCounts: [],
	}));
	return {
		props: {
			sponsors: sponsors.nodes || [],
			sponsorLetterCounts,
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	const keys = getLanguageIds();
	const pathSets = await Promise.all(
		keys.map(async (language) => {
			const { sponsorLetterCounts } = await getSponsorListPathsData({
				language,
			});
			return (sponsorLetterCounts || []).map(({ letter }) =>
				makeSponsorListRoute(LANGUAGES[language].base_url, letter)
			);
		})
	);
	return {
		paths: pathSets.flat(),
		fallback: 'blocking',
	};
}
