import Header from '~components/organisms/header';
import renderWithProviders from '~lib/test/renderWithProviders';

jest.mock('~lib/api/fetchApi');

const renderHeader = async () => {
	return renderWithProviders(<Header />, undefined);
};

describe('header', () => {
	it('has title', async () => {
		const { getByAltText } = await renderHeader();

		expect(getByAltText('AudioVerse')).toBeInTheDocument();
	});

	it('links logo', async () => {
		const { getByAltText } = await renderHeader();

		const logo = getByAltText('AudioVerse');
		const link = logo.parentElement as HTMLLinkElement;

		expect(link.href).toContain('/en');
	});
});
