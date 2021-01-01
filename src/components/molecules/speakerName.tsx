import React from 'react';
import { FormattedMessage } from 'react-intl';
import ReactTooltip from 'react-tooltip';
import styles from './speakerName.module.scss';

import { Person } from 'types';

export default function SpeakerName({
	person,
}: {
	person: Person;
}): JSX.Element {
	const { id, name, summary = '', imageWithFallback: image } = person;

	return (
		<>
			<a data-tip data-for={`person-${id}-speakerTip`}>
				{name}
			</a>
			<ReactTooltip
				id={`person-${id}-speakerTip`}
				uuid={`person-${id}-tooltipUuid`}
				effect={'solid'}
				clickable={true}
				className={styles.tooltip}
				delayHide={200}
			>
				{image && <img width={50} alt={name} src={image.url} />}
				<p dangerouslySetInnerHTML={{ __html: summary }} />
				<button>
					<FormattedMessage
						id="speakerName__favorite"
						defaultMessage="Favorite"
						description="SpeakerName Favorite button label"
					/>
				</button>
			</ReactTooltip>
		</>
	);
}
