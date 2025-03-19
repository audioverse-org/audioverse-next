import useRouterQuery from '~src/lib/hooks/useRouterQuery';

export function useQueryString(key: string): string | undefined {
	return useRouterQuery()[key]?.toString();
}
