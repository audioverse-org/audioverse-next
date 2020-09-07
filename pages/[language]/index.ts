import Home from '../../containers/home';
import { getSermons } from '../../lib/api';
import { languages } from '../../lib/constants';
import _ from 'lodash';

export default Home;

export async function getStaticProps({ params }) {
	const language = _.get(params, 'language'),
		langKey = _.findKey(languages, (l) => l.base_url === language);

	const sermons = await getSermons(langKey);
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
