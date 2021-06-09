const formatDuration = (seconds: number): string => {
	const s = Math.round(seconds);
	const h = Math.floor(s / 3600);
	const m = Math.round((s - h * 3600) / 60);
	return `${h ? h + 'h ' : ''}${m}m`;
};

export default formatDuration;
