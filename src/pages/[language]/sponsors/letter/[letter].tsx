import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '@containers/base';
import Sponsors, { SponsorsProps } from '@containers/sponsor/list/letter';
import { LANGUAGES, REVALIDATE } from '@lib/constants';
import {
	getSponsorListLetterCounts,
	getSponsorListLetterPageData,
	Language,
} from '@lib/generated/graphql';
import getIntl from '@lib/getIntl';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import root from '@lib/routes';

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
	const pathSets = Object.entries(LANGUAGES).map(async ([key, config]) => {
		const { sponsorLetterCounts = [] } = await getSponsorListLetterCounts({
			language: key as Language,
		});
		return sponsorLetterCounts
			.map(({ letter }) =>
				config.base_urls.map((b) => root.lang(b).sponsors.letter(letter).get())
			)
			.flat();
	});

	return {
		paths: (await Promise.all(pathSets)).flat(),
		fallback: 'blocking',
	};
}
