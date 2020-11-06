import _ from 'lodash';

import { LANGUAGES } from '@lib/constants';
import getIntlMessages from '@lib/getIntlMessages';

describe('getIntlMessages', () => {
	it('handles all base urls', async () => {
		const languages = _.values(LANGUAGES);

		languages.forEach((l) => {
			getIntlMessages(l.base_url);
		});
	});
});
