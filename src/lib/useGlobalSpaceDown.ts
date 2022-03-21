import { useEffect } from 'react';

export default (callBack: () => unknown, disabled?: boolean) => {
	const handleKeyDown = (event: KeyboardEvent) => {
		if ((event.target as HTMLElement).tagName == 'INPUT' || event.key != ' ') {
			return;
		}
		callBack();
		event.preventDefault();
		return;
	};

	useEffect(() => {
		if (disabled) return;
		document.addEventListener('keydown', handleKeyDown, false);
		return () => document.removeEventListener('keydown', handleKeyDown);
	});
};
