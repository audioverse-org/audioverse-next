import { QueryCache } from 'react-query';
import { dehydrate, DehydratedState } from 'react-query/hydration';

import Profile from '@containers/profile';
import { getMe } from '@lib/api';

export default Profile;

interface StaticProps {
	dehydratedState: DehydratedState;
}

export async function getServerProps(): Promise<StaticProps> {
	const queryCache = new QueryCache();

	await queryCache.prefetchQuery('me', getMe);

	return {
		dehydratedState: dehydrate(queryCache),
	};
}
