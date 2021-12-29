import * as Types from '../../lib/generated/graphql';

export type CopyrightInfoFragment = {
	__typename?: 'Recording';
	copyrightYear: number | null | undefined;
	distributionAgreement:
		| {
				__typename?: 'DistributionAgreement';
				sponsor: { __typename?: 'Sponsor'; title: string } | null | undefined;
				license:
					| {
							__typename?: 'License';
							summary: string;
							image: { __typename?: 'Image'; url: string } | null | undefined;
					  }
					| null
					| undefined;
		  }
		| null
		| undefined;
	sponsor: { __typename?: 'Sponsor'; title: string } | null | undefined;
};

export const CopyrightInfoFragmentDoc = `
    fragment copyrightInfo on Recording {
  copyrightYear
  distributionAgreement {
    sponsor {
      title
    }
    license {
      summary
      image {
        url(size: 100, cropMode: MAX_SIZE)
      }
    }
  }
  sponsor {
    title
  }
}
    `;
