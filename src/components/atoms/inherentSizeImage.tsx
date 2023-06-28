type Props = {
	src: string;
	title?: string;
};

export default function InherentSizeImage({ src, title }: Props): JSX.Element {
	/* eslint-disable-next-line @next/next/no-img-element, @mizdra/layout-shift/require-size-attributes */
	return <img alt={title} src={src} />;
}
