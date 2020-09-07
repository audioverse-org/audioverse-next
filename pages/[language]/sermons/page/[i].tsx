import SermonList from '../../../../containers/sermon/list';
import { entriesPerPage, languages } from '../../../../lib/constants';
import { getSermonCount } from '../../../../lib/api';

export default SermonList;

export async function getStaticProps({ params }) {
	return { props: { sermons: [] } };
}

export async function getStaticPaths() {
	const pathSetPromises = Object.keys(languages).map(async (k) => {
			const sermonCount = await getSermonCount(k),
				pageCount = Math.ceil(sermonCount / entriesPerPage),
				numbers = Array.from(Array(pageCount).keys()),
				baseUrl = languages[k].base_url;

			return numbers.map((x) => `/${baseUrl}/sermons/page/${x + 1}`);
		}),
		pathSets = await Promise.all(pathSetPromises);

	return { paths: pathSets.flat(), fallback: 'unstable_blocking' };
}
