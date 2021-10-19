import { GetServerSidePropsContext } from 'next';

import Preferences from '@containers/account/preferences';
import { storeRequest } from '@lib/api';
import { getAccountPreferencesData } from '@lib/generated/graphql';
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
