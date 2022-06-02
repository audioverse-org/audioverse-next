import { ParsedUrlQuery } from 'querystring';

import _ from 'next/router';

declare module 'next/router' {
	declare const __mockedRouter: NextRouter;
	declare function __loadRouter(router_?: Partial<NextRouter>): NextRouter;
	declare function __loadQuery(query?: ParsedUrlQuery): NextRouter;
}
