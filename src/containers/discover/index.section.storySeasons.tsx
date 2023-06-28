import { Maybe } from 'graphql/jsutils/Maybe';
import { useIntl } from 'react-intl';

import CardSequence from '~src/components/molecules/card/sequence';
import root from '~src/lib/routes';
import { useLanguageId } from '~src/lib/useLanguageId';
import useLanguageRoute from '~src/lib/useLanguageRoute';

import {
	GetDiscoverStorySeasonsQuery,
	useInfiniteGetDiscoverStorySeasonsQuery,
} from './__generated__';
import Section, { SectionNode } from './index.section';

type StorySeason = NonNullable<
	GetDiscoverStorySeasonsQuery['storySeasons']['nodes']
>[0];

function selectStorySeasons(p: GetDiscoverStorySeasonsQuery | undefined) {
	return p?.storySeasons.nodes;
}

function NodeStorySeason({
	node,
}: {
	node: SectionNode<StorySeason>;
}): JSX.Element {
	return <CardSequence sequence={node} />;
}

export default function StorySeasons(): JSX.Element {
	const languageRoute = useLanguageRoute();
	const language = useLanguageId();
	const intl = useIntl();
	const result = useInfiniteGetDiscoverStorySeasonsQuery(
		'after',
		{
			language,
			first: 3,
			after: null,
		},
		{
			getNextPageParam: (last: Maybe<GetDiscoverStorySeasonsQuery>) =>
				last?.storySeasons.pageInfo.hasNextPage
					? {
							language,
							first: 3,
							after: last.storySeasons.pageInfo.endCursor,
					  }
					: undefined,
		}
	);

	return (
		<Section<GetDiscoverStorySeasonsQuery, StorySeason>
			heading={intl.formatMessage({
				id: 'discover__storiesHeading',
				defaultMessage: 'Recent Stories',
			})}
			previous={intl.formatMessage({
				id: 'discover__storiesPrevious',
				defaultMessage: 'Previous recent stories',
			})}
			next={intl.formatMessage({
				id: 'discover__storiesNext',
				defaultMessage: 'Next recent stories',
			})}
			seeAllUrl={root.lang(languageRoute).stories.albums.get()}
			infiniteQueryResult={result}
			selectNodes={selectStorySeasons}
			Card={NodeStorySeason}
		/>
	);
}
