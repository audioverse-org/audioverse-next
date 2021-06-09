import Testimonies from '@components/organisms/testimonies';
import { renderWithIntl } from '@lib/test/helpers';

const renderTestimonies = async () => {
	return renderWithIntl(Testimonies, {});
};

describe('testimonies', () => {
	it('renders', async () => {
		await renderTestimonies();
	});
});
