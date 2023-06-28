import styles from './input.module.scss';

type InputOptions = {
	label: string | JSX.Element;
	value: string;
	setValue: (value: string) => void;
	name?: string;
	type?: string;
	placeholder?: string;
};

export default function Input({
	label,
	type = 'text',
	value,
	name,
	setValue,
	placeholder,
}: InputOptions): JSX.Element {
	return (
		<div className={styles.container}>
			<label className={styles.label}>
				{label}
				<input
					name={name}
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
