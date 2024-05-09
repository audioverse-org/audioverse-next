import React from 'react';

import styles from './checkbox.module.scss';

type CheckboxOptions = {
	label: string | JSX.Element;
	checked: boolean;
	toggleChecked: () => void;
	value?: string;
	name?: string;
};

export default function Checkbox({
	label,
	checked,
	toggleChecked,
	value,
	name,
}: CheckboxOptions): JSX.Element {
	return (
		<label className={styles.label}>
			<input
				type="checkbox"
				className={styles.checkbox}
				checked={checked}
				onChange={toggleChecked}
				value={value}
				name={name}
			/>
			{label}
		</label>
	);
}
