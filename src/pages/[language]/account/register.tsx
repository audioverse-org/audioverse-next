import { GetServerSidePropsResult } from 'next';

import Register from '@containers/account/register';

export default Register;

export async function getServerSideProps(): Promise<
	GetServerSidePropsResult<any>
> {
	return {
		props: {},
	};
}
