import { GetStaticPathsResult, GetStaticPropsContext } from 'next';

import getChapterRoute from '~src/services/bibles/graphql/getChapterRoute';

export default function LegacyBibleChapter() {
	// This page will never render - it only redirects
	return null;
}

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{
	language: string;
	id: string;
	slug: string;
}>) {
	const id = params?.id;

	if (!id) {
		return {
			notFound: true,
		};
	}

	return {
		redirect: {
			destination: await getChapterRoute(id),
			permanent: true,
		},
	};
}

export function getStaticPaths(): GetStaticPathsResult {
	return {
		paths: [],
		fallback: 'blocking',
	};
}
