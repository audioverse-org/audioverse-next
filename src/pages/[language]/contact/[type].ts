import { GetStaticPathsResult, GetStaticPropsResult } from 'next';

import Todo from '@components/molecules/todo';
import { REVALIDATE } from '@lib/constants';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';
import { makeContactRoute, makeTestimonySubmitRoute } from '@lib/routes';

export default Todo;

export async function getStaticProps(): Promise<
	GetStaticPropsResult<Record<string, unknown>>
> {
	return {
		props: {},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return {
		paths: getLanguageRoutes()
			.map((base_url) => [
				makeContactRoute(base_url, '/general'),
				makeContactRoute(base_url, '/support'),
				makeTestimonySubmitRoute(base_url),
			])
			.flat(),
		fallback: false,
	};
}
