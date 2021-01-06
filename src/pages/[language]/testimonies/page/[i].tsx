import Testimonies from '@containers/testimonies';
import { getTestimonyCount } from '@lib/api';
import { getTestimonies } from '@lib/generated/graphql';
import { getNumberedStaticPaths } from '@lib/getNumberedStaticPaths';
import {
	getPaginatedStaticProps,
	PaginatedStaticProps,
} from '@lib/getPaginatedStaticProps';
import type { StaticPaths } from 'types';

export default Testimonies;

interface GetStaticPropsArgs {
	params: { i: string; language: string };
}

export async function getStaticProps({
	params,
}: GetStaticPropsArgs): Promise<PaginatedStaticProps> {
	const { i, language: baseUrl } = params;

	return await getPaginatedStaticProps(
		baseUrl,
		parseInt(i),
		async (language, { offset, first }) => {
			const data = await getTestimonies({ language, first, offset });

			return data?.testimonies;
		}
	);
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return await getNumberedStaticPaths('testimonies', getTestimonyCount);
}
