import Version, { VersionProps } from '@containers/bibles/version';
import {
	getVersionDetailPageData,
	getVersionDetailPathData,
} from '@lib/generated/graphql';
import { REVALIDATE } from '@lib/constants';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';
import { makeBibleVersionRoute } from '@lib/routes';

export default Version;

interface StaticProps {
	props: VersionProps;
	revalidate: Number;
}

export async function getStaticProps({
	params,
}: {
	params: { id: string };
}): Promise<StaticProps> {
	const response = await getVersionDetailPageData({ id: params.id });

	return {
		props: {
			books: response?.audiobible?.books || [],
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	const response = await getVersionDetailPathData({});
	const nodes = response.audiobibles.nodes || [];
	const versionIds = nodes.map((n) => n.id);
	const baseRoutes = getLanguageRoutes();
	const pathSets = baseRoutes.map((route) => {
		return versionIds.map((id) => makeBibleVersionRoute(route, id));
	});

	return {
		paths: pathSets.flat(),
		fallback: true,
	};
}
