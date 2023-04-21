import * as Types from '../../../../__generated__/graphql';

export type CardPostFragment = { __typename?: 'BlogPost', publishDate: string, title: string, teaser: string, canonicalPath: string, readingDuration: number | null, image: { __typename?: 'Image', url: string } | null };

export const CardPostFragmentDoc = `
    fragment cardPost on BlogPost {
  image {
    url(size: 500, cropMode: MAX_SIZE)
  }
  publishDate
  title
  teaser
  canonicalPath(useFuturePath: true)
  readingDuration
}
    `;