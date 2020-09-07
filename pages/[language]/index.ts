import Home from '../../containers/home';
import { getRecentSermons } from '../../lib/api';
import { languages } from '../../lib/constants';

export default Home;

export async function getStaticProps({ params }) {
	const sermons = await getRecentSermons();
	return {
		props: {
			sermons: (sermons && sermons.nodes) || [],
		},
		revalidate: 10,
	};
}

export async function getStaticPaths() {
	return {
		paths: Object.values(languages).map((l) => `/${l.base_url}`),
		fallback: 'unstable_blocking',
	};
}
