import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '@components/molecules/button';
import ButtonGuest from '@components/molecules/buttonGuest';
import Checkbox from '@components/molecules/form/checkbox';
import Input from '@components/molecules/form/input';
import SocialLogin from '@components/molecules/socialLogin';
import AndOnboarding from '@components/templates/andOnboarding';
import {
	useRegisterIsLoggedInQuery,
	useRegisterMutation,
} from '@lib/generated/graphql';
import { makeDiscoverRoute, makeLoginRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import styles from './register.module.scss';

function Register(): JSX.Element {
	const [errors, setErrors] = useState<string[]>([]);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [newsletter, setNewsletter] = useState(true);

	const { data: dataLoggedIn, isLoading: isLoadingLoggedIn } =
		useRegisterIsLoggedInQuery({}, { retry: false });

	const {
		mutate,
		isLoading,
		data: dataRegister,
		isSuccess,
	} = useRegisterMutation();

	const intl = useIntl();
	const languageRoute = useLanguageRoute();
	const router = useRouter();

	useEffect(() => {
		if (dataRegister?.signup.errors.length) {
			setErrors(dataRegister?.signup.errors.map((e) => e.message));
		}
	}, [dataRegister]);

	const onSubmit = (e: React.MouseEvent) => {
		e.preventDefault();
		const newErrors = [];
		if (!email.length) {
			newErrors.push('email is required');
		}
		setErrors(newErrors);
		if (!newErrors.length) {
			mutate({
				email,
				password,
				firstName,
				lastName,
			});
		}
	};

	let isLoadingDiscover = false;
	if (dataLoggedIn?.me?.user.email || (isSuccess && !errors.length)) {
		router.push(makeDiscoverRoute(languageRoute));
		isLoadingDiscover = true;
	}

	if (isLoading || isLoadingLoggedIn || isLoadingDiscover) {
		return (
			<p>
				<FormattedMessage
					id="register__loadingMessage"
					defaultMessage="loading..."
					description="register loading message"
				/>
			</p>
		);
	}

	return (
		<AndOnboarding>
			<SocialLogin isRegister />

			<form className={styles.form}>
				{/* TODO: show errors inline */}
				<ul>
					{errors.map((e) => (
						<li key={e}>{e}</li>
					))}
				</ul>

				<Input
					label={intl.formatMessage({
						id: 'register__firstNameLabel',
						defaultMessage: 'First name',
					})}
					placeholder={intl.formatMessage({
						id: 'register__firstNamePlaceholder',
						defaultMessage: 'Jane',
					})}
					type="text"
					value={firstName}
					setValue={setFirstName}
				/>
				<Input
					label={intl.formatMessage({
						id: 'register__lastNameLabel',
						defaultMessage: 'Last name',
					})}
					placeholder={intl.formatMessage({
						id: 'register__lastNamePlaceholder',
						defaultMessage: 'Doe',
					})}
					type="text"
					value={lastName}
					setValue={setLastName}
				/>
				<Input
					label={intl.formatMessage({
						id: 'register__emailLabel',
						defaultMessage: 'Email',
					})}
					placeholder={intl.formatMessage({
						id: 'register__emailPlaceholder',
						defaultMessage: 'jane@example.com',
					})}
					type="email"
					value={email}
					setValue={setEmail}
				/>
				<Input
					label={intl.formatMessage({
						id: 'register__passwordLabel',
						defaultMessage: 'Password',
					})}
					placeholder={intl.formatMessage({
						id: 'register__passwordPlaceholder',
						defaultMessage: '∗∗∗∗∗∗∗',
					})}
					type="password"
					value={password}
					setValue={setPassword}
				/>
				<Checkbox
					label={intl.formatMessage({
						id: 'register__newsletterSubscribe',
						defaultMessage: 'Subscribe to Newsletter',
					})}
					checked={newsletter}
					toggleChecked={() => setNewsletter(!newsletter)}
				/>

				<div className={styles.actions}>
					<Button
						type="super"
						onClick={onSubmit}
						text={
							<FormattedMessage
								id="register__submitButton"
								defaultMessage="Sign up"
							/>
						}
						centered
						className={styles.submit}
					/>
					<FormattedMessage
						id="register__loginIntro"
						defaultMessage="Already have an account?"
					/>
					<Button
						type="secondary"
						text={
							<FormattedMessage id="register__login" defaultMessage="Login" />
						}
						href={makeLoginRoute(languageRoute)}
						centered
						className={styles.login}
					/>
					<ButtonGuest className={styles.guestLink} />
				</div>
			</form>
		</AndOnboarding>
	);
}

export default Register;
