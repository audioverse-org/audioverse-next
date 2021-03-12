import { ParsedUrlQuery } from 'querystring';

import { useRouter } from 'next/router';

export default function useRouterQuery(): ParsedUrlQuery {
	return useRouter()?.query || {};
}
