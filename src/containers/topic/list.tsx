import React from 'react';

import CardTopic from '~src/components/molecules/card/topic';

import { GetTopicListDataQuery } from './__generated__/list';

export default function Topics({ topics }: GetTopicListDataQuery): JSX.Element {
	return (
		<>
			{topics.nodes?.map((t) => (
				<CardTopic key={t.id} topic={t} />
			))}
		</>
	);
}
