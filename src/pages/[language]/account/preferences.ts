import { GetServerSidePropsContext } from 'next';

import Preferences from '~containers/account/preferences';
import { storeRequest } from '~lib/api/storeRequest';
import getDehydratedProps, { DehydratedProps } from '~lib/getDehydratedProps';
import { prefetchQueries } from '~src/__generated__/prefetch';

export default Preferences;

export async function getServerSideProps({
	req,
}: GetServerSidePropsContext): Promise<DehydratedProps> {
	storeRequest(req);

	const client = await prefetchQueries({
		getAccountPreferencesData: {},
	});

	return getDehydratedProps(client);
}
