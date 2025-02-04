import React from 'react';
import { FormattedMessage } from 'react-intl';

import Link from '~components/atoms/linkWithoutPrefetch';
import ButtonShare from '~components/molecules/buttonShare';
import Icon from '~public/img/icons/fa-layer-group.svg';
import Heading2 from '~src/components/atoms/heading2';
import Heading6 from '~src/components/atoms/heading6';
import HorizontalRule from '~src/components/atoms/horizontalRule';
import LineHeading from '~src/components/atoms/lineHeading';
import TopicItemCount from '~src/components/atoms/topicItemCount';
import { CardRecordingFragment } from '~src/components/molecules/card/__generated__/recording';
import { CardSequenceFragment } from '~src/components/molecules/card/__generated__/sequence';
import Recording from '~src/components/molecules/card/recording';
import Sequence from '~src/components/molecules/card/sequence';
import CardGroup from '~src/components/molecules/cardGroup';
import ContentWidthLimiter from '~src/components/molecules/contentWidthLimiter';
import DefinitionList, {
	IDefinitionListTerm,
} from '~src/components/molecules/definitionList';
import Tease from '~src/components/molecules/tease';
import TypeLockup from '~src/components/molecules/typeLockup';
import AndFailStates from '~src/components/templates/andFailStates';
import { BaseColors } from '~src/lib/constants';
import { useFormattedDuration } from '~src/lib/time';
import { Must } from '~src/types/types';

import { GetTopicDetailDataQuery } from './__generated__/detail';
import styles from './detail.module.scss';

type Item = CardRecordingFragment | CardSequenceFragment;

const isSeries = (v: Item): v is CardSequenceFragment =>
	v.__typename === 'Sequence';
const isTeaching = (v: Item): v is CardRecordingFragment =>
	v.__typename === 'Recording';

function Topic({ topic }: Must<GetTopicDetailDataQuery>): JSX.Element {
	const duration = useFormattedDuration(topic.duration);
	const items = topic.items.nodes?.map((n) => n.entity) ?? [];
	const series = items.filter(isSeries);
	const teachings = items.filter(isTeaching);

	const details: IDefinitionListTerm[] = [
		{
			term: (
				<FormattedMessage
					id="topicDetail__description"
					defaultMessage="Description"
				/>
			),
			definition: topic.description,
		},
		{
			term: (
				<FormattedMessage
					id="topicDetail__parentTopic"
					defaultMessage="Parent Topic"
				/>
			),
			definition: topic.parentTopic && (
				<Link href={topic.parentTopic.canonicalPath}>
					<a>{topic.parentTopic.title}</a>
				</Link>
			),
		},
	];

	const hasDetails = details.some((d) => !!d.definition);

	return (
		<Tease className={styles.container}>
			<ContentWidthLimiter>
				<TypeLockup
					Icon={Icon}
					label={
						<FormattedMessage id="topicDetail__label" defaultMessage="Topic" />
					}
					iconColor={BaseColors.SALMON}
					textColor={BaseColors.WHITE}
					unpadded
				/>
				<Heading2 unpadded className={styles.title}>
					{topic.title}
				</Heading2>
				<p className={styles.summary}>{topic.summary}</p>
				<Heading6 sans loose unpadded uppercase className={styles.count}>
					<TopicItemCount topic={topic} />
				</Heading6>
				<div className={styles.row}>
					<p className={styles.duration}>{duration}</p>
					<ButtonShare
						shareUrl={topic.shareUrl}
						backgroundColor={BaseColors.TOPIC_B}
						emailSubject={topic.title}
						contentType="TOPIC"
						id={topic.id}
						title={topic.title}
					/>
				</div>
				{hasDetails && (
					<>
						<HorizontalRule color={BaseColors.LIGHT_TONE} />
						<DefinitionList terms={details} textColor={BaseColors.LIGHT_TONE} />
					</>
				)}
			</ContentWidthLimiter>

			{!!series.length && (
				<>
					<LineHeading variant="overline" color={BaseColors.SALMON}>
						<FormattedMessage
							id="topicDetail__series"
							defaultMessage="Series"
						/>
					</LineHeading>

					<CardGroup className={styles.grid}>
						{series.map((s) => (
							<Sequence key={s.canonicalPath} sequence={s} />
						))}
					</CardGroup>
				</>
			)}

			{!!teachings.length && (
				<>
					<LineHeading variant="overline" color={BaseColors.SALMON}>
						<FormattedMessage
							id="topicDetail__teachings"
							defaultMessage="Teachings"
						/>
					</LineHeading>

					<CardGroup className={styles.grid}>
						{teachings.map((t) => (
							<Recording key={t.canonicalPath} recording={t} />
						))}
					</CardGroup>
				</>
			)}
		</Tease>
	);
}

const WithFailStates = (props: Parameters<typeof Topic>[0]) => (
	<AndFailStates
		Component={Topic}
		componentProps={props}
		options={{ should404: ({ topic }) => !topic }}
	/>
);
export default WithFailStates;
