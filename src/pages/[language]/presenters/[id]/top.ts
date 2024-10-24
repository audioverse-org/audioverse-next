import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '~containers/base';
import { getPresenterDetailPathsData } from '~containers/presenter/__generated__/detail';
import { getPresenterTopPageData } from '~containers/presenter/__generated__/top';
import PresenterTop, { PresenterTopProps } from '~containers/presenter/top';
import { REVALIDATE, REVALIDATE_FAILURE } from '~lib/constants';
import { getDetailStaticPaths } from '~lib/getDetailStaticPaths';
import getIntl from '~lib/getIntl';
import { getLanguageIdByRoute } from '~lib/getLanguageIdByRoute';
import root from '~lib/routes';

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
				},
			),
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getDetailStaticPaths(
		getPresenterDetailPathsData,
		(d) => d.persons.nodes,
		(l, { id }) => root.lang(l).presenters.id(id).top.get(),
	);
}
