const formatDuration = (duration: number): string => {
	duration = Math.round(duration);
	const hours = Math.floor(duration / 3600);
	const minutes = Math.floor((duration - hours * 3600) / 60);
	const seconds = String(duration % 60).padStart(2, '0');
	return `${
		hours ? hours + ':' + String(minutes).padStart(2, '0') : minutes
	}:${seconds}`;
};

export default formatDuration;
