import { GetServerSidePropsContext } from 'next';

import Profile from '@containers/profile';
import { storeRequest } from '@lib/api/fetchApi';
import { getProfileData } from '@lib/generated/graphql';
import getDehydratedProps, { DehydratedProps } from '@lib/getDehydratedProps';

export default Profile;

export async function getServerSideProps({
	req,
}: GetServerSidePropsContext): Promise<DehydratedProps> {
	storeRequest(req);

	return getDehydratedProps([['getProfileData', () => getProfileData({})]]);
}
