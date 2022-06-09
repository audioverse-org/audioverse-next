import React from 'react';

import { PersonLockupFragment } from '@components/molecules/personLockup.gql';

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
	return (
		<NamedAvatar
			name={name}
			image={imageWithFallback.url}
			href={isLinked ? canonicalPath : undefined}
			{...props}
		/>
	);
}
