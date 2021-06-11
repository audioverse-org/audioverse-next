import Testimonies from '@components/organisms/testimonies';
import { buildRenderer } from '@lib/test/helpers';

const renderComponent = buildRenderer(Testimonies);

describe('testimonies', () => {
	it('renders testimonies', async () => {
		const { getByText } = await renderComponent({
			props: {
				testimonies: [
					{
						id: 'the_id',
						body: 'the_body',
					},
				],
			},
		});

		expect(getByText('the_body')).toBeInTheDocument();
	});
});
