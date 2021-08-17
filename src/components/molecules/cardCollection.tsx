import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading2 from '@components/atoms/heading2';
import Heading6 from '@components/atoms/heading6';
import Card from '@components/molecules/card';
import { formatDateRange } from '@lib/date';
import { CardCollectionFragment } from '@lib/generated/graphql';
import { useFormattedDuration } from '@lib/time';

import ListIcon from '../../../public/img/fa-list.svg';

import styles from './cardCollection.module.scss';
import TypeLockup from './typeLockup';

interface CardCollectionProps {
	collection: CardCollectionFragment;
}

export default function CardCollection({
	collection,
}: CardCollectionProps): JSX.Element {
	const intl = useIntl();

	const {
		allSequences,
		canonicalPath,
		duration,
		endDate,
		image,
		startDate,
		title,
	} = collection;
	const heroImage = image?.url && (
		<div className={styles.imageContainer}>
			<Image
				className={styles.hero}
				src={image?.url}
				alt={title}
				layout="fill"
				objectFit="cover"
			/>
		</div>
	);
	return (
		<Card>
			<div className={styles.container}>
				<TypeLockup
					Icon={ListIcon}
					iconColor="salmon"
					label={intl.formatMessage({
						id: 'cardCollection_hatTitle',
						defaultMessage: 'Conference',
						description: 'Card collection hat title',
					})}
					textColor="white"
				/>
				{heroImage}
				{!!(startDate && endDate) && (
					<Heading6 sans unpadded className={styles.date}>
						{formatDateRange(startDate, endDate)}
					</Heading6>
				)}
				<Heading2 unpadded className={styles.title}>
					<Link href={canonicalPath}>
						<a>{title}</a>
					</Link>
				</Heading2>
				<Heading6 sans unpadded uppercase className={styles.sequencesLabel}>
					<FormattedMessage
						id="cardCollection_sequenceLabel"
						defaultMessage="{count} series"
						description="Card collection sequence count label"
						values={{ count: allSequences.aggregate?.count }}
					/>
				</Heading6>
				<div className={styles.duration}>{useFormattedDuration(duration)}</div>
				{/* {collection. ? (
				<p className={styles.teaser}>{collection.teaser}</p>
			) : null}
			{dur && dur > 30 && (
				<p className={styles.duration}>
					<FormattedMessage
						id="cardCollection__readingDuration"
						defaultMessage="{duration} read"
						description="Card collection reading duration"
						values={{
							duration: useFormattedDuration(dur),
						}}
					/>
				</p>
			)} */}
			</div>
		</Card>
	);
}
