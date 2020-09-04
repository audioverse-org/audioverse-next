import Home from '../../containers/home';

export default Home;

export async function getStaticProps({ params }) {
	return {
		props: {},
		revalidate: 10,
	};
}

export async function getStaticPaths() {
	return {
		paths: ['/en'],
		fallback: 'unstable_blocking',
	};
}
