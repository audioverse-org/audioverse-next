import { render } from '@testing-library/react';
import React from 'react';

import PaginatedList from '@components/templates/paginatedList';

describe('paginated list template', () => {
	it('does not render image if none provided', async () => {
		const { queryByAltText } = await render(
			<PaginatedList
				pageTitle={'the_title'}
				nodes={[]}
				makePageRoute={undefined as any}
				makeEntryRoute={undefined as any}
				parseEntryTitle={undefined as any}
				parseEntryImageUrl={undefined as any}
				parseEntryKey={undefined as any}
				pagination={undefined as any}
			/>
		);

		expect(queryByAltText('the_title')).not.toBeInTheDocument();
	});
});
