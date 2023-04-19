import { ImageProps } from 'next/image';
import React from 'react';

function Image(props: ImageProps): JSX.Element {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { width, height, className, unoptimized, priority, ...rest } = props;

	const atts = Object.entries(rest).reduce((acc, [k, v]) => ({
		...acc,
		[k.toLowerCase()]: v,
	}));
	/* eslint-disable @next/next/no-img-element */
	return (
		<img
			{...(atts as any)}
			className={className}
			width={width}
			height={height}
		/>
	);
}

export default Image;
