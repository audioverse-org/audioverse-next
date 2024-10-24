import { MutableRefObject, useEffect, useRef } from 'react';

export default function useDidUnmount(): MutableRefObject<boolean> {
	const didUnmount = useRef(false);

	useEffect(
		() => () => {
			didUnmount.current = true;
		},
		[],
	);

	return didUnmount;
}
