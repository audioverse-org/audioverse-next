import SpeakerName from '@components/molecules/speakerName';
import { renderWithIntl } from '@lib/test/helpers';

describe('speaker name component', () => {
	it('renders', async () => {
		await renderWithIntl(SpeakerName, {});
	});
});
