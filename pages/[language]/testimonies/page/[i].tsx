import Testimonies from '@containers/testimonies';
import {
	getTestimonies,
	GetTestimoniesReturnType,
	getTestimonyCount,
} from '@lib/api';
import {
	getNumberedStaticPaths,
	getPaginatedStaticProps,
	PaginatedStaticProps,
} from '@lib/helpers';

export default Testimonies;

interface GetStaticPropsArgs {
	params: { i: string; language: string };
}

export async function getStaticProps({
	params,
}: GetStaticPropsArgs): Promise<
	PaginatedStaticProps<GetTestimoniesReturnType>
> {
	const { i, language } = params;

	return getPaginatedStaticProps(language, parseInt(i), getTestimonies);
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getNumberedStaticPaths('testimonies/page', getTestimonyCount);
}
