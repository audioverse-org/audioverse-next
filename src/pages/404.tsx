import { GetStaticPropsResult } from 'next';

import NotFound, { NotFoundProps } from '@components/organisms/notFound';
import { getNotFoundPageData } from '@components/organisms/notFound.gql';

export default NotFound;

export async function getStaticProps(): Promise<
	GetStaticPropsResult<NotFoundProps>
> {
	return { props: await getNotFoundPageData({}) };
}
