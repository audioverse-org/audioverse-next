import React, { useEffect, useState } from 'react';

import Protected from '@containers/protected';
import { useGetProfileDataQuery } from '@lib/generated/graphql';

export default function Profile(): JSX.Element {
	const { data = undefined } = useGetProfileDataQuery() || {};
	const [givenName, setGivenName] = useState('');

	useEffect(() => {
		setGivenName(data?.me?.user?.givenName || '');
	}, [data]);

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
