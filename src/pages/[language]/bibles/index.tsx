import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '@containers/base';
import Versions, { VersionsProps } from '@containers/bible/versions';
import { getBibles } from '@lib/api/bibleBrain';
import { LANGUAGES, REVALIDATE, REVALIDATE_FAILURE } from '@lib/constants';
import getIntl from '@lib/getIntl';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import { makeBibleListRoute } from '@lib/routes';

export default Versions;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string }>): Promise<
	GetStaticPropsResult<VersionsProps & IBaseProps>
> {
	const response = await getBibles().catch((e) => {
		console.log(e);
		return null;
	});
	const intl = await getIntl(getLanguageIdByRoute(params?.language));

	return {
		props: {
			versions: response || [],
			title: intl.formatMessage({
				id: 'bible__title',
				defaultMessage: 'Bible',
			}),
		},
		revalidate: response ? REVALIDATE : REVALIDATE_FAILURE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return {
		paths: [makeBibleListRoute(LANGUAGES.ENGLISH.base_url)],
		fallback: false,
	};
}
