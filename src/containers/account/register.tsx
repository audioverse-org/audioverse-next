import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '@components/molecules/button';
import Input from '@components/molecules/input';
import SocialLogin from '@components/molecules/socialLogin';
import Modal from '@components/organisms/modal';
import AndOnboarding from '@components/templates/andOnboarding';
import {
	useRegisterIsLoggedInQuery,
	useRegisterMutation,
} from '@lib/generated/graphql';
import { makeLoginRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import styles from './register.module.scss';

function Register(): JSX.Element {
	const [errors, setErrors] = useState<string[]>([]);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [newsletter, setNewsletter] = useState(true);
	const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);

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

	useEffect(() => {
		if (dataRegister?.signup.errors.length) {
			setErrors(dataRegister?.signup.errors.map((e) => e.message));
		}
	}, [dataRegister]);

	const onSubmit = () => {
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

	if (isLoading || isLoadingLoggedIn) {
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

	if (dataLoggedIn?.me?.user.email) {
		return <p>You are already logged in</p>;
	}

	if (isSuccess && !errors.length) {
		// TODO: Consider doing a redirect.
		return (
			<p>
				<FormattedMessage
					id="register__successMessage"
					defaultMessage="success"
					description="register success message"
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
						defaultMessage: '*******',
					})}
					type="password"
					value={password}
					setValue={setPassword}
				/>
				<label className={styles.checkboxLabel}>
					<input
						type="checkbox"
						className={styles.checkbox}
						checked={newsletter}
						onChange={() => setNewsletter(!newsletter)}
					/>
					<FormattedMessage
						id="register__newsletterSubscribe"
						defaultMessage="Subscribe to Newsletter"
					/>
				</label>

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
				</div>
			</form>
			<a className="decorated" onClick={() => setIsGuestModalOpen(true)}>
				Continue as guest
			</a>
			<Modal
				open={isGuestModalOpen}
				onClose={() => setIsGuestModalOpen(false)}
				title={'Continue as guest?'}
			>
				Content
			</Modal>
		</AndOnboarding>
	);
}

export default Register;
