import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { QueryClient } from 'react-query';
import { dehydrate, DehydratedState } from 'react-query/hydration';

import Profile from '@containers/profile';
import { storeRequest } from '@lib/api/fetchApi';
import { getProfileData } from '@lib/generated/graphql';

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

	await queryClient.prefetchQuery('getProfileData', () => {
		return getProfileData({});
	});

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
}
