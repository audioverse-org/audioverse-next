import React from 'react';

type InputOptions = {
	label: string;
	value: string;
	setValue: (value: any) => void;
	type?: string;
};

export default function Input({
	label,
	type,
	value,
	setValue,
}: InputOptions): JSX.Element {
	return (
		<>
			<label>
				{label} <br />
				<input
					type={type}
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
			</label>
			<br />
			<br />
		</>
	);
}
