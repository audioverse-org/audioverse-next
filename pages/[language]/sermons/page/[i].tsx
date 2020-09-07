import SermonList from '../../../../containers/sermon/list';
import { languages } from '../../../../lib/constants';

export default SermonList;

export async function getStaticProps({ params }) {
	return { props: { sermons: [] } };
}

export async function getStaticPaths() {
	const pathSets = Object.values(languages).map((l) => {
		return [`/${l.base_url}/sermons/page/1`];
	});

	return { paths: pathSets.flat(), fallback: 'unstable_blocking' };
}
