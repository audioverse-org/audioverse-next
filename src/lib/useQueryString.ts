import useRouterQuery from '@lib/useRouterQuery';

export function useQueryString(key: string): string | undefined {
	return useRouterQuery()[key]?.toString();
}
