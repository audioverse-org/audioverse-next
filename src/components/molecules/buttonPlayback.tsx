import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { useIntl } from 'react-intl';

import IconButton from '~components/molecules/iconButton';
import { PlaybackContext } from '~components/templates/andPlaybackContext';
import { BaseColors } from '~lib/constants';

import IconListening from '../../../public/img/icons/icon-listening.svg';
import IconListeningAnimated from '../../../public/img/icons/icon-listening-animated.svg';

export default function ButtonPlayback(): JSX.Element {
	const context = useContext(PlaybackContext);
	const intl = useIntl();
	const { push } = useRouter();

	// TODO: Figure out how to use an anchor element instead of a button element for this component.
	// Could do this by updating the IconButton component to accept an href prop and choose which
	// element to render based on whether an href or onclick prop was provided.
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
