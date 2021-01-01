import React from 'react';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';

import { setPersonFavorited } from '@lib/api/setPersonFavorited';
import { useIsPersonFavorited } from '@lib/api/useIsPersonFavorited';
import useLanguageRoute from '@lib/useLanguageRoute';
import { Person } from 'types';

import styles from './speakerName.module.scss';

export default function SpeakerName({
	person,
}: {
	person: Person;
}): JSX.Element {
	const {
		id,
		name,
		summary = '',
		imageWithFallback: image,
		viewerHasFavorited: favorited,
	} = person;
	const lang = useLanguageRoute();
	const { isPersonFavorited, isLoading } = useIsPersonFavorited(id);

	return (
		<>
			<a
				href={`/${lang}/presenters/${id}`}
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
				<button
					onClick={async (e) => {
						e.preventDefault();
						if (isPersonFavorited === undefined && !isLoading) {
							toast('You must be logged in to do this');
						} else {
							await setPersonFavorited(id, !favorited);
						}
					}}
				>
					{favorited ? (
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
