import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import Version, { VersionProps } from '@containers/bible/version';
import { getBible, getBibles } from '@lib/api/bibleBrain';
import { LANGUAGES, REVALIDATE } from '@lib/constants';
import { makeBibleVersionRoute } from '@lib/routes';

export default Version;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ id: string }>): Promise<
	GetStaticPropsResult<VersionProps>
> {
	const version = await getBible(params?.id || '').catch((e) => {
		console.log(e);
		return null;
	});
	if (!version) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			version,
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	const response = await getBibles();
	return {
		paths: (response || []).map(({ id }) =>
			makeBibleVersionRoute(LANGUAGES.ENGLISH.base_url, id)
		),
		fallback: false,
	};
}
