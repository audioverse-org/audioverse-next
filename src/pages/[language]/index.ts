import _ from 'lodash';

import { IBaseProps } from '@containers/base';
import Home, { HomeProps } from '@containers/home';
import { LANGUAGES, REVALIDATE } from '@lib/constants';
import { getHomeStaticProps } from '@lib/generated/graphql';
import { getValidLanguage } from '@lib/getValidLanguage';

export default Home;

interface GetStaticPropsArgs {
	params: {
		language: string;
	};
}

export async function getStaticProps({
	params: { language },
}: GetStaticPropsArgs): Promise<StaticProps<HomeProps & IBaseProps>> {
	const langKey = getValidLanguage(language);
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
		fallback: false,
	};
}
