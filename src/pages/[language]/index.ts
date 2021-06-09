import _ from 'lodash';

import Home from '@containers/home';
import { LANGUAGES, REVALIDATE } from '@lib/constants';
import {
	getHomeStaticProps,
	GetHomeStaticPropsQuery,
	Language,
} from '@lib/generated/graphql';

export default Home;

export interface HomeProps {
	data: GetHomeStaticPropsQuery | undefined;
	disableSidebar: true;
}

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
