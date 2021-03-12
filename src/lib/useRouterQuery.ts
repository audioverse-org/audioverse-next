import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

export default function useRouterQuery(): ParsedUrlQuery {
	return useRouter()?.query || {};
}
