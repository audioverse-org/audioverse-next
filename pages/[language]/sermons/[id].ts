import SermonDetail from '../../../containers/sermon/detail';
import { getRecentSermons as getLatestSermons, getSermon } from '../../../lib/api';

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
	const allPosts = await getLatestSermons('ENGLISH');
	const cutOffDate = new Date('2020-06-01');

	return {
		paths:
			allPosts.nodes
				.filter((node) => new Date(node.recordingDate) > cutOffDate)
				.map((node) => `/en/sermons/${node.id}`) || [],
		fallback: 'unstable_blocking',
	};
}
