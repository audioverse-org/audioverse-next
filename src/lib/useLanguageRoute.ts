import useRouterQuery from '@lib/useRouterQuery';

const useLanguageRoute = (): string => {
	const { language = 'en' } = useRouterQuery();

	return language.toString();
};

export default useLanguageRoute;
