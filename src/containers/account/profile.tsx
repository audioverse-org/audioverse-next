import React, { FormEvent, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

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
					id: 'profile__errorUnconfirmedPassword',
					defaultMessage: 'please type your new password twice',
					description: 'profile page unconfirmed password error',
				}),
			]);
			return;
		}

		if (password !== passwordConfirm) {
			setErrors([
				intl.formatMessage({
					id: 'profile__errorPasswordMismatch',
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

			<Input
				label={intl.formatMessage({
					id: 'profile__inputLabelForEmail',
					defaultMessage: 'email',
					description: 'input label for email',
				})}
				type={'email'}
				value={email}
				setValue={setEmail}
			/>

			<Input
				label={intl.formatMessage({
					id: 'profile__inputLabelForPassword',
					defaultMessage: 'password',
					description: 'input label for password',
				})}
				type={'password'}
				value={password}
				setValue={setPassword}
			/>

			<Input
				label={intl.formatMessage({
					id: 'profile__inputLabelForConfirmPassword',
					defaultMessage: 'confirm password',
					description: 'input label for confirm password',
				})}
				type={'password'}
				value={passwordConfirm}
				setValue={setPasswordConfirm}
			/>

			<Input
				label={intl.formatMessage({
					id: 'profile__inputLabelForFirstName',
					defaultMessage: 'first name',
					description: 'input label for first name',
				})}
				value={givenName}
				setValue={setGivenName}
			/>

			<Input
				label={intl.formatMessage({
					id: 'profile__inputLabelForLastName',
					defaultMessage: 'last name',
					description: 'input label for last name',
				})}
				value={surname}
				setValue={setSurname}
			/>

			<Input
				label={intl.formatMessage({
					id: 'profile__inputLabelForAddressLine1',
					defaultMessage: 'address line 1',
					description: 'input label for address line 1',
				})}
				value={address1}
				setValue={setAddress1}
			/>

			<Input
				label={intl.formatMessage({
					id: 'profile__inputLabelForAddressLine2',
					defaultMessage: 'address line 2',
					description: 'input label for address line 2',
				})}
				value={address2}
				setValue={setAddress2}
			/>

			<Input
				label={intl.formatMessage({
					id: 'profile__inputLabelForCity',
					defaultMessage: 'city',
					description: 'input label for city',
				})}
				value={city}
				setValue={setCity}
			/>

			<Input
				label={intl.formatMessage({
					id: 'profile__inputLabelForPostalCode',
					defaultMessage: 'postal code',
					description: 'input label for postal code',
				})}
				value={postalCode}
				setValue={setPostalCode}
			/>

			<Input
				label={intl.formatMessage({
					id: 'profile__inputLabelForProvince',
					defaultMessage: 'province',
					description: 'input label for province',
				})}
				value={province}
				setValue={setProvince}
			/>
			<Input
				label={intl.formatMessage({
					id: 'profile__inputLabelForCountry',
					defaultMessage: 'country',
					description: 'input label for country',
				})}
				value={country}
				setValue={setCountry}
			/>

			<button type={'submit'}>
				<FormattedMessage
					id={'profile__buttonLabelSave'}
					defaultMessage={'save'}
					description={'save button label'}
				/>
			</button>
		</form>
	);
}

export default withAuthGuard(Profile);
