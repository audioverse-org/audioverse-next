import _ from 'lodash';

import SermonDetail, { SermonDetailProps } from '@containers/sermon/detail';
import { LANGUAGES } from '@lib/constants';
import {
	getSermon,
	getSermonDetailStaticPaths,
	Language,
} from '@lib/generated/graphql';

export default SermonDetail;

interface StaticProps {
	props: SermonDetailProps;
	revalidate: number;
}

export async function getStaticProps({
	params,
}: {
	params: { id: string };
}): Promise<StaticProps> {
	const { id } = params;
	const { sermon } = await getSermon({ id }).catch(() => ({
		sermon: undefined,
	}));

	return {
		props: {
			sermon,
		},
		revalidate: 10,
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	const languages = _.values(Language);
	const pathSetPromises = languages.map(async (l: Language) => {
		const result = await getSermonDetailStaticPaths({
			language: l,
			first: process.env.NODE_ENV === 'development' ? 10 : 1000,
		});
		const nodes = result?.sermons?.nodes || [];
		const dateFloor = new Date('2020-06-01'); // TODO: Should this be rolling?
		const filteredNodes = nodes.filter(
			(n) => new Date(n.recordingDate) > dateFloor
		);
		const baseUrl = LANGUAGES[l].base_url;
		return filteredNodes.map((node) => `/${baseUrl}/sermons/${node.id}`) || [];
	});

	const pathSets = await Promise.all(pathSetPromises);

	return {
		paths: _.flatten(pathSets),
		fallback: true,
	};
}
