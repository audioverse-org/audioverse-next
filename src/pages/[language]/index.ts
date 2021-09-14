import _ from 'lodash';

import Home, { HomeProps } from '@containers/home';
import { LANGUAGES, REVALIDATE } from '@lib/constants';
import { getHomeStaticProps, Language } from '@lib/generated/graphql';

export default Home;

interface GetStaticPropsArgs {
	params: {
		language: string;
	};
}

export async function getStaticProps({
	params: { language },
}: GetStaticPropsArgs): Promise<
	StaticProps<HomeProps & { disableSidebar: true }>
> {
	const langKey = _.findKey(
		LANGUAGES,
		(l) => l.base_url === language
	) as Language;

	if (!langKey) throw Error('Missing or invalid language');

	// TODO: try/catch errors to ensure proper 404 page is displayed
	const data = await getHomeStaticProps({ language: langKey });

	return {
		props: {
			data,
			disableSidebar: true,
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return {
		paths: _.values(LANGUAGES).map((l) => `/${l.base_url}`),
		fallback: true,
	};
}
