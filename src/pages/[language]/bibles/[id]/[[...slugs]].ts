import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '@containers/base';
import Version, { VersionProps } from '@containers/bible/version';
import { getBible, getBibles } from '@lib/api/bibleBrain';
import { LANGUAGES, REVALIDATE, REVALIDATE_FAILURE } from '@lib/constants';
import {
	CollectionContentType,
	getAudiobibleVersionData,
	getAudiobibleVersionsData,
	Language,
} from '@lib/generated/graphql';
import root from '@lib/routes';

export default Version;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ id: string }>): Promise<
	GetStaticPropsResult<VersionProps & IBaseProps>
> {
	let props: VersionProps & IBaseProps;
	if (params?.id.includes('K')) {
		const version = await getBible(params?.id || '').catch((e) => {
			console.log(e);
			return null;
		});
		if (!version) {
			return {
				notFound: true,
				revalidate: REVALIDATE_FAILURE,
			};
		}
		props = {
			version: {
				...version,
				books: version.books.map((b) => ({
					...b,
					id: b.book_id,
					title: b.name,
					collection: null,
					recordings: {
						nodes: [],
						aggregate: {
							count: b.chapters.length,
						},
					},
				})),
			},
			title: version.title,
		};
	} else {
		const version = await getAudiobibleVersionData({ id: params?.id || '' });
		if (
			!version.collection ||
			version.collection.contentType !== CollectionContentType.BibleVersion
		) {
			return {
				notFound: true,
				revalidate: REVALIDATE_FAILURE,
			};
		}
		props = {
			version: version.collection,
			title: version.collection?.title,
		};
	}

	return {
		props,
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	const response = (await getBibles()) || [];
	const paths = [];
	paths.push(
		...response.map(({ id }) =>
			root.lang(LANGUAGES.ENGLISH.base_urls[0]).bibles.versionId(id).get()
		)
	);
	const apiBibles = await getAudiobibleVersionsData({
		language: Language.English,
	});
	paths.push(
		...(apiBibles.collections.nodes || []).map((c) => c.canonicalPath)
	);

	return {
		paths,
		fallback: true,
	};
}
