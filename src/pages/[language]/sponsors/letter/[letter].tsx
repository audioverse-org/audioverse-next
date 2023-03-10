import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '@containers/base';
import Sponsors, { SponsorsProps } from '@containers/sponsor/list/list.letter';
import { LANGUAGES, REVALIDATE } from '@lib/constants';
import {
	getSponsorListLetterCounts,
	getSponsorListLetterPageData,
} from '@lib/generated/graphql';
import getIntl from '@lib/getIntl';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import getLanguageIds from '@lib/getLanguageIds';
import { makeSponsorListRoute } from '@lib/routes';

export default Sponsors;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string; letter: string }>): Promise<
	GetStaticPropsResult<SponsorsProps & IBaseProps>
> {
	const language = getLanguageIdByRoute(params?.language);
	const intl = await getIntl(language);
	const letter = params?.letter as string;
	const { sponsors, sponsorLetterCounts } = await getSponsorListLetterPageData({
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
			title: intl.formatMessage({
				id: 'sponsors__title',
				defaultMessage: 'All Sponsors',
			}),
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	const keys = getLanguageIds();
	const pathSets = await Promise.all(
		keys.map(async (language) => {
			const { sponsorLetterCounts } = await getSponsorListLetterCounts({
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
