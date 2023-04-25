import _ from 'next/router';
import { ParsedUrlQuery } from 'querystring';

declare module 'next/router' {
	declare const __mockedRouter: NextRouter;
	declare function __loadRouter(router_?: Partial<NextRouter>): NextRouter;
	declare function __loadQuery(query?: ParsedUrlQuery): NextRouter;
}
