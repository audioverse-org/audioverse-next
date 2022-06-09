import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { getPresenterDetailPathsData } from '@containers/presenter/detail.gql';
import PresenterSequences, {
	PresenterSequencesProps,
} from '@containers/presenter/sequences';
import { getPresenterSequencesPageData } from '@containers/presenter/sequences.gql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import getIntl from '@lib/getIntl';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';

export default PresenterSequences;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string; id: string; i: string }>): Promise<
	GetStaticPropsResult<PresenterSequencesProps>
> {
	const languageRoute = params?.language as string;
	const intl = await getIntl(languageRoute);
	const id = params?.id as string;

	return getPaginatedStaticProps(
		params,
		(vars) => getPresenterSequencesPageData({ id, ...vars }),
		(d) => d.sequences?.nodes,
		(d) => d.sequences?.aggregate?.count,
		(d) => ({
			title: intl.formatMessage(
				{
					id: 'presentersSequences__title',
					defaultMessage: 'Series by {personName}',
				},
				{
					personName: d?.person?.name,
				}
			),
		})
	);
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getDetailStaticPaths(
		getPresenterDetailPathsData,
		(d) => d.persons.nodes,
		(languageRoute, node) =>
			`/${languageRoute}/presenters/${node.id}/sequences/page/1`
	);
}
