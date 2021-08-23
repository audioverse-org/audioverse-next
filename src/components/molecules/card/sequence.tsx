import Link from 'next/link';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BaseColors } from '@components/atoms/baseColors';
import Heading2 from '@components/atoms/heading2';
import Heading6 from '@components/atoms/heading6';
import Card from '@components/molecules/card';
import { CardSequenceFragment } from '@lib/generated/graphql';
import { useFormattedDuration } from '@lib/time';

import ListIcon from '../../../../public/img/fa-list-alt.svg';
import TypeLockup from '../typeLockup';

import styles from './sequence.module.scss';

interface CardCollectionProps {
	sequence: CardSequenceFragment;
}

export default function CardSequence({
	sequence,
}: CardCollectionProps): JSX.Element {
	const intl = useIntl();

	const { recordings, canonicalPath, duration, description, summary, title } =
		sequence;
	return (
		<Card>
			<div className={styles.container}>
				<TypeLockup
					Icon={ListIcon}
					label={intl.formatMessage({
						id: 'cardSequence_hatTitle',
						defaultMessage: 'Series',
						description: 'Card sequence hat title',
					})}
					iconColor={BaseColors.RED}
					textColor={BaseColors.DARK}
				/>
				<Heading2 unpadded className={styles.title}>
					<Link href={canonicalPath}>
						<a>{title}</a>
					</Link>
				</Heading2>
				{!!(summary || description) && (
					<div
						dangerouslySetInnerHTML={{ __html: summary || description }}
					></div>
				)}
				<Heading6 sans unpadded uppercase loose className={styles.partsLabel}>
					<FormattedMessage
						id="cardSequence_sequenceLabel"
						defaultMessage="{count} parts"
						description="Card sequence recording count label"
						values={{ count: recordings.aggregate?.count }}
					/>
				</Heading6>
				<div className={styles.duration}>{useFormattedDuration(duration)}</div>
				{/* TODO: hover/link?, conditional sponsor, has favorited, sub-recordings */}
			</div>
		</Card>
	);
}
