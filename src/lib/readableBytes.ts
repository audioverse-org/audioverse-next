// Source: https://ourcodeworld.com/articles/read/713/converting-bytes-to-human-readable-values-kb-mb-gb-tb-pb-eb-zb-yb-with-javascript
export function readableBytes(bytes: number | string): string {
	const i = Math.floor(Math.log(+bytes) / Math.log(1024));
	const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	const number = +(+bytes / Math.pow(1024, i)).toFixed(2);

	return `${number} ${sizes[i]}`;
}
