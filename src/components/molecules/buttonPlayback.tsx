import { PlaybackContext } from '@components/templates/andPlaybackContext';
import IconButton from '@components/molecules/iconButton';
import React, { useContext } from 'react';
import IconListeningAnimated from '../../../public/img/icons/icon-listening-animated.svg';
import IconListening from '../../../public/img/icons/icon-listening.svg';
import { BaseColors } from '@lib/constants';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';

export default function ButtonPlayback(): JSX.Element {
	const context = useContext(PlaybackContext);
	const intl = useIntl();
	const { push } = useRouter();

	// TODO: Figure out how to use an anchor element instead of a button element for this component
	return (
		<IconButton
			Icon={context.paused() ? IconListening : IconListeningAnimated}
			onClick={() => {
				const recording = context.getRecording();
				const path = recording?.canonicalPath || '';
				push(path);
			}}
			color={BaseColors.RED}
			backgroundColor={BaseColors.CREAM}
			aria-label={intl.formatMessage({
				id: 'andNavigation__playing',
				defaultMessage: 'Playing',
			})}
		/>
	);
}
