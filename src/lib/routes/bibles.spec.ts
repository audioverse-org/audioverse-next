import bibles from './bibles';

describe('routes/bibles', () => {
	it('should create a route for a version', () => {
		const route = bibles('')
			.versionId('538')
			.versionTitle('King James Version')
			.get();
		expect(route).toBe('/538/king-james-version');
	});

	it('encodes version slug', () => {
		const route = bibles('')
			.versionId('538')
			.versionTitle('King James Version (AV)')
			.get();
		expect(route).toBe('/538/king-james-version-av');
	});
});
