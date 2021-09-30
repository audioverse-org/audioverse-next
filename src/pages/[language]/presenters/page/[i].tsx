import Presenters, { PresentersProps } from '@containers/presenter/list';
import {
	getPresenterListPageData,
	getPresenterListPathsData,
} from '@lib/generated/graphql';
import { getNumberedStaticPaths } from '@lib/getNumberedStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';

export default Presenters;

export async function getStaticProps({
	params,
}: {
	params: { language: string; i: string };
}): Promise<StaticProps<PresentersProps>> {
	return getPaginatedStaticProps(
		params,
		getPresenterListPageData,
		(d) => d.persons.nodes,
		(d) => d.persons?.aggregate?.count
	);
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getNumberedStaticPaths(
		'presenters',
		getPresenterListPathsData,
		(d) => d.persons?.aggregate?.count
	);
}
