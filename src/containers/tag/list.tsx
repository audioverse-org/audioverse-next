import React from 'react';
import { FormattedMessage } from 'react-intl';

import Pagination from '@components/molecules/pagination';
import { GetTagListPageDataQuery } from '@lib/generated/graphql';
import { makeTagRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

type Tags = NonNullable<GetTagListPageDataQuery['tags']['nodes']>;

export interface TagListProps {
	nodes: Tags;
	pagination: {
		current: number;
		total: number;
	};
}

function TagList({ pagination, nodes }: TagListProps): JSX.Element {
	const languageRoute = useLanguageRoute();

	return (
		<>
			<h1>
				<FormattedMessage
					id="tagListPage__title"
					defaultMessage="Tags"
					description="Tag list page title"
				/>
			</h1>
			<ul>
				{nodes &&
					nodes.map((t) => (
						<li key={t.id}>
							<a href={makeTagRoute(languageRoute, t.name)}>{t.name}</a>
						</li>
					))}
			</ul>
			<Pagination base={'/en/tags'} {...pagination} />
		</>
	);
}

export default TagList;
