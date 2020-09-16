import Testimonies from '@containers/testimonies';
import { getNumberedStaticPaths } from '@lib/helpers';
import { getTestimonyCount } from '@lib/api';

export default Testimonies;

interface GetStaticPropsArgs {
	params: {};
}

export async function getStaticProps({ params }: GetStaticPropsArgs) {
	return {
		props: {},
		revalidate: 10,
	};
}

export async function getStaticPaths() {
	return await getNumberedStaticPaths('testimonies/page', getTestimonyCount);
}
