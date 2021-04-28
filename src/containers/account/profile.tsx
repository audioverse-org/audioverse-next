import React, { FormEvent, useEffect, useState } from 'react';

import withAuthGuard from '@components/HOCs/withAuthGuard';
import {
	useGetProfileDataQuery,
	useUpdateProfileDataMutation,
} from '@lib/generated/graphql';
import { useIntl } from 'react-intl';

function Profile(): JSX.Element {
	const { data = undefined } = useGetProfileDataQuery() || {};
	const [givenName, setGivenName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [errors, setErrors] = useState<string[]>([]);
	const { mutate } = useUpdateProfileDataMutation();
	const intl = useIntl();

	useEffect(() => {
		setGivenName(data?.me?.user?.givenName || '');
		setEmail(data?.me?.user.email || '');
	}, [data]);

	function submit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const isPassUnconfirmed = !password !== !passwordConfirm;

		if (isPassUnconfirmed) {
			setErrors([
				intl.formatMessage({
					id: 'profile__unconfirmedPasswordError',
					defaultMessage: 'please type your new password twice',
					description: 'profile page unconfirmed password error',
				}),
			]);
			return;
		}

		if (password !== passwordConfirm) {
			setErrors([
				intl.formatMessage({
					id: 'profile__passwordMismatchError',
					defaultMessage: 'passwords do not match',
					description: 'profile page password mismatch error',
				}),
			]);
			return;
		}

		return mutate({
			email,
			password: password || null,
		});
	}

	return (
		<form onSubmit={submit}>
			<ul>
				{errors.map((e) => (
					<li key={e}>{e}</li>
				))}
			</ul>

			<label>
				email{' '}
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</label>

			<label>
				password{' '}
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</label>

			<label>
				confirm password{' '}
				<input
					type="password"
					value={passwordConfirm}
					onChange={(e) => setPasswordConfirm(e.target.value)}
				/>
			</label>

			<input
				type={'text'}
				value={givenName}
				onChange={(e) => setGivenName(e.target.value)}
			/>

			<button type={'submit'}>save</button>
		</form>
	);
}

export default withAuthGuard(Profile);
