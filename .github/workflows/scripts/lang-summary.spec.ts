import fs from 'fs';
import main from './lang-summary';
import { execSync } from 'child_process';

jest.mock('fs');
jest.mock('child_process');

const createComment = jest.fn();

function run() {
	return main({
		github: {
			rest: {
				issues: {
					createComment,
					listComments: jest.fn(() => ({ data: [] })),
				},
			},
		},
		context: {
			payload: { pull_request: { number: 1, base: { sha: 'the_base_sha' } } },
			repo: { owner: 'the_owner', repo: 'the_repo' },
			sha: 'the_event_sha',
		},
	});
}

function loadFiles(
	files1: Record<string, unknown>,
	files2: Record<string, unknown>
) {
	const fileNames = Object.keys(files2);
	jest.mocked(fs.readdirSync).mockReturnValue(fileNames as any);
	jest.mocked(execSync).mockImplementation((cmd) => {
		const files = cmd.includes('the_event_sha') ? files2 : files1;
		const fileNames = Object.keys(files);
		const fileName = fileNames.find((f) => cmd.includes(f));
		if (!fileName) throw new Error(`File not found: ${cmd}`);
		return JSON.stringify(files[fileName]);
	});
}

describe('lang-summary', () => {
	beforeEach(() => {
		loadFiles(
			{ 'en.json': {}, 'es.json': {} },
			{
				'en.json': { the_id: { string: 'the_string' } },
				'es.json': { the_id: { string: 'the_string' } },
			}
		);
	});

	it('creates comment', async () => {
		await run();

		expect(createComment).toBeCalled();
	});

	it('has langs column', async () => {
		await run();

		expect(createComment).toBeCalledWith(
			expect.objectContaining({
				body: expect.stringContaining('langs'),
			})
		);
	});

	it('only has one row per id', async () => {
		await run();

		expect(createComment).toBeCalledWith(
			expect.objectContaining({
				body: expect.not.stringMatching(/the_id.*the_id/s),
			})
		);
	});

	it('includes id', async () => {
		await run();

		expect(createComment).toBeCalledWith(
			expect.objectContaining({
				body: expect.stringContaining('the_id'),
			})
		);
	});

	it('includes default string', async () => {
		await run();

		expect(createComment).toBeCalledWith(
			expect.objectContaining({
				body: expect.stringContaining('the_string'),
			})
		);
	});

	it('includes default string from en.json', async () => {
		loadFiles(
			{ 'es.json': {}, 'en.json': {} },
			{
				'es.json': { the_id: { string: 'the_translated_string' } },
				'en.json': { the_id: { string: 'the_string' } },
			}
		);

		await run();

		expect(createComment).toBeCalledWith(
			expect.objectContaining({
				body: expect.not.stringContaining('the_translated_string'),
			})
		);
	});

	it('includes default string from old en.json', async () => {
		loadFiles(
			{
				'es.json': { the_id: { string: 'the_translated_string' } },
				'en.json': { the_id: { string: 'the_string' } },
			},
			{ 'es.json': {}, 'en.json': {} }
		);

		await run();

		expect(createComment).toBeCalledWith(
			expect.objectContaining({
				body: expect.stringContaining('the_string'),
			})
		);
	});

	it('flags en addition', async () => {
		await run();

		expect(createComment).toBeCalledWith(
			expect.objectContaining({
				body: expect.stringContaining('+en'),
			})
		);
	});

	it('flags en deletion', async () => {
		loadFiles(
			{
				'en.json': { the_id: { string: 'the_string' } },
			},
			{ 'en.json': {} }
		);

		await run();

		expect(createComment).toBeCalledWith(
			expect.objectContaining({
				body: expect.stringContaining('-en'),
			})
		);
	});

	it('flags untranslated string', async () => {
		loadFiles(
			{ 'es.json': {}, 'en.json': {} },
			{
				'es.json': { the_id: { string: 'the_string' } },
				'en.json': { the_id: { string: 'the_string' } },
			}
		);

		await run();

		expect(createComment).toBeCalledWith(
			expect.objectContaining({
				body: expect.stringContaining('es!'),
			})
		);
	});

	it('does not flag translated string as untranslated', async () => {
		loadFiles(
			{ 'es.json': {}, 'en.json': {} },
			{
				'es.json': { the_id: { string: 'the_translated_string' } },
				'en.json': { the_id: { string: 'the_string' } },
			}
		);

		await run();

		expect(createComment).toBeCalledWith(
			expect.objectContaining({
				body: expect.not.stringContaining('es!'),
			})
		);
	});

	it('does not flag english string as untranslated', async () => {
		loadFiles(
			{ 'es.json': {}, 'en.json': {} },
			{
				'es.json': { the_id: { string: 'the_string' } },
				'en.json': { the_id: { string: 'the_string' } },
			}
		);

		await run();

		expect(createComment).toBeCalledWith(
			expect.objectContaining({
				body: expect.not.stringContaining('en!'),
			})
		);
	});

	it('flags missing strings', async () => {
		loadFiles(
			{ 'es.json': {}, 'en.json': {} },
			{
				'es.json': {},
				'en.json': { the_id: { string: 'the_string' } },
			}
		);

		await run();

		expect(createComment).toBeCalledWith(
			expect.objectContaining({
				body: expect.stringContaining('es?'),
			})
		);
	});

	it('does not flag missing string as addition', async () => {
		loadFiles(
			{ 'es.json': {}, 'en.json': {} },
			{
				'es.json': {},
				'en.json': { the_id: { string: 'the_string' } },
			}
		);

		await run();

		expect(createComment).toBeCalledWith(
			expect.objectContaining({
				body: expect.not.stringContaining('+es'),
			})
		);
	});

	it('does not flag string as untranslated if no default string', async () => {
		loadFiles(
			{ 'es.json': {}, 'en.json': {}, 'br.json': {} },
			{
				'es.json': {},
				'en.json': {},
				'br.json': { the_id: { string: 'the_translated_string' } },
			}
		);

		await run();

		expect(createComment).toBeCalledWith(
			expect.objectContaining({
				body: expect.not.stringContaining('!?'),
			})
		);
	});

	it('does not throw on new lang file', async () => {
		loadFiles(
			{ 'es.json': {}, 'en.json': {} },
			{
				'es.json': { the_id: { string: 'the_string' } },
				'en.json': { the_id: { string: 'the_string' } },
				'br.json': { the_id: { string: 'the_string' } },
			}
		);

		await run();

		expect(createComment).toBeCalled();
	});
});
