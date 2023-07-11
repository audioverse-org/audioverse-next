import { GetServerSidePropsContext } from 'next';

import Profile from '~containers/account/profile';
import { storeRequest } from '~lib/api/storeRequest';
import getDehydratedProps, { DehydratedProps } from '~lib/getDehydratedProps';
import { prefetchQueries } from '~src/__generated__/prefetch';

export default Profile;

export async function getServerSideProps({
	req,
}: GetServerSidePropsContext): Promise<DehydratedProps> {
	storeRequest(req);

	const client = await prefetchQueries({
		getProfileData: {},
	});

	return getDehydratedProps(client);
}
