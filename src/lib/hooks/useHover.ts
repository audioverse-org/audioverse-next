import { RefObject, useEffect, useRef, useState } from 'react';

export default function useHover<Element extends HTMLElement>(): [
	RefObject<Element>,
	boolean,
] {
	const [value, setValue] = useState(false);
	const ref = useRef<Element>(null);
	const handleMouseOver = () => setValue(true);
	const handleMouseOut = () => setValue(false);
	useEffect(() => {
		const node = ref.current;
		if (node) {
			node.addEventListener('mouseover', handleMouseOver);
			node.addEventListener('mouseout', handleMouseOut);
			return () => {
				node.removeEventListener('mouseover', handleMouseOver);
				node.removeEventListener('mouseout', handleMouseOut);
			};
		}
	}, [ref]);
	return [ref, value];
}
