import { IncomingMessage } from 'http';

import { QueryCache } from 'react-query';
import { dehydrate, DehydratedState } from 'react-query/hydration';

import Profile from '@containers/profile';
import { getMe } from '@lib/api';
import { storeRequest } from '@lib/api/fetchApi';

export default Profile;

interface ServerSideProps {
	props: {
		dehydratedState: DehydratedState;
	};
}

export async function getServerSideProps({
	req,
}: {
	req: IncomingMessage;
}): Promise<ServerSideProps> {
	storeRequest(req);

	const queryCache = new QueryCache();

	await queryCache.prefetchQuery('me', getMe);

	return {
		props: {
			dehydratedState: dehydrate(queryCache),
		},
	};
}
