import _ from 'lodash';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

import { getMe, login } from '@lib/api';

export default function Profile(): JSX.Element {
	const { data: me } = useQuery('me', getMe);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const profileForm = (
		<form>
			<input value={_.get(me, 'givenName')} />
		</form>
	);

	const loginForm = (
		<form onSubmit={() => login(email, password)}>
			<input
				placeholder={'email'}
				type={'email'}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				placeholder={'password'}
				type={'password'}
				onChange={(e) => setPassword(e.target.value)}
			/>

			<button type={'submit'}>login</button>
		</form>
	);

	return me ? profileForm : loginForm;
}
