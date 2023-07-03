import Link from 'next/link';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading2 from '~src/components/atoms/heading2';
import Heading6 from '~src/components/atoms/heading6';
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

type Item = {
	entity: {
		__typename: string;
	};
};

const isSeries = (v: Item): boolean => v.entity.__typename === 'Sequence';
const isTeaching = (v: Item): boolean => v.entity.__typename === 'Recording';

function ItemCount({ topic }: CardTopicProps): JSX.Element {
	const n = topic.items.nodes || [];
	const count = n.length;
	const s = +n.some(isSeries);
	const t = +n.some(isTeaching);
	const f = `${s}${t}`;

	const bl = (
		<FormattedMessage
			id="cardTopic__countBoth"
			defaultMessage="{count, plural, one {# item} other {# items}}"
			values={{
				count,
			}}
		/>
	);

	const tl = (
		<FormattedMessage
			id="cardTopic__countTeachings"
			defaultMessage="{count, plural, one {# teaching} other {# teachings}}"
			values={{
				count,
			}}
		/>
	);

	const sl = (
		<FormattedMessage
			id="cardTopic__countSeries"
			defaultMessage="{count, plural, one {# series} other {# series}}"
			values={{
				count,
			}}
		/>
	);

	switch (f) {
		case '00':
			return bl;
		case '01':
			return tl;
		case '10':
			return sl;
		case '11':
			return bl;
		default:
			throw new Error(`Unreachable case`);
	}
}

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
						<ItemCount topic={topic} />
					</Heading6>
					<p className={styles.duration}>{duration}</p>
				</>
			</Link>
		</CardWithTheme>
	);
}
