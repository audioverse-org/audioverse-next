import { buildRenderer } from '@lib/test/helpers';
import Miniplayer from '@components/organisms/miniplayer';

const renderComponent = buildRenderer(Miniplayer);

describe('miniplayer', () => {
	it('renders', async () => {
		await renderComponent();
	});
});
