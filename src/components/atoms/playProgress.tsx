import React, { useEffect, useState } from 'react';

import Styles from './playProgress.module.scss';

// Helper functions to handle polar coordinates and arcs
function polarToCartesian(
	centerX: number,
	centerY: number,
	radius: number,
	angleInDegrees: number
) {
	const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
	return {
		x: centerX + radius * Math.cos(angleInRadians),
		y: centerY + radius * Math.sin(angleInRadians),
	};
}

function describeArc(
	x: number,
	y: number,
	radius: number,
	startAngle: number,
	endAngle: number
) {
	const start = polarToCartesian(x, y, radius, endAngle);
	const end = polarToCartesian(x, y, radius, startAngle);
	const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
	const d = [
		'M',
		start.x,
		start.y,
		'A',
		radius,
		radius,
		0,
		largeArcFlag,
		0,
		end.x,
		end.y,
	].join(' ');
	return d;
}
type Props = {
	isPlaying: boolean;
	progressPercentage?: number;
	activeColor: string;
	inactiveColor: string;
	isCurrentTrack: boolean;
};
const PlayProgress: React.FC<Props> = ({
	isPlaying,
	progressPercentage = 0,
	activeColor,
	inactiveColor,
	isCurrentTrack,
}) => {
	const [animationProgress, setAnimationProgress] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		let animationFrameId: number;
		const startAnimation = () => {
			setAnimationProgress(0);
			const animate = () => {
				setAnimationProgress((prev) => (prev + 0.025) % 1);
				animationFrameId = requestAnimationFrame(animate);
			};
			animationFrameId = requestAnimationFrame(animate);
		};

		if (isCurrentTrack && isPlaying) {
			startAnimation();
		}

		return () => {
			cancelAnimationFrame(animationFrameId);
		};
	}, [isCurrentTrack, isPlaying]);

	// Simulate loading state
	useEffect(() => {
		if (isCurrentTrack && isPlaying) {
			setIsLoading(true);
			setTimeout(() => setIsLoading(false), 2000); // Simulate loading for 2 seconds
		}
	}, [isCurrentTrack, isPlaying]);

	if (isLoading) {
		return <div className={Styles.loading_indicator}></div>;
	}

	return (
		<svg width="24" height="24" fill="none">
			{isPlaying ? (
				<>
					<line
						x1="8"
						x2="8"
						y1={8 + 6 * animationProgress}
						y2="16"
						stroke={inactiveColor}
						strokeWidth="2"
						strokeLinecap="round"
					/>
					<line
						x1="12"
						x2="12"
						y1={10 - 4 * animationProgress}
						y2="16"
						stroke={inactiveColor}
						strokeWidth="2"
						strokeLinecap="round"
					/>
					<line
						x1="16"
						x2="16"
						y1={11 + 3 * animationProgress}
						y2="16"
						stroke={inactiveColor}
						strokeWidth="2"
						strokeLinecap="round"
					/>
				</>
			) : (
				<path
					d="M9 17V7L17 12L9 17Z"
					fill={inactiveColor}
					stroke={inactiveColor}
					strokeWidth="2"
					strokeLinejoin="round"
				/>
			)}
			<circle cx="12" cy="12" r="11.5" stroke={inactiveColor} />
			<path
				d={describeArc(
					12,
					12,
					11.5,
					0,
					((progressPercentage >= 1 ? 0 : progressPercentage) || 0) * 359
				)}
				stroke={activeColor}
			/>
		</svg>
	);
};

export default PlayProgress;
