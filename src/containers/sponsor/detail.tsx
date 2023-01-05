import Link from 'next/link';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading2 from '@/components/atoms/heading2';
import Heading6 from '@/components/atoms/heading6';
import HorizontalRule from '@/components/atoms/horizontalRule';
import LineHeading from '@/components/atoms/lineHeading';
import RoundImage from '@/components/atoms/roundImage';
import withFailStates from '@/components/HOCs/withFailStates';
import Button from '@/components/molecules/button';
import ButtonFavorite from '@/components/molecules/buttonFavorite';
import ButtonShare from '@/components/molecules/buttonShare';
import CardCollection from '@/components/molecules/card/collection';
import CardRecording from '@/components/molecules/card/recording';
import CardSequence from '@/components/molecules/card/sequence';
import CardGroup from '@/components/molecules/cardGroup';
import ContentWidthLimiter from '@/components/molecules/contentWidthLimiter';
import DefinitionList, {
	IDefinitionListTerm,
} from '@/components/molecules/definitionList';
import SponsorTypeLockup from '@/components/molecules/sponsorTypeLockup';
import Tease from '@/components/molecules/tease';
import { useIsSponsorFavorited } from '@/lib/api/useIsSponsorFavorited';
import { BaseColors } from '@/lib/constants';
import { GetSponsorDetailPageDataQuery } from '@/lib/generated/graphql';
import {
	makeSponsorConferencesRoute,
	makeSponsorFeedRoute,
	makeSponsorSeriesRoute,
	makeSponsorTeachingsRoute,
} from '@/lib/routes';
import useLanguageRoute from '@/lib/useLanguageRoute';

import ForwardIcon from '../../../public/img/icons/icon-forward-light.svg';

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
		image,
		location,
		title,
		website,
		shareUrl,
		recordings,
		sequences,
	} = sponsor;

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
				<Link
					href={website}
					target="_blank"
					rel="nofollow noreferrer"
					legacyBehavior
				>
					<a className="decorated">{website}</a>
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
			<ContentWidthLimiter>
				<SponsorTypeLockup />
				<div className={styles.titleLockup}>
					{image && (
						<div className={styles.logo}>
							<RoundImage image={image.url} alt={title} large />
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
					<ButtonShare
						shareUrl={shareUrl}
						backgroundColor={BaseColors.LIGHT_TONE}
						emailSubject={title}
						light
						triggerClassName={styles.iconButton}
						rssUrl={makeSponsorFeedRoute(languageRoute, id)}
					/>
					<ButtonFavorite
						isFavorited={!!isFavorited}
						toggleFavorited={toggleFavorited}
						backgroundColor={BaseColors.LIGHT_TONE}
						light
						className={styles.iconButton}
					/>
				</div>
				<HorizontalRule color={BaseColors.MID_TONE} />
				<DefinitionList terms={details} textColor={BaseColors.DARK} />
			</ContentWidthLimiter>
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
								hideSponsorHat
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
						IconLeft={ForwardIcon}
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
						IconLeft={ForwardIcon}
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
						IconLeft={ForwardIcon}
						className={styles.seeAllButton}
					/>
				</>
			) : null}
		</Tease>
	);
}

export default withFailStates(SponsorDetail, {
	useShould404: ({ sponsor }) => !sponsor,
});
