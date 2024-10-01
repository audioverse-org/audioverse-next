import React from 'react';

import { PersonLockupFragment } from './__generated__/personLockup';
import NamedAvatar, { INamedAvatarProps } from './namedAvatar';

type Props = {
	person: PersonLockupFragment;
	isLinked?: boolean;
	altPath?: string;
} & Omit<INamedAvatarProps, 'name' | 'image' | 'href'>;

// Function to extract the ID from the URL
function extractIdFromUrl(url: string): string | null {
	const regex = /\/presenters\/(\d+)\//;
	const match = url.match(regex);
	return match ? match[1] : null;
}

export default function PersonLockup({
	person: { name, imageWithFallback, canonicalPath },
	isLinked,
	altPath,
	...props
}: Props): JSX.Element {
	// Extract the ID from the canonicalPath
	const extractedId = extractIdFromUrl(canonicalPath);

	// Construct the href using altPath + ID if altPath exists and ID was extracted
	const href =
		altPath && extractedId
			? `${altPath}${extractedId}`
			: isLinked
			? canonicalPath
			: undefined;

	return (
		<NamedAvatar
			name={name}
			image={imageWithFallback.url}
			href={href}
			{...props}
		/>
	);
}
