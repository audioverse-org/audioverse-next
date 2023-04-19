import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '@containers/base';
import Presenters, { PresentersProps } from '@containers/presenter/list/letter';
import { LANGUAGES, REVALIDATE } from '@lib/constants';
import {
	getPersonListLetterCounts,
	getPresenterListLetterPageData,
	Language,
} from '@lib/generated/graphql';
import getIntl from '@lib/getIntl';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import root from '@lib/routes';

export default Presenters;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string; letter: string }>): Promise<
	GetStaticPropsResult<PresentersProps & IBaseProps>
> {
	const language = getLanguageIdByRoute(params?.language);
	const intl = await getIntl(language);
	const letter = params?.letter as string;
	const { persons, personLetterCounts } = await getPresenterListLetterPageData({
		language,
		startsWith: letter,
	}).catch(() => ({
		persons: {
			nodes: [],
		},
		personLetterCounts: [],
	}));
	return {
		props: {
			persons: persons.nodes || [],
			personLetterCounts,
			title: intl.formatMessage({
				id: 'presenters__title',
				defaultMessage: 'All Presenters',
			}),
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	const pathSets = Object.entries(LANGUAGES).map(async ([key, config]) => {
		const { personLetterCounts = [] } = await getPersonListLetterCounts({
			language: key as Language,
		});
		return personLetterCounts
			.map(({ letter }) =>
				config.base_urls.map((b) =>
					root.lang(b).presenters.letter(letter).get()
				)
			)
			.flat();
	});

	return {
		paths: (await Promise.all(pathSets)).flat(),
		fallback: 'blocking',
	};
}
