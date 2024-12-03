import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '~containers/base';
import Bible, { BibleIndexProps } from '~containers/bible';
import { LANGUAGES, REVALIDATE, REVALIDATE_FAILURE } from '~lib/constants';
import getIntl from '~lib/getIntl';
import { getLanguageIdByRoute } from '~lib/getLanguageIdByRoute';
import root from '~lib/routes';
import { getAudiobibleIndexData } from '~src/containers/bible/__generated__';
import { getBibles } from '~src/services/fcbh/getBibles';
import { IBibleVersion } from '~src/services/fcbh/types';

export default Bible;

type ApiBible = BibleIndexProps['data'][0];

function transform(bible: IBibleVersion): ApiBible {
	return {
		...bible,
		sequences: {
			nodes: [],
		},
	};
}

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string }>): Promise<
	GetStaticPropsResult<BibleIndexProps & IBaseProps>
> {
	const response = await getBibles().catch((e) => {
		console.log(e);
		return null;
	});

	const apiData = await getAudiobibleIndexData({
		language: getLanguageIdByRoute(params?.language),
	}).catch(() => ({ collections: { nodes: [] } }));

	const apiBibles = apiData?.collections.nodes || [];

	if (!apiBibles) {
		return {
			notFound: true,
			revalidate: REVALIDATE_FAILURE,
		};
	}

	const fcbhBibles = response?.map(transform) || [];

	const intl = await getIntl(getLanguageIdByRoute(params?.language));
	return {
		props: {
			// versions: [...(response || []), ...apiBibles.collections.nodes].sort(
			// 	(a, b) => a.title.localeCompare(b.title),
			// ),
			data: [...fcbhBibles, ...apiBibles].sort((a, b) =>
				a.title.localeCompare(b.title),
			),
			title: intl.formatMessage({
				id: 'bible__title',
				defaultMessage: 'Bible',
			}),
		},
		revalidate: response ? REVALIDATE : REVALIDATE_FAILURE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return {
		paths: [root.lang(LANGUAGES.ENGLISH.base_urls[0]).bibles.get()],
		fallback: false,
	};
}
