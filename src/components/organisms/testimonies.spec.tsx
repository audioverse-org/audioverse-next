import Testimonies from '@components/organisms/testimonies';
import { buildRenderer } from '@lib/test/helpers';

const renderComponent = buildRenderer(Testimonies, {
	defaultProps: {
		testimonies: [
			{
				id: 'the_id',
				body: 'the_body',
				author: 'the_author',
			},
		],
	},
});

describe('testimonies', () => {
	it('renders testimonies', async () => {
		const { getByText } = await renderComponent();

		expect(getByText('the_body')).toBeInTheDocument();
	});

	it('renders authors', async () => {
		const { getByText } = await renderComponent();

		expect(getByText('the_author')).toBeInTheDocument();
	});

	it('renders in slider', async () => {
		const { getByLabelText } = await renderComponent();

		expect(getByLabelText('Next page')).toBeInTheDocument();
	});
});
