import React from 'react';

import { CardTheme } from '@components/molecules/card/base/withHat';
import TeaseRecording from '@components/molecules/teaseRecording';
import { CardWithPlayableFragment } from '@lib/generated/graphql';

import CardWithHat from './withHat';

export interface CardWithPlayableProps {
	recording: CardWithPlayableFragment;
	theme: CardTheme;
	container?: {
		icon?: any;
		label: string;
		title: string | JSX.Element;
		content: JSX.Element;
		url: string;
	};
	hideHat?: boolean;
	hideSpeakers?: boolean;
}

export default function CardWithPlayable({
	recording,
	theme,
	container,
	hideHat,
	hideSpeakers,
}: CardWithPlayableProps): JSX.Element {
	return (
		<CardWithHat
			hat={container?.title && !hideHat ? container : undefined}
			theme={theme}
		>
			<TeaseRecording {...{ recording, theme, hideSpeakers }} />
		</CardWithHat>
	);
}
