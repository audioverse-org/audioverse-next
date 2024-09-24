import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading2 from '~components/atoms/heading2';
import HorizontalRule from '~components/atoms/horizontalRule';
import LineHeading from '~components/atoms/lineHeading';
import RoundImage from '~components/atoms/roundImage';
import withFailStates from '~components/HOCs/withFailStates';
import ButtonFavorite from '~components/molecules/buttonFavorite';
import ButtonShare from '~components/molecules/buttonShare';
import CardRecording from '~components/molecules/card/recording';
import CardGroup from '~components/molecules/cardGroup';
import ContentWidthLimiter from '~components/molecules/contentWidthLimiter';
import DefinitionList, {
	IDefinitionListTerm,
} from '~components/molecules/definitionList';
import PersonTypeLockup from '~components/molecules/personTypeLockup';
import Tease from '~components/molecules/tease';
import { useIsPersonFavorited } from '~lib/api/useIsPersonFavorited';
import { BaseColors } from '~lib/constants';
import root from '~lib/routes';
import useLanguageRoute from '~lib/useLanguageRoute';
import Heading6 from '~src/components/atoms/heading6';
import { GetPresenterDetailPageDataQuery } from '~src/containers/presenter/__generated__/detail';
import { Must } from '~src/types/types';

import {
	getCollectionBasicData,
	GetCollectionBasicDataQuery,
} from './__generated__/detail';
import styles from './presenter.module.scss';

export type PresenterDetailProps = GetPresenterDetailPageDataQuery & {
	collectionId: string; // Add collectionId as a prop
};

function PresenterDetail({
	person,
	collectionId, // Destructure collectionId from props
}: Must<PresenterDetailProps>): JSX.Element {
	const intl = useIntl();
	const lang = useLanguageRoute();
	const [conferenceBasic, setConferenceBasic] =
		useState<GetCollectionBasicDataQuery>(); // Manage state for collection data

	const {
		id,
		name,
		description,
		imageWithFallback,
		shareUrl,
		website,
		confrenceRecordings,
	} = person;

	const { isFavorited, toggleFavorited } = useIsPersonFavorited(person.id);

	// Fetch the collection data asynchronously
	useEffect(() => {
		const fetchCollectionData = async () => {
			const result = await getCollectionBasicData({ id: collectionId });
			setConferenceBasic(result);
		};
		fetchCollectionData();
	}, [collectionId]);

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
				<Link
					href={website}
					target="_blank"
					rel="noreferrer noopener"
					legacyBehavior
				>
					<a className="decorated">{website}</a>
				</Link>
			),
		});
	}

	return (
		<Tease className={styles.container}>
			<ContentWidthLimiter>
				<PersonTypeLockup />
				<div className={styles.titleLockup}>
					<div className={styles.image}>
						<RoundImage image={imageWithFallback.url} alt={name} large />
					</div>
					<Heading2 sans unpadded>
						{name}
					</Heading2>
				</div>

				<div className={styles.detailsRow}>
					<Heading6 sans unpadded uppercase loose className={styles.countLabel}>
						{!!confrenceRecordings.aggregate?.count && (
							<span>
								<FormattedMessage
									id="presenterDetail__teachingsCountLabel"
									defaultMessage="{count} Teachings"
									description="Presenter detail teachings count label"
									values={{
										count: confrenceRecordings.aggregate?.count,
									}}
								/>
							</span>
						)}
					</Heading6>
					<ButtonShare
						shareUrl={shareUrl}
						backgroundColor={BaseColors.SMART_PLAYLIST_H}
						emailSubject={name}
						light
						triggerClassName={styles.iconButton}
						rssUrl={root.lang(lang).presenters.id(id).feed.get()}
					/>
					<ButtonFavorite
						isFavorited={!!isFavorited}
						toggleFavorited={toggleFavorited}
						backgroundColor={BaseColors.SMART_PLAYLIST_H}
						light
						className={styles.iconButton}
					/>
				</div>
				<HorizontalRule color={BaseColors.LIGHT_TONE} />
				<DefinitionList terms={details} textColor={BaseColors.DARK} />
			</ContentWidthLimiter>

			{confrenceRecordings.nodes?.length ? (
				<>
					<LineHeading>
						<FormattedMessage
							id="presenterDetail__conferenceRecordingsLabel"
							defaultMessage="{conferenceTitle}"
							values={{
								conferenceTitle:
									conferenceBasic?.collection?.title || 'Conference Recordings',
							}}
						/>
					</LineHeading>
					<CardGroup className={styles.cardGroup}>
						{confrenceRecordings.nodes.map((recording) => (
							<CardRecording recording={recording} key={recording.id} />
						))}
					</CardGroup>
				</>
			) : null}
		</Tease>
	);
}

export default withFailStates(PresenterDetail, {
	useShould404: ({ person }) => !person,
});
