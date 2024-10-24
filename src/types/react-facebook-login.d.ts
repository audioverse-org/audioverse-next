import { FB } from '@greatsumini/react-facebook-login';

declare global {
	interface Window {
		FB?: FB;
		fbAsyncInit?: () => void;
	}
}
