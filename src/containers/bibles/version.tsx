import React from 'react';
import { GetVersionDetailPageDataQuery } from '@lib/generated/graphql';
import useLanguageRoute from '@lib/useLanguageRoute';
import { makeBibleBookRoute } from '@lib/routes';

type Books = NonNullable<
	NonNullable<GetVersionDetailPageDataQuery['audiobible']>['books']
>;

export interface VersionProps {
	books: Books;
}

export default function Version({ books }: VersionProps): JSX.Element {
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
