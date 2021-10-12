import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import PresenterSequences, {
	PresenterSequencesProps,
} from '@containers/presenter/sequences';
import {
	getPresenterDetailPathsData,
	getPresenterSequencesPageData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';
import { makePresenterSequencesRoute } from '@lib/routes';

export default PresenterSequences;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string; id: string; i: string }>): Promise<
	GetStaticPropsResult<PresenterSequencesProps>
> {
	const id = params?.id as string;

	return getPaginatedStaticProps(
		params,
		(vars) => getPresenterSequencesPageData({ id, ...vars }),
		(d) => d.sequences?.nodes,
		(d) => d.sequences?.aggregate?.count
	);
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getDetailStaticPaths(
		getPresenterDetailPathsData,
		(d) => d.persons.nodes,
		(languageRoute, node) => makePresenterSequencesRoute(languageRoute, node.id)
	);
}
