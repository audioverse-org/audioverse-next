import Image from 'next/legacy/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading2 from '~components/atoms/heading2';
import Heading6 from '~components/atoms/heading6';
import HorizontalRule from '~components/atoms/horizontalRule';
import InherentSizeImage from '~components/atoms/inherentSizeImage';
import LineHeading from '~components/atoms/lineHeading';
import withFailStates from '~components/HOCs/withFailStates';
import Button from '~components/molecules/button';
import ButtonFavorite from '~components/molecules/buttonFavorite';
import ButtonShare from '~components/molecules/buttonShare';
import CardRecording from '~components/molecules/card/recording';
import CardSequence from '~components/molecules/card/sequence';
import CardGroup from '~components/molecules/cardGroup';
import CollectionTypeLockup from '~components/molecules/collectionTypeLockup';
import DefinitionList, {
	IDefinitionListTerm,
} from '~components/molecules/definitionList';
import SponsorLockup from '~components/molecules/sponsorLockup';
import Tease from '~components/molecules/tease';
import { useIsCollectionFavorited } from '~lib/api/useIsCollectionFavorited';
import { BaseColors } from '~lib/constants';
import { formatDateRange } from '~lib/date';
import root from '~lib/routes';
import { useFormattedDuration } from '~lib/time';
import useLanguageRoute from '~lib/useLanguageRoute';
import ForwardIcon from '~public/img/icons/icon-forward-light.svg';
import { CardRecordingFragment } from '~src/components/molecules/card/__generated__/recording';
import { Must } from '~src/types/types';

import {
	GetCollectionDetailPageDataQuery,
	useInfiniteGetCollectionDetailPageDataQuery,
} from './__generated__/detail';
import styles from './detail.module.scss';

const PAGE_SIZE = 20;

export type CollectionDetailProps = GetCollectionDetailPageDataQuery & {
	endCursor: string | null;
	hasNextPage: boolean;
};

function CollectionDetail({
	collection,
}: Must<CollectionDetailProps>): JSX.Element {
	const [after, setAfter] = useState<string>('');
	const [recordings, setRecordings] = React.useState<CardRecordingFragment[]>(
		[]
	);
	const intl = useIntl();
	const lang = useLanguageRoute();
	const { isFavorited, toggleFavorited } = useIsCollectionFavorited(
		collection.id
	);

	const {
		id,
		title,
		contentType,
		description,
		duration,
		image,
		location,
		startDate,
		endDate,
		shareUrl,
		sponsor,
		sequences,
		recordings: rec,
	} = collection;

	const loadMoreTriggerRef = useRef<HTMLDivElement | null>(null);

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteGetCollectionDetailPageDataQuery(
			'after', // Key for pagination
			{
				id,
				first: PAGE_SIZE,
				after: after,
			},
			{
				getNextPageParam: (lastPage) =>
					lastPage?.collection?.recordings?.pageInfo?.endCursor || null,
			}
		);

	const formattedDuration = useFormattedDuration(duration);

	useEffect(() => {
		if (data) {
			const newRecordings =
				data.pages.flatMap((page) => page.collection?.recordings.nodes) ?? [];
			const validRecordings = newRecordings.filter(
				(recording): recording is CardRecordingFragment =>
					recording !== null && recording !== undefined
			);
			setRecordings((prevRecordings) => {
				const allRecordings = [...prevRecordings, ...validRecordings];

				const uniqueRecordings = Array.from(
					new Map(
						allRecordings.map((recording) => [recording.id, recording])
					).values()
				);
				return uniqueRecordings;
			});
		}
	}, [data]);

	const details: IDefinitionListTerm[] = [];
	if (description) {
		details.push({
			term: intl.formatMessage({
				id: `collectionDetail__descriptionLabel`,
				defaultMessage: 'Description',
			}),
			definition: <div dangerouslySetInnerHTML={{ __html: description }} />,
		});
	}
	if (sponsor) {
		details.push({
			term: intl.formatMessage({
				id: `collectionDetail__sponsorLabel`,
				defaultMessage: 'Sponsor',
			}),
			definition: (
				<Link href={sponsor.canonicalPath} legacyBehavior>
					<a className="decorated hover--salmon">{sponsor.title}</a>
				</Link>
			),
		});
	}
	if (location) {
		details.push({
			term: intl.formatMessage({
				id: `collectionDetail__locationLabel`,
				defaultMessage: 'Location',
			}),
			definition: <div>{location}</div>,
		});
	}

	const observer = useRef<IntersectionObserver>();

	const handleObserver = useCallback(
		(entries: IntersectionObserverEntry[]) => {
			const target = entries[0];
			if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
				const newAfter =
					data?.pages[data.pages.length - 1]?.collection?.recordings?.pageInfo
						?.endCursor || '';
				setAfter(newAfter);
				fetchNextPage();
			}
		},
		[data, fetchNextPage, hasNextPage, isFetchingNextPage]
	);

	useEffect(() => {
		if (observer.current) {
			observer.current.disconnect();
		}

		observer.current = new IntersectionObserver(handleObserver, {
			root: null,
			rootMargin: '0px',
			threshold: 0.1,
		});

		const trigger = loadMoreTriggerRef.current;

		if (trigger) {
			observer.current.observe(trigger);
		} else {
			console.log('Trigger element not found');
		}

		return () => {
			if (observer.current) {
				observer.current.disconnect();
			}
		};
	}, [handleObserver, hasNextPage, isFetchingNextPage]);

	return (
		<>
			<Tease className={styles.container}>
				<div className={styles.imageRow}>
					{image && (
						<div className={styles.image}>
							<div className={styles.imageBackdrop}>
								<Image
									alt={title}
									src={image.url}
									height="500"
									width="500"
									objectFit="cover"
								/>
							</div>
							<InherentSizeImage src={image.url} title={title} />
						</div>
					)}
					<div>
						<CollectionTypeLockup contentType={contentType} />

						{!!(startDate && endDate) && (
							<Heading6 sans unpadded className={styles.date}>
								{formatDateRange(startDate, endDate)}
							</Heading6>
						)}
						<Heading2 unpadded className={styles.title}>
							{title}
						</Heading2>
						{sponsor && (
							<SponsorLockup
								sponsor={sponsor}
								textColor={BaseColors.LIGHT_TONE}
								hoverColor={BaseColors.SALMON}
								isLinked
								small
							/>
						)}

						<Heading6
							sans
							loose
							uppercase
							unpadded
							className={styles.countLabel}
						>
							{sequences.aggregate?.count ? (
								<FormattedMessage
									id="collectionDetail__sequenceCountLabel"
									defaultMessage="{count} Series"
									description="Collection Detail sequence count label"
									values={{ count: sequences.aggregate?.count }}
								/>
							) : (
								<FormattedMessage
									id="collectionDetail__teachingsCountLabel"
									defaultMessage="{count} Teachings"
									description="Collection Detail teachings count label"
									values={{ count: rec?.aggregate?.count }}
								/>
							)}
						</Heading6>
						<div className={styles.row}>
							<div className={styles.duration}>{formattedDuration}</div>

							<ButtonShare
								shareUrl={shareUrl}
								backgroundColor={BaseColors.DARK}
								emailSubject={title}
								light
								triggerClassName={styles.iconButton}
								rssUrl={root.lang(lang).conferences.id(id).feed.get()}
							/>
							<ButtonFavorite
								isFavorited={!!isFavorited}
								toggleFavorited={toggleFavorited}
								backgroundColor={BaseColors.DARK}
								light
								className={styles.iconButton}
							/>
						</div>
						<HorizontalRule color={BaseColors.MID_TONE} />
						<DefinitionList terms={details} textColor={BaseColors.LIGHT_TONE} />
					</div>
				</div>
				{sequences.nodes?.length ? (
					<>
						<LineHeading color={BaseColors.SALMON}>
							<FormattedMessage
								id="collectionDetail__seriesLabel"
								defaultMessage="Series"
								description="Collection Detail series label"
							/>
						</LineHeading>
						<CardGroup className={styles.cardGroup}>
							{sequences.nodes.map((sequence) => (
								<CardSequence
									sequence={sequence}
									key={sequence.canonicalPath}
								/>
							))}
						</CardGroup>
						{sequences.pageInfo.hasNextPage && (
							<Button
								type="secondaryInverse"
								href={root.lang(lang).conferences.id(id).sequences.get()}
								text={intl.formatMessage({
									id: 'collectionDetail__seriesAllLabel',
									defaultMessage: 'See All Series',
								})}
								IconLeft={ForwardIcon}
								className={styles.seeAllButton}
							/>
						)}
					</>
				) : null}
				{recordings?.length ? (
					<>
						<LineHeading color={BaseColors.SALMON}>
							<FormattedMessage
								id="collectionDetail__teachingsLabel"
								defaultMessage="Individual Teachings"
								description="Collection Detail teachings label"
							/>
						</LineHeading>
						<CardGroup className={styles.cardGroup}>
							{recordings?.map((recording) => (
								<CardRecording
									recording={recording}
									key={recording?.id}
									fullBleed
								/>
							))}
						</CardGroup>
					</>
				) : null}
			</Tease>
			<div ref={loadMoreTriggerRef}></div>
		</>
	);
}

export default withFailStates(CollectionDetail, {
	useShould404: ({ collection }) => !collection,
});
