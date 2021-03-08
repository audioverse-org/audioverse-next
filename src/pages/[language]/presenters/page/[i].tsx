import Presenters from '@containers/presenter/list';
import {
	getPresenterListPageData,
	GetPresenterListPageDataQuery,
	getPresenterListPathsData,
} from '@lib/generated/graphql';
import { getNumberedStaticPaths } from '@lib/getNumberedStaticPaths';
import {
	getPaginatedStaticProps,
	PaginatedStaticProps,
} from '@lib/getPaginatedStaticProps';

export default Presenters;

type Presenter = NonNullable<
	GetPresenterListPageDataQuery['persons']['nodes']
>[0];
export type PresentersStaticProps = PaginatedStaticProps<
	GetPresenterListPageDataQuery,
	Presenter
>;

// TODO: Consider adding RSS feed for new presenters w/ presenter names and descs
export async function getStaticProps({
	params,
}: {
	params: { language: string; i: string };
}): Promise<PresentersStaticProps> {
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
