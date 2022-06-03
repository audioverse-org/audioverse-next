declare module '*.scss' {
	const value: Record<string, string>;
	export default value;
}

declare module '*.svg' {
	const value: React.ComponentType;
	export default value;
}
