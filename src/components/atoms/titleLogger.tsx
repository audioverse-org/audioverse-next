// components/TitleLogger.tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function TitleLogger() {
	const router = useRouter();
	const [currentTitle, setCurrentTitle] = useState<string | null>(null);

	useEffect(() => {
		const handleRouteChange = () => {
			// Access the current title
			const newTitle = document.querySelector('title')?.text;
			setCurrentTitle(newTitle || null);
		};

		// Listen for route changes
		router.events.on('routeChangeComplete', handleRouteChange);

		// Initial title
		handleRouteChange();

		// Remove the event listener on component unmount
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
		};
	}, [router.events]);

	return { currentTitle };
}

export default TitleLogger;
