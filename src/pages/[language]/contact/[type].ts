import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import Contact, { ContactProps } from '@containers/contact';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';
import { makeContactRoute, makeTestimonySubmitRoute } from '@lib/routes';

export default Contact;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string; type: string }>): Promise<
	GetStaticPropsResult<ContactProps>
> {
	return {
		props: {
			type: params?.type as string,
		},
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return {
		paths: getLanguageRoutes()
			.map((base_url) => [
				makeContactRoute(base_url, '/general'),
				makeContactRoute(base_url, '/support'),
				makeTestimonySubmitRoute(base_url),
			])
			.flat(),
		fallback: false,
	};
}
