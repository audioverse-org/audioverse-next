import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BaseColors } from '@components/atoms/baseColors';
import Heading2 from '@components/atoms/heading2';
import Heading6 from '@components/atoms/heading6';
import HorizontalRule from '@components/atoms/horizontalRule';
import withFailStates from '@components/HOCs/withFailStates';
import CardSequence from '@components/molecules/card/sequence';
import CardGroup from '@components/molecules/cardGroup';
import DefinitionList, {
	IDefinitionListTerm,
} from '@components/molecules/definitionList';
// TODO: import RssLink from '@components/molecules/rssLink';
import SponsorLockup from '@components/molecules/sponsorLockup';
import Tease from '@components/molecules/tease';
import TeaseHeader from '@components/molecules/teaseHeader';
import TypeLockup from '@components/molecules/typeLockup';
import { formatDateRange } from '@lib/date';
import { useFormattedDuration } from '@lib/time';
import { CollectionStaticProps } from '@pages/[language]/collections/[id]/[[...slug]]';

import FAListIcon from '../../../public/img/fa-list.svg';
import LikeIcon from '../../../public/img/icon-like-active.svg';
import ShareIcon from '../../../public/img/icon-share-light.svg';

import styles from './detail.module.scss';

type Props = CollectionStaticProps['props'];

function CollectionDetail({ collection }: Must<Props>): JSX.Element {
	const intl = useIntl();

	const {
		sequences,
		description,
		duration,
		image,
		location,
		startDate,
		endDate,
		title,
		sponsor,
	} = collection;

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
				<Link href={sponsor.canonicalPath}>
					<a>{sponsor.title}</a>
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

	return (
		<Tease className={styles.container}>
			<TeaseHeader>
				<TypeLockup
					Icon={FAListIcon}
					label={intl.formatMessage({
						id: `collectionDetail__type`,
						defaultMessage: 'Conference',
						description: `Collection Detail type label`,
					})}
					iconColor={BaseColors.SALMON}
					textColor={BaseColors.LIGHT_TONE}
				/>
				{image && (
					<div className={styles.image}>
						<Image
							alt={title}
							src={image.url}
							layout="fill"
							objectFit="cover"
						/>
					</div>
				)}

				{!!(startDate && endDate) && (
					<Heading6 sans unpadded className={styles.date}>
						{formatDateRange(startDate, endDate)}
					</Heading6>
				)}
				<Heading2 unpadded className={styles.title}>
					{title}
				</Heading2>
				{sponsor && (
					<SponsorLockup sponsor={sponsor} textColor={BaseColors.LIGHT_TONE} />
				)}

				<div className={styles.row}>
					<div>
						<Heading6
							sans
							loose
							uppercase
							unpadded
							className={styles.countLabel}
						>
							<FormattedMessage
								id="collectionDetail__sequenceCountLabel"
								defaultMessage="{count} Series"
								description="Collection Detail sequence count label"
								values={{ count: sequences.aggregate?.count }}
							/>
						</Heading6>
						<div className={styles.duration}>
							{useFormattedDuration(duration)}
						</div>
					</div>
					{/* TODO: make icons functional */}
					<ShareIcon className={styles.share} />
					<LikeIcon className={styles.like} />
				</div>
				<HorizontalRule color="midTone" />
				<DefinitionList terms={details} textColor={BaseColors.LIGHT_TONE} />
			</TeaseHeader>
			{sequences.nodes?.length ? (
				<CardGroup className={styles.cardGroup}>
					{sequences.nodes.map((sequence) => (
						<CardSequence sequence={sequence} key={sequence.canonicalPath} />
					))}
				</CardGroup>
			) : null}
		</Tease>
	);
}

export default withFailStates(
	CollectionDetail,
	({ collection }) => !collection
);
