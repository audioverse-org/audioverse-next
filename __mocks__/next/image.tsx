import { ImageProps } from 'next/image';

function Image(p: ImageProps): JSX.Element {
	/* eslint-disable @next/next/no-img-element */
	return (
		<img
			className={p.className}
			width={p.width}
			height={p.height}
			alt={p.alt}
			src={p.src.toString()}
			crossOrigin={p.crossOrigin}
			decoding={p.decoding}
			loading={p.loading}
			referrerPolicy={p.referrerPolicy}
			sizes={p.sizes}
			useMap={p.useMap}
		/>
	);
}

export default Image;
