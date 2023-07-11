import Link from 'next/link';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading2 from '~src/components/atoms/heading2';
import Heading6 from '~src/components/atoms/heading6';
import TopicItemCount from '~src/components/atoms/topicItemCount';
import { BaseColors } from '~src/lib/constants';
import root from '~src/lib/routes';
import { useFormattedDuration } from '~src/lib/time';
import useLanguageRoute from '~src/lib/useLanguageRoute';

import HatIcon from '../../../../public/img/icons/fa-layer-group.svg';
import TypeLockup from '../typeLockup';
import { CardTopicFragment } from './__generated__/topic';
import CardWithTheme from './base/withTheme';
import styles from './topic.module.scss';

type CardTopicProps = {
	topic: CardTopicFragment;
};

export default function CardTopic({ topic }: CardTopicProps): JSX.Element {
	const lang = useLanguageRoute();
	const duration = useFormattedDuration(topic.duration);

	return (
		<CardWithTheme theme="topic" className={styles.theme}>
			<Link
				className={styles.content}
				href={root.lang(lang).topics.id(topic.id).slug(topic.title).get()}
			>
				<>
					<TypeLockup
						Icon={HatIcon}
						label={
							<FormattedMessage
								defaultMessage="Topic"
								id="cardTopic__hatLabel"
							/>
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
					<p className={styles.duration}>{duration}</p>
				</>
			</Link>
		</CardWithTheme>
	);
}
