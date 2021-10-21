import Link from 'next/link';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading2 from '@components/atoms/heading2';
import Heading6 from '@components/atoms/heading6';
import HorizontalRule from '@components/atoms/horizontalRule';
import RoundImage from '@components/atoms/roundImage';
import ButtonShare from '@components/molecules/buttonShare';
import CardRecording from '@components/molecules/card/recording';
import CardGroup from '@components/molecules/cardGroup';
import ContentWidthLimiter from '@components/molecules/contentWidthLimiter';
import DefinitionList, {
	IDefinitionListTerm,
} from '@components/molecules/definitionList';
import IconButton from '@components/molecules/iconButton';
import Tease from '@components/molecules/tease';
import TypeLockup from '@components/molecules/typeLockup';
import { useIsSequenceFavorited } from '@lib/api/useIsSequenceFavorited';
import { BaseColors } from '@lib/constants';
import { formatDateRange } from '@lib/date';
import { SequenceContentType, SequenceFragment } from '@lib/generated/graphql';
import {
	makeAudiobookFeedRoute,
	makeSeriesFeedRoute,
	makeSongAlbumFeedRoute,
	makeStoryAlbumFeedRoute,
} from '@lib/routes';
import { useFormattedDuration } from '@lib/time';
import { UnreachableCaseError } from '@lib/typeHelpers';
import useLanguageRoute from '@lib/useLanguageRoute';

import ListAltIcon from '../../../public/img/fa-list-alt.svg';
import LikeActiveIcon from '../../../public/img/icon-like-active.svg';
import LikeIcon from '../../../public/img/icon-like-light.svg';

import styles from './sequence.module.scss';

export function Sequence({
	sequence,
}: {
	sequence: SequenceFragment;
}): JSX.Element {
	const intl = useIntl();
	const languageRoute = useLanguageRoute();
	const { isFavorited, toggleFavorited } = useIsSequenceFavorited(sequence.id);

	const {
		id,
		title,
		collection,
		contentType,
		duration,
		endDate,
		image,
		shareUrl,
		sponsor,
		startDate,
		recordings,
		description,
	} = sequence;

	const rssUrl = (() => {
		switch (contentType) {
			case SequenceContentType.Audiobook:
				return makeAudiobookFeedRoute;
			case SequenceContentType.MusicAlbum:
				return makeSongAlbumFeedRoute;
			case SequenceContentType.Series:
				return makeSeriesFeedRoute;
			case SequenceContentType.StorySeason:
				return makeStoryAlbumFeedRoute;
			default:
				throw new UnreachableCaseError(contentType);
		}
	})()(languageRoute, id);

	const details: IDefinitionListTerm[] = [];
	if (description) {
		details.push({
			term: intl.formatMessage({
				id: `seriesDetail__descriptionLabel`,
				defaultMessage: 'Description',
			}),
			definition: <div dangerouslySetInnerHTML={{ __html: description }} />,
		});
	}
	if (collection) {
		details.push({
			term: (
				<FormattedMessage
					id="seriesDetail__conferenceLabel"
					defaultMessage="Parent Conference"
				/>
			),
			definition: (
				<p>
					<Link href={collection.canonicalPath}>
						<a className="decorated">{collection.title}</a>
					</Link>
				</p>
			),
		});
	}
	if (sponsor) {
		details.push({
			term: (
				<FormattedMessage
					id="seriesDetail__sponsorLabel"
					defaultMessage="Sponsor"
				/>
			),
			definition: (
				<Link href={sponsor.canonicalPath}>
					<a className="decorated">{sponsor.title}</a>
				</Link>
			),
		});
	}
	if (startDate && endDate) {
		details.push({
			term: (
				<FormattedMessage
					id="seriesDetail__recordedLabel"
					defaultMessage="Recorded"
				/>
			),
			definition: <div>{formatDateRange(startDate, endDate, true)}</div>,
		});
	}

	return (
		<Tease className={styles.container}>
			<ContentWidthLimiter>
				<TypeLockup
					Icon={ListAltIcon}
					label={intl.formatMessage({
						id: `seriesDetail__type`,
						defaultMessage: 'Series',
						description: `Series Detail type label`,
					})}
					iconColor={BaseColors.RED}
					textColor={BaseColors.DARK}
				/>

				<div className={styles.titleLockup}>
					{image && (
						<div className={styles.image}>
							<RoundImage image={image.url} alt={title} />
						</div>
					)}
					<Heading2 unpadded>{title}</Heading2>
				</div>
				<Heading6 sans loose uppercase unpadded className={styles.countLabel}>
					<FormattedMessage
						id="seriesDetail__partsCountLabel"
						defaultMessage="{count} Parts"
						description="Series Detail parts count label"
						values={{ count: recordings.aggregate?.count }}
					/>
				</Heading6>
				<div className={styles.row}>
					<div className={styles.duration}>
						{useFormattedDuration(duration)}
					</div>
					<IconButton
						Icon={isFavorited ? LikeActiveIcon : LikeIcon}
						onClick={() => toggleFavorited()}
						color={isFavorited ? BaseColors.RED : BaseColors.DARK}
						backgroundColor={BaseColors.CREAM}
						className={styles.iconButton}
					/>
					<ButtonShare
						shareUrl={shareUrl}
						backgroundColor={BaseColors.CREAM}
						light
						triggerClassName={styles.iconButton}
						rssUrl={rssUrl}
					/>
				</div>
				<HorizontalRule color={BaseColors.MID_TONE} />
				<DefinitionList terms={details} textColor={BaseColors.DARK} />
			</ContentWidthLimiter>
			{recordings.nodes?.length ? (
				<CardGroup className={styles.cardGroup}>
					{recordings.nodes.map((recording) => (
						<CardRecording recording={recording} key={recording.id} hideHat />
					))}
				</CardGroup>
			) : null}
		</Tease>
	);
}
