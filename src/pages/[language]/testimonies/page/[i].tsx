import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import Testimonies, { TestimoniesProps } from '@containers/testimonies';
import {
	getTestimoniesPageData,
	getTestimoniesPathsData,
} from '@containers/testimonies.gql';
import getIntl from '@lib/getIntl';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import { getNumberedStaticPaths } from '@lib/getNumberedStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';

export default Testimonies;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ i: string; language: string }>): Promise<
	GetStaticPropsResult<TestimoniesProps>
> {
	const intl = await getIntl(getLanguageIdByRoute(params?.language));
	return getPaginatedStaticProps(
		params,
		getTestimoniesPageData,
		(d) => d?.testimonies.nodes,
		(d) => d?.testimonies.aggregate?.count,
		() => ({
			title: intl.formatMessage({
				id: 'testimonies__title',
				defaultMessage: 'Testimonials',
			}),
		})
	);
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return await getNumberedStaticPaths(
		'testimonies',
		getTestimoniesPathsData,
		(d) => d?.testimonies?.aggregate?.count
	);
}
