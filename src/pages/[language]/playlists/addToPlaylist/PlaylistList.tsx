// components/PlaylistList.tsx
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Language } from '~src/__generated__/graphql';
import Loader from '~src/components/atoms/Loader';

import {
	GetLibraryPlaylistsQueryVariables,
	useGetLibraryPlaylistsQuery,
} from '../../library/playlists/__generated__/query';
import AddToPlaylistItem from './AddToPlaylistItem';
import styles from './PlaylistList.module.css';

type Props = {
	language: Language;
	recordingId: string | number;
};

const PlaylistList: React.FC<Props> = ({ language, recordingId }) => {
	const variables: GetLibraryPlaylistsQueryVariables = { language };
	const { data, error, isLoading } = useGetLibraryPlaylistsQuery(variables);

	if (isLoading)
		return (
			<div>
				<Loader />
			</div>
		);
	if (error) return;
	<div>
		<FormattedMessage id="error" defaultMessage="Error" />
	</div>;
	return (
		<div className={styles.playlistList}>
			{data?.me?.user?.playlists?.edges?.map((edge) => (
				<AddToPlaylistItem
					key={edge.node.id}
					item={edge.node}
					recordingId={recordingId}
				/>
			))}
		</div>
	);
};

export default PlaylistList;
