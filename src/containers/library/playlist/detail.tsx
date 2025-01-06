import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Heading2 from '~components/atoms/heading2';
import Heading6 from '~components/atoms/heading6';
import HorizontalRule from '~components/atoms/horizontalRule';
import CardPlaylistItem from '~components/molecules/card/playlistItem';
import CardGroup from '~components/molecules/cardGroup';
import ContentWidthLimiter from '~components/molecules/contentWidthLimiter';
import DefinitionList, {
	IDefinitionListTerm,
} from '~components/molecules/definitionList';
import Tease from '~components/molecules/tease';
import { BaseColors } from '~lib/constants';
import { formatLongDateTime } from '~lib/date';
import ButtonShare from '~src/components/molecules/buttonShare';
import IconButton from '~src/components/molecules/iconButton';
import PlaylistTypeLockup from '~src/components/molecules/playlistTypeLockup';
import AndFailStates from '~src/components/templates/andFailStates';
import root from '~src/lib/routes';
import useLanguageRoute from '~src/lib/useLanguageRoute';
import { Must } from '~src/types/types';

import ShareIcon from '../../../../public/img/icons/share-alt-light.svg';
import EditPlaylist from '../../../../src/pages/[language]/library/playlists/edit';
import Modal from '../../../components/organisms/modal';
import { GetPlaylistPageDataQuery } from './__generated__/detail';
import styles from './detail.module.scss';

export type IPlaylistDetailProps = {
	playlist: GetPlaylistPageDataQuery['playlist'];
};

function PlaylistDetail({ playlist }: Must<IPlaylistDetailProps>): JSX.Element {
	const [isNotShareableOpen, setIsNotShareableOpen] = useState(false);
	const router = useRouter();
	const isPublicRoute = router.route === '/[language]/playlists/[playlist]';
	const languageRoute = useLanguageRoute();

	const { id, title, recordings, createdAt, summary, isPublic } = playlist;

	const details: IDefinitionListTerm[] = [];
	if (summary) {
		details.push({
			term: (
				<FormattedMessage
					id="playlistDetail__descriptionLabel"
					defaultMessage="Description"
				/>
			),
			definition: <div>{summary}</div>,
		});
	}

	if (createdAt && !isPublicRoute) {
		details.push({
			term: (
				<FormattedMessage
					id="playlistDetail__createdLabel"
					defaultMessage="Created"
				/>
			),
			definition: <p>{formatLongDateTime(createdAt)}</p>,
		});
	}

	return (
		<Tease className={styles.container}>
			<ContentWidthLimiter>
				<PlaylistTypeLockup />
				<Heading2 className={styles.title}>{title}</Heading2>
				<div className={styles.row}>
					<Heading6 sans loose uppercase unpadded className={styles.countLabel}>
						<FormattedMessage
							id="playlistDetail__partsCountLabel"
							defaultMessage="{count} Teachings"
							description="Playlist Detail teachings count label"
							values={{ count: recordings.aggregate?.count }}
						/>
					</Heading6>
					{!isPublic ? (
						<IconButton
							Icon={ShareIcon}
							color={BaseColors.DARK}
							onClick={(e) => {
								e.preventDefault();
								setIsNotShareableOpen(true);
							}}
							backgroundColor={BaseColors.CREAM}
						/>
					) : (
						<ButtonShare
							shareUrl={`https://audioverse.org/${languageRoute}/playlists/${id}`}
							rssUrl={root
								.lang(languageRoute)
								.playlists.playlist(id)
								.feed.get()}
							backgroundColor={BaseColors.CREAM}
							light={true}
							contentType="PLAYLIST"
							id={id}
							title={title}
						/>
					)}
					{!isPublicRoute && (
						<EditPlaylist
							id={id}
							title={title}
							summary={summary}
							isPublic={isPublic}
						/>
					)}
				</div>
				<HorizontalRule color={BaseColors.LIGHT_TONE} />
				<DefinitionList terms={details} textColor={BaseColors.DARK} />
			</ContentWidthLimiter>
			{recordings.nodes?.length ? (
				<CardGroup className={styles.cardGroup}>
					{recordings.nodes?.map((recording) => (
						<CardPlaylistItem
							recording={{
								...recording,
								canonicalPath: playlist.isPublic
									? root
											.lang(languageRoute)
											.playlists.playlist(id)
											.items(recording.canonicalPath)
											.get()
									: root
											.lang(languageRoute)
											.library.playlists(id)
											.items(recording.canonicalPath)
											.get(),
							}}
							key={recording.id}
						/>
					))}
				</CardGroup>
			) : null}

			<Modal
				open={isNotShareableOpen}
				onClose={() => setIsNotShareableOpen(false)}
				title={
					<FormattedMessage id="not_shareable_title" defaultMessage="Private" />
				}
			>
				<FormattedMessage
					id="not_shareable"
					defaultMessage="This Playlist is Private."
				/>
			</Modal>
		</Tease>
	);
}

const WithFailStates = (props: Parameters<typeof PlaylistDetail>[0]) => (
	<AndFailStates
		Component={PlaylistDetail}
		componentProps={props}
		options={{ should404: ({ playlist }) => !playlist }}
	/>
);
export default WithFailStates;
