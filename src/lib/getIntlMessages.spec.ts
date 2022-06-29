import values from 'lodash/values';

import { LANGUAGES } from '@lib/constants';
import getIntlMessages from '@lib/getIntlMessages';

describe('getIntlMessages', () => {
	it('handles all base urls', async () => {
		const languages = values(LANGUAGES);

		expect(() => {
			languages.forEach((l) => {
				getIntlMessages(l.base_url);
			});
		}).not.toThrow();
	});
});
