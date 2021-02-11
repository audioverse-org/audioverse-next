import Version, { VersionProps } from '@containers/bible/version';
import { REVALIDATE } from '@lib/constants';
import {
	getVersionDetailPageData,
	getVersionDetailPathData,
} from '@lib/generated/graphql';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';
import { makeBibleVersionRoute } from '@lib/routes';

export default Version;

interface StaticProps {
	props: VersionProps;
	revalidate: number;
}

export async function getStaticProps({
	params,
}: {
	params: { id: string };
}): Promise<StaticProps> {
	let books: VersionProps['books'] = [];

	try {
		const response = await getVersionDetailPageData({ id: params.id });
		books = response?.audiobible?.books || [];
	} catch {
		// do nothing
	}

	return {
		props: {
			books,
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
