import clsx from 'clsx';
import Image from 'next/legacy/image';
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
	CardRecordingFragment,
	CardSequenceFragment,
	CollectionContentType,
} from '@lib/generated/graphql';
import { useFormattedDuration } from '@lib/time';
import useHover from '@lib/useHover';

import SuccessIcon from '../../../../public/img/icons/icon-success-light.svg';
import ButtonFavorite from '../buttonFavorite';
import CollectionTypeLockup from '../collectionTypeLockup';

import styles from './collection.module.scss';
import CardRecording from './recording';
import CardSequence from './sequence';

interface CardCollectionProps {
	collection: CardCollectionFragment;
	sequences?: CardSequenceFragment[] | null;
	recordings?: CardRecordingFragment[] | null;
}

export default function CardCollection({
	collection,
	sequences,
	recordings,
}: CardCollectionProps): JSX.Element {
	const { isFavorited, toggleFavorited, playbackCompletedPercentage } =
		useIsCollectionFavorited(collection.id);
	const [ref, isHovered] = useHover<HTMLButtonElement>();
	const [subRef, isSubHovered] = useHover<HTMLDivElement>();
	const {
		allSequences,
		allRecordings,
		canonicalPath,
		collectionContentType: contentType,
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
				height={120}
				width={120}
				objectFit="cover"
			/>
		</div>
	);
	const isBibleVersion = contentType === CollectionContentType.BibleVersion;
	return (
		<Card>
			<Link href={canonicalPath} legacyBehavior>
				<a
					className={clsx(
						styles.container,
						isBibleVersion && styles.bibleVersion,
						(isHovered || isSubHovered) && styles.otherHovered
					)}
				>
					<CollectionTypeLockup contentType={contentType} />
					{heroImage}
					{!!(startDate && endDate) && !isBibleVersion && (
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
						{allSequences.aggregate?.count ? (
							isBibleVersion ? (
								<FormattedMessage
									id="cardCollection_booksLabel"
									defaultMessage="{count} books"
									values={{ count: allSequences.aggregate?.count }}
								/>
							) : (
								<FormattedMessage
									id="cardCollection_sequenceLabel"
									defaultMessage="{count} series"
									description="Card collection sequence count label"
									values={{ count: allSequences.aggregate?.count }}
								/>
							)
						) : (
							<FormattedMessage
								id="cardCollection__teachingsCountLabel"
								defaultMessage="{count} teachings"
								description="Card collection teachings count label"
								values={{ count: allRecordings.aggregate?.count }}
							/>
						)}
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
						{playbackCompletedPercentage >= 1 && <SuccessIcon />}
						<div className={styles.progress}>
							{playbackCompletedPercentage > 0 && (
								<ProgressBar progress={playbackCompletedPercentage} />
							)}
						</div>
						<ButtonFavorite
							isFavorited={!!isFavorited}
							toggleFavorited={toggleFavorited}
							ref={ref}
							backgroundColor={
								isBibleVersion ? BaseColors.BIBLE_H : BaseColors.DARK
							}
							light
							className={clsx(styles.like, isFavorited && styles.likeActive)}
						/>
					</div>
					{sequences?.length || recordings?.length ? (
						<>
							<div className={styles.subItems} ref={subRef}>
								{sequences?.map((sequence) => (
									<div className={styles.subItem} key={sequence.canonicalPath}>
										<CardSequence sequence={sequence} slim />
									</div>
								))}
								{!sequences?.length &&
									recordings?.map((recording) => (
										<div
											className={styles.subItem}
											key={recording.canonicalPath}
										>
											<CardRecording recording={recording} isOptionalLink />
										</div>
									))}
							</div>
							{contentType === CollectionContentType.BibleVersion && (
								<Heading6
									large
									loose
									sans
									unpadded
									uppercase
									className={styles.showAll}
								>
									<FormattedMessage
										id="cardCollection__showAll"
										defaultMessage="Show All"
									/>
								</Heading6>
							)}
						</>
					) : null}
				</a>
			</Link>
		</Card>
	);
}
