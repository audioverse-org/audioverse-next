import React from 'react';

import { BaseColors } from '@components/atoms/baseColors';
import { PersonLockupFragment } from '@lib/generated/graphql';

import NamedAvatar from './namedAvatar';

type Props = {
	person: PersonLockupFragment;
	textColor: BaseColors.DARK | BaseColors.WHITE | BaseColors.LIGHT_TONE;
	hoverColor?: BaseColors.RED | BaseColors.SALMON;
	isLinked?: boolean;
	small?: boolean;
};

export default function PersonLockup({
	person: { name, imageWithFallback, canonicalPath },
	isLinked,
	...props
}: Props): JSX.Element {
	return (
		<NamedAvatar
			name={name}
			image={imageWithFallback.url}
			href={isLinked ? canonicalPath : undefined}
			{...props}
		/>
	);
}
