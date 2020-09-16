import Testimonies from '@containers/testimonies';
import { makeNumberedPaths } from '@lib/helpers';
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
	return {
		paths: await makeNumberedPaths('testimonies/page', getTestimonyCount),
	};
}
