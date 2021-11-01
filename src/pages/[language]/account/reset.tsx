import { GetServerSidePropsResult } from 'next';

import Reset from '@containers/account/reset';
import { IBaseProps } from '@containers/base';

export default Reset;

export async function getServerSideProps(): Promise<
	GetServerSidePropsResult<IBaseProps>
> {
	return {
		props: {
			disableSidebar: true,
		},
	};
}
