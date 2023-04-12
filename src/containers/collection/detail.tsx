import Image from 'next/legacy/image';
import Link from 'next/link';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading2 from '@components/atoms/heading2';
import Heading6 from '@components/atoms/heading6';
import HorizontalRule from '@components/atoms/horizontalRule';
import InherentSizeImage from '@components/atoms/inherentSizeImage';
import LineHeading from '@components/atoms/lineHeading';
import withFailStates from '@components/HOCs/withFailStates';
import Button from '@components/molecules/button';
import ButtonFavorite from '@components/molecules/buttonFavorite';
import ButtonShare from '@components/molecules/buttonShare';
import CardPerson from '@components/molecules/card/person';
import CardRecording from '@components/molecules/card/recording';
import CardSequence from '@components/molecules/card/sequence';
import CardGroup from '@components/molecules/cardGroup';
import CollectionTypeLockup from '@components/molecules/collectionTypeLockup';
import DefinitionList, {
	IDefinitionListTerm,
} from '@components/molecules/definitionList';
import SponsorLockup from '@components/molecules/sponsorLockup';
import Tease from '@components/molecules/tease';
import { useIsCollectionFavorited } from '@lib/api/useIsCollectionFavorited';
import { BaseColors } from '@lib/constants';
import { formatDateRange } from '@lib/date';
import { GetCollectionDetailPageDataQuery } from '@lib/generated/graphql';
import root, { makeCollectionTeachingsRoute } from '@lib/routes';
import { useFormattedDuration } from '@lib/time';
import useLanguageRoute from '@lib/useLanguageRoute';

import ForwardIcon from '../../../public/img/icons/icon-forward-light.svg';

import styles from './detail.module.scss';

export type CollectionDetailProps = GetCollectionDetailPageDataQuery;

function CollectionDetail({
	collection,
}: Must<CollectionDetailProps>): JSX.Element {
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
		persons,
		recordings,
		sequences,
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

	return (
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

					<Heading6 sans loose uppercase unpadded className={styles.countLabel}>
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
								values={{ count: recordings.aggregate?.count }}
							/>
						)}
					</Heading6>
					<div className={styles.row}>
						<div className={styles.duration}>
							{useFormattedDuration(duration)}
						</div>
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
							<CardSequence sequence={sequence} key={sequence.canonicalPath} />
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
			{recordings.nodes?.length ? (
				<>
					<LineHeading color={BaseColors.SALMON}>
						<FormattedMessage
							id="collectionDetail__teachingsLabel"
							defaultMessage="Individual Teachings"
							description="Collection Detail teachings label"
						/>
					</LineHeading>
					<CardGroup className={styles.cardGroup}>
						{recordings.nodes.map((recording) => (
							<CardRecording
								recording={recording}
								key={recording.canonicalPath}
							/>
						))}
					</CardGroup>
					{recordings.pageInfo.hasNextPage && (
						<Button
							type="secondaryInverse"
							href={makeCollectionTeachingsRoute(lang, id)}
							text={intl.formatMessage({
								id: 'collectionDetail__teachingsAllLabel',
								defaultMessage: 'See All Individual Teachings',
							})}
							IconLeft={ForwardIcon}
							className={styles.seeAllButton}
						/>
					)}
				</>
			) : null}
			{persons.nodes?.length ? (
				<>
					<LineHeading color={BaseColors.SALMON}>
						<FormattedMessage
							id="collectionDetail__presentersLabel"
							defaultMessage="Presenters"
							description="Collection Detail speakers label"
						/>
					</LineHeading>
					<CardGroup className={styles.cardGroup}>
						{persons.nodes.map((person) => (
							<CardPerson person={person} key={person.canonicalPath} />
						))}
					</CardGroup>
					{persons.pageInfo.hasNextPage && (
						<Button
							type="secondaryInverse"
							href={root.lang(lang).conferences.id(id).presenters.get()}
							text={intl.formatMessage({
								id: 'collectionDetail__presentersAllLabel',
								defaultMessage: 'See All Presenters',
							})}
							IconLeft={ForwardIcon}
							className={styles.seeAllButton}
						/>
					)}
				</>
			) : null}
		</Tease>
	);
}

export default withFailStates(CollectionDetail, {
	useShould404: ({ collection }) => !collection,
});
