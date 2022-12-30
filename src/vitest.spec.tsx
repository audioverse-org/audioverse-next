import { render } from '@testing-library/react';
import dynamic from 'next/dynamic';

const LazyComponent = dynamic(() => import('./components/atoms/infoBox'));
const Parent = () => <LazyComponent>Hello World</LazyComponent>;

describe('vitest', () => {
	it('handles nextjs dynamic imports', () => {
		render(<Parent />);
	});
});