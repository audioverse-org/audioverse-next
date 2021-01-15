import _ from 'lodash';

import Home, { HomeProps } from '@containers/home';
import { LANGUAGES } from '@lib/constants';
import { getHomeStaticProps, Language } from '@lib/generated/graphql';

export default Home;

interface StaticProps {
	props: HomeProps;
	revalidate: number;
}

interface GetStaticPropsArgs {
	params: {
		language: string;
	};
}

export async function getStaticProps({
	params,
}: GetStaticPropsArgs): Promise<StaticProps> {
	const language = _.get(params, 'language'),
		langKey = _.findKey(LANGUAGES, (l) => l.base_url === language) as Language;

	if (!langKey) throw Error('Missing or invalid language');

	const result = await getHomeStaticProps({ language: langKey });
	const nodes = result?.sermons?.nodes || [];

	return {
		props: {
			sermons: nodes,
		},
		revalidate: 10,
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return {
		paths: _.values(LANGUAGES).map((l) => `/${l.base_url}`),
		fallback: true,
	};
}
