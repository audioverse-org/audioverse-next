import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Language } from '~src/__generated__/graphql';
import Loader from '~src/components/atoms/Loader';
import AddToPlaylistItem from '~src/components/molecules/addToPlaylistItem';

import {
	GetLibraryPlaylistsDataQueryVariables,
	useGetLibraryPlaylistsDataQuery,
} from '../../containers/library/playlist/__generated__/list';
import styles from './PlaylistList.module.scss';

type Props = {
	language: Language;
	recordingId: string | number;
};

const PlaylistList: React.FC<Props> = ({ language, recordingId }) => {
	const variables: GetLibraryPlaylistsDataQueryVariables = {
		language,
		first: 1500,
		offset: 0,
	};
	const { data, error, isLoading } = useGetLibraryPlaylistsDataQuery(variables);

	if (isLoading)
		return (
			<div>
				<Loader />
			</div>
		);
	if (error)
		return (
			<div>
				<FormattedMessage id="error" defaultMessage="Error" />
			</div>
		);

	return (
		<div className={styles.playlistList}>
			{data?.me?.user?.playlists?.nodes?.map((edge) => (
				<AddToPlaylistItem
					key={edge.id}
					item={edge}
					recordingId={recordingId}
				/>
			))}
		</div>
	);
};

export default PlaylistList;
