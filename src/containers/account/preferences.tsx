import capitalize from 'lodash/capitalize';
import React, { FormEvent, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useQueryClient } from 'react-query';

import Heading1 from '@components/atoms/heading1';
import Heading2 from '@components/atoms/heading2';
import Heading3 from '@components/atoms/heading3';
import withAuthGuard from '@components/HOCs/withAuthGuard';
import Button from '@components/molecules/button';
import Checkbox from '@components/molecules/form/checkbox';
import Select from '@components/molecules/form/select';
import AccountNav from '@components/organisms/accountNav';
import { Language, RecordingQuality, Timezone } from '@lib/generated/graphql';

import {
	useGetAccountPreferencesDataQuery,
	useUpdateAccountPreferencesMutation,
} from './preferences.generated';
import styles from './preferences.module.scss';

function Profile(): JSX.Element {
	const queryClient = useQueryClient();
	const { data } = useGetAccountPreferencesDataQuery() || {};

	const [autoplay, setAutoplay] = useState(false);
	const [language, setLanguage] = useState<string>(Language.English);
	const [preferredAudioQuality, setPreferredAudioQuality] = useState<string>(
		RecordingQuality.Low
	);
	const [timezone, setTimezone] = useState<string>(Timezone.AmericaNewYork);

	const { mutate } = useUpdateAccountPreferencesMutation({
		onSuccess: () =>
			queryClient.invalidateQueries(['getAccountPreferencesData']),
	});
	const intl = useIntl();

	useEffect(() => {
		const d = data?.me?.user;
		if (!d) {
			return;
		}

		setAutoplay(d.autoplay);
		setLanguage(d.language);
		setPreferredAudioQuality(d.preferredAudioQuality);
		setTimezone(d.timezone);
	}, [data]);

	function submit(e?: FormEvent<HTMLFormElement>) {
		e?.preventDefault();

		return mutate({
			language: language as Language,
			preferredAudioQuality: preferredAudioQuality as RecordingQuality,
			timezone: timezone as Timezone,
			autoplay,
		});
	}

	const languageMap: { [K in Language]: string } = {
		[Language.Chinese]: '中文',
		[Language.English]: 'English',
		[Language.French]: 'Français',
		[Language.German]: 'Deutsch',
		[Language.Japanese]: '日本語',
		[Language.Nordic]: 'Nordic',
		[Language.Russian]: 'Русский',
		[Language.Spanish]: 'Español',
	};

	return (
		<>
			<Heading1>
				<FormattedMessage
					id="preferences__heading"
					defaultMessage="Account Settings"
				/>
			</Heading1>
			<AccountNav current="preferences" />
			<div className={styles.container}>
				<Heading2 className={styles.subheading}>
					<FormattedMessage
						id="preferences__subheading"
						defaultMessage="Preferences"
					/>
				</Heading2>
				<form onSubmit={submit}>
					<Select
						label={intl.formatMessage({
							id: 'preferences__language',
							defaultMessage: 'Language',
						})}
						value={language}
						setValue={setLanguage}
						options={(
							Object.keys(Language) as Array<keyof typeof Language>
						).map((key) => {
							const value = Language[key];
							return {
								label: languageMap[value],
								value,
							};
						})}
					/>

					<Select
						label={intl.formatMessage({
							id: 'preferences__timezone',
							defaultMessage: 'Timezone',
						})}
						value={timezone}
						setValue={setTimezone}
						options={(
							Object.keys(Timezone) as Array<keyof typeof Timezone>
						).map((key) => {
							const value = Timezone[key];
							const [prefix, ...slugs] = value.split('_');
							const label = `${capitalize(prefix)}/${slugs
								.map(capitalize)
								.join('_')}`;
							return {
								label,
								value,
							};
						})}
					/>

					<Heading3 className={styles.sectionHeading}>
						<FormattedMessage
							id="preferences__playbackSettings"
							defaultMessage="Playback Settings"
						/>
					</Heading3>
					<p className={styles.intro}>
						<FormattedMessage
							id="preferences__playbackSettingsIntro"
							defaultMessage="Choose whether recordings should autoplay by default."
						/>
					</p>

					<Checkbox
						label={intl.formatMessage({
							id: 'preferences__inputAutoplay',
							defaultMessage: 'Autoplay recordings',
						})}
						checked={autoplay}
						toggleChecked={() => setAutoplay(!autoplay)}
					/>

					<Heading3 className={styles.sectionHeading}>
						<FormattedMessage
							id="preferences__downloadSettings"
							defaultMessage="Download Settings"
						/>
					</Heading3>
					<p className={styles.intro}>
						<FormattedMessage
							id="preferences__downloadSettingsIntro"
							defaultMessage="Choose how you want to download audio."
						/>
					</p>

					<Select
						label={intl.formatMessage({
							id: 'preferences__preferredAudioQuality',
							defaultMessage: 'Preferred Audio Quality',
						})}
						value={preferredAudioQuality}
						setValue={setPreferredAudioQuality}
						options={[
							{
								label: intl.formatMessage({
									id: 'preferences__preferredAudioQuality-high',
									defaultMessage: 'High',
								}),
								value: RecordingQuality.Highest,
							},
							{
								label: intl.formatMessage({
									id: 'preferences__preferredAudioQuality-medium',
									defaultMessage: 'Medium',
								}),
								value: RecordingQuality.Low,
							},
							{
								label: intl.formatMessage({
									id: 'preferences__preferredAudioQuality-low',
									defaultMessage: 'Low',
								}),
								value: RecordingQuality.Lowest,
							},
						]}
					/>

					<div className={styles.buttonRow}>
						<Button
							type="super"
							text={
								<FormattedMessage
									id="preferences__buttonLabelSaveChanges"
									defaultMessage="Save changes"
								/>
							}
							onClick={() => submit()}
						/>
					</div>
				</form>
			</div>
		</>
	);
}

export default withAuthGuard(Profile);
