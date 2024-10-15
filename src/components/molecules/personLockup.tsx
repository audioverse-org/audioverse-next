import React from 'react';

import { PersonLockupFragment } from './__generated__/personLockup';
import NamedAvatar, { INamedAvatarProps } from './namedAvatar';

type Props = {
	person: PersonLockupFragment;
	isLinked?: boolean;
} & Omit<INamedAvatarProps, 'name' | 'image' | 'href'>;

export default function PersonLockup({
	person: { name, imageWithFallback, canonicalPath },
	isLinked,
	...props
}: Props): JSX.Element {
	const href = isLinked ? canonicalPath : undefined;

	return (
		<NamedAvatar
			name={name}
			image={imageWithFallback.url}
			href={href}
			{...props}
		/>
	);
}
