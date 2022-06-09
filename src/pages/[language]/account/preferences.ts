import { GetServerSidePropsContext } from 'next';

import Preferences from '@containers/account/preferences';
import { getAccountPreferencesData } from '@containers/account/preferences.gql';
import { storeRequest } from '@lib/api/storeRequest';
import getDehydratedProps, { DehydratedProps } from '@lib/getDehydratedProps';

export default Preferences;

export async function getServerSideProps({
	req,
}: GetServerSidePropsContext): Promise<DehydratedProps> {
	storeRequest(req);

	return getDehydratedProps([
		['getAccountPreferencesData', () => getAccountPreferencesData({})],
	]);
}
