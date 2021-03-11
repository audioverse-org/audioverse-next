import React from 'react';

import useLanguageRoute from '@lib/useLanguageRoute';

interface Listable {
	id: string;
	imageWithFallback?: {
		url?: string;
	};
}

interface TableListProps<T extends Listable> {
	nodes: T[];
	parseTitle: (n: T) => string;
	parseImageUrl?: (n: T) => string | undefined;
	makeEntryRoute: (languageRoute: string, node: T) => string;
	columns?: {
		name: string;
		View: ({ node }: { node: T }) => JSX.Element;
	}[];
}

export default function TableList<T extends Listable>({
	nodes,
	parseTitle,
	parseImageUrl = (n: T) => n.imageWithFallback?.url,
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
					const imageSrc = parseImageUrl(n);

					return (
						<tr key={n.id}>
							<td>
								{imageSrc && (
									<a href={route}>
										<img src={imageSrc} alt={title} />
									</a>
								)}
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
