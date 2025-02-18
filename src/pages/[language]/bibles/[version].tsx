// import fs from 'fs';
import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '~containers/base';
import { REVALIDATE, REVALIDATE_FAILURE } from '~lib/constants';
import root from '~lib/routes';
import Bible, { VersionProps } from '~src/containers/bible/version';
import getIntl from '~src/lib/getIntl';
import { getLanguageIdByRoute } from '~src/lib/getLanguageIdByRoute';
import getBible from '~src/services/bibles/getBible';
import getVersions from '~src/services/bibles/getVersions';

export default Bible;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string; version: string }>): Promise<
	GetStaticPropsResult<VersionProps & IBaseProps>
> {
	const languageRoute = params?.language || 'en';
	const languageId = getLanguageIdByRoute(languageRoute);
	const intl = await getIntl(languageId);
	const versionId = params?.version as string;
	const version = await getBible(versionId);
	const allVersions = await getVersions();

	if (!version) {
		return {
			notFound: true,
			revalidate: REVALIDATE_FAILURE,
		};
	}

	return {
		props: {
			version,
			versions: allVersions,
			title: intl.formatMessage({
				id: 'bible__title',
				defaultMessage: 'Bible',
			}),
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	const allVersions = await getVersions();
	return {
		paths: allVersions.map((v) => root.lang('en').bibles.versionId(v.id).get()),
		fallback: false,
	};
}
