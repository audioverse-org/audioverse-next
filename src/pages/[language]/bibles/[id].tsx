import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import Version, { VersionProps } from '@containers/bible/version';
import { REVALIDATE } from '@lib/constants';
import {
	getVersionDetailPageData,
	getVersionDetailPathData,
} from '@lib/generated/graphql';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';
import { makeBibleVersionRoute } from '@lib/routes';

export default Version;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ id: string }>): Promise<
	GetStaticPropsResult<VersionProps>
> {
	const { audiobible } = await getVersionDetailPageData({
		id: params?.id as string,
	}).catch(() => ({
		audiobible: null,
	}));

	return {
		props: {
			version: audiobible,
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	const response = await getVersionDetailPathData({});
	const nodes = response.audiobibles.nodes || [];
	const versionIds = nodes.map((n) => n.id);
	const baseRoutes = getLanguageRoutes();
	const pathSets = baseRoutes.map((route) =>
		versionIds.map((id) => makeBibleVersionRoute(route, id))
	);

	return {
		paths: pathSets.flat(),
		fallback: false,
	};
}
