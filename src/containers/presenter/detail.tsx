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
import ButtonShare from '@components/molecules/buttonShare';
import CardCollection from '@components/molecules/card/collection';
import CardRecording from '@components/molecules/card/recording';
import CardSequence from '@components/molecules/card/sequence';
import CardGroup from '@components/molecules/cardGroup';
import DefinitionList, {
	IDefinitionListTerm,
} from '@components/molecules/definitionList';
import IconButton from '@components/molecules/iconButton';
import PersonTypeLockup from '@components/molecules/personTypeLockup';
import Tease from '@components/molecules/tease';
import TeaseHeader from '@components/molecules/teaseHeader';
import { useIsPersonFavorited } from '@lib/api/useIsPersonFavorited';
import { BaseColors } from '@lib/constants';
import { GetPresenterDetailPageDataQuery } from '@lib/generated/graphql';
import {
	makePresenterAlsoAppearsInRoute,
	makePresenterFeedRoute,
	makePresenterRecordingsRoute,
	makePresenterSequencesRoute,
	makePresenterTopRecordingsRoute,
} from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import ForwardIcon from '../../../public/img/icon-forward-light.svg';
import LikeActiveIcon from '../../../public/img/icon-like-active.svg';
import LikeIcon from '../../../public/img/icon-like-light.svg';

import styles from './detail.module.scss';

export type PresenterDetailProps = GetPresenterDetailPageDataQuery;

function PresenterDetail({
	person,
	collections,
	sequences,
}: Must<PresenterDetailProps>): JSX.Element {
	const intl = useIntl();
	const lang = useLanguageRoute();

	const {
		id,
		name,
		description,
		imageWithFallback,
		shareUrl,
		website,
		sermons,
		audiobookTracks,
		musicTracks,
		stories,
		essentialRecordings,
		recentRecordings,
		topRecordings,
	} = person;
	const { isFavorited, toggleFavorited } = useIsPersonFavorited(person.id);

	const details: IDefinitionListTerm[] = [];
	if (description) {
		details.push({
			term: intl.formatMessage({
				id: `presenterDetail__descriptionLabel`,
				defaultMessage: 'Description',
			}),
			definition: <div dangerouslySetInnerHTML={{ __html: description }} />,
		});
	}
	if (website) {
		details.push({
			term: intl.formatMessage({
				id: `presenterDetail__websiteLabel`,
				defaultMessage: 'Website',
			}),
			definition: (
				<Link href={website}>
					<a target="_blank" rel="noreferrer noopener" className="decorated">
						{website}
					</a>
				</Link>
			),
		});
	}

	return (
		<Tease className={styles.container}>
			<TeaseHeader>
				<PersonTypeLockup />
				<div className={styles.titleLockup}>
					<div className={styles.image}>
						<RoundImage image={imageWithFallback.url} alt={name} />
					</div>
					<Heading2 sans unpadded>
						{name}
					</Heading2>
				</div>

				<div className={styles.detailsRow}>
					<Heading6 sans unpadded uppercase loose className={styles.countLabel}>
						{!!sermons.aggregate?.count && (
							<span>
								<FormattedMessage
									id="presenterDetail__teachingsCountLabel"
									defaultMessage="{count} Teachings"
									description="Presenter detail teachings count label"
									values={{
										count: sermons.aggregate?.count,
									}}
								/>
							</span>
						)}
						{!!audiobookTracks.aggregate?.count && (
							<span>
								<FormattedMessage
									id="presenterDetail__audiobookTracksCountLabel"
									defaultMessage="{count} Audiobook Tracks"
									description="Presenter detail audiobook tracks count label"
									values={{
										count: audiobookTracks.aggregate?.count,
									}}
								/>
							</span>
						)}
						{!!musicTracks.aggregate?.count && (
							<span>
								<FormattedMessage
									id="presenterDetail__musicTracksCountLabel"
									defaultMessage="{count} Music Tracks"
									description="Presenter detail music tracks count label"
									values={{
										count: musicTracks.aggregate?.count,
									}}
								/>
							</span>
						)}
						{!!stories.aggregate?.count && (
							<span>
								<FormattedMessage
									id="presenterDetail__storiesCountLabel"
									defaultMessage="{count} Stories"
									description="Presenter detail stories count label"
									values={{
										count: stories.aggregate?.count,
									}}
								/>
							</span>
						)}
					</Heading6>
					<IconButton
						Icon={isFavorited ? LikeActiveIcon : LikeIcon}
						onClick={() => toggleFavorited()}
						color={isFavorited ? BaseColors.RED : BaseColors.DARK}
						backgroundColor={BaseColors.SMART_PLAYLIST_H}
						className={styles.iconButton}
					/>
					<ButtonShare
						shareUrl={shareUrl}
						backgroundColor={BaseColors.SMART_PLAYLIST_H}
						light
						triggerClassName={styles.iconButton}
						rssUrl={makePresenterFeedRoute(lang, id)}
					/>
				</div>
				<HorizontalRule color={BaseColors.LIGHT_TONE} />
				<DefinitionList terms={details} textColor={BaseColors.DARK} />
			</TeaseHeader>
			{essentialRecordings.nodes?.length ? (
				<>
					<LineHeading>
						<FormattedMessage
							id="presenterDetail__essentialRecordingsLabel"
							defaultMessage="Essential {name}"
							values={{
								name,
							}}
						/>
					</LineHeading>
					<CardGroup className={styles.cardGroup}>
						{essentialRecordings.nodes.map((recording) => (
							<CardRecording recording={recording} key={recording.id} />
						))}
					</CardGroup>
				</>
			) : null}
			{recentRecordings.nodes?.length ? (
				<>
					<LineHeading>
						<FormattedMessage
							id="presenterDetail__recentRecordingsLabel"
							defaultMessage="Recent"
						/>
					</LineHeading>
					<CardGroup className={styles.cardGroup}>
						{recentRecordings.nodes.map((recording) => (
							<CardRecording recording={recording} key={recording.id} />
						))}
					</CardGroup>
					{recentRecordings.pageInfo.hasNextPage && (
						<Button
							type="secondary"
							href={makePresenterRecordingsRoute(lang, id)}
							text={intl.formatMessage({
								id: 'presenterDetail__recentAllLabel',
								defaultMessage: 'See All Recent',
							})}
							Icon={ForwardIcon}
							iconPosition="left"
							className={styles.seeAllButton}
						/>
					)}
				</>
			) : null}
			{topRecordings.nodes?.length ? (
				<>
					<LineHeading>
						<FormattedMessage
							id="presenterDetail__topRecordingsLabel"
							defaultMessage="Most Listened"
						/>
					</LineHeading>
					<CardGroup className={styles.cardGroup}>
						{topRecordings.nodes.map((recording) => (
							<CardRecording recording={recording} key={recording.id} />
						))}
					</CardGroup>
					{recentRecordings.pageInfo.hasNextPage && (
						<Button
							type="secondary"
							href={makePresenterTopRecordingsRoute(lang, id)}
							text={intl.formatMessage({
								id: 'presenterDetail__topAllLabel',
								defaultMessage: 'See More Most Listened',
							})}
							Icon={ForwardIcon}
							iconPosition="left"
							className={styles.seeAllButton}
						/>
					)}
				</>
			) : null}
			{sequences.nodes?.length ? (
				<>
					<LineHeading>
						<FormattedMessage
							id="presenterDetail__seriesLabel"
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
							type="secondary"
							href={makePresenterSequencesRoute(lang, id)}
							text={intl.formatMessage({
								id: 'presenterDetail__seriesAllLabel',
								defaultMessage: 'See All Series',
							})}
							Icon={ForwardIcon}
							iconPosition="left"
							className={styles.seeAllButton}
						/>
					)}
				</>
			) : null}
			{collections.nodes?.length ? (
				<>
					<LineHeading>
						<FormattedMessage
							id="presenterDetail__alsoAppearsInLabel"
							defaultMessage="Also Appears In"
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
					{collections.pageInfo.hasNextPage && (
						<Button
							type="secondary"
							href={makePresenterAlsoAppearsInRoute(lang, id)}
							text={intl.formatMessage({
								id: 'presenterDetail__speakersAllLabel',
								defaultMessage: 'See All Also Appears In',
							})}
							Icon={ForwardIcon}
							iconPosition="left"
							className={styles.seeAllButton}
						/>
					)}
				</>
			) : null}
		</Tease>
	);
}

export default withFailStates(PresenterDetail, ({ person }) => !person);
