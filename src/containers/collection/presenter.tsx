import Link from 'next/link';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading2 from '~components/atoms/heading2';
import HorizontalRule from '~components/atoms/horizontalRule';
import LineHeading from '~components/atoms/lineHeading';
import RoundImage from '~components/atoms/roundImage';
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
import { CatalogEntityType } from '~src/__generated__/graphql';
import Heading6 from '~src/components/atoms/heading6';
import AndFailStates from '~src/components/templates/andFailStates';
import { GetConferencePresenterDetailPageDataQuery } from '~src/containers/collection/__generated__/presenter';
import { Must } from '~src/types/types';

import styles from './presenter.module.scss';

export type PresenterDetailProps = GetConferencePresenterDetailPageDataQuery;

function PresenterDetail({
	person,
	collection,
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
		conferenceRecordings,
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
				<Link href={website} target="_blank" rel="noreferrer noopener">
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
						{!!conferenceRecordings.aggregate?.count && (
							<span>
								<FormattedMessage
									id="presenterDetail__teachingsCountLabel"
									defaultMessage="{count} Teachings"
									description="Presenter detail teachings count label"
									values={{ count: conferenceRecordings.aggregate?.count }}
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
						contentType={CatalogEntityType.Person}
						id={id}
						title={name}
					/>
					<ButtonFavorite
						isFavorited={!!isFavorited}
						toggleFavorited={toggleFavorited}
						backgroundColor={BaseColors.SMART_PLAYLIST_H}
						light
						className={styles.iconButton}
						contentType={CatalogEntityType.Person}
						id={id}
						title={name}
					/>
				</div>
				<HorizontalRule color={BaseColors.LIGHT_TONE} />
				<DefinitionList terms={details} textColor={BaseColors.DARK} />
			</ContentWidthLimiter>

			{conferenceRecordings.nodes?.length ? (
				<>
					<LineHeading>
						<FormattedMessage
							id="presenterDetail__conferenceRecordingsLabel"
							defaultMessage="{conferenceTitle}"
							values={{
								conferenceTitle: collection.title || 'Conference Recordings',
							}}
						/>
					</LineHeading>
					<CardGroup className={styles.cardGroup}>
						{conferenceRecordings.nodes.map((recording) => (
							<CardRecording recording={recording} key={recording.id} />
						))}
					</CardGroup>
				</>
			) : null}
		</Tease>
	);
}

const WithFailStates = (props: Parameters<typeof PresenterDetail>[0]) => (
	<AndFailStates
		Component={PresenterDetail}
		componentProps={props}
		options={{ should404: ({ person }) => !person }}
	/>
);
export default WithFailStates;
