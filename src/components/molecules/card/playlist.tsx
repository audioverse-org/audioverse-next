import Link from 'next/link';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading2 from '~components/atoms/heading2';
import Heading6 from '~components/atoms/heading6';
import { BaseColors } from '~lib/constants';
import root from '~lib/routes';
import useLanguageRoute from '~lib/useLanguageRoute';
import ListIcon from '~public/img/icons/fa-list.svg';

import TypeLockup from '../typeLockup';
import { CardPlaylistFragment } from './__generated__/playlist';
import CardWithTheme from './base/withTheme';
import styles from './playlist.module.scss';

interface Props {
	playlist: CardPlaylistFragment;
}

export default function CardPlaylist({ playlist }: Props): JSX.Element {
	const languageRoute = useLanguageRoute();
	const { id, title, recordings } = playlist;
	const theme = 'playlistItem';
	return (
		<CardWithTheme {...{ theme }}>
			<Link
				href={root.lang(languageRoute).library.playlist(id).get()}
				legacyBehavior
			>
				<a className={styles.container}>
					<div className={styles.stretch}>
						<TypeLockup
							Icon={ListIcon}
							iconColor={BaseColors.SALMON}
							label={
								<FormattedMessage
									id="cardPlaylist__typeLabel"
									defaultMessage="Playlist"
								/>
							}
							textColor={BaseColors.DARK}
						/>
						<Heading2 className={styles.title}>{title}</Heading2>
					</div>
					<div className={styles.details}>
						<Heading6
							sans
							unpadded
							uppercase
							loose
							className={styles.teachingsLabel}
						>
							<FormattedMessage
								id="cardPerson_teachingsLabel"
								defaultMessage="{count} teachings"
								description="Card person teachings count label"
								values={{ count: recordings.aggregate?.count }}
							/>
						</Heading6>
					</div>
				</a>
			</Link>
		</CardWithTheme>
	);
}
