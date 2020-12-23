import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { QueryCache } from 'react-query';
import { dehydrate, DehydratedState } from 'react-query/hydration';

import Profile from '@containers/profile';
import { getMe } from '@lib/api';
import { storeRequest } from '@lib/api/fetchApi';

export default Profile;

interface ServerSideProps {
	dehydratedState: DehydratedState;
}

export async function getServerSideProps({
	req,
}: GetServerSidePropsContext): Promise<
	GetServerSidePropsResult<ServerSideProps>
> {
	storeRequest(req);

	const queryCache = new QueryCache();

	// TODO: provide getMe with languageId
	await queryCache.prefetchQuery('me', getMe);

	return {
		props: {
			dehydratedState: dehydrate(queryCache),
		},
	};
}
