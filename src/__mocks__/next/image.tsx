import transform from 'lodash/transform';
import { ImageProps } from 'next/image';
import React from 'react';

function Image(props: ImageProps): JSX.Element {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { width, height, className, unoptimized, ...rest } = props;
	const atts = transform(rest, (result: any, val, key) => {
		result[key.toLowerCase()] = val;
	});
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
