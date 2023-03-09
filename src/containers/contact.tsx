import React, { FormEvent, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Alert from '@components/atoms/alert';
import Heading1 from '@components/atoms/heading1';
import Heading2 from '@components/atoms/heading2';
import Button from '@components/molecules/button';
import ContentWidthLimiter from '@components/molecules/contentWidthLimiter';
import Input from '@components/molecules/form/input';
import Select from '@components/molecules/form/select';
import Textarea from '@components/molecules/form/textarea';
import {
	PageContactRecipient,
	useSubmitContactPageMutation,
} from '@lib/generated/graphql';
import { useLanguageId } from '@lib/useLanguageId';
import Link from 'next/link';

import styles from './contact.module.scss';

export type ContactProps = {
	type: string;
};

export default function Contact({ type }: Must<ContactProps>): JSX.Element {
	const intl = useIntl();
	const language = useLanguageId();

	const [recipient, setRecipient] = useState<string>(
		PageContactRecipient.General
	);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [body, setBody] = useState('');

	const { mutate, isLoading, isSuccess, reset } =
		useSubmitContactPageMutation();

	useEffect(() => {
		setRecipient(
			{
				general: PageContactRecipient.General,
				support: PageContactRecipient.Technical,
				testimonies: PageContactRecipient.Testimony,
			}[type] || PageContactRecipient.General
		);
		reset();
	}, [type, reset]);

	const formFilled = firstName && lastName && email && body;

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!formFilled) {
			return;
		}
		mutate({
			language,
			recipient: recipient as PageContactRecipient,
			email,
			firstName,
			lastName,
			body,
		});
	};

	if (isSuccess) {
		return (
			<>
				<Heading1>
					<FormattedMessage id="contact__title" defaultMessage="Contact" />
				</Heading1>
				<ContentWidthLimiter>
					<Alert className={styles.successAlert}>
						<Heading2 className={styles.successHeading}>
							<FormattedMessage
								id="contact__thankYou"
								defaultMessage="Thank you!"
							/>
						</Heading2>
						<p className={styles.successCopy}>
							<FormattedMessage
								id="contact__messageSubmitted"
								defaultMessage="Your message has been submitted."
							/>
						</p>
					</Alert>
				</ContentWidthLimiter>
			</>
		);
	}

	return (
		<>
			<Heading1>
				<FormattedMessage id="contact__title" defaultMessage="Contact" />
			</Heading1>
			<p className={styles.intro}>
				<FormattedMessage
					id="contact__intro"
					defaultMessage="We love to hear from our users, even if it’s about technical issues! The feedback you give us encourages to keep up the work and helps us improve things for everyone else. If you’d like to get in touch with us, use the form below or write us at our mailing address. We’ll get back with you as quickly as possible."
				/>
			</p>
			<p>
				<FormattedMessage
					id="contact__mailingAddress"
					defaultMessage="AudioVerse{br}PO Box 2288{br}Collegedale, TN 37315-2288{br}USA"
					values={{
						br: <br />,
					}}
				/>
			</p>
			<p className={styles.intro}>
				<Link href="https://help.audioverse.org/" legacyBehavior>
					<a className="decorated" target="_blank">
						<FormattedMessage
							id="contact__help"
							defaultMessage="View help articles"
						/>
					</a>
				</Link>
			</p>
			<ContentWidthLimiter>
				<form onSubmit={onSubmit} className={styles.form}>
					<div className={styles.padded}>
						<Select
							label={intl.formatMessage({
								id: 'contact__recipient',
								defaultMessage: 'Contact Type',
							})}
							value={recipient}
							setValue={(v) => {
								reset();
								setRecipient(v);
							}}
							options={[
								{
									label: intl.formatMessage({
										id: 'contact__recipient-general',
										defaultMessage: 'General Contact',
									}),
									value: PageContactRecipient.General,
								},
								{
									label: intl.formatMessage({
										id: 'contact__recipient-technical',
										defaultMessage: 'Request Support',
									}),
									value: PageContactRecipient.Technical,
								},
								{
									label: intl.formatMessage({
										id: 'contact__recipient-testimonials',
										defaultMessage: 'Share Testimonial',
									}),
									value: PageContactRecipient.Testimony,
								},
							]}
						/>
					</div>
					<div className={styles.columns}>
						<div>
							<div className={styles.padded}>
								<Input
									label={intl.formatMessage({
										id: 'contact__firstNameLabel',
										defaultMessage: 'First name',
									})}
									placeholder={intl.formatMessage({
										id: 'contact__firstNamePlaceholder',
										defaultMessage: 'Jane',
									})}
									type="text"
									value={firstName}
									setValue={setFirstName}
								/>
							</div>
							<div className={styles.padded}>
								<Input
									label={intl.formatMessage({
										id: 'contact__lastNameLabel',
										defaultMessage: 'Last name',
									})}
									placeholder={intl.formatMessage({
										id: 'contact__lastNamePlaceholder',
										defaultMessage: 'Doe',
									})}
									type="text"
									value={lastName}
									setValue={setLastName}
								/>
							</div>
							<div className={styles.padded}>
								<Input
									label={intl.formatMessage({
										id: 'contact__emailLabel',
										defaultMessage: 'Email address',
									})}
									placeholder={intl.formatMessage({
										id: 'contact__emailPlaceholder',
										defaultMessage: 'jane@example.com',
									})}
									type="email"
									value={email}
									setValue={setEmail}
								/>
							</div>
						</div>
						<div>
							<Textarea
								label={intl.formatMessage({
									id: 'contact__messageLabel',
									defaultMessage: 'Message',
								})}
								value={body}
								setValue={setBody}
							/>
						</div>
					</div>
					<div className={styles.actions}>
						<Button
							type="super"
							onClick={onSubmit}
							text={
								<FormattedMessage
									id="contact__submitLabel"
									defaultMessage="Submit"
								/>
							}
							centered
							className={styles.submit}
							disabled={!formFilled || isLoading}
						/>
					</div>
				</form>
			</ContentWidthLimiter>
		</>
	);
}
