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

	declare function __setFacebookResponse(response: Partial<Response>): void;
}

declare module 'videojs-overlay';
