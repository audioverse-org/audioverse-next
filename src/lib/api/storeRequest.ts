import { IncomingMessage } from 'http';

let _request: IncomingMessage | null = null;

export function storeRequest(request: IncomingMessage): void {
	_request = request;
}

export function getCurrentRequest(): IncomingMessage | null {
	return _request;
}
