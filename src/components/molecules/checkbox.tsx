import React from 'react';

type CheckboxOptions = {
	label: string;
	checked: boolean;
	setChecked: (value: any) => void;
	type?: string;
};

export default function Checkbox({
	label,
	type,
	checked,
	setChecked,
}: CheckboxOptions): JSX.Element {
	return (
		<>
			<label>
				{label} <br />
				<input
					type={type}
					checked={checked}
					onChange={() => setChecked(!checked)}
				/>
			</label>
			<br />
			<br />
		</>
	);
}
