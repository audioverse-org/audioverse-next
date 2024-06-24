import React from 'react';

import Styles from './playProgress.module.scss';

type Props = {
	isPlaying: boolean;
	progressPercentage?: number;
	activeColor?: string;
	inactiveColor: string;
	isCurrentTrack?: boolean;
	bufferedProgress?: number;
};

const PlayProgress: React.FC<Props> = ({
	isPlaying,
	progressPercentage = 0,
	inactiveColor,
	isCurrentTrack,
	bufferedProgress = 0,
}) => {
	const radius = 11.5; // Radius of the circle
	const circumference = 2 * Math.PI * radius;

	const calculateOffset = (value: number) => {
		return circumference - (value / 100) * circumference;
	};

	return isCurrentTrack && bufferedProgress * 100 < 1 ? (
		<div className={Styles.loading_indicator}></div>
	) : (
		<div className={Styles.progressContainer}>
			<svg width="24" height="24">
				<circle
					className={Styles.circleBackground}
					cx="12"
					cy="12"
					r={radius}
					strokeWidth="1"
					stroke={inactiveColor}
				/>

				{isPlaying ? (
					<>
						<path
							stroke={inactiveColor}
							strokeWidth="2"
							strokeLinecap="round"
							d="M8 8v8"
						>
							<animate
								dur="1s"
								attributeType="XML"
								attributeName="d"
								repeatCount="indefinite"
								values="M8 8v8;M8 10v6;M8 8v8"
							/>
						</path>
						<path
							stroke={inactiveColor}
							strokeWidth="2"
							strokeLinecap="round"
							d="M12 6v10"
						>
							<animate
								dur="1s"
								attributeType="XML"
								attributeName="d"
								repeatCount="indefinite"
								values="M12 6v10;M12 4v12;M12 6v10"
							/>
						</path>
						<path
							stroke={inactiveColor}
							strokeWidth="2"
							strokeLinecap="round"
							d="M16 9v7"
						>
							<animate
								dur="1s"
								attributeType="XML"
								attributeName="d"
								repeatCount="indefinite"
								values="M16 9v7;M16 8v8;M16 9v7"
							/>
						</path>
						<circle
							className={Styles.circleProgress}
							cx="12"
							cy="12"
							r={radius}
							strokeWidth="1.3"
							strokeDasharray={circumference}
							strokeDashoffset={calculateOffset(progressPercentage * 100)}
						/>
					</>
				) : (
					<>
						<circle
							className={Styles.circleProgress}
							cx="12"
							cy="12"
							r={radius}
							strokeWidth="1.3"
							strokeDasharray={circumference}
							strokeDashoffset={calculateOffset(progressPercentage * 100)}
						/>
						<path
							d="M9 17V7L17 12L9 17Z"
							fill={inactiveColor}
							stroke={inactiveColor}
							strokeWidth="1"
							strokeLinejoin="round"
						/>
					</>
				)}
			</svg>
		</div>
	);
};

export default PlayProgress;
