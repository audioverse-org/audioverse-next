import React, { FormEvent, useState } from 'react';
import { useQueryClient } from 'react-query';

import SocialLogin from '@components/molecules/socialLogin';
import { login } from '@lib/api';
import { useGetWithAuthGuardDataQuery } from '@lib/generated/graphql';

function withAuthGuard<P>(
	Component: React.ComponentType<P>
): React.ComponentType<P> {
	return (props: P) => {
		const queryClient = useQueryClient();
		const { data, refetch } = useGetWithAuthGuardDataQuery(
			{},
			{ retry: false }
		);
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
		const form = (
			<>
				<SocialLogin onSuccess={refetch} />
				<p>or</p>
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
			</>
		);

		const isUserLoggedIn = !!data?.me?.user.email;

		if (!isUserLoggedIn) {
			return form;
		}

		return <Component {...props} />;
	};
}

export default withAuthGuard;
