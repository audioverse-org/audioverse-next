import { ParsedUrlQuery } from 'querystring';

import { useRouter } from 'next/router';

export default function useRouterQuery(): ParsedUrlQuery {
	const router = useRouter();
	return router?.query || {};
}
