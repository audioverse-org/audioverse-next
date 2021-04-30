import React, { FormEvent, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import withAuthGuard from '@components/HOCs/withAuthGuard';
import Input from '@components/molecules/input';
import {
	useGetProfileDataQuery,
	useUpdateProfileDataMutation,
} from '@lib/generated/graphql';

function Profile(): JSX.Element {
	const { data } = useGetProfileDataQuery() || {};

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [givenName, setGivenName] = useState('');
	const [surname, setSurname] = useState('');
	const [address1, setAddress1] = useState('');
	const [address2, setAddress2] = useState('');
	const [city, setCity] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [province, setProvince] = useState('');
	const [country, setCountry] = useState('');

	const [errors, setErrors] = useState<string[]>([]);

	const { mutate, data: updatedData } = useUpdateProfileDataMutation();
	const intl = useIntl();

	useEffect(() => {
		// TODO: This line prevents re-fetched data from ever being displayed
		//   after the form has been saved. Fix?
		const d =
			updatedData?.updateMyProfile?.authenticatedUser?.user || data?.me?.user;

		setEmail(d?.email || '');
		setGivenName(d?.givenName || '');
		setSurname(d?.surname || '');
		setAddress1(d?.address1 || '');
		setAddress2(d?.address2 || '');
		setCity(d?.city || '');
		setPostalCode(d?.postalCode || '');
		setProvince(d?.province || '');
		setCountry(d?.country || '');
	}, [data, updatedData]);

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
			givenName,
			surname,
			address1,
			address2,
			city,
			province,
			postalCode,
			country,
		});
	}

	return (
		<form onSubmit={submit}>
			<ul>
				{errors.map((e) => (
					<li key={e}>{e}</li>
				))}
			</ul>

			<Input label={'email'} type={'email'} value={email} setValue={setEmail} />

			<Input
				label={'password'}
				type={'password'}
				value={password}
				setValue={setPassword}
			/>

			<Input
				label={'confirm password'}
				type={'password'}
				value={passwordConfirm}
				setValue={setPasswordConfirm}
			/>

			<Input label={'first name'} value={givenName} setValue={setGivenName} />

			<Input label={'last name'} value={surname} setValue={setSurname} />

			<Input label={'address line 1'} value={address1} setValue={setAddress1} />

			<Input label={'address line 2'} value={address2} setValue={setAddress2} />

			<Input label={'city'} value={city} setValue={setCity} />

			<Input
				label={'postal code'}
				value={postalCode}
				setValue={setPostalCode}
			/>

			<Input label={'province'} value={province} setValue={setProvince} />
			<Input label={'country'} value={country} setValue={setCountry} />

			<button type={'submit'}>save</button>
		</form>
	);
}

export default withAuthGuard(Profile);
