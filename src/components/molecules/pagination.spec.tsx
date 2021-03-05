import { render } from '@testing-library/react';
import React from 'react';

import Pagination, { pagination } from './pagination';

const renderPagination = ({
	current = 1,
	total = 1,
	makeRoute = (languageRoute: string, pageIndex: number): string =>
		`${languageRoute}/the_route/page/${pageIndex}`,
} = {}) => {
	return render(
		<Pagination current={current} total={total} makeRoute={makeRoute} />
	);
};

describe('pagination component', () => {
	it('has next button', () => {
		const { getByText } = renderPagination({ total: 2 });

		expect(getByText('>')).toBeInTheDocument();
	});

	it('has previous button', () => {
		const { getByText } = renderPagination({ current: 2, total: 2 });

		expect(getByText('<')).toBeInTheDocument();
	});

	it('hides next when unneeded', () => {
		const { getByText } = renderPagination();

		expect(() => getByText('>')).toThrow();
	});

	it('hides previous when unneeded', () => {
		const { getByText } = renderPagination();

		expect(() => getByText('<')).toThrow();
	});

	it('sets next href', () => {
		const { getByText } = renderPagination({
			total: 2,
			makeRoute: (l, i) => `/${l}/sermons/page/${i}`,
		});
		const link = getByText('>') as HTMLAnchorElement;

		expect(link.href).toContain('/en/sermons/page/2');
	});

	it('includes dots', () => {
		const { getByText } = renderPagination({ total: 100 });

		expect(getByText('...')).toBeInTheDocument();
	});

	it('unlinks dots', () => {
		const { getByText } = renderPagination({ total: 100 });

		expect(getByText('...')).not.toHaveAttribute('href');
	});

	it('uses url base', () => {
		const { getByText } = renderPagination({
				total: 2,
				makeRoute: (l, i) => `/${l}/presenters/page/${i}`,
			}),
			link = getByText('>') as HTMLAnchorElement;

		expect(link.href).toContain('/en/presenters/page/2');
	});
});

describe('pagination algorithm', () => {
	// https://gist.github.com/kottenator/9d936eb3e4e3c3e02598
	const runner = test.each([
		[1, [1, 2, 3, '...', 20]],
		[2, [1, 2, 3, 4, '...', 20]],
		[3, [1, 2, 3, 4, 5, '...', 20]],
		[4, [1, 2, 3, 4, 5, 6, '...', 20]],
		[5, [1, 2, 3, 4, 5, 6, 7, '...', 20]],
		[6, [1, '...', 4, 5, 6, 7, 8, '...', 20]],
		[7, [1, '...', 5, 6, 7, 8, 9, '...', 20]],
		[8, [1, '...', 6, 7, 8, 9, 10, '...', 20]],
		[9, [1, '...', 7, 8, 9, 10, 11, '...', 20]],
		[10, [1, '...', 8, 9, 10, 11, 12, '...', 20]],
		[11, [1, '...', 9, 10, 11, 12, 13, '...', 20]],
		[12, [1, '...', 10, 11, 12, 13, 14, '...', 20]],
		[13, [1, '...', 11, 12, 13, 14, 15, '...', 20]],
		[14, [1, '...', 12, 13, 14, 15, 16, '...', 20]],
		[15, [1, '...', 13, 14, 15, 16, 17, '...', 20]],
		[16, [1, '...', 14, 15, 16, 17, 18, 19, 20]],
		[17, [1, '...', 15, 16, 17, 18, 19, 20]],
		[18, [1, '...', 16, 17, 18, 19, 20]],
		[19, [1, '...', 17, 18, 19, 20]],
		[20, [1, '...', 18, 19, 20]],
	]);

	runner('pagination(%i, 20)', (index, expected) => {
		expect(pagination(index, 20)).toStrictEqual(expected);
	});

	it('maintains performance', () => {
		const t0 = performance.now();
		pagination(1, 99999999999);
		const t1 = performance.now();

		expect(t1 - t0).toBeLessThan(2);
	});

	it('handles single page', () => {
		expect(pagination(1, 1)).toStrictEqual([1]);
	});

	it('handles missing current', async () => {
		await render(<Pagination {...({ total: 3, base: 'base' } as any)} />);
	});

	it('handles missing total', async () => {
		await render(<Pagination {...({ current: 1, base: 'base' } as any)} />);
	});

	it('handles missing base', async () => {
		await render(<Pagination {...({ current: 1, total: 3 } as any)} />);
	});
});
