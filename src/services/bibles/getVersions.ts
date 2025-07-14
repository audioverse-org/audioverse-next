import { Language } from '~src/__generated__/graphql';

import {
	getGraphqlVersions,
	GetGraphqlVersionsQuery,
} from './__generated__/getVersions';
import { FCBH_VERSIONS } from './constants';

type Version = NonNullable<GetGraphqlVersionsQuery['collections']['nodes']>[0];

export default async function getVersions(): Promise<Version[]> {
	const apiVersions = await getGraphqlVersions({ language: Language.English });

	if (!apiVersions.collections.nodes) {
		throw new Error('No API versions found');
	}

	const bibles = [...FCBH_VERSIONS, ...apiVersions.collections.nodes];

	const orderBiblesNames: string[] = [
		'King James Version',
		'King James Version (AudioVerse)',
		'King James Version (Dramatized)',
		'King James Version (Thomas Nelson)',
		'New King James Version',
		'New King James Version (Thomas Nelson)',
		'English Standard Version®',
		'English Standard Version® - Hear the Word Audio Bible',
		'English Standard Version® (Dramatized)',
		'New Life Version (Easy to Read)',
		'New Life Version (Easy to Read) (Dramatized)',
		"New Living Translation® - her.BIBLE (women's voices)",
		'New Living Translation®, Holy Sanctuary version',
		'New Revised Standard Version',
		'New Revised Standard Version (Dramatized)',
		'World English Bible',
	];
	const orderBiblesNamesSet = new Set(orderBiblesNames);

	const orderedPart = bibles.filter((item) =>
		orderBiblesNamesSet.has(item.title),
	);
	const unorderedPart = bibles.filter(
		(item) => !orderBiblesNamesSet.has(item.title),
	);

	orderedPart.sort(
		(a, b) =>
			orderBiblesNames.indexOf(a.title) - orderBiblesNames.indexOf(b.title),
	);

	const orderedBibles = [...orderedPart, ...unorderedPart];

	return orderedBibles;
}
