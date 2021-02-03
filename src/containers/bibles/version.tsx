import React from 'react';

import withFailStates from '@components/HOCs/withFailStates';
import { GetVersionDetailPageDataQuery } from '@lib/generated/graphql';
import { makeBibleBookRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

type Books = NonNullable<
	NonNullable<GetVersionDetailPageDataQuery['audiobible']>['books']
>;

export interface VersionProps {
	books: Books;
}

function Version({ books }: VersionProps): JSX.Element {
	const languageRoute = useLanguageRoute();

	return (
		<>
			<ul>
				{books.map((b) => (
					<li key={b.id}>
						<a href={makeBibleBookRoute(languageRoute, b.id)}>{b.title}</a>
					</li>
				))}
			</ul>
		</>
	);
}

export default withFailStates(Version, (props) => !props.books.length);
