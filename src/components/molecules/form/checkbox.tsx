import React from 'react';

import styles from './checkbox.module.scss';

type CheckboxOptions = {
	label: string | JSX.Element;
	checked: boolean;
	toggleChecked: () => void;
};

export default function Checkbox({
	label,
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
