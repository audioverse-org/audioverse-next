// import fs from 'fs';
import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '~containers/base';
import { REVALIDATE } from '~lib/constants';
import root from '~lib/routes';
import Version, { VersionProps } from '~src/containers/bible/version';
import getIntl from '~src/lib/getIntl';
import { getLanguageIdByRoute } from '~src/lib/getLanguageIdByRoute';
import getVersions from '~src/services/bibles/getVersions';

export default Version;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string; version: string }>): Promise<
	GetStaticPropsResult<VersionProps & IBaseProps>
> {
	const languageRoute = params?.language || 'en';
	const languageId = getLanguageIdByRoute(languageRoute);
	const intl = await getIntl(languageId);
	const versionId = params?.version as string;

	return {
		props: {
			versionId,
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
