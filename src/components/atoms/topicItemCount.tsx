import React from 'react';
import { FormattedMessage } from 'react-intl';

type Item = {
	entity: {
		__typename: string;
	};
};

const isSeries = (v: Item): boolean => v.entity.__typename === 'Sequence';
const isTeaching = (v: Item): boolean => v.entity.__typename === 'Recording';

export default function TopicItemCount({
	topic,
}: {
	topic: {
		items: {
			nodes: Item[] | null;
		};
	};
}): JSX.Element {
	const n = topic.items.nodes || [];
	const count = n.length;
	const s = +n.some(isSeries);
	const t = +n.some(isTeaching);
	const f = `${s}${t}`;

	const bl = (
		<FormattedMessage
			id="topicItemCount__items"
			defaultMessage="{count, plural, one {# item} other {# items}}"
			values={{
				count,
			}}
		/>
	);

	const tl = (
		<FormattedMessage
			id="topicItemCount__teachings"
			defaultMessage="{count, plural, one {# teaching} other {# teachings}}"
			values={{
				count,
			}}
		/>
	);

	const sl = (
		<FormattedMessage
			id="topicItemCount__series"
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
