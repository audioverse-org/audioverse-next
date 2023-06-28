import styles from './select.module.scss';

type SelectOptions = {
	label: string;
	value: string;
	setValue: (value: string) => void;
	options: {
		label: string;
		value?: string;
	}[];
};

export default function Select({
	label,
	value,
	setValue,
	options,
}: SelectOptions): JSX.Element {
	return (
		<div className={styles.container}>
			<label className={styles.label}>
				{label}
				<select
					className={styles.select}
					value={value}
					onChange={(e) => setValue(e.target.value)}
				>
					{options.map(({ label, value }, index) => (
						<option key={index} value={value || label}>
							{label}
						</option>
					))}
				</select>
			</label>
		</div>
	);
}
