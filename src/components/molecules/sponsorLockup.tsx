import React from 'react';

import NamedAvatar, { INamedAvatarProps } from './namedAvatar';
import { SponsorLockupFragment } from './__generated__/sponsorLockup';

type Props = {
	sponsor: SponsorLockupFragment;
	isLinked?: boolean;
} & Omit<INamedAvatarProps, 'name' | 'image' | 'href'>;

export default function SponsorLockup({
	sponsor: { title, image, canonicalPath },
	isLinked,
	...props
}: Props): JSX.Element {
	return (
		<NamedAvatar
			name={title}
			image={image?.url}
			href={isLinked ? canonicalPath : undefined}
			{...props}
		/>
	);
}
