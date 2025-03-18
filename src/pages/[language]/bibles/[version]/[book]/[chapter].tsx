import { GetStaticPathsResult, GetStaticPropsContext } from 'next';

import Chapter from '~src/containers/bible/chapter';
import { REVALIDATE } from '~src/lib/constants';

export default Chapter;

export function getStaticProps({ params }: GetStaticPropsContext) {
	return {
		props: {
			versionId: params?.version,
			bookId: params?.book,
			chapterNumber: Number(params?.chapter),
		},
		revalidate: REVALIDATE,
	};
}

export function getStaticPaths(): GetStaticPathsResult {
	return {
		paths: [],
		fallback: 'blocking',
	};
}
