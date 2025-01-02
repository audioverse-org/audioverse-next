import useRouterQuery from '~src/lib/hooks/useRouterQuery';

const useLanguageRoute = (): string => {
	const { language = 'en' } = useRouterQuery();

	return language.toString();
};

export default useLanguageRoute;
