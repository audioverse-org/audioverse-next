import React, { useEffect, useState } from 'react';

import withAuthGuard from '@components/HOCs/withAuthGuard';
import { useGetProfileDataQuery } from '@lib/generated/graphql';

function Profile(): JSX.Element {
	const { data = undefined } = useGetProfileDataQuery() || {};
	const [givenName, setGivenName] = useState('');

	useEffect(() => {
		setGivenName(data?.me?.user?.givenName || '');
	}, [data]);

	// TODO: make sure givenName doesn't get populated with email on login (why??)
	// TODO: fix err: "A component is changing an uncontrolled input of type text to be controlled."
	return (
		<form>
			<input
				type={'text'}
				value={givenName}
				onChange={(e) => setGivenName(e.target.value)}
			/>
		</form>
	);
}

export default withAuthGuard(Profile);
