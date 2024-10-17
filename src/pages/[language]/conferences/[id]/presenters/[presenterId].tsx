import { GetServerSidePropsContext } from 'next';

import { IBaseProps } from '~containers/base';
import { getConferencePresenterDetailPageData } from '~containers/collection/__generated__/presenter';
import PresenterDetail, {
	PresenterDetailProps,
} from '~containers/collection/presenter';

export default PresenterDetail;

export async function getServerSideProps({
	params,
}: GetServerSidePropsContext<{
	language: string;
	id: string;
	presenterId: string;
}>): Promise<{ props: PresenterDetailProps & IBaseProps }> {
	const id = params?.presenterId as string;
	const collectionId = params?.id as string;

	const result = await getConferencePresenterDetailPageData({
		id,
		collectionId,
	}).catch(() => ({
		person: null,
		collection: null,
	}));

	return {
		props: {
			...result,
			title: result.person?.name,
			canonicalUrl: result.person?.canonicalUrl,
		},
	};
}
