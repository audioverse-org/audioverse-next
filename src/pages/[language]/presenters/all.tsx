import All from '@containers/presenter/list/all';
import { REVALIDATE } from '@lib/constants';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';
import { makePresenterListAllRoute } from '@lib/routes';
import { GetStaticPropsResult } from 'next';

export default All;

export function getStaticProps(): Promise<GetStaticPropsResult<unknown>> {
	return Promise.resolve({
		props: {},
		revalidate: REVALIDATE,
	});
}

export function getStaticPaths() {
	return {
		paths: getLanguageRoutes().map(makePresenterListAllRoute),
		fallback: 'blocking',
	};
}
