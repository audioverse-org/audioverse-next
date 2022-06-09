import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import PresenterAppears, {
	PresenterAppearsProps,
} from '@containers/presenter/appears';
import { getPresenterAppearsPageData } from '@containers/presenter/appears.gql';
import { getPresenterDetailPathsData } from '@containers/presenter/detail.gql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import getIntl from '@lib/getIntl';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';

export default PresenterAppears;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string; id: string; i: string }>): Promise<
	GetStaticPropsResult<PresenterAppearsProps>
> {
	const languageRoute = params?.language as string;
	const intl = await getIntl(languageRoute);
	const id = params?.id as string;

	return getPaginatedStaticProps(
		params,
		(vars) => getPresenterAppearsPageData({ id, ...vars }),
		(d) => d.collections?.nodes,
		(d) => d.collections?.aggregate?.count,
		(d) => ({
			title: intl.formatMessage(
				{
					id: 'presentersAppears__title',
					defaultMessage: '{personName} Also Appears In',
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
			`/${languageRoute}/presenters/${node.id}/appears/page/1`
	);
}
