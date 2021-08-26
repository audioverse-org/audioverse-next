import Link from 'next/link';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BaseColors } from '@components/atoms/baseColors';
import Heading2 from '@components/atoms/heading2';
import Heading6 from '@components/atoms/heading6';
import HorizontalRule from '@components/atoms/horizontalRule';
import RoundImage from '@components/atoms/roundImage';
import withFailStates from '@components/HOCs/withFailStates';
import CardSermon from '@components/molecules/card/sermon';
import CardGroup from '@components/molecules/cardGroup';
import DefinitionList, {
	IDefinitionListTerm,
} from '@components/molecules/definitionList';
import IconButton from '@components/molecules/iconButton';
import Tease from '@components/molecules/tease';
import TeaseHeader from '@components/molecules/teaseHeader';
import TypeLockup from '@components/molecules/typeLockup';
import { formatDateRange } from '@lib/date';
import { useFormattedDuration } from '@lib/time';
import { SeriesStaticProps } from '@pages/[language]/series/[id]/[[...slug]]';

import ListAltIcon from '../../../public/img/fa-list-alt.svg';
import LikeActiveIcon from '../../../public/img/icon-like-active.svg';
import LikeIcon from '../../../public/img/icon-like.svg';
import ShareIcon from '../../../public/img/icon-share-light.svg';

import styles from './detail.module.scss';

type Props = SeriesStaticProps['props'];

function SeriesDetail({ sequence }: Must<Props>): JSX.Element {
	const intl = useIntl();

	const {
		title,
		collection,
		duration,
		endDate,
		image,
		// shareUrl,
		sponsor,
		startDate,
		recordings,
		description,
		viewerHasFavorited,
	} = sequence;

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
					id="seriesDetailg__conferenceLabel"
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
					id="seriesDetailg__sponsorLabel"
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
					id="seriesDetailg__recordedLabel"
					defaultMessage="Recorded"
				/>
			),
			definition: <div>{formatDateRange(startDate, endDate, true)}</div>,
		});
	}

	return (
		<Tease className={styles.container}>
			<TeaseHeader>
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
					{/* TODO: make icons functional */}
					<IconButton
						Icon={ShareIcon}
						onPress={() => void 0}
						color={BaseColors.DARK}
						backgroundColor={BaseColors.CREAM}
						className={styles.iconButton}
					/>
					<IconButton
						Icon={viewerHasFavorited ? LikeActiveIcon : LikeIcon}
						onPress={() => void 0}
						color={viewerHasFavorited ? BaseColors.RED : BaseColors.DARK}
						backgroundColor={BaseColors.CREAM}
						className={styles.iconButton}
					/>
				</div>
				<HorizontalRule color="midTone" />
				<DefinitionList terms={details} textColor={BaseColors.DARK} />
			</TeaseHeader>
			{recordings.nodes?.length ? (
				<CardGroup className={styles.cardGroup}>
					{recordings.nodes.map((recording) => (
						<CardSermon recording={recording} key={recording.id} hideHat />
					))}
				</CardGroup>
			) : null}
		</Tease>
	);
}

export default withFailStates(SeriesDetail, ({ sequence }) => !sequence);
