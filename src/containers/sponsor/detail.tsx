import Link from 'next/link';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading2 from '@components/atoms/heading2';
import Heading6 from '@components/atoms/heading6';
import HorizontalRule from '@components/atoms/horizontalRule';
import LineHeading from '@components/atoms/lineHeading';
import RoundImage from '@components/atoms/roundImage';
import withFailStates from '@components/HOCs/withFailStates';
import Button from '@components/molecules/button';
import CardCollection from '@components/molecules/card/collection';
import CardRecording from '@components/molecules/card/recording';
import CardSequence from '@components/molecules/card/sequence';
import CardGroup from '@components/molecules/cardGroup';
import DefinitionList, {
	IDefinitionListTerm,
} from '@components/molecules/definitionList';
import IconButton from '@components/molecules/iconButton';
import SponsorTypeLockup from '@components/molecules/sponsorTypeLockup';
import Tease from '@components/molecules/tease';
import TeaseHeader from '@components/molecules/teaseHeader';
import { useIsSponsorFavorited } from '@lib/api/useIsSponsorFavorited';
import { BaseColors } from '@lib/constants';
import { GetSponsorDetailPageDataQuery } from '@lib/generated/graphql';
import {
	makeSponsorConferencesRoute,
	makeSponsorSeriesRoute,
	makeSponsorTeachingsRoute,
} from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import ForwardIcon from '../../../public/img/icon-forward-light.svg';
import LikeActiveIcon from '../../../public/img/icon-like-active.svg';
import LikeIcon from '../../../public/img/icon-like-light.svg';
import ShareIcon from '../../../public/img/icon-share-light.svg';

import styles from './detail.module.scss';

export type SponsorDetailProps = GetSponsorDetailPageDataQuery;

function SponsorDetail({ sponsor }: Must<SponsorDetailProps>): JSX.Element {
	const intl = useIntl();
	const languageRoute = useLanguageRoute();
	const { isFavorited, toggleFavorited } = useIsSponsorFavorited(sponsor.id);

	const {
		id,
		collections,
		description,
		imageWithFallback,
		location,
		title,
		website,
		recordings,
		sequences,
	} = sponsor;
	const image = imageWithFallback.url;

	const details: IDefinitionListTerm[] = [];
	if (description) {
		details.push({
			term: intl.formatMessage({
				id: `sponsorDetail__descriptionLabel`,
				defaultMessage: 'Description',
			}),
			definition: <div dangerouslySetInnerHTML={{ __html: description }} />,
		});
	}
	if (website) {
		details.push({
			term: intl.formatMessage({
				id: `sponsorDetail__websiteLabel`,
				defaultMessage: 'Website',
			}),
			definition: (
				<Link href={website}>
					<a className="decorated" target="_blank" rel="nofollow noreferrer">
						{website}
					</a>
				</Link>
			),
		});
	}
	if (location) {
		details.push({
			term: intl.formatMessage({
				id: `sponsorDetail__locationLabel`,
				defaultMessage: 'Location',
			}),
			definition: <div>{location}</div>,
		});
	}

	return (
		<Tease className={styles.container}>
			<TeaseHeader>
				<SponsorTypeLockup />
				<div className={styles.titleLockup}>
					{image && (
						<div className={styles.logo}>
							<RoundImage image={image} alt={title} />
						</div>
					)}
					<Heading2 sans unpadded>
						{title}
					</Heading2>
				</div>
				<div className={styles.row}>
					<Heading6 sans loose uppercase unpadded className={styles.countLabel}>
						{collections.nodes?.length ? (
							<FormattedMessage
								id="sponsorDetail__collectionCountLabel"
								defaultMessage="{count} Conferences"
								description="Sponsor Detail collection count label"
								values={{ count: collections.aggregate?.count }}
							/>
						) : sequences.nodes?.length ? (
							<FormattedMessage
								id="sponsorDetail__sequencesCountLabel"
								defaultMessage="{count} Series"
								description="Sponsor Detail series count label"
								values={{ count: sequences.aggregate?.count }}
							/>
						) : (
							<FormattedMessage
								id="sponsorDetail__recordingsCountLabel"
								defaultMessage="{count} Teachings"
								description="Sponsor Detail teachings count label"
								values={{ count: recordings.aggregate?.count }}
							/>
						)}
					</Heading6>
					{/* TODO: make icons functional */}
					<IconButton
						Icon={ShareIcon}
						onPress={() => void 0}
						color={BaseColors.DARK}
						backgroundColor={BaseColors.LIGHT_TONE}
						className={styles.iconButton}
					/>
					<IconButton
						Icon={isFavorited ? LikeActiveIcon : LikeIcon}
						onPress={() => toggleFavorited()}
						color={isFavorited ? BaseColors.RED : BaseColors.DARK}
						backgroundColor={BaseColors.LIGHT_TONE}
						className={styles.iconButton}
					/>
				</div>
				<HorizontalRule color={BaseColors.MID_TONE} />
				<DefinitionList terms={details} textColor={BaseColors.DARK} />
			</TeaseHeader>
			{recordings.nodes?.length ? (
				<>
					<LineHeading>
						<FormattedMessage
							id="sponsorDetail__recentLabel"
							defaultMessage="Recent Teachings"
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
					<Button
						type="secondary"
						href={makeSponsorTeachingsRoute(languageRoute, id)}
						text={intl.formatMessage({
							id: 'sponsorDetail__recentAllLabel',
							defaultMessage: 'See All Recent Teachings',
						})}
						Icon={ForwardIcon}
						iconPosition="left"
						className={styles.seeAllButton}
					/>
				</>
			) : null}
			{sequences.nodes?.length ? (
				<>
					<LineHeading>
						<FormattedMessage
							id="sponsorDetail__seriesLabel"
							defaultMessage="Series"
							description="Collection Detail series label"
						/>
					</LineHeading>
					<CardGroup className={styles.cardGroup}>
						{sequences.nodes.map((sequence) => (
							<CardSequence sequence={sequence} key={sequence.canonicalPath} />
						))}
					</CardGroup>
					<Button
						type="secondary"
						href={makeSponsorSeriesRoute(languageRoute, id)}
						text={intl.formatMessage({
							id: 'sponsorDetail__seriesAllLabel',
							defaultMessage: 'See All Series',
						})}
						Icon={ForwardIcon}
						iconPosition="left"
						className={styles.seeAllButton}
					/>
				</>
			) : null}
			{collections.nodes?.length ? (
				<>
					<LineHeading>
						<FormattedMessage
							id="sponsorDetail__conferencesLabel"
							defaultMessage="Conferences"
						/>
					</LineHeading>
					<CardGroup className={styles.cardGroup}>
						{collections.nodes.map((collection) => (
							<CardCollection
								collection={collection}
								key={collection.canonicalPath}
							/>
						))}
					</CardGroup>
					<Button
						type="secondary"
						href={makeSponsorConferencesRoute(languageRoute, id)}
						text={intl.formatMessage({
							id: 'sponsorDetail__conferencesAllLabel',
							defaultMessage: 'See All Conferences',
						})}
						Icon={ForwardIcon}
						iconPosition="left"
						className={styles.seeAllButton}
					/>
				</>
			) : null}
		</Tease>
	);
}

export default withFailStates(SponsorDetail, ({ sponsor }) => !sponsor);
