import Playlist from '@components/organisms/playlist';
import { renderWithIntl } from '@lib/test/helpers';

const renderProp = jest.fn();

async function renderComponent(props = {}) {
	return renderWithIntl(Playlist, {
		recordings: [
			{ id: 'first', title: 'first' },
			{ id: 'second', title: 'second' },
		] as any,
		children: renderProp,
		...props,
	});
}

describe('playlist component', () => {
	it('renders playlist heading', async () => {
		const { getByText } = await renderComponent();

		expect(getByText('Playlist')).toBeInTheDocument();
	});

	it('supports initial prop', async () => {
		await renderComponent({ initial: 'second' });

		expect(renderProp).toBeCalledWith({ id: 'second', title: 'second' });
	});

	it('defaults to first recording if invalid initial provided', async () => {
		await renderComponent({ initial: 'invalid' });

		expect(renderProp).toBeCalledWith({ id: 'first', title: 'first' });
	});
});
