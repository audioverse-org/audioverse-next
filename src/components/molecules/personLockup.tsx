import React from 'react';

import NamedAvatar, { INamedAvatarProps } from './namedAvatar';
import { PersonLockupFragment } from '@components/molecules/__generated__/personLockup';

type Props = {
	person: PersonLockupFragment;
	isLinked?: boolean;
} & Omit<INamedAvatarProps, 'name' | 'image' | 'href'>;

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
