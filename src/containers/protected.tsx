import React, { FormEvent, useState } from 'react';
import { useQueryClient } from 'react-query';

import { login } from '@lib/api';
import { useGetProtectedDataQuery } from '@lib/generated/graphql';

// TODO: use isLoading and error from react-query to avoid flashing login form
//  while query is loading
export default function Protected({
	children,
}: {
	children: JSX.Element;
}): JSX.Element {
	const queryClient = useQueryClient();
	const { data } = useGetProtectedDataQuery();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await login(email, password);
			await queryClient.invalidateQueries();
		} catch (e) {
			setError('Login failed');
		}
	};

	// TODO: Localize input placeholders
	const loginForm = (
		<form onSubmit={onSubmit} data-testid={'loginForm'}>
			{error ? <p>{error}</p> : null}

			<input
				placeholder={'email'}
				type={'email'}
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				placeholder={'password'}
				type={'password'}
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>

			<button type={'submit'}>login</button>
		</form>
	);

	return data?.me?.user.email ? children : loginForm;
}
