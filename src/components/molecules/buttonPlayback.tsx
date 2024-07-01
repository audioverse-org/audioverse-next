import { useRouter } from 'next/router';
import React from 'react';
import { useIntl } from 'react-intl';

import IconButton from '~components/molecules/iconButton';
import { BaseColors } from '~lib/constants';
import IconListening from '~public/img/icons/icon-listening.svg';
import IconListeningAnimated from '~public/img/icons/icon-listening-animated.svg';
import useIsPaused from '~src/lib/media/useIsPaused';
import usePlayerRecording from '~src/lib/media/usePlayerRecording';

export default function ButtonPlayback(): JSX.Element {
	const intl = useIntl();
	const { push } = useRouter();
	const { recording } = usePlayerRecording();
	const { isPaused } = useIsPaused();

	// TODO: Figure out how to use an anchor element instead of a button element for this component.
	// Could do this by updating the IconButton component to accept an href prop and choose which
	// element to render based on whether an href or onclick prop was provided.
	return (
		<IconButton
			Icon={isPaused ? IconListening : IconListeningAnimated}
			onClick={() => push(recording?.canonicalPath || '')}
			color={BaseColors.RED}
			backgroundColor={BaseColors.CREAM}
			aria-label={intl.formatMessage({
				id: 'andNavigation__playing',
				defaultMessage: 'Playing',
			})}
		/>
	);
}
