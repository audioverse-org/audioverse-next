import type { SliderTypeMap } from '@mui/material';
import React, { ChangeEvent } from 'react';

// https://material-ui.com/components/slider/#range-slider
// https://material-ui.com/api/slider/
// https://stackoverflow.com/a/61628815/937377
// https://stackoverflow.com/a/68134441/937377
export default function Slider(props: SliderTypeMap['props']): JSX.Element {
	const { onChange, ...others } = props;
	return (
		<input
			type="range"
			onChange={(event: ChangeEvent<HTMLInputElement> & Event) => {
				onChange && onChange(event, parseInt(event.target.value), 0);
			}}
			{...(others as any)}
		/>
	);
}
