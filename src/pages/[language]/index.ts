import { IBaseProps } from '@containers/base';
import Home, { HomeProps } from '@containers/home';
import { REVALIDATE } from '@lib/constants';
import { getHomeStaticProps } from '@lib/generated/graphql';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';
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
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return {
		paths: getLanguageRoutes().map((base_url) => `/${base_url}`),
		fallback: false,
	};
}
