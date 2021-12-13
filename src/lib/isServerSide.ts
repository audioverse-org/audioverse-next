export default function isServerSide(): boolean {
	return typeof window === 'undefined';
}
