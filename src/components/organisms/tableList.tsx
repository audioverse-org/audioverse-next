import React from 'react';

import useLanguageRoute from '@lib/useLanguageRoute';

interface TableListProps<T> {
	nodes: T[];
	parseTitle: (n: T) => string;
	parseImageUrl: (n: T) => string;
	parseKey: (n: T) => string;
	makeEntryRoute: (languageRoute: string, node: T) => string;
	columns?: {
		name: string;
		View: ({ node }: { node: T }) => JSX.Element;
	}[];
}

export default function TableList<T>({
	nodes,
	parseTitle,
	parseImageUrl,
	parseKey,
	makeEntryRoute,
	columns,
}: TableListProps<T>): JSX.Element {
	const languageRoute = useLanguageRoute();

	return (
		<table>
			<tbody>
				{nodes?.map((n) => {
					const route = makeEntryRoute(languageRoute, n);
					const title = parseTitle(n);

					return (
						<tr key={parseKey(n)}>
							<td>
								<a href={route}>
									<img src={parseImageUrl(n)} alt={title} />
								</a>
							</td>
							<td>
								<a href={route}>{title}</a>
							</td>
							{columns?.map(({ name, View }) => (
								<td key={name}>
									<View node={n} />
								</td>
							))}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
