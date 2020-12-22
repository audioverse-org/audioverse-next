import _ from 'lodash';
import React from 'react';
import { useQuery } from 'react-query';

import Protected from '@containers/protected';
import { getMe } from '@lib/api';

export default function Profile(): JSX.Element {
	const { data: me } = useQuery('me', getMe);

	return (
		<Protected>
			<form>
				<input value={_.get(me, 'givenName')} />
			</form>
		</Protected>
	);
}
