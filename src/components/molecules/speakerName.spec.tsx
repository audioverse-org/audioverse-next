import { renderWithIntl } from '@lib/test/helpers';
import SpeakerName from '@components/molecules/speakerName';

describe('speaker name component', () => {
	it('renders', async () => {
		await renderWithIntl(SpeakerName, {});
	});
});
