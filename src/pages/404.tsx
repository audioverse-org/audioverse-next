import { GetStaticPropsResult } from 'next';

import { getNotFoundPageData } from '~components/organisms/__generated__/notFound';
import NotFound, { NotFoundProps } from '~components/organisms/notFound';

export default NotFound;

export async function getStaticProps(): Promise<
	GetStaticPropsResult<NotFoundProps>
> {
	return { props: await getNotFoundPageData({}) };
}
