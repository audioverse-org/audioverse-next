import _ from 'lodash';

import Home from '@containers/home';
import { getSermons } from '@lib/api';
import { LANGUAGES } from '@lib/constants';

export default Home;

export async function getStaticProps({ params }) {
	const language = _.get(params, 'language'),
		langKey = _.findKey(LANGUAGES, (l) => l.base_url === language);

	if (!langKey) throw Error('Missing or invalid language');

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
		paths: Object.values(LANGUAGES).map((l) => `/${l.base_url}`),
		fallback: 'unstable_blocking',
	};
}
