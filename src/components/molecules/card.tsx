import React from 'react';

import Icon from '@components/atoms/icon';
import styles from '@components/molecules/card.module.scss';
import SpeakerName from '@components/molecules/speakerName';
import formatDuration from '@lib/formatDuration';
import { SpeakerNameFragment } from '@lib/generated/graphql';

interface CardProps {
	container?: {
		icon?: any;
		title: string;
		length?: number;
		index?: number;
	};
	title: string;
	persons?: SpeakerNameFragment[];
	duration?: number;
	progress: number;
}

export default function Card({
	container,
	title,
	persons = [],
	duration,
}: CardProps): JSX.Element {
	return (
		<div className={styles.card}>
			{container && (
				<div className={styles.hat}>
					<span className={styles.hatIcon}>{container?.icon}</span>
					<span className={styles.hatTitle}>{container?.title}</span>
					<Icon icon={'chevron-down'} size={16} />
				</div>
			)}
			<div className={styles.content}>
				{container?.length && container?.index && (
					<span className={styles.part}>
						Part {container?.index} of {container?.length}
					</span>
				)}
				<div className={styles.heading}>
					<h1>{title}</h1> <Icon icon={'play'} size={24} />
				</div>
				<div>
					{persons.map((p) => (
						<SpeakerName person={p} key={p.id} />
					))}
				</div>
				<div className={styles.controls}>
					{duration && (
						<span className={styles.duration}>{formatDuration(duration)}</span>
					)}
					<span className={styles.progress}>
						<span />
					</span>
					<Icon icon={'bookmark'} size={24} />
				</div>
			</div>
		</div>
	);
}
