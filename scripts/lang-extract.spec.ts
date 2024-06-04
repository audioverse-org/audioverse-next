import { execSync } from 'child_process';
import fs from 'fs';

import main from './lang-extract.main';

jest.mock('child_process', () => ({
	execSync: jest.fn(() => '{}'),
}));
jest.mock('fs', () => ({
	readFileSync: jest.fn(() => '{}'),
	writeFileSync: jest.fn(),
	readdirSync: jest.fn(() => ['en.json', 'es.json']),
}));
jest.mock('glob');
jest.mock('@formatjs/cli-lib', () => ({
	extractAndWrite: jest.fn(),
}));

describe('lang-extract', () => {
	it('preserves translation when id is changed', async () => {
		jest.mocked(execSync).mockImplementation((cmd: string) => {
			return cmd.includes('en.json')
				? '{"the_id": {"string": "the_string"}}'
				: '{"the_id": {"string": "the_translated_string"}}';
		});

		jest
			.mocked(fs.readFileSync)
			.mockReturnValue('{"the_new_id": {"string": "the_string"}}');

		await main();

		expect(fs.writeFileSync).toBeCalledWith(
			expect.anything(),
			expect.stringContaining('the_translated_string')
		);
	});

	it('does not overwrite translation if id was not changed and duplicate English strings exist', async () => {
		jest.mocked(execSync).mockImplementation((cmd: string) => {
			return cmd.includes('en.json')
				? '{"the_id1": {"string": "the_string"}, "the_id2": {"string": "the_string"}}'
				: '{"the_id1": {"string": "the_translated_string1"}, "the_id2": {"string": "the_translated_string2"}}';
		});

		jest
			.mocked(fs.readFileSync)
			.mockReturnValue('{"the_id2": {"string": "the_translated_string2"}}');

		await main();

		expect(fs.writeFileSync).toBeCalledWith(
			expect.anything(),
			expect.stringContaining('the_translated_string2')
		);
	});

	it('does not fail if renamed id has no base translation', async () => {
		jest.mocked(execSync).mockImplementation((cmd: string) => {
			return cmd.includes('en.json')
				? '{"the_id": {"string": "the_string"}}'
				: '{}';
		});

		jest
			.mocked(fs.readFileSync)
			.mockReturnValue('{"the_new_id": {"string": "the_string"}}');

		// Expect not to throw
		await main();
	});
});
