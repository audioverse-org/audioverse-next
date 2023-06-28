import clsx from 'clsx';

import { BaseColors } from '~lib/constants';

import baseColors from './baseColors.module.scss';
import styles from './horizontalRule.module.scss';

type Props = {
	color:
		| BaseColors.DARK
		| BaseColors.MID_TONE
		| BaseColors.LIGHT_TONE
		| BaseColors.CREAM
		| BaseColors.BOOK_H
		| BaseColors.PLAYLIST_B
		| BaseColors.STORY_H;
	className?: string;
};

export default function HorizontalRule({
	color,
	className,
}: Props): JSX.Element {
	return (
		<div
			className={clsx(
				styles.base,
				baseColors[`borderColor-${color}`],
				className
			)}
		/>
	);
}
