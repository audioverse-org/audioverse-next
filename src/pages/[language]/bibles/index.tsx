import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '~containers/base';
import Bible, { BibleIndexProps } from '~containers/bible';
import { LANGUAGES, REVALIDATE, REVALIDATE_FAILURE } from '~lib/constants';
import root from '~lib/routes';
import {
	concatBibles,
	getApiBibles,
	getBibleStaticProps,
	getFcbhBibles,
} from '~src/lib/getBibleStaticProps';
import getIntl from '~src/lib/getIntl';
import { getLanguageIdByRoute } from '~src/lib/getLanguageIdByRoute';

export default Bible;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string }>): Promise<
	GetStaticPropsResult<BibleIndexProps & IBaseProps>
> {
	const languageRoute = params?.language || 'en';
	const languageId = getLanguageIdByRoute(languageRoute);

	const intl = await getIntl(languageId);

	const apiBibles = await getApiBibles(languageId);

	if (!apiBibles) {
		return {
			notFound: true,
			revalidate: REVALIDATE_FAILURE,
		};
	}

	const fcbhBibles = await getFcbhBibles(languageRoute);

	return {
		props: {
			data: concatBibles(fcbhBibles, apiBibles),
			title: intl.formatMessage({
				id: 'bible__title',
				defaultMessage: 'Bible',
			}),
		},
		revalidate: fcbhBibles ? REVALIDATE : REVALIDATE_FAILURE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return {
		paths: [root.lang(LANGUAGES.ENGLISH.base_urls[0]).bibles.get()],
		fallback: false,
	};
}
