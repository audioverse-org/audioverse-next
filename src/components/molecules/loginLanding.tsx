import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import AndOnboarding from '~components/templates/andOnboarding';
import root from '~src/lib/routes';
import useLanguageRoute from '~src/lib/useLanguageRoute';

import Button from './buttonSocial';
import SocialLogin from './socialLogin';
import styles from './socialLogin.module.scss';

export default function Login(): JSX.Element {
	const languageRoute = useLanguageRoute();
	const intl = useIntl();
	const router = useRouter();
	return (
		<AndOnboarding>
			<SocialLogin
				onSuccess={() => {
					router.push(root.lang(languageRoute).discover.get());
				}}
			/>
			<div className={styles.buttonColLanding}>
				<p className={styles.centerTxt}>
					{intl.formatMessage({
						id: 'socialLogin__loginOr',
						defaultMessage: 'Or',
					})}
				</p>
				<Button
					href={root.lang(languageRoute).account.register.get({
						params: {
							back: router.asPath,
						},
					})}
					className={styles.centerText}
					type="secondary"
					text={
						<FormattedMessage
							id="molecule-button-SignUp"
							defaultMessage="Sign Up with Email"
						/>
					}
				/>

				<p className={styles.centerText}>
					{intl.formatMessage({
						id: 'regularLogin__login',
						defaultMessage: 'Already have an account? ',
					})}
					<Link
						href={root.lang(languageRoute).account.login.get({
							params: {
								back: router.asPath,
							},
						})}
						legacyBehavior
					>
						<a className={styles.loginText}>
							{intl.formatMessage({
								id: 'regularLogin__loginTxt',
								defaultMessage: 'Log In',
							})}
						</a>
					</Link>
				</p>
			</div>
		</AndOnboarding>
	);
}
