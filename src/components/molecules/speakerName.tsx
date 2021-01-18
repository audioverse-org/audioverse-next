import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';

import { useIsPersonFavorited } from '@lib/api/useIsPersonFavorited';
import { SpeakerNameFragment } from '@lib/generated/graphql';
import { makePersonRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import styles from './speakerName.module.scss';

export default function SpeakerName({
	person,
}: {
	person: SpeakerNameFragment;
}): JSX.Element {
	const {
		id,
		name,
		summary = '',
		imageWithFallback: image,
		viewerHasFavorited: initialIsFavorited,
		website = '',
	} = person;
	const lang = useLanguageRoute();
	const {
		isPersonFavorited: queryIsFavorited,
		toggleFavorited,
		isLoading,
	} = useIsPersonFavorited(id);
	const isPersonFavorited =
		queryIsFavorited === undefined ? initialIsFavorited : queryIsFavorited;
	const intl = useIntl();

	return (
		<>
			<a
				href={makePersonRoute(lang, id)}
				data-tip
				data-for={`person-${id}-speakerTip`}
			>
				{name}
			</a>
			<ReactTooltip
				id={`person-${id}-speakerTip`}
				uuid={`person-${id}-tooltipUuid`}
				effect={'solid'}
				clickable={true}
				className={styles.tooltip}
				delayHide={200}
				delayShow={500}
			>
				{image && <img width={50} alt={name} src={image.url} />}
				<p dangerouslySetInnerHTML={{ __html: summary }} />
				{website && (
					<p>
						<a
							className={styles.speakerWebsite}
							href={website}
							target="_blank"
							rel="nofollow noreferrer"
						>
							{website}
						</a>
					</p>
				)}
				<button
					onClick={(e) => {
						e.preventDefault();
						if (isPersonFavorited === undefined && !isLoading) {
							toast(
								intl.formatMessage({
									id: 'speakerName__unauthenticated',
									defaultMessage: 'You must be logged in to do this',
									description: 'SpeakerName unauthenticated error',
								})
							);
						} else {
							toggleFavorited();
						}
					}}
				>
					{isPersonFavorited ? (
						<FormattedMessage
							id="speakerName__unfavorite"
							defaultMessage="Unfavorite"
							description="SpeakerName Unfavorite button label"
						/>
					) : (
						<FormattedMessage
							id="speakerName__favorite"
							defaultMessage="Favorite"
							description="SpeakerName Favorite button label"
						/>
					)}
				</button>
			</ReactTooltip>
		</>
	);
}
