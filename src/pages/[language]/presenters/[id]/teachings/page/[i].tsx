import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import PresenterRecordings, {
	PresenterRecordingsProps,
} from '@containers/presenter/recordings';
import {
	getPresenterDetailPathsData,
	getPresenterRecordingsPageData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';

export default PresenterRecordings;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string; id: string; i: string }>): Promise<
	GetStaticPropsResult<PresenterRecordingsProps>
> {
	const id = params?.id as string;

	return await getPaginatedStaticProps(
		params,
		({ offset, first }) =>
			getPresenterRecordingsPageData({ id, offset, first }),
		(d) => d.person?.recordings?.nodes,
		(d) => d.person?.recordings?.aggregate?.count
	);
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getDetailStaticPaths(
		getPresenterDetailPathsData,
		(d) => d.persons.nodes,
		(languageRoute, node) =>
			`/${languageRoute}/presenters/${node.id}/teachings/page/1`
	);
}
