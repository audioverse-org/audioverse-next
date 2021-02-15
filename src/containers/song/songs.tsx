import React from 'react';
import { GetSongsListPageDataQuery } from '@lib/generated/graphql';
import useLanguageRoute from '@lib/useLanguageRoute';
import { makeAlbumRoute } from '@lib/routes';
import { FormattedMessage } from 'react-intl';

export interface SongsProps {
	data: GetSongsListPageDataQuery;
}

function Songs({ data }: SongsProps): JSX.Element {
	const languageRoute = useLanguageRoute();

	return (
		<>
			<h2>
				<FormattedMessage
					id="songsListPage__albumTabLabel"
					defaultMessage="Albums"
					description="Songs list page album tab label"
				/>
			</h2>
			<ul>
				{data?.musicAlbums.nodes?.map((n) => (
					<li key={n.id}>
						<a href={makeAlbumRoute(languageRoute, n.id)}>
							<img src={n.imageWithFallback.url} alt={n.title} />
							<span>{n.title}</span>
							<span>{n.sponsor?.title}</span>
						</a>
					</li>
				))}
			</ul>
		</>
	);
}

export default Songs;
