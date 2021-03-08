import Presenter from '@containers/presenter/detail';
import { createFeed } from '@lib/createFeed';
import {
	getPresenterDetailPageData,
	GetPresenterDetailPageDataQuery,
	getPresenterDetailPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import {
	getPaginatedStaticProps,
	PaginatedStaticProps,
} from '@lib/getPaginatedStaticProps';

export default Presenter;

type Recording = NonNullable<
	NonNullable<
		NonNullable<
			GetPresenterDetailPageDataQuery['person']
		>['recordings']['nodes']
	>[0]
>;
export type PresenterStaticProps = PaginatedStaticProps<
	GetPresenterDetailPageDataQuery,
	Recording
> & { props: { rssPath: string | null } };

export async function getStaticProps({
	params,
}: {
	params: { language: string; id: string; i: string };
}): Promise<PresenterStaticProps> {
	const { id } = params;

	const response = await getPaginatedStaticProps(
		params,
		({ offset, first }) => getPresenterDetailPageData({ id, offset, first }),
		(d) => d.person?.recordings?.nodes,
		(d) => d.person?.recordings?.aggregate?.count
	);

	const rssPath = await createFeed(
		response.props.data?.person?.name,
		params,
		response.props.nodes,
		`presenters/${id}.xml`
	);

	return {
		...response,
		props: {
			rssPath,
			...response.props,
		},
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getDetailStaticPaths(
		getPresenterDetailPathsData,
		(d) => d.persons.nodes,
		(languageRoute, node) => `/${languageRoute}/presenters/${node.id}/page/1`
	);
}
