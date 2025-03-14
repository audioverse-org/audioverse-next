import { GetServerSidePropsContext } from 'next';

import Account from '~containers/account/index';
import { storeRequest } from '~lib/api/storeRequest';
import getDehydratedProps, { DehydratedProps } from '~lib/getDehydratedProps';
import { prefetchQueries } from '~src/lib/prefetchQueries';

export default Account;

export async function getServerSideProps({
	req,
}: GetServerSidePropsContext): Promise<DehydratedProps> {
	storeRequest(req);

	const client = await prefetchQueries({
		getProfileData: {},
		getAccountPreferencesData: {},
	});

	return getDehydratedProps(client);
}
