import Testimonies from '@containers/testimonies';
import {
	getTestimoniesPageData,
	GetTestimoniesPageDataQuery,
	getTestimoniesPathsData,
} from '@lib/generated/graphql';
import { getNumberedStaticPaths } from '@lib/getNumberedStaticPaths';
import {
	getPaginatedStaticProps,
	PaginatedStaticProps,
} from '@lib/getPaginatedStaticProps';

export default Testimonies;

interface GetStaticPropsArgs {
	params: { i: string; language: string };
}

type Testimony = NonNullable<
	NonNullable<GetTestimoniesPageDataQuery>['testimonies']['nodes']
>[0];
type StaticProps = PaginatedStaticProps<GetTestimoniesPageDataQuery, Testimony>;

export async function getStaticProps({
	params,
}: GetStaticPropsArgs): Promise<StaticProps> {
	return getPaginatedStaticProps(
		params,
		getTestimoniesPageData,
		(d) => d?.testimonies.nodes,
		(d) => d?.testimonies.aggregate?.count
	);
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return await getNumberedStaticPaths(
		'testimonies',
		getTestimoniesPathsData,
		(d) => d?.testimonies?.aggregate?.count
	);
}
