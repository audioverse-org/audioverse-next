import Header from '@components/organisms/header';
import { renderWithIntl } from '@lib/test/helpers';

const renderHeader = async () => {
	return renderWithIntl(Header, {});
};

describe('header', () => {
	it('has title', async () => {
		const { getByText } = await renderHeader();

		expect(getByText('AudioVerse')).toBeDefined();
	});

	it('has search box', async () => {
		const { getByPlaceholderText } = await renderHeader();

		expect(getByPlaceholderText('Search')).toBeDefined();
	});
});
