import Versions, { VersionsProps } from '@containers/bibles/versions';
import { LANGUAGES, REVALIDATE } from '@lib/constants';
import { getBibleVersionsPageData, Language } from '@lib/generated/graphql';
import { makeBibleListRoute } from '@lib/routes';

// TODO: If we ever add a load of Bibles, we may need to
//  add support for pagination.

export default Versions;

interface StaticProps {
	props: VersionsProps;
	revalidate: number;
}

export async function getStaticProps(): Promise<StaticProps> {
	const response = await getBibleVersionsPageData({});

	return {
		props: {
			versions: response?.audiobibles.nodes || [],
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	const keys = Object.keys(LANGUAGES) as Language[];
	const base_routes = keys.map((k: Language) => LANGUAGES[k].base_url);

	return {
		paths: base_routes.map(makeBibleListRoute),
		fallback: true,
	};
}
