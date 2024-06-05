import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Language } from '~src/__generated__/graphql';
import Loader from '~src/components/atoms/Loader';

import {
	GetLibraryPlaylistsQueryVariables,
	useGetLibraryPlaylistsQuery,
} from '../../../../../containers/library/playlist/__generated__/query';
import AddToPlaylistItem from './AddToPlaylistItem';
import styles from './PlaylistList.module.css';

type Props = {
	language: Language;
	recordingId: string | number;
};

const PlaylistList: React.FC<Props> = ({ language, recordingId }) => {
	const variables: GetLibraryPlaylistsQueryVariables = { language };
	const { data, error, isLoading } = useGetLibraryPlaylistsQuery(variables);

	const containerRef = useRef<HTMLDivElement>(null);
	const [isScrollable, setIsScrollable] = useState(false);

	useEffect(() => {
		const checkScrollable = () => {
			if (containerRef.current) {
				const isOverflowing =
					containerRef.current.scrollHeight > containerRef.current.clientHeight;
				setIsScrollable(isOverflowing);
			}
		};

		checkScrollable();

		const resizeObserver = new ResizeObserver(checkScrollable);
		if (containerRef.current) {
			resizeObserver.observe(containerRef.current);
		}

		return () => {
			resizeObserver.disconnect();
		};
	}, [data]);

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
		<div className={styles.playlistList} ref={containerRef}>
			{data?.me?.user?.playlists?.edges?.map((edge) => (
				<AddToPlaylistItem
					key={edge.node.id}
					item={edge.node}
					recordingId={recordingId}
				/>
			))}
			{isScrollable && (
				<>
					<div className={styles.scrollIndicator}>
						<FormattedMessage
							id="scroll-down"
							defaultMessage="Scroll down for more"
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default PlaylistList;
