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

function loadLangs({
	baseEn = {},
	baseOther = {},
	headEn = {},
	headOther = {},
}: {
	baseEn?: Record<string, { string: string }>;
	baseOther?: Record<string, { string: string }>;
	headEn?: Record<string, { string: string }>;
	headOther?: Record<string, { string: string }>;
}) {
	jest.mocked(execSync).mockImplementation((cmd: string) => {
		return JSON.stringify(cmd.includes('en.json') ? baseEn : baseOther);
	});

	jest.mocked(fs.readFileSync).mockImplementation((path: any) => {
		return JSON.stringify(path.includes('en.json') ? headEn : headOther);
	});
}

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
			expect.stringContaining('the_translated_string'),
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
			expect.stringContaining('the_translated_string2'),
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

	it('does not take multiple passes to preserve existing translation', async () => {
		jest
			.mocked(fs.readdirSync)
			.mockReturnValue(['en.json', 'es.json', 'br.json'] as any);

		loadLangs({
			baseEn: {
				the_id_1_1: { string: 'the_string' },
				the_id_1_2: { string: 'the_string' },
			},
			baseOther: {
				the_id_1_1: { string: 'the_translated_string' },
				the_id_1_2: { string: 'the_translated_string' },
			},
			headEn: { the_id_2: { string: 'the_string' } },
			headOther: { the_id_2: { string: 'the_translated_string' } },
		});

		await main();

		expect(fs.writeFileSync).toBeCalledWith(
			expect.anything(),
			expect.stringContaining('the_translated_string'),
		);
	});

	it('waits to write files until all translations are processed', async () => {
		loadLangs({
			baseEn: { the_id: { string: 'the_string' } },
			baseOther: { the_id: { string: 'the_translated_string' } },
			headEn: { the_id: { string: 'the_string' } },
			headOther: { the_id: { string: 'the_translated_string' } },
		});

		await main();

		const lastReadCallTime = jest
			.mocked(fs.readFileSync)
			.mock.invocationCallOrder.pop();
		const firstWriteCallTime = jest
			.mocked(fs.writeFileSync)
			.mock.invocationCallOrder.shift();

		if (!lastReadCallTime || !firstWriteCallTime) {
			throw new Error('No read or write calls');
		}

		expect(firstWriteCallTime).toBeGreaterThan(lastReadCallTime);
	});
});
