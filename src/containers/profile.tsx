import React, { useEffect, useState } from 'react';

import Protected from '@containers/protected';
import { useMe } from '@lib/api/useMe';

export default function Profile(): JSX.Element {
	const me = useMe();
	const [givenName, setGivenName] = useState('');

	useEffect(() => {
		const { givenName = '' } = me || {};

		setGivenName(givenName);
	}, [me]);

	// TODO: make sure givenName doesn't get populated with email on login (why??)
	// TODO: fix err: "A component is changing an uncontrolled input of type text to be controlled."
	return (
		<Protected>
			<form>
				<input
					type={'text'}
					value={givenName}
					onChange={(e) => setGivenName(e.target.value)}
				/>
			</form>
		</Protected>
	);
}
