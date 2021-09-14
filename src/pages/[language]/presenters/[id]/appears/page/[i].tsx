import PresenterAppears, {
	PresenterAppearsProps,
} from '@containers/presenter/appears';
import {
	getPresenterAppearsPageData,
	getPresenterDetailPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';
import { makePresenterAlsoAppearsInRoute } from '@lib/routes';

export default PresenterAppears;

export async function getStaticProps({
	params,
}: {
	params: { language: string; id: string; i: string };
}): Promise<StaticProps<PresenterAppearsProps>> {
	const { id } = params;

	return getPaginatedStaticProps(
		params,
		(vars) => getPresenterAppearsPageData({ id, ...vars }),
		(d) => d.collections?.nodes,
		(d) => d.collections?.aggregate?.count
	);
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getDetailStaticPaths(
		getPresenterDetailPathsData,
		(d) => d.persons.nodes,
		(languageRoute, node) =>
			makePresenterAlsoAppearsInRoute(languageRoute, node.id)
	);
}
