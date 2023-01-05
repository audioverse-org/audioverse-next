import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '@/containers/base';
import PresenterTop, { PresenterTopProps } from '@/containers/presenter/top';
import { REVALIDATE, REVALIDATE_FAILURE } from '@/lib/constants';
import {
	getPresenterDetailPathsData,
	getPresenterTopPageData,
} from '@/lib/generated/graphql';
import { getDetailStaticPaths } from '@/lib/getDetailStaticPaths';
import getIntl from '@/lib/getIntl';
import { getLanguageIdByRoute } from '@/lib/getLanguageIdByRoute';
import { makePresenterTopRecordingsRoute } from '@/lib/routes';

export default PresenterTop;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string; id: string }>): Promise<
	GetStaticPropsResult<PresenterTopProps & IBaseProps>
> {
	const id = params?.id as string;
	const { person } = await getPresenterTopPageData({
		id,
		offset: 0,
		first: 24,
	}).catch(() => ({
		person: null,
	}));
	const language = getLanguageIdByRoute(params?.language);
	const intl = await getIntl(language);

	if (person?.language !== language) {
		return {
			notFound: true,
			revalidate: REVALIDATE_FAILURE,
		};
	}

	return {
		props: {
			person,
			title: intl.formatMessage(
				{
					id: 'presentersTop__title',
					defaultMessage: 'Most Listened by {personName}',
				},
				{
					personName: person?.name,
				}
			),
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getDetailStaticPaths(
		getPresenterDetailPathsData,
		(d) => d.persons.nodes,
		(languageRoute, node) =>
			makePresenterTopRecordingsRoute(languageRoute, node.id)
	);
}
