import _ from 'lodash';

import SermonList from '../../../../containers/sermon/list';
import { getSermonCount, getSermons } from '../../../../lib/api';
import { ENTRIES_PER_PAGE, LANGUAGES } from '../../../../lib/constants';

export default SermonList;

export async function getStaticProps({ params }) {
	const { i, language } = params,
		langKey = _.findKey(LANGUAGES, (l) => l.base_url === language),
		offset = (i - 1) * ENTRIES_PER_PAGE,
		response = await getSermons(langKey, {
			offset,
			first: ENTRIES_PER_PAGE,
		});

	return {
		props: {
			sermons: response.nodes,
		},
	};
}

export async function getStaticPaths() {
	const pathSetPromises = Object.keys(LANGUAGES).map(async (k) => {
			const sermonCount = await getSermonCount(k),
				pageCount = Math.ceil(sermonCount / ENTRIES_PER_PAGE),
				numbers = Array.from(Array(pageCount).keys()),
				base = LANGUAGES[k].base_url;

			return numbers.map((x) => `/${base}/sermons/page/${x + 1}`);
		}),
		pathSets = await Promise.all(pathSetPromises);

	return { paths: pathSets.flat(), fallback: 'unstable_blocking' };
}
