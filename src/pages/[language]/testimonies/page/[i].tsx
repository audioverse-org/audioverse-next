import Testimonies from '@containers/testimonies';
import { getTestimonies, getTestimonyCount } from '@lib/api';
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
}: GetStaticPropsArgs): Promise<PaginatedStaticProps> {
	const { i, language } = params;

	return getPaginatedStaticProps(language, parseInt(i), getTestimonies);
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getNumberedStaticPaths('testimonies', getTestimonyCount);
}
