import React from 'react';

import OldPaginatedList from '@components/templates/paginatedList';
import { renderWithIntl } from '@lib/test/helpers';

describe('paginated list template', () => {
	it('does not render image if none provided', async () => {
		const { queryByAltText } = await renderWithIntl(
			<OldPaginatedList
				pageTitle="the_title"
				nodes={[]}
				makePageRoute={undefined as any}
				makeEntryRoute={undefined as any}
				parseEntryTitle={undefined as any}
				parseEntryImageUrl={undefined as any}
				pagination={undefined as any}
			/>
		);

		expect(queryByAltText('the_title')).not.toBeInTheDocument();
	});
});
