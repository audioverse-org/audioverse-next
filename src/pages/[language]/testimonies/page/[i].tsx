import Testimonies from '@containers/testimonies';
import { getTestimonyCount } from '@lib/api';
import { getTestimonies, GetTestimoniesQuery } from '@lib/generated/graphql';
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
	NonNullable<GetTestimoniesQuery>['testimonies']['nodes']
>[0];
type StaticProps = PaginatedStaticProps<GetTestimoniesQuery, Testimony>;

export async function getStaticProps({
	params,
}: GetStaticPropsArgs): Promise<StaticProps> {
	return getPaginatedStaticProps(
		params,
		getTestimonies,
		(d) => d.testimonies.nodes,
		(d) => d.testimonies.aggregate?.count
	);
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return await getNumberedStaticPaths('testimonies', getTestimonyCount);
}
