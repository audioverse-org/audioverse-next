import Image from 'next/legacy/image';
import Link from 'next/link';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading2 from '~components/atoms/heading2';
import Heading6 from '~components/atoms/heading6';
import HorizontalRule from '~components/atoms/horizontalRule';
import InherentSizeImage from '~components/atoms/inherentSizeImage';
import withFailStates from '~components/HOCs/withFailStates';
import ButtonFavorite from '~components/molecules/buttonFavorite';
import ButtonShare from '~components/molecules/buttonShare';
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
import ConferencePresenters from '~src/components/organisms/cardSlider/section/conferencePresenters';
import ConferenceSeries from '~src/components/organisms/cardSlider/section/conferenceSeries';
import ConferenceTeachings from '~src/components/organisms/cardSlider/section/conferenceTeachings';
import { Must } from '~src/types/types';

import { GetCollectionDetailPageDataQuery } from './__generated__/detail';
import styles from './detail.module.scss';

const PAGE_SIZE = 20;

export type CollectionDetailProps = GetCollectionDetailPageDataQuery& {
	endCursor: string | null;
	hasNextPage: boolean;
};

function CollectionDetail({
	collection,
}: Must<CollectionDetailProps>): JSX.Element {
	const intl = useIntl();
	const lang = useLanguageRoute();
	const altPath = `/${lang}/conferences/${collection.id}/presenters/`;
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

	const formattedDuration = useFormattedDuration(duration);

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

				<ConferenceSeries collectionId={collection.id + ''} isDarkBg />

				<ConferencePresenters
					collectionId={collection.id + ''}
					altPath={altPath}
					altSeeAll={root.lang(lang).conferences.id(id).presenters.get()}
					isDarkBg
				/>

				<ConferenceTeachings collectionId={collection.id + ''} isDarkBg />
			</Tease>
		</>
	);
}

export default withFailStates(CollectionDetail, {
	useShould404: ({ collection }) => !collection,
});
