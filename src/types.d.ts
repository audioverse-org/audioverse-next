type ExactAlt<T, Shape> = T extends Shape
	? Exclude<keyof T, keyof Shape> extends never
		? T
		: never
	: never;

interface StaticPaths {
	paths: string[];
	fallback: boolean;
}

interface StaticProps<P> {
	props: P;
	revalidate: number;
}

// WORKAROUND: https://github.com/sindresorhus/type-fest/issues/117
type Must<T> = {
	[P in keyof T]-?: NonNullable<T[P]>;
};

declare module 'react-facebook-login/dist/facebook-login-render-props' {
	import {
		ReactFacebookLoginProps as _ReactFacebookLoginProps,
		ReactFacebookLoginState,
	} from 'react-facebook-login';

	export interface ReactFacebookLoginProps extends _ReactFacebookLoginProps {
		render: React.FC<{ onClick: () => void }>;
	}

	export default class ReactFacebookLogin extends React.Component<
		ReactFacebookLoginProps,
		ReactFacebookLoginState
	> {}
}
