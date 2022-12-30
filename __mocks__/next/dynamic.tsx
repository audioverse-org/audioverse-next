import React, { Suspense, lazy } from 'react';

export default function dynamic(
	fn: any,
	options?: {
		suspense?: boolean;
		loading?: () => JSX.Element;
	}
) {
	const Component = lazy(() => {
		// WORKAROUND: https://stackoverflow.com/a/74459980
		return new Promise((resolve, reject) => {
			fn()
				.then((m: any) => {
					resolve(m.default ? m : { default: m });
				})
				.catch(reject);
		});
	});

	return options?.suspense === false
		? Component
		: (props: any) => (
				<Suspense
					fallback={
						options?.loading ? options.loading() : <div>Loading...</div>
					}
				>
					<Component {...props} />
				</Suspense>
		  );
}
