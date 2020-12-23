import _ from 'lodash';
import React from 'react';

import Protected from '@containers/protected';
import { useMe } from '@lib/api/useMe';

export default function Profile(): JSX.Element {
	const me = useMe();

	// TODO: make sure givenName doesn't get populated with email on login (why??)
	return (
		<Protected>
			<form>
				<input value={_.get(me, 'givenName')} />
			</form>
		</Protected>
	);
}
