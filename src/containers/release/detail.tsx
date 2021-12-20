import React, { FormEvent, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Alert from '@components/atoms/alert';
import Heading1 from '@components/atoms/heading1';
import Heading2 from '@components/atoms/heading2';
import withFailStates from '@components/HOCs/withFailStates';
import Button from '@components/molecules/button';
import ContentWidthLimiter from '@components/molecules/contentWidthLimiter';
import Input from '@components/molecules/form/input';
import Textarea from '@components/molecules/form/textarea';
import {
	GetMediaReleaseFormsPageDataQuery,
	useSubmitMediaReleaseFormMutation,
} from '@lib/generated/graphql';

import styles from './detail.module.scss';

export type ReleaseDetailProps = GetMediaReleaseFormsPageDataQuery;

function ReleaseDetail({
	mediaReleaseForm,
}: Must<ReleaseDetailProps>): JSX.Element {
	const { isClosed, summary } = mediaReleaseForm;

	const [givenName, setGivenName] = useState('');
	const [surname, setSurname] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [address1, setAddress1] = useState('');
	const [address2, setAddress2] = useState('');
	const [city, setCity] = useState('');
	const [province, setProvince] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [country, setCountry] = useState('');
	const [comments, setComments] = useState('');

	const formFilled =
		givenName &&
		surname &&
		email &&
		address1 &&
		address2 &&
		city &&
		province &&
		postalCode &&
		country;

	const { mutate, isLoading, isSuccess } = useSubmitMediaReleaseFormMutation();

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!formFilled) {
			return;
		}
		mutate({
			mediaReleaseFormId: mediaReleaseForm.id,
			mediaReleasePerson: {
				address1,
				address2,
				city,
				country,
				email,
				givenName,
				phone,
				postalCode,
				province,
				surname,
			},
			comments,
		});
	};

	return (
		<>
			<Heading1>
				<FormattedMessage
					id="release__title"
					defaultMessage="Media Release Agreement"
				/>
			</Heading1>
			<ContentWidthLimiter>
				{isSuccess ? (
					<Alert>
						<Heading2>
							<FormattedMessage
								id="release__thankYou"
								defaultMessage="Thank you!"
							/>
						</Heading2>
						<p>
							<FormattedMessage
								id="release__messageSubmitted"
								defaultMessage="Your form has been submitted."
							/>
						</p>
					</Alert>
				) : (
					<>
						<div
							dangerouslySetInnerHTML={{ __html: summary }}
							className={styles.summary}
						/>
						{!isClosed && (
							<form className={styles.form} onSubmit={onSubmit}>
								<Input
									label="First name"
									value={givenName}
									setValue={setGivenName}
								/>
								<Input
									label="Last name"
									value={surname}
									setValue={setSurname}
								/>
								<Input
									label="Email"
									type="email"
									value={email}
									setValue={setEmail}
								/>
								<Input label="Phone Number" value={phone} setValue={setPhone} />
								<Input
									label="Address"
									value={address1}
									setValue={setAddress1}
								/>
								<Input
									label="Address 2"
									value={address2}
									setValue={setAddress2}
								/>
								<Input label="City" value={city} setValue={setCity} />
								<Input
									label="State / Province"
									value={province}
									setValue={setProvince}
								/>
								<Input
									label="Zip / Postal Code"
									value={postalCode}
									setValue={setPostalCode}
								/>
								<Input label="Country" value={country} setValue={setCountry} />
								<Textarea
									label="Comments"
									value={comments}
									setValue={setComments}
								/>
								<Button
									type="super"
									text="Submit"
									onClick={onSubmit}
									disabled={!formFilled || isLoading}
								/>
							</form>
						)}
					</>
				)}
			</ContentWidthLimiter>
		</>
	);
}

export default withFailStates(
	ReleaseDetail,
	({ mediaReleaseForm }) => !mediaReleaseForm
);
