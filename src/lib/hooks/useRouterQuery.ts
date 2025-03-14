import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

export default function useRouterQuery(): ParsedUrlQuery {
	const router = useRouter();
	return router?.query || {};
}
