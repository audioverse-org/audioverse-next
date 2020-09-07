import SermonDetail from '../../../containers/sermon/detail';
import { getRecentSermons as getLatestSermons, getSermon } from '../../../lib/api';
import { languages } from '../../../lib/constants';

export default SermonDetail;

export async function getStaticProps({ params }) {
	const sermon = await getSermon(params.id);

	return {
		props: {
			sermon,
		},
		revalidate: 10,
	};
}

export async function getStaticPaths() {
	const keys = Object.keys(languages),
		pathSetPromises = keys.map(async (l) => {
			const { nodes } = await getLatestSermons(l),
				dateFloor = new Date('2020-06-01'), // TODO: Should this be rolling?
				filteredNodes = nodes.filter((n) => new Date(n.recordingDate) > dateFloor),
				baseUrl = languages[l].base_url;

			return filteredNodes.map((node) => `/${baseUrl}/sermons/${node.id}`) || [];
		});

	const pathSets = await Promise.all(pathSetPromises);

	return {
		paths: pathSets.flat(),
		fallback: 'unstable_blocking',
	};
}
