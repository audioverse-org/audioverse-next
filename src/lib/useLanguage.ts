import _ from 'lodash';
import { useRouter } from 'next/router';

const useLanguage = (): string => {
	const router = useRouter(),
		lang = _.get(router, 'query.language');

	return typeof lang === 'string' ? lang : 'en';
};

export default useLanguage;
