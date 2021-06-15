import { GetServerSidePropsContext } from 'next';

import Discover from '@containers/discover';
import { storeRequest } from '@lib/api';
import getDehydratedProps, { DehydratedProps } from '@lib/getDehydratedProps';

export default Discover;

export async function getServerSideProps({
	req,
}: GetServerSidePropsContext): Promise<DehydratedProps> {
	storeRequest(req);

	return getDehydratedProps([]);
}
