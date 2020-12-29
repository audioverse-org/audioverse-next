import React, { FormEvent, useState } from 'react';
import { useQueryClient } from 'react-query';

import { login } from '@lib/api';
import { useMe } from '@lib/api/useMe';

export default function Protected({
	children,
}: {
	children: JSX.Element;
}): JSX.Element {
	const queryClient = useQueryClient();
	const me = useMe();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await login(email, password);
			await queryClient.invalidateQueries('me');
		} catch (e) {
			setError('Login failed');
		}
	};

	const loginForm = (
		<form onSubmit={onSubmit} data-testid={'loginForm'}>
			{error ? <p>{error}</p> : null}

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

	return me ? children : loginForm;
}
