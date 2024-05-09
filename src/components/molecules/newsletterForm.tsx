import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '~components/molecules/button';
import Input from '~components/molecules/form/input';
import IconBell from '~public/img/icons/fa-bell.svg';

import Checkbox from './form/checkbox';
import styles from './newsletterForm.module.scss';

export default function NewsletterForm(): JSX.Element {
	const intl = useIntl();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [checkboxNewsLetter, setCheckboxNewsLetter] = useState(true);
	const [checkboxWeeklyPics, setCheckboxWeeklyPics] = useState(true);

	return (
		<div className={styles.newsletterBox}>
			<div className={styles.newsletterHat}>
				<IconBell />
				<FormattedMessage
					id="newsLetterForm__newsletterHatTitle"
					defaultMessage="Sign up for our Emails"
				/>
			</div>
			<form
				className={styles.newsletterBody}
				action="https://audioverse.activehosted.com/proc.php"
				method="POST"
				target="_blank"
			>
				<input type="hidden" name="u" value="9" />
				<input type="hidden" name="f" value="9" />
				<input type="hidden" name="s" />
				<input type="hidden" name="c" value="0" />
				<input type="hidden" name="m" value="0" />
				<input type="hidden" name="act" value="sub" />
				<input type="hidden" name="v" value="2" />
				<input
					type="hidden"
					name="or"
					value="4ad861e6140a3e600c0c689a2a120a0f"
				/>
				<input type="hidden" name="ls" id="ls" value="1" />
				<div className={styles.newsletterFieldRow}>
					<Input
						name="fullname"
						type="text"
						label={
							<FormattedMessage
								id="newsLetterForm__newsletterName"
								defaultMessage="Name"
							/>
						}
						placeholder={intl.formatMessage({
							id: 'newsLetterForm__newsletterNamePlaceholder',
							defaultMessage: 'Joseph Bates',
						})}
						value={name}
						setValue={setName}
					/>
					<Input
						name="email"
						type="text"
						label={
							<FormattedMessage
								id="newsLetterForm__newsletterEmail"
								defaultMessage="Email Address"
							/>
						}
						placeholder={intl.formatMessage({
							id: 'newsLetterForm__newsletterEmailPlaceholder',
							defaultMessage: 'josephbates@email.com',
						})}
						value={email}
						setValue={setEmail}
					/>
				</div>
				<div>
					<Checkbox
						label={
							<FormattedMessage
								id="newsLetterForm__checkboxNewsletter"
								defaultMessage="Newsletter typically about once a month"
							/>
						}
						checked={checkboxNewsLetter}
						toggleChecked={() => setCheckboxNewsLetter((v) => !v)}
						value="2"
						name="nlbox[]"
					/>
					<Checkbox
						label={
							<FormattedMessage
								id="newsLetterForm__checkboxWeeklyPics"
								defaultMessage="Weekly Picks goes out every Monday"
							/>
						}
						checked={checkboxWeeklyPics}
						toggleChecked={() => setCheckboxWeeklyPics((v) => !v)}
						value="19"
						name="nlbox[]"
					/>
				</div>
				<Button
					type="secondary"
					text={
						<FormattedMessage
							id="newsLetterForm__newsletterSubscribe"
							defaultMessage="Subscribe"
						/>
					}
				/>
			</form>
		</div>
	);
}
