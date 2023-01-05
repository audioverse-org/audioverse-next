import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '@/containers/base';
import Contact, { ContactProps } from '@/containers/contact';
import getIntl from '@/lib/getIntl';
import { getLanguageIdByRoute } from '@/lib/getLanguageIdByRoute';
import { getLanguageRoutes } from '@/lib/getLanguageRoutes';
import { makeContactRoute, makeTestimonySubmitRoute } from '@/lib/routes';

export default Contact;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string; type: string }>): Promise<
	GetStaticPropsResult<ContactProps & IBaseProps>
> {
	const intl = await getIntl(getLanguageIdByRoute(params?.language));
	return {
		props: {
			type: params?.type as string,
			title: intl.formatMessage({
				id: 'contact__title',
				defaultMessage: 'Contact',
			}),
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
