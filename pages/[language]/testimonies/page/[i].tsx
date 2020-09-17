import Testimonies from '@containers/testimonies';
import { getNumberedStaticPaths, getPaginatedStaticProps } from '@lib/helpers';
import { getTestimonies, getTestimonyCount } from '@lib/api';

export default Testimonies;

interface GetStaticPropsArgs {
	params: { i: string; language: string };
}

export async function getStaticProps({ params }: GetStaticPropsArgs) {
	const { i, language } = params;

	return await getPaginatedStaticProps(language, parseInt(i), getTestimonies);
}

export async function getStaticPaths() {
	return await getNumberedStaticPaths('testimonies/page', getTestimonyCount);
}
