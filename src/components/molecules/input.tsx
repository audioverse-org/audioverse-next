import React from 'react';

import styles from './input.module.scss';

type InputOptions = {
	label: string;
	value: string;
	setValue: (value: string) => void;
	type?: string;
	placeholder?: string;
};

export default function Input({
	label,
	type,
	value,
	setValue,
	placeholder,
}: InputOptions): JSX.Element {
	return (
		<div className={styles.container}>
			<label className={styles.label}>
				{label}
				<input
					className={styles.input}
					type={type}
					value={value}
					onChange={(e) => setValue(e.target.value)}
					placeholder={placeholder}
				/>
			</label>
		</div>
	);
}
