import { GetStaticPathsResult, GetStaticPropsResult } from 'next';

import Versions, { VersionsProps } from '@containers/bible/versions';
import { getBibles } from '@lib/api/bibleBrain';
import { LANGUAGES, REVALIDATE } from '@lib/constants';
import { makeBibleListRoute } from '@lib/routes';

export default Versions;

export async function getStaticProps(): Promise<
	GetStaticPropsResult<VersionsProps>
> {
	const response = await getBibles().catch((e) => {
		console.log(e);
		return null;
	});

	return {
		props: {
			versions: response || [],
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return {
		paths: [makeBibleListRoute(LANGUAGES.ENGLISH.base_url)],
		fallback: false,
	};
}
