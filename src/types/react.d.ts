import 'react';

// WORKAROUND: Extend React's CSSProperties interface to allow CSS variables
// SOURCE: https://stackoverflow.com/questions/52005083/how-to-define-css-variables-in-style-attribute-in-react-and-typescript
declare module 'react' {
	interface CSSProperties {
		[key: `--${string}`]: string | number;
	}
}
