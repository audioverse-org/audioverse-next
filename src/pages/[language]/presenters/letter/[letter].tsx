import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '@containers/base';
import Presenters, { PresentersProps } from '@containers/presenter/list/list';
import { LANGUAGES, REVALIDATE } from '@lib/constants';
import {
	getPresenterListPageData,
	getPresenterListPathsData,
} from '@lib/generated/graphql';
import getIntl from '@lib/getIntl';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import getLanguageIds from '@lib/getLanguageIds';
import { makePresenterListRoute } from '@lib/routes';

export default Presenters;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string; letter: string }>): Promise<
	GetStaticPropsResult<PresentersProps & IBaseProps>
> {
	const language = getLanguageIdByRoute(params?.language);
	const intl = await getIntl(language);
	const letter = params?.letter as string;
	const { persons, personLetterCounts } = await getPresenterListPageData({
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
	const keys = getLanguageIds();
	const pathSets = await Promise.all(
		keys.map(async (language) => {
			const { personLetterCounts } = await getPresenterListPathsData({
				language,
			});
			return (personLetterCounts || []).map(({ letter }) =>
				makePresenterListRoute(LANGUAGES[language].base_url, letter)
			);
		})
	);
	return {
		paths: pathSets.flat(),
		fallback: 'blocking',
	};
}
