import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import Testimonies, { TestimoniesProps } from '@containers/testimonies';
import {
	getTestimoniesPageData,
	getTestimoniesPathsData,
} from '@lib/generated/graphql';
import { getNumberedStaticPaths } from '@lib/getNumberedStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';

export default Testimonies;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ i: string; language: string }>): Promise<
	GetStaticPropsResult<TestimoniesProps>
> {
	return getPaginatedStaticProps(
		params,
		getTestimoniesPageData,
		(d) => d?.testimonies.nodes,
		(d) => d?.testimonies.aggregate?.count
	);
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return await getNumberedStaticPaths(
		'testimonies',
		getTestimoniesPathsData,
		(d) => d?.testimonies?.aggregate?.count
	);
}
