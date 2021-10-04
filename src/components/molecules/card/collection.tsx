import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading2 from '@components/atoms/heading2';
import Heading6 from '@components/atoms/heading6';
import ProgressBar from '@components/atoms/progressBar';
import Card from '@components/molecules/card';
import { useIsCollectionFavorited } from '@lib/api/useIsCollectionFavorited';
import { BaseColors } from '@lib/constants';
import { formatDateRange } from '@lib/date';
import {
	CardCollectionFragment,
	CardSequenceFragment,
} from '@lib/generated/graphql';
import { useFormattedDuration } from '@lib/time';
import useHover from '@lib/useHover';

import LikeActiveIcon from '../../../../public/img/icon-like-active.svg';
import LikeIcon from '../../../../public/img/icon-like-light.svg';
import SuccessIcon from '../../../../public/img/icon-success-light.svg';
import CollectionTypeLockup from '../collectionTypeLockup';
import IconButton from '../iconButton';

import styles from './collection.module.scss';
import CardSequence from './sequence';

interface CardCollectionProps {
	collection: CardCollectionFragment;
	sequences?: CardSequenceFragment[] | null;
}

export default function CardCollection({
	collection,
	sequences,
}: CardCollectionProps): JSX.Element {
	const { isFavorited, toggleFavorited } = useIsCollectionFavorited(
		collection.id
	);
	const [ref, isHovered] = useHover();
	const {
		allSequences,
		canonicalPath,
		duration,
		endDate,
		image,
		startDate,
		title,
		viewerPlaybackCompletedPercentage,
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
			<Link href={canonicalPath}>
				<a
					className={clsx(
						styles.container,
						isHovered && styles.bookmarkHovered
					)}
				>
					<CollectionTypeLockup />
					{heroImage}
					{!!(startDate && endDate) && (
						<Heading6 sans unpadded className={styles.date}>
							{formatDateRange(startDate, endDate)}
						</Heading6>
					)}
					<Heading2 unpadded className={styles.title}>
						{title}
					</Heading2>
					<Heading6
						sans
						unpadded
						uppercase
						loose
						className={styles.sequencesLabel}
					>
						<FormattedMessage
							id="cardCollection_sequenceLabel"
							defaultMessage="{count} series"
							description="Card collection sequence count label"
							values={{ count: allSequences.aggregate?.count }}
						/>
					</Heading6>
					<div
						className={clsx(
							styles.details,
							isFavorited && styles.detailsWithLike
						)}
					>
						<div className={styles.duration}>
							{useFormattedDuration(duration)}
						</div>
						{viewerPlaybackCompletedPercentage >= 1 && <SuccessIcon />}
						<div className={styles.progress}>
							{viewerPlaybackCompletedPercentage > 0 && (
								<ProgressBar progress={viewerPlaybackCompletedPercentage} />
							)}
						</div>
						<IconButton
							ref={ref}
							Icon={isFavorited ? LikeActiveIcon : LikeIcon}
							onClick={(e) => {
								e.preventDefault();
								toggleFavorited();
							}}
							color={isFavorited ? BaseColors.SALMON : BaseColors.WHITE}
							backgroundColor={BaseColors.DARK}
							className={clsx(styles.like, isFavorited && styles.likeActive)}
						/>
					</div>
					{sequences?.length ? (
						<div className={styles.subSequences}>
							{sequences.map((sequence) => (
								<CardSequence
									sequence={sequence}
									key={sequence.canonicalPath}
									slim
								/>
							))}
						</div>
					) : null}
				</a>
			</Link>
		</Card>
	);
}
