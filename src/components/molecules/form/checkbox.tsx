import React from 'react';

import styles from './checkbox.module.scss';

type CheckboxOptions = {
	label: string;
	checked: boolean;
	toggleChecked: () => void;
	type?: string;
};

export default function Checkbox({
	label,
	type,
	checked,
	toggleChecked,
}: CheckboxOptions): JSX.Element {
	return (
		<label className={styles.label}>
			<input
				type="checkbox"
				className={styles.checkbox}
				checked={checked}
				onChange={toggleChecked}
			/>
			{label}
		</label>
	);
}
