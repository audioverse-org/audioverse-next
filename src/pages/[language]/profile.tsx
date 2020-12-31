import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { QueryClient } from 'react-query';
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

	const queryClient = new QueryClient();

	// TODO: provide getMe with languageId
	await queryClient.prefetchQuery('me', () => {
		return getMe();
	});

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
}
