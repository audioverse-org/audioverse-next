import React from 'react';

import { GetBibleVersionsPageDataQuery } from '@lib/generated/graphql';
import { makeBibleVersionRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';
import withFailStates from '@components/HOCs/withFailStates';

type Versions = NonNullable<
	GetBibleVersionsPageDataQuery['audiobibles']['nodes']
>;

export interface VersionsProps {
	versions: Versions;
}

function Versions({ versions }: VersionsProps): JSX.Element {
	const languageRoute = useLanguageRoute();

	return (
		<>
			<ul>
				{versions.map((v) => (
					<li key={v.id}>
						<a href={makeBibleVersionRoute(languageRoute, v.id)}>{v.title}</a>
					</li>
				))}
			</ul>
		</>
	);
}

export default withFailStates(Versions, ({ versions }) => !versions.length);
