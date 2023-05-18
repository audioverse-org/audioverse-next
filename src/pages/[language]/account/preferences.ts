import { GetServerSidePropsContext } from 'next';

import { prefetchQueries } from '~containers/account/__generated__/preferences';
import Preferences from '~containers/account/preferences';
import { storeRequest } from '~lib/api/storeRequest';
import getDehydratedProps, { DehydratedProps } from '~lib/getDehydratedProps';

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
