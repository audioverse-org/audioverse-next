import React from 'react';

import styles from './textarea.module.scss';

type TextareaOptions = {
	label: string | JSX.Element;
	value: string;
	setValue: (value: string) => void;
	name?: string;
	placeholder?: string;
};

export default function Textarea({
	label,
	value,
	name,
	setValue,
	placeholder,
}: TextareaOptions): JSX.Element {
	return (
		<div className={styles.container}>
			<label className={styles.label}>
				{label}
				<textarea
					name={name}
					className={styles.textarea}
					value={value}
					onChange={(e) => setValue(e.target.value)}
					placeholder={placeholder}
				/>
			</label>
		</div>
	);
}
