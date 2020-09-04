import Home from '../../containers/home';
import { getRecentSermons } from '../../lib/api';

export default Home;

export async function getStaticProps({ params }) {
	await getRecentSermons();

	return {
		props: {},
		revalidate: 10,
	};
}

export async function getStaticPaths() {
	return {
		paths: ['/en'],
		fallback: 'unstable_blocking',
	};
}
