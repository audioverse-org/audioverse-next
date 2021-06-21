import Miniplayer from '@components/organisms/miniplayer';
import { buildRenderer } from '@lib/test/helpers';

const renderComponent = buildRenderer(Miniplayer);

describe('miniplayer', () => {
	it('renders', async () => {
		await renderComponent();
	});
});
