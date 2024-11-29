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
import { getBibles } from '~src/services/fcbh/bibleBrain';

export default Bible;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string }>): Promise<
	GetStaticPropsResult<BibleIndexProps & IBaseProps>
> {
	const response = await getBibles().catch((e) => {
		console.log(e);
		return null;
	});
	// const apiBibles = await getAudiobibleVersionsData({
	// 	language: getLanguageIdByRoute(params?.language),
	// }).catch(() => ({ collections: { nodes: [] } }));

	// if (!apiBibles?.collections.nodes) {
	// 	return {
	// 		notFound: true,
	// 		revalidate: REVALIDATE_FAILURE,
	// 	};
	// }

	const intl = await getIntl(getLanguageIdByRoute(params?.language));
	return {
		props: {
			audiobibles: response || [],
			// versions: [...(response || []), ...apiBibles.collections.nodes].sort(
			// 	(a, b) => a.title.localeCompare(b.title),
			// ),
			// ...(await getAudiobibleIndexData({})),
			title: intl.formatMessage({
				id: 'bible__title',
				defaultMessage: 'Bible',
			}),
		},
		revalidate: response ? REVALIDATE : REVALIDATE_FAILURE,
		// revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return {
		paths: [root.lang(LANGUAGES.ENGLISH.base_urls[0]).bibles.get()],
		fallback: false,
	};
}
