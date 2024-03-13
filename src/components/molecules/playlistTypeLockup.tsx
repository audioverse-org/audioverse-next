import React from 'react';
import { FormattedMessage } from 'react-intl';

import { BaseColors } from '~lib/constants';
import ListIcon from '~public/img/icons/fa-list.svg';

import TypeLockup from './typeLockup';

type Props = {
	unpadded?: boolean;
};

export default function PlaylistTypeLockup({ unpadded }: Props): JSX.Element {
	return (
		<TypeLockup
			Icon={ListIcon}
			label={
				<FormattedMessage id="playlistDetail__type" defaultMessage="Playlist" />
			}
			iconColor={BaseColors.SALMON}
			textColor={BaseColors.DARK}
			unpadded={unpadded}
		/>
	);
}
