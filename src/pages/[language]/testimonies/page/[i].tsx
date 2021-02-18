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

export async function getStaticProps({
	params,
}: GetStaticPropsArgs): Promise<PaginatedStaticProps<GetTestimoniesQuery>> {
	return await getPaginatedStaticProps(
		params,
		getTestimonies,
		'testimonies.nodes',
		'testimonies.aggregate.count'
	);
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return await getNumberedStaticPaths('testimonies', getTestimonyCount);
}
