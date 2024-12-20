import clsx from 'clsx';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading2 from '~components/atoms/heading2';
import Heading6 from '~components/atoms/heading6';
import HorizontalRule from '~components/atoms/horizontalRule';
import Link from '~components/atoms/linkWithoutPrefetch';
import RoundImage from '~components/atoms/roundImage';
import ButtonFavorite from '~components/molecules/buttonFavorite';
import { isBackgroundColorDark } from '~components/molecules/buttonPlay';
import ButtonShare from '~components/molecules/buttonShare';
import CardRecording from '~components/molecules/card/recording';
import CardGroup from '~components/molecules/cardGroup';
import ContentWidthLimiter from '~components/molecules/contentWidthLimiter';
import DefinitionList, {
	IDefinitionListTerm,
} from '~components/molecules/definitionList';
import SequenceTypeLockup from '~components/molecules/sequenceTypeLockup';
import Tease from '~components/molecules/tease';
import { useIsSequenceFavorited } from '~lib/api/useIsSequenceFavorited';
import { formatDateRange } from '~lib/date';
import { getSequenceTypeTheme } from '~lib/getSequenceType';
import root from '~lib/routes';
import { useFormattedDuration } from '~lib/time';
import { UnreachableCaseError } from '~lib/typeHelpers';
import useLanguageRoute from '~lib/useLanguageRoute';
import { SequenceContentType } from '~src/__generated__/graphql';

import { SequenceFragment } from './__generated__/sequence';
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
				return (l: string, id: string | number) =>
					root.lang(l).books.id(id).feed.get();
			case SequenceContentType.BibleBook:
				return () => undefined;
			case SequenceContentType.MusicAlbum:
				return (l: string, id: string | number) =>
					root.lang(l).songs.albums.id(id).feed.get();
			case SequenceContentType.Series:
				return (l: string, id: string | number) =>
					root.lang(l).series.id(id).feed.get();
			case SequenceContentType.StorySeason:
				return (l: string, id: string | number) =>
					root.lang(l).stories.albums.id(id).feed.get();
			default:
				throw new UnreachableCaseError(contentType);
		}
	})()(languageRoute, id);

	const { textColor, ruleColor, backgroundColor } =
		getSequenceTypeTheme(contentType);
	const linkClasses = clsx(
		'decorated',
		isBackgroundColorDark(backgroundColor) && 'hover--salmon',
	);

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
					<Link href={collection.canonicalPath} legacyBehavior>
						<a className={linkClasses}>{collection.title}</a>
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
				<Link href={sponsor.canonicalPath} legacyBehavior>
					<a className={linkClasses}>{sponsor.title}</a>
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
		<Tease className={clsx(styles.container, styles[contentType])}>
			<ContentWidthLimiter>
				<SequenceTypeLockup contentType={contentType} />
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
					<ButtonShare
						shareUrl={shareUrl}
						backgroundColor={backgroundColor}
						emailSubject={title}
						light
						triggerClassName={styles.iconButton}
						rssUrl={rssUrl}
						contentType={contentType}
						id={id}
						title={title}
					/>
					<ButtonFavorite
						isFavorited={!!isFavorited}
						toggleFavorited={toggleFavorited}
						backgroundColor={backgroundColor}
						light
						className={styles.iconButton}
						contentType={contentType}
						id={id}
						title={title}
					/>
				</div>
				<HorizontalRule color={ruleColor} />
				<DefinitionList terms={details} textColor={textColor} />
			</ContentWidthLimiter>
			{recordings.nodes?.length ? (
				<CardGroup className={styles.cardGroup}>
					{recordings.nodes.map((recording) => (
						<CardRecording
							recording={recording}
							key={recording.id}
							hideHat
							hideSponsorHat
						/>
					))}
				</CardGroup>
			) : null}
		</Tease>
	);
}
