import { render } from '@testing-library/react';
import dynamic from 'next/dynamic';
import { describe, it } from 'vitest';
import React from 'react';

const LazyComponent = dynamic(() => import('./components/atoms/infoBox'));
const Parent = () => <LazyComponent>Hello World</LazyComponent>;

describe('vitest', () => {
	it('handles nextjs dynamic imports', () => {
		render(<Parent />);
	});
});
