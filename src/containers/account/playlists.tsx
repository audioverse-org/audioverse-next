import React from 'react';
import { useGetAccountPlaylistsPageDataQuery } from '@lib/generated/graphql';
import { useLanguageId } from '@lib/useLanguageId';

function Playlists(): JSX.Element {
	const language = useLanguageId();
	const { data } = useGetAccountPlaylistsPageDataQuery({ language });
	const playlists = data?.me?.user.playlists.nodes || [];

	return (
		<>
			<ul>
				{playlists.map((p) => (
					<li key={p.id}>
						<h4>{p.title}</h4>
						<span>{p.recordings.aggregate?.count}</span>
						<span>{p.isPublic ? 'public' : 'private'}</span>
						<span>{p.summary}</span>
					</li>
				))}
			</ul>
		</>
	);
}

export default Playlists;
