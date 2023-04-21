import values from 'lodash/values';

import { LANGUAGES } from '~lib/constants';
import getIntlMessages from '~lib/getIntlMessages';

describe('getIntlMessages', () => {
	it('handles all base urls', async () => {
		const languages = values(LANGUAGES);
		const base_urls = languages.map((l) => l.base_urls).flat();

		base_urls.forEach(getIntlMessages);
	});
});
