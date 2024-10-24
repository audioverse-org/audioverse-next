import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { getPresenterDetailPathsData } from '~containers/presenter/__generated__/detail';
import { getPresenterRecordingsPageData } from '~containers/presenter/__generated__/recordings';
import PresenterRecordings, {
	PresenterRecordingsProps,
} from '~containers/presenter/recordings';
import { getDetailStaticPaths } from '~lib/getDetailStaticPaths';
import getIntl from '~lib/getIntl';
import { getPaginatedStaticProps } from '~lib/getPaginatedStaticProps';

export default PresenterRecordings;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string; id: string; i: string }>): Promise<
	GetStaticPropsResult<PresenterRecordingsProps>
> {
	const languageRoute = params?.language as string;
	const intl = await getIntl(languageRoute);
	const id = params?.id as string;

	return await getPaginatedStaticProps(
		params,
		({ offset, first }) =>
			getPresenterRecordingsPageData({ id, offset, first }),
		(d) => d.person?.recordings?.nodes,
		(d) => d.person?.recordings?.aggregate?.count,
		(d) => ({
			title: intl.formatMessage(
				{
					id: 'presentersTeachings__title',
					defaultMessage: 'Teachings by {personName}',
				},
				{
					personName: d?.person?.name,
				},
			),
		}),
	);
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getDetailStaticPaths(
		getPresenterDetailPathsData,
		(d) => d.persons.nodes,
		(languageRoute, node) =>
			`/${languageRoute}/presenters/${node.id}/teachings/page/1`,
	);
}
