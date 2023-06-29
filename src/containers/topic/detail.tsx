import React from 'react';
import { FormattedMessage } from 'react-intl';

import Icon from '~public/img/icons/fa-layer-group.svg';
import Heading2 from '~src/components/atoms/heading2';
import LineHeading from '~src/components/atoms/lineHeading';
import withFailStates from '~src/components/HOCs/withFailStates';
import { CardRecordingFragment } from '~src/components/molecules/card/__generated__/recording';
import { CardSequenceFragment } from '~src/components/molecules/card/__generated__/sequence';
import Recording from '~src/components/molecules/card/recording';
import Sequence from '~src/components/molecules/card/sequence';
import CardGroup from '~src/components/molecules/cardGroup';
import ContentWidthLimiter from '~src/components/molecules/contentWidthLimiter';
import Tease from '~src/components/molecules/tease';
import { BaseColors } from '~src/lib/constants';
import { Must } from '~src/types/types';

import { GetTopicDetailDataQuery } from './__generated__/detail';
import styles from './detail.module.scss';

function Topic({ topic }: Must<GetTopicDetailDataQuery>): JSX.Element {
	const items = topic.items.nodes?.map((n) => n.entity) ?? [];
	const series: CardSequenceFragment[] = items?.filter(
		(n): n is CardSequenceFragment => n.__typename === 'Sequence'
	);
	const teachings: CardRecordingFragment[] = items?.filter(
		(n): n is CardRecordingFragment => n.__typename === 'Recording'
	);

	return (
		<Tease className={styles.container}>
			<ContentWidthLimiter>
				<p>
					<Icon />{' '}
					<FormattedMessage id="topicDetail__label" defaultMessage="Topic" />
				</p>
				<Heading2 className={styles.title}>{topic.title}</Heading2>
				<p>{topic.summary}</p>
				<p>{topic.items.aggregate?.count}</p>
				<p>{topic.duration}</p>
				<p>{topic.description}</p>
				<p>{topic.parentTopic?.title}</p>
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

export default withFailStates(Topic, {
	useShould404: ({ topic }) => !topic,
});
