import * as Types from './graphql';

export const makeAggregate = (overrides?: Partial<Types.Aggregate>): Types.Aggregate => {
    return {
        count: overrides && overrides.hasOwnProperty('count') ? overrides.count! : 6985,
    };
};

export const makeAttachment = (overrides?: Partial<Types.Attachment>): Types.Attachment => {
    return {
        canDelete: overrides && overrides.hasOwnProperty('canDelete') ? overrides.canDelete! : true,
        filename: overrides && overrides.hasOwnProperty('filename') ? overrides.filename! : 'reprehenderit',
        filesize: overrides && overrides.hasOwnProperty('filesize') ? overrides.filesize! : 'iure',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '14914fd7-bdc8-4a98-996f-636e84e20289',
        mimeType: overrides && overrides.hasOwnProperty('mimeType') ? overrides.mimeType! : 'minus',
        recording: overrides && overrides.hasOwnProperty('recording') ? overrides.recording! : makeRecording(),
        updatedAt: overrides && overrides.hasOwnProperty('updatedAt') ? overrides.updatedAt! : 'facere',
        url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : 'ut',
    };
};

export const makeAudioFile = (overrides?: Partial<Types.AudioFile>): Types.AudioFile => {
    return {
        bitrate: overrides && overrides.hasOwnProperty('bitrate') ? overrides.bitrate! : 2386,
        canDelete: overrides && overrides.hasOwnProperty('canDelete') ? overrides.canDelete! : true,
        duration: overrides && overrides.hasOwnProperty('duration') ? overrides.duration! : 3.76,
        filename: overrides && overrides.hasOwnProperty('filename') ? overrides.filename! : 'non',
        filesize: overrides && overrides.hasOwnProperty('filesize') ? overrides.filesize! : 'sint',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'bf398da8-a428-41b1-8529-1ecd0f939412',
        mimeType: overrides && overrides.hasOwnProperty('mimeType') ? overrides.mimeType! : 'eos',
        recording: overrides && overrides.hasOwnProperty('recording') ? overrides.recording! : makeRecording(),
        transcodingStatus: overrides && overrides.hasOwnProperty('transcodingStatus') ? overrides.transcodingStatus! : Types.MediaFileTranscodingStatus.Complete,
        updatedAt: overrides && overrides.hasOwnProperty('updatedAt') ? overrides.updatedAt! : 'deleniti',
        url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : 'et',
    };
};

export const makeAuthenticatedUser = (overrides?: Partial<Types.AuthenticatedUser>): Types.AuthenticatedUser => {
    return {
        sessionToken: overrides && overrides.hasOwnProperty('sessionToken') ? overrides.sessionToken! : 'velit',
        user: overrides && overrides.hasOwnProperty('user') ? overrides.user! : makeUser(),
    };
};

export const makeAuthenticatedUserPayload = (overrides?: Partial<Types.AuthenticatedUserPayload>): Types.AuthenticatedUserPayload => {
    return {
        authenticatedUser: overrides && overrides.hasOwnProperty('authenticatedUser') ? overrides.authenticatedUser! : makeAuthenticatedUser(),
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
    };
};

export const makeBible = (overrides?: Partial<Types.Bible>): Types.Bible => {
    return {
        abbreviation: overrides && overrides.hasOwnProperty('abbreviation') ? overrides.abbreviation! : 'quam',
        book: overrides && overrides.hasOwnProperty('book') ? overrides.book! : makeBibleBook(),
        books: overrides && overrides.hasOwnProperty('books') ? overrides.books! : [makeBibleBook()],
        copyrightText: overrides && overrides.hasOwnProperty('copyrightText') ? overrides.copyrightText! : 'voluptas',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'e1002208-856c-48ab-8285-a495a1e30cb0',
        isDramatized: overrides && overrides.hasOwnProperty('isDramatized') ? overrides.isDramatized! : true,
        sponsor: overrides && overrides.hasOwnProperty('sponsor') ? overrides.sponsor! : makeBibleSponsor(),
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'asperiores',
    };
};

export const makeBibleBook = (overrides?: Partial<Types.BibleBook>): Types.BibleBook => {
    return {
        bible: overrides && overrides.hasOwnProperty('bible') ? overrides.bible! : makeBible(),
        chapter: overrides && overrides.hasOwnProperty('chapter') ? overrides.chapter! : makeBibleChapter(),
        chapterCount: overrides && overrides.hasOwnProperty('chapterCount') ? overrides.chapterCount! : 5854,
        chapters: overrides && overrides.hasOwnProperty('chapters') ? overrides.chapters! : [makeBibleChapter()],
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '1a9e6948-59bb-4110-baee-9cea49a190a9',
        isDramatized: overrides && overrides.hasOwnProperty('isDramatized') ? overrides.isDramatized! : true,
        shareUrl: overrides && overrides.hasOwnProperty('shareUrl') ? overrides.shareUrl! : 'sit',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'voluptas',
    };
};

export const makeBibleChapter = (overrides?: Partial<Types.BibleChapter>): Types.BibleChapter => {
    return {
        book: overrides && overrides.hasOwnProperty('book') ? overrides.book! : makeBibleBook(),
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'bff0b1d6-2877-484a-b668-ce689114e3ed',
        text: overrides && overrides.hasOwnProperty('text') ? overrides.text! : 'ut',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'libero',
        url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : 'consequatur',
        verseCount: overrides && overrides.hasOwnProperty('verseCount') ? overrides.verseCount! : 2501,
        verses: overrides && overrides.hasOwnProperty('verses') ? overrides.verses! : [makeBibleVerse()],
    };
};

export const makeBibleConnection = (overrides?: Partial<Types.BibleConnection>): Types.BibleConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeBibleEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeBible()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeBibleEdge = (overrides?: Partial<Types.BibleEdge>): Types.BibleEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'quis',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeBible(),
    };
};

export const makeBibleReference = (overrides?: Partial<Types.BibleReference>): Types.BibleReference => {
    return {
        book: overrides && overrides.hasOwnProperty('book') ? overrides.book! : Types.BibleReferenceBook.Acts,
        chapter: overrides && overrides.hasOwnProperty('chapter') ? overrides.chapter! : 414,
        verse: overrides && overrides.hasOwnProperty('verse') ? overrides.verse! : 532,
    };
};

export const makeBibleReferenceInput = (overrides?: Partial<Types.BibleReferenceInput>): Types.BibleReferenceInput => {
    return {
        book: overrides && overrides.hasOwnProperty('book') ? overrides.book! : Types.BibleReferenceBook.Acts,
        chapter: overrides && overrides.hasOwnProperty('chapter') ? overrides.chapter! : 4873,
        verse: overrides && overrides.hasOwnProperty('verse') ? overrides.verse! : 3999,
    };
};

export const makeBibleReferenceRange = (overrides?: Partial<Types.BibleReferenceRange>): Types.BibleReferenceRange => {
    return {
        endReference: overrides && overrides.hasOwnProperty('endReference') ? overrides.endReference! : makeBibleReference(),
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '2d673cb7-fde2-4142-9b90-645424da91c1',
        startReference: overrides && overrides.hasOwnProperty('startReference') ? overrides.startReference! : makeBibleReference(),
    };
};

export const makeBibleReferenceRangeConnection = (overrides?: Partial<Types.BibleReferenceRangeConnection>): Types.BibleReferenceRangeConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeBibleReferenceRangeEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeBibleReferenceRange()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeBibleReferenceRangeEdge = (overrides?: Partial<Types.BibleReferenceRangeEdge>): Types.BibleReferenceRangeEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'laudantium',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeBibleReferenceRange(),
    };
};

export const makeBibleReferenceRangeInput = (overrides?: Partial<Types.BibleReferenceRangeInput>): Types.BibleReferenceRangeInput => {
    return {
        endReference: overrides && overrides.hasOwnProperty('endReference') ? overrides.endReference! : makeBibleReferenceInput(),
        startReference: overrides && overrides.hasOwnProperty('startReference') ? overrides.startReference! : makeBibleReferenceInput(),
    };
};

export const makeBibleSponsor = (overrides?: Partial<Types.BibleSponsor>): Types.BibleSponsor => {
    return {
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'consequatur',
        url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : 'illum',
    };
};

export const makeBibleVerse = (overrides?: Partial<Types.BibleVerse>): Types.BibleVerse => {
    return {
        number: overrides && overrides.hasOwnProperty('number') ? overrides.number! : 6429,
        text: overrides && overrides.hasOwnProperty('text') ? overrides.text! : 'aspernatur',
    };
};

export const makeBlogPost = (overrides?: Partial<Types.BlogPost>): Types.BlogPost => {
    return {
        body: overrides && overrides.hasOwnProperty('body') ? overrides.body! : 'est',
        canonicalPath: overrides && overrides.hasOwnProperty('canonicalPath') ? overrides.canonicalPath! : 'est',
        canonicalUrl: overrides && overrides.hasOwnProperty('canonicalUrl') ? overrides.canonicalUrl! : 'explicabo',
        featuredDuration: overrides && overrides.hasOwnProperty('featuredDuration') ? overrides.featuredDuration! : 5629,
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'cc3d7a27-1ad5-4451-8923-d6e74ec2ad72',
        image: overrides && overrides.hasOwnProperty('image') ? overrides.image! : makeImage(),
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : false,
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Types.Language.Chinese,
        publishDate: overrides && overrides.hasOwnProperty('publishDate') ? overrides.publishDate! : 'exercitationem',
        readingDuration: overrides && overrides.hasOwnProperty('readingDuration') ? overrides.readingDuration! : 2.15,
        shareUrl: overrides && overrides.hasOwnProperty('shareUrl') ? overrides.shareUrl! : 'necessitatibus',
        teaser: overrides && overrides.hasOwnProperty('teaser') ? overrides.teaser! : 'voluptas',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'nihil',
    };
};

export const makeBlogPostConnection = (overrides?: Partial<Types.BlogPostConnection>): Types.BlogPostConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeBlogPostEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeBlogPost()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeBlogPostCreateInput = (overrides?: Partial<Types.BlogPostCreateInput>): Types.BlogPostCreateInput => {
    return {
        body: overrides && overrides.hasOwnProperty('body') ? overrides.body! : 'similique',
        featuredDuration: overrides && overrides.hasOwnProperty('featuredDuration') ? overrides.featuredDuration! : 3411,
        image: overrides && overrides.hasOwnProperty('image') ? overrides.image! : makeImageInput(),
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : false,
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Types.Language.Chinese,
        publishDate: overrides && overrides.hasOwnProperty('publishDate') ? overrides.publishDate! : 'voluptas',
        teaser: overrides && overrides.hasOwnProperty('teaser') ? overrides.teaser! : 'qui',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'qui',
    };
};

export const makeBlogPostEdge = (overrides?: Partial<Types.BlogPostEdge>): Types.BlogPostEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'voluptates',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeBlogPost(),
    };
};

export const makeBlogPostOrder = (overrides?: Partial<Types.BlogPostOrder>): Types.BlogPostOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : Types.OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : Types.BlogPostSortableField.PublishedAt,
    };
};

export const makeBlogPostPayload = (overrides?: Partial<Types.BlogPostPayload>): Types.BlogPostPayload => {
    return {
        blogPost: overrides && overrides.hasOwnProperty('blogPost') ? overrides.blogPost! : makeBlogPost(),
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
    };
};

export const makeBlogPostUpdateInput = (overrides?: Partial<Types.BlogPostUpdateInput>): Types.BlogPostUpdateInput => {
    return {
        body: overrides && overrides.hasOwnProperty('body') ? overrides.body! : 'ex',
        featuredDuration: overrides && overrides.hasOwnProperty('featuredDuration') ? overrides.featuredDuration! : 8405,
        image: overrides && overrides.hasOwnProperty('image') ? overrides.image! : makeImageInput(),
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : true,
        publishDate: overrides && overrides.hasOwnProperty('publishDate') ? overrides.publishDate! : 'enim',
        teaser: overrides && overrides.hasOwnProperty('teaser') ? overrides.teaser! : 'officiis',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'facilis',
    };
};

export const makeCatalogHistoryComment = (overrides?: Partial<Types.CatalogHistoryComment>): Types.CatalogHistoryComment => {
    return {
        isSticky: overrides && overrides.hasOwnProperty('isSticky') ? overrides.isSticky! : false,
        mentions: overrides && overrides.hasOwnProperty('mentions') ? overrides.mentions! : [makeUser()],
        message: overrides && overrides.hasOwnProperty('message') ? overrides.message! : 'ut',
    };
};

export const makeCatalogHistoryCommentCreateInput = (overrides?: Partial<Types.CatalogHistoryCommentCreateInput>): Types.CatalogHistoryCommentCreateInput => {
    return {
        isSticky: overrides && overrides.hasOwnProperty('isSticky') ? overrides.isSticky! : false,
        message: overrides && overrides.hasOwnProperty('message') ? overrides.message! : 'quisquam',
    };
};

export const makeCatalogHistoryCommentUpdateInput = (overrides?: Partial<Types.CatalogHistoryCommentUpdateInput>): Types.CatalogHistoryCommentUpdateInput => {
    return {
        isSticky: overrides && overrides.hasOwnProperty('isSticky') ? overrides.isSticky! : true,
        message: overrides && overrides.hasOwnProperty('message') ? overrides.message! : 'repellat',
    };
};

export const makeCatalogHistoryItem = (overrides?: Partial<Types.CatalogHistoryItem>): Types.CatalogHistoryItem => {
    return {
        comment: overrides && overrides.hasOwnProperty('comment') ? overrides.comment! : makeCatalogHistoryComment(),
        createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : 'est',
        entity: overrides && overrides.hasOwnProperty('entity') ? overrides.entity! : makeCollection(),
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '39bb0a73-e103-4a91-9054-5e017d58c20e',
        performer: overrides && overrides.hasOwnProperty('performer') ? overrides.performer! : makeUser(),
        type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : Types.CatalogHistoryItemType.Archive,
    };
};

export const makeCatalogHistoryItemConnection = (overrides?: Partial<Types.CatalogHistoryItemConnection>): Types.CatalogHistoryItemConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeCatalogHistoryItemEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeCatalogHistoryItem()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeCatalogHistoryItemEdge = (overrides?: Partial<Types.CatalogHistoryItemEdge>): Types.CatalogHistoryItemEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'esse',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeCatalogHistoryItem(),
    };
};

export const makeCatalogHistoryItemOrder = (overrides?: Partial<Types.CatalogHistoryItemOrder>): Types.CatalogHistoryItemOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : Types.OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : Types.CatalogHistoryItemSortableField.CreatedAt,
    };
};

export const makeCatalogHistoryItemPayload = (overrides?: Partial<Types.CatalogHistoryItemPayload>): Types.CatalogHistoryItemPayload => {
    return {
        catalogHistoryItem: overrides && overrides.hasOwnProperty('catalogHistoryItem') ? overrides.catalogHistoryItem! : makeCatalogHistoryItem(),
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
    };
};

export const makeCollection = (overrides?: Partial<Types.Collection>): Types.Collection => {
    return {
        canonicalPath: overrides && overrides.hasOwnProperty('canonicalPath') ? overrides.canonicalPath! : 'incidunt',
        canonicalUrl: overrides && overrides.hasOwnProperty('canonicalUrl') ? overrides.canonicalUrl! : 'vel',
        contentType: overrides && overrides.hasOwnProperty('contentType') ? overrides.contentType! : Types.CollectionContentType.AudiobookSeries,
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'suscipit',
        duration: overrides && overrides.hasOwnProperty('duration') ? overrides.duration! : 8.21,
        endDate: overrides && overrides.hasOwnProperty('endDate') ? overrides.endDate! : '1970-01-04T22:39:13.305Z',
        hidingReason: overrides && overrides.hasOwnProperty('hidingReason') ? overrides.hidingReason! : 'tempora',
        history: overrides && overrides.hasOwnProperty('history') ? overrides.history! : makeCatalogHistoryItemConnection(),
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'df601c0f-3a8f-423d-af58-d8e8270ac85e',
        image: overrides && overrides.hasOwnProperty('image') ? overrides.image! : makeImage(),
        imageWithFallback: overrides && overrides.hasOwnProperty('imageWithFallback') ? overrides.imageWithFallback! : makeImage(),
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : false,
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Types.Language.Chinese,
        location: overrides && overrides.hasOwnProperty('location') ? overrides.location! : 'non',
        logoImage: overrides && overrides.hasOwnProperty('logoImage') ? overrides.logoImage! : makeImage(),
        logoImageWithFallback: overrides && overrides.hasOwnProperty('logoImageWithFallback') ? overrides.logoImageWithFallback! : makeImage(),
        mediaReleaseForm: overrides && overrides.hasOwnProperty('mediaReleaseForm') ? overrides.mediaReleaseForm! : makeMediaReleaseForm(),
        persons: overrides && overrides.hasOwnProperty('persons') ? overrides.persons! : makePersonConnection(),
        recordings: overrides && overrides.hasOwnProperty('recordings') ? overrides.recordings! : makeRecordingConnection(),
        sequences: overrides && overrides.hasOwnProperty('sequences') ? overrides.sequences! : makeSequenceConnection(),
        shareUrl: overrides && overrides.hasOwnProperty('shareUrl') ? overrides.shareUrl! : 'magnam',
        skipContentScreening: overrides && overrides.hasOwnProperty('skipContentScreening') ? overrides.skipContentScreening! : false,
        skipLegalScreening: overrides && overrides.hasOwnProperty('skipLegalScreening') ? overrides.skipLegalScreening! : true,
        sponsor: overrides && overrides.hasOwnProperty('sponsor') ? overrides.sponsor! : makeSponsor(),
        startDate: overrides && overrides.hasOwnProperty('startDate') ? overrides.startDate! : '1970-01-02T07:43:32.604Z',
        summary: overrides && overrides.hasOwnProperty('summary') ? overrides.summary! : 'vel',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'nesciunt',
        viewerHasFavorited: overrides && overrides.hasOwnProperty('viewerHasFavorited') ? overrides.viewerHasFavorited! : true,
        viewerPlaybackCompletedPercentage: overrides && overrides.hasOwnProperty('viewerPlaybackCompletedPercentage') ? overrides.viewerPlaybackCompletedPercentage! : 2.71,
    };
};

export const makeCollectionConnection = (overrides?: Partial<Types.CollectionConnection>): Types.CollectionConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeCollectionEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeCollection()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeCollectionCreateInput = (overrides?: Partial<Types.CollectionCreateInput>): Types.CollectionCreateInput => {
    return {
        contentType: overrides && overrides.hasOwnProperty('contentType') ? overrides.contentType! : Types.CollectionContentType.AudiobookSeries,
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'aut',
        hidingReason: overrides && overrides.hasOwnProperty('hidingReason') ? overrides.hidingReason! : 'aut',
        image: overrides && overrides.hasOwnProperty('image') ? overrides.image! : makeImageInput(),
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : false,
        location: overrides && overrides.hasOwnProperty('location') ? overrides.location! : 'consectetur',
        skipContentScreening: overrides && overrides.hasOwnProperty('skipContentScreening') ? overrides.skipContentScreening! : true,
        skipLegalScreening: overrides && overrides.hasOwnProperty('skipLegalScreening') ? overrides.skipLegalScreening! : true,
        sponsorId: overrides && overrides.hasOwnProperty('sponsorId') ? overrides.sponsorId! : 'f546ea1e-2d59-4dcc-9d82-d78cb37f8439',
        summary: overrides && overrides.hasOwnProperty('summary') ? overrides.summary! : 'velit',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'accusantium',
    };
};

export const makeCollectionEdge = (overrides?: Partial<Types.CollectionEdge>): Types.CollectionEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'et',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeCollection(),
    };
};

export const makeCollectionPayload = (overrides?: Partial<Types.CollectionPayload>): Types.CollectionPayload => {
    return {
        collection: overrides && overrides.hasOwnProperty('collection') ? overrides.collection! : makeCollection(),
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
    };
};

export const makeCollectionUpdateInput = (overrides?: Partial<Types.CollectionUpdateInput>): Types.CollectionUpdateInput => {
    return {
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'iusto',
        hidingReason: overrides && overrides.hasOwnProperty('hidingReason') ? overrides.hidingReason! : 'architecto',
        image: overrides && overrides.hasOwnProperty('image') ? overrides.image! : makeImageInput(),
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : false,
        location: overrides && overrides.hasOwnProperty('location') ? overrides.location! : 'quos',
        skipContentScreening: overrides && overrides.hasOwnProperty('skipContentScreening') ? overrides.skipContentScreening! : false,
        skipLegalScreening: overrides && overrides.hasOwnProperty('skipLegalScreening') ? overrides.skipLegalScreening! : false,
        sponsorId: overrides && overrides.hasOwnProperty('sponsorId') ? overrides.sponsorId! : 'f39730f0-731c-4ecc-b79f-7f334fff2042',
        summary: overrides && overrides.hasOwnProperty('summary') ? overrides.summary! : 'perferendis',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'eos',
    };
};

export const makeCollectionsOrder = (overrides?: Partial<Types.CollectionsOrder>): Types.CollectionsOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : Types.OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : Types.CollectionsSortableField.CreatedAt,
    };
};

export const makeDateRangeInput = (overrides?: Partial<Types.DateRangeInput>): Types.DateRangeInput => {
    return {
        greaterThan: overrides && overrides.hasOwnProperty('greaterThan') ? overrides.greaterThan! : '1970-01-08T09:56:28.668Z',
        greaterThanOrEqualTo: overrides && overrides.hasOwnProperty('greaterThanOrEqualTo') ? overrides.greaterThanOrEqualTo! : '1970-01-07T00:46:33.192Z',
        lessThan: overrides && overrides.hasOwnProperty('lessThan') ? overrides.lessThan! : '1970-01-13T17:05:46.394Z',
        lessThanOrEqualTo: overrides && overrides.hasOwnProperty('lessThanOrEqualTo') ? overrides.lessThanOrEqualTo! : '1970-01-13T17:11:33.424Z',
    };
};

export const makeDistributionAgreement = (overrides?: Partial<Types.DistributionAgreement>): Types.DistributionAgreement => {
    return {
        history: overrides && overrides.hasOwnProperty('history') ? overrides.history! : makeCatalogHistoryItemConnection(),
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '10975d35-8f47-4bff-85b2-023d16365fdc',
        isDefault: overrides && overrides.hasOwnProperty('isDefault') ? overrides.isDefault! : false,
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : false,
        isRetired: overrides && overrides.hasOwnProperty('isRetired') ? overrides.isRetired! : true,
        license: overrides && overrides.hasOwnProperty('license') ? overrides.license! : makeLicense(),
        recordings: overrides && overrides.hasOwnProperty('recordings') ? overrides.recordings! : makeRecordingConnection(),
        sponsor: overrides && overrides.hasOwnProperty('sponsor') ? overrides.sponsor! : makeSponsor(),
        summary: overrides && overrides.hasOwnProperty('summary') ? overrides.summary! : 'accusamus',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'eum',
    };
};

export const makeDistributionAgreementConnection = (overrides?: Partial<Types.DistributionAgreementConnection>): Types.DistributionAgreementConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeDistributionAgreementEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeDistributionAgreement()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeDistributionAgreementCreateInput = (overrides?: Partial<Types.DistributionAgreementCreateInput>): Types.DistributionAgreementCreateInput => {
    return {
        isDefault: overrides && overrides.hasOwnProperty('isDefault') ? overrides.isDefault! : false,
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : false,
        isRetired: overrides && overrides.hasOwnProperty('isRetired') ? overrides.isRetired! : false,
        licenseId: overrides && overrides.hasOwnProperty('licenseId') ? overrides.licenseId! : 'f279311c-249f-44b5-91fd-66cc6335f575',
        sponsorId: overrides && overrides.hasOwnProperty('sponsorId') ? overrides.sponsorId! : '6e70aede-9ca6-4044-ac90-6b9ce015ad2d',
        summary: overrides && overrides.hasOwnProperty('summary') ? overrides.summary! : 'quia',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'sit',
    };
};

export const makeDistributionAgreementEdge = (overrides?: Partial<Types.DistributionAgreementEdge>): Types.DistributionAgreementEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'corrupti',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeDistributionAgreement(),
    };
};

export const makeDistributionAgreementPayload = (overrides?: Partial<Types.DistributionAgreementPayload>): Types.DistributionAgreementPayload => {
    return {
        distributionAgreement: overrides && overrides.hasOwnProperty('distributionAgreement') ? overrides.distributionAgreement! : makeDistributionAgreement(),
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
    };
};

export const makeDistributionAgreementUpdateInput = (overrides?: Partial<Types.DistributionAgreementUpdateInput>): Types.DistributionAgreementUpdateInput => {
    return {
        isDefault: overrides && overrides.hasOwnProperty('isDefault') ? overrides.isDefault! : false,
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : false,
        isRetired: overrides && overrides.hasOwnProperty('isRetired') ? overrides.isRetired! : false,
        licenseId: overrides && overrides.hasOwnProperty('licenseId') ? overrides.licenseId! : 'e6595d12-329a-436d-af47-d9358ed00f7d',
        sponsorId: overrides && overrides.hasOwnProperty('sponsorId') ? overrides.sponsorId! : '8f926f80-6dee-46f5-93b3-2370f64e223f',
        summary: overrides && overrides.hasOwnProperty('summary') ? overrides.summary! : 'eligendi',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'atque',
    };
};

export const makeDistributionAgreementsOrder = (overrides?: Partial<Types.DistributionAgreementsOrder>): Types.DistributionAgreementsOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : Types.OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : Types.DistributionAgreementsSortableField.CreatedAt,
    };
};

export const makeFaq = (overrides?: Partial<Types.Faq>): Types.Faq => {
    return {
        body: overrides && overrides.hasOwnProperty('body') ? overrides.body! : 'est',
        faqCategory: overrides && overrides.hasOwnProperty('faqCategory') ? overrides.faqCategory! : makeFaqCategory(),
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '987481f7-6a81-4a5a-b2b7-c7d53092cbd9',
        index: overrides && overrides.hasOwnProperty('index') ? overrides.index! : 6289,
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : true,
        publishDate: overrides && overrides.hasOwnProperty('publishDate') ? overrides.publishDate! : 'saepe',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'optio',
    };
};

export const makeFaqCategory = (overrides?: Partial<Types.FaqCategory>): Types.FaqCategory => {
    return {
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'a22fd09d-b485-49d3-8c68-203ea6df58d5',
        index: overrides && overrides.hasOwnProperty('index') ? overrides.index! : 5027,
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'vero',
    };
};

export const makeFaqCategoryConnection = (overrides?: Partial<Types.FaqCategoryConnection>): Types.FaqCategoryConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeFaqCategoryEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeFaqCategory()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeFaqCategoryEdge = (overrides?: Partial<Types.FaqCategoryEdge>): Types.FaqCategoryEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'est',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeFaqCategory(),
    };
};

export const makeFaqConnection = (overrides?: Partial<Types.FaqConnection>): Types.FaqConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeFaqEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeFaq()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeFaqCreateInput = (overrides?: Partial<Types.FaqCreateInput>): Types.FaqCreateInput => {
    return {
        body: overrides && overrides.hasOwnProperty('body') ? overrides.body! : 'dicta',
        faqCategoryId: overrides && overrides.hasOwnProperty('faqCategoryId') ? overrides.faqCategoryId! : '765f8fae-f7bd-45ac-abe5-a2cb15c89775',
        index: overrides && overrides.hasOwnProperty('index') ? overrides.index! : 7748,
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : true,
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Types.Language.Chinese,
        publishDate: overrides && overrides.hasOwnProperty('publishDate') ? overrides.publishDate! : 'explicabo',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'blanditiis',
    };
};

export const makeFaqEdge = (overrides?: Partial<Types.FaqEdge>): Types.FaqEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'facere',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeFaq(),
    };
};

export const makeFaqPayload = (overrides?: Partial<Types.FaqPayload>): Types.FaqPayload => {
    return {
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
        faq: overrides && overrides.hasOwnProperty('faq') ? overrides.faq! : makeFaq(),
    };
};

export const makeFaqUpdateInput = (overrides?: Partial<Types.FaqUpdateInput>): Types.FaqUpdateInput => {
    return {
        body: overrides && overrides.hasOwnProperty('body') ? overrides.body! : 'facere',
        faqCategoryId: overrides && overrides.hasOwnProperty('faqCategoryId') ? overrides.faqCategoryId! : '45090427-6bae-4ef4-b8ee-3c4845f78811',
        index: overrides && overrides.hasOwnProperty('index') ? overrides.index! : 8704,
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : true,
        publishDate: overrides && overrides.hasOwnProperty('publishDate') ? overrides.publishDate! : 'facere',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'itaque',
    };
};

export const makeFaqsOrder = (overrides?: Partial<Types.FaqsOrder>): Types.FaqsOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : Types.OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : Types.FaqsSortableField.CreatedAt,
    };
};

export const makeFavoritesOrder = (overrides?: Partial<Types.FavoritesOrder>): Types.FavoritesOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : Types.OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : Types.FavoritesSortableField.EntityTitle,
    };
};

export const makeImage = (overrides?: Partial<Types.Image>): Types.Image => {
    return {
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '8cd950ba-96bb-470a-aecf-4194f25bbbb9',
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'cum',
        updatedAt: overrides && overrides.hasOwnProperty('updatedAt') ? overrides.updatedAt! : 'cupiditate',
        url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : 'rerum',
    };
};

export const makeImageConnectionSlim = (overrides?: Partial<Types.ImageConnectionSlim>): Types.ImageConnectionSlim => {
    return {
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeImageEdge()],
    };
};

export const makeImageEdge = (overrides?: Partial<Types.ImageEdge>): Types.ImageEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'nostrum',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeImage(),
    };
};

export const makeImageInput = (overrides?: Partial<Types.ImageInput>): Types.ImageInput => {
    return {
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'beatae',
    };
};

export const makeImagePayload = (overrides?: Partial<Types.ImagePayload>): Types.ImagePayload => {
    return {
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
        image: overrides && overrides.hasOwnProperty('image') ? overrides.image! : makeImage(),
    };
};

export const makeInputValidationError = (overrides?: Partial<Types.InputValidationError>): Types.InputValidationError => {
    return {
        message: overrides && overrides.hasOwnProperty('message') ? overrides.message! : 'in',
    };
};

export const makeIntegerRangeInput = (overrides?: Partial<Types.IntegerRangeInput>): Types.IntegerRangeInput => {
    return {
        greaterThan: overrides && overrides.hasOwnProperty('greaterThan') ? overrides.greaterThan! : 9976,
        greaterThanOrEqualTo: overrides && overrides.hasOwnProperty('greaterThanOrEqualTo') ? overrides.greaterThanOrEqualTo! : 2131,
        lessThan: overrides && overrides.hasOwnProperty('lessThan') ? overrides.lessThan! : 2601,
        lessThanOrEqualTo: overrides && overrides.hasOwnProperty('lessThanOrEqualTo') ? overrides.lessThanOrEqualTo! : 1946,
    };
};

export const makeInternalContact = (overrides?: Partial<Types.InternalContact>): Types.InternalContact => {
    return {
        address: overrides && overrides.hasOwnProperty('address') ? overrides.address! : 'id',
        email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'sit',
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'vero',
        phone: overrides && overrides.hasOwnProperty('phone') ? overrides.phone! : 'in',
    };
};

export const makeInternalContactInput = (overrides?: Partial<Types.InternalContactInput>): Types.InternalContactInput => {
    return {
        address: overrides && overrides.hasOwnProperty('address') ? overrides.address! : 'sint',
        email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'eligendi',
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'odit',
        phone: overrides && overrides.hasOwnProperty('phone') ? overrides.phone! : 'quo',
    };
};

export const makeLetterCount = (overrides?: Partial<Types.LetterCount>): Types.LetterCount => {
    return {
        count: overrides && overrides.hasOwnProperty('count') ? overrides.count! : 3877,
        letter: overrides && overrides.hasOwnProperty('letter') ? overrides.letter! : 'quod',
    };
};

export const makeLicense = (overrides?: Partial<Types.License>): Types.License => {
    return {
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'et',
        distributionAgreements: overrides && overrides.hasOwnProperty('distributionAgreements') ? overrides.distributionAgreements! : makeDistributionAgreementConnection(),
        history: overrides && overrides.hasOwnProperty('history') ? overrides.history! : makeCatalogHistoryItemConnection(),
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '422b5741-b8cd-4af7-a59e-d4a24ac0f279',
        image: overrides && overrides.hasOwnProperty('image') ? overrides.image! : makeImage(),
        isDefault: overrides && overrides.hasOwnProperty('isDefault') ? overrides.isDefault! : true,
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : true,
        permitsSales: overrides && overrides.hasOwnProperty('permitsSales') ? overrides.permitsSales! : true,
        summary: overrides && overrides.hasOwnProperty('summary') ? overrides.summary! : 'nam',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'perspiciatis',
    };
};

export const makeLicenseConnection = (overrides?: Partial<Types.LicenseConnection>): Types.LicenseConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeLicenseEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeLicense()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeLicenseCreateInput = (overrides?: Partial<Types.LicenseCreateInput>): Types.LicenseCreateInput => {
    return {
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'quis',
        image: overrides && overrides.hasOwnProperty('image') ? overrides.image! : makeImageInput(),
        isDefault: overrides && overrides.hasOwnProperty('isDefault') ? overrides.isDefault! : true,
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : true,
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Types.Language.Chinese,
        permitsSales: overrides && overrides.hasOwnProperty('permitsSales') ? overrides.permitsSales! : false,
        summary: overrides && overrides.hasOwnProperty('summary') ? overrides.summary! : 'aut',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'veniam',
    };
};

export const makeLicenseEdge = (overrides?: Partial<Types.LicenseEdge>): Types.LicenseEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'dignissimos',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeLicense(),
    };
};

export const makeLicensePayload = (overrides?: Partial<Types.LicensePayload>): Types.LicensePayload => {
    return {
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
        license: overrides && overrides.hasOwnProperty('license') ? overrides.license! : makeLicense(),
    };
};

export const makeLicenseUpdateInput = (overrides?: Partial<Types.LicenseUpdateInput>): Types.LicenseUpdateInput => {
    return {
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'in',
        image: overrides && overrides.hasOwnProperty('image') ? overrides.image! : makeImageInput(),
        isDefault: overrides && overrides.hasOwnProperty('isDefault') ? overrides.isDefault! : false,
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : false,
        permitsSales: overrides && overrides.hasOwnProperty('permitsSales') ? overrides.permitsSales! : false,
        summary: overrides && overrides.hasOwnProperty('summary') ? overrides.summary! : 'repudiandae',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'atque',
    };
};

export const makeLicensesOrder = (overrides?: Partial<Types.LicensesOrder>): Types.LicensesOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : Types.OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : Types.LicensesSortableField.CreatedAt,
    };
};

export const makeMediaFileResultConnection = (overrides?: Partial<Types.MediaFileResultConnection>): Types.MediaFileResultConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeMediaFileResultEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeAttachment()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeMediaFileResultEdge = (overrides?: Partial<Types.MediaFileResultEdge>): Types.MediaFileResultEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'necessitatibus',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeAttachment(),
    };
};

export const makeMediaFileUpload = (overrides?: Partial<Types.MediaFileUpload>): Types.MediaFileUpload => {
    return {
        canDelete: overrides && overrides.hasOwnProperty('canDelete') ? overrides.canDelete! : false,
        filename: overrides && overrides.hasOwnProperty('filename') ? overrides.filename! : 'cupiditate',
        filesize: overrides && overrides.hasOwnProperty('filesize') ? overrides.filesize! : 'sed',
        hasUploaded: overrides && overrides.hasOwnProperty('hasUploaded') ? overrides.hasUploaded! : true,
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'b6594681-f145-4354-b764-7393d194a379',
        mimeType: overrides && overrides.hasOwnProperty('mimeType') ? overrides.mimeType! : 'delectus',
        partUploadUrls: overrides && overrides.hasOwnProperty('partUploadUrls') ? overrides.partUploadUrls! : ['rerum'],
        recording: overrides && overrides.hasOwnProperty('recording') ? overrides.recording! : makeRecording(),
        transcodingStatus: overrides && overrides.hasOwnProperty('transcodingStatus') ? overrides.transcodingStatus! : Types.MediaFileTranscodingStatus.Complete,
        updatedAt: overrides && overrides.hasOwnProperty('updatedAt') ? overrides.updatedAt! : 'nisi',
        url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : 'nihil',
    };
};

export const makeMediaFileUploadConnection = (overrides?: Partial<Types.MediaFileUploadConnection>): Types.MediaFileUploadConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeMediaFileUploadEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeMediaFileUpload()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeMediaFileUploadEdge = (overrides?: Partial<Types.MediaFileUploadEdge>): Types.MediaFileUploadEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'occaecati',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeMediaFileUpload(),
    };
};

export const makeMediaFileUploadFinishInput = (overrides?: Partial<Types.MediaFileUploadFinishInput>): Types.MediaFileUploadFinishInput => {
    return {
        uploadPartEtags: overrides && overrides.hasOwnProperty('uploadPartEtags') ? overrides.uploadPartEtags! : ['perspiciatis'],
    };
};

export const makeMediaFileUploadPayload = (overrides?: Partial<Types.MediaFileUploadPayload>): Types.MediaFileUploadPayload => {
    return {
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
        mediaFileUpload: overrides && overrides.hasOwnProperty('mediaFileUpload') ? overrides.mediaFileUpload! : makeMediaFileUpload(),
    };
};

export const makeMediaFileUploadStartInput = (overrides?: Partial<Types.MediaFileUploadStartInput>): Types.MediaFileUploadStartInput => {
    return {
        filename: overrides && overrides.hasOwnProperty('filename') ? overrides.filename! : 'enim',
        filesize: overrides && overrides.hasOwnProperty('filesize') ? overrides.filesize! : 'sed',
        recordingId: overrides && overrides.hasOwnProperty('recordingId') ? overrides.recordingId! : '78c3b2c4-1058-42db-a5f0-d85d981d037e',
    };
};

export const makeMediaFileUploadsOrder = (overrides?: Partial<Types.MediaFileUploadsOrder>): Types.MediaFileUploadsOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : Types.OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : Types.MediaFileUploadsSortableField.CreatedAt,
    };
};

export const makeMediaFilesOrder = (overrides?: Partial<Types.MediaFilesOrder>): Types.MediaFilesOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : Types.OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : Types.MediaFilesSortableField.CreatedAt,
    };
};

export const makeMediaRelease = (overrides?: Partial<Types.MediaRelease>): Types.MediaRelease => {
    return {
        createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : 'qui',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '5bc277cd-6641-48d8-a643-ae4fe12a2868',
        mediaReleaseForm: overrides && overrides.hasOwnProperty('mediaReleaseForm') ? overrides.mediaReleaseForm! : makeMediaReleaseForm(),
        mediaReleasePerson: overrides && overrides.hasOwnProperty('mediaReleasePerson') ? overrides.mediaReleasePerson! : makeMediaReleasePerson(),
        notes: overrides && overrides.hasOwnProperty('notes') ? overrides.notes! : 'porro',
        person: overrides && overrides.hasOwnProperty('person') ? overrides.person! : makePerson(),
    };
};

export const makeMediaReleaseConnection = (overrides?: Partial<Types.MediaReleaseConnection>): Types.MediaReleaseConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeMediaReleaseEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeMediaRelease()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeMediaReleaseCreateInput = (overrides?: Partial<Types.MediaReleaseCreateInput>): Types.MediaReleaseCreateInput => {
    return {
        mediaReleaseFormId: overrides && overrides.hasOwnProperty('mediaReleaseFormId') ? overrides.mediaReleaseFormId! : 'beca14ba-c319-45cd-a6ce-27d2de9f3401',
        mediaReleasePerson: overrides && overrides.hasOwnProperty('mediaReleasePerson') ? overrides.mediaReleasePerson! : makeMediaReleasePersonCreateInput(),
        notes: overrides && overrides.hasOwnProperty('notes') ? overrides.notes! : 'quis',
        personId: overrides && overrides.hasOwnProperty('personId') ? overrides.personId! : '6bc062a1-7f32-4279-a764-c4a7999aba5d',
    };
};

export const makeMediaReleaseEdge = (overrides?: Partial<Types.MediaReleaseEdge>): Types.MediaReleaseEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'nihil',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeMediaRelease(),
    };
};

export const makeMediaReleaseForm = (overrides?: Partial<Types.MediaReleaseForm>): Types.MediaReleaseForm => {
    return {
        collection: overrides && overrides.hasOwnProperty('collection') ? overrides.collection! : makeCollection(),
        createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : 'qui',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '5fb52a56-e8f0-405f-ab44-a8b29add9567',
        isClosed: overrides && overrides.hasOwnProperty('isClosed') ? overrides.isClosed! : false,
        mediaReleases: overrides && overrides.hasOwnProperty('mediaReleases') ? overrides.mediaReleases! : makeMediaReleaseConnection(),
        recording: overrides && overrides.hasOwnProperty('recording') ? overrides.recording! : makeRecording(),
        sequence: overrides && overrides.hasOwnProperty('sequence') ? overrides.sequence! : makeSequence(),
        sponsor: overrides && overrides.hasOwnProperty('sponsor') ? overrides.sponsor! : makeSponsor(),
        summary: overrides && overrides.hasOwnProperty('summary') ? overrides.summary! : 'aut',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'praesentium',
        type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : Types.MediaReleaseFormType.Collection,
        url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : 'qui',
    };
};

export const makeMediaReleaseFormConnection = (overrides?: Partial<Types.MediaReleaseFormConnection>): Types.MediaReleaseFormConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeMediaReleaseFormEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeMediaReleaseForm()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeMediaReleaseFormCreateInput = (overrides?: Partial<Types.MediaReleaseFormCreateInput>): Types.MediaReleaseFormCreateInput => {
    return {
        collectionId: overrides && overrides.hasOwnProperty('collectionId') ? overrides.collectionId! : 'a5126647-bd07-42b0-bb76-0b7e037e7c4c',
        isClosed: overrides && overrides.hasOwnProperty('isClosed') ? overrides.isClosed! : true,
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Types.Language.Chinese,
        recordingId: overrides && overrides.hasOwnProperty('recordingId') ? overrides.recordingId! : '73d7bd18-dbb9-4b4c-8768-ff726f682f4b',
        sequenceId: overrides && overrides.hasOwnProperty('sequenceId') ? overrides.sequenceId! : 'c3066efd-7160-4fdf-8acf-c9fd3bb91e63',
        sponsorId: overrides && overrides.hasOwnProperty('sponsorId') ? overrides.sponsorId! : 'd7e8860c-2e4b-41b4-804b-b7a9a318ba05',
        summary: overrides && overrides.hasOwnProperty('summary') ? overrides.summary! : 'consectetur',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'aliquid',
        type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : Types.MediaReleaseFormType.Collection,
    };
};

export const makeMediaReleaseFormEdge = (overrides?: Partial<Types.MediaReleaseFormEdge>): Types.MediaReleaseFormEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'eveniet',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeMediaReleaseForm(),
    };
};

export const makeMediaReleaseFormOrder = (overrides?: Partial<Types.MediaReleaseFormOrder>): Types.MediaReleaseFormOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : Types.OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : Types.MediaReleaseFormSortableField.CreatedAt,
    };
};

export const makeMediaReleaseFormPayload = (overrides?: Partial<Types.MediaReleaseFormPayload>): Types.MediaReleaseFormPayload => {
    return {
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
        mediaReleaseForm: overrides && overrides.hasOwnProperty('mediaReleaseForm') ? overrides.mediaReleaseForm! : makeMediaReleaseForm(),
    };
};

export const makeMediaReleaseFormTemplate = (overrides?: Partial<Types.MediaReleaseFormTemplate>): Types.MediaReleaseFormTemplate => {
    return {
        summary: overrides && overrides.hasOwnProperty('summary') ? overrides.summary! : 'eum',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'consequatur',
        type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : Types.MediaReleaseFormType.Collection,
    };
};

export const makeMediaReleaseFormUpdateInput = (overrides?: Partial<Types.MediaReleaseFormUpdateInput>): Types.MediaReleaseFormUpdateInput => {
    return {
        collectionId: overrides && overrides.hasOwnProperty('collectionId') ? overrides.collectionId! : '34f3bbf3-7bd3-4b88-b07e-72af60e0e856',
        isClosed: overrides && overrides.hasOwnProperty('isClosed') ? overrides.isClosed! : false,
        recordingId: overrides && overrides.hasOwnProperty('recordingId') ? overrides.recordingId! : '7c804dbc-a58a-482a-853c-ac0e82a03c78',
        sequenceId: overrides && overrides.hasOwnProperty('sequenceId') ? overrides.sequenceId! : '7938a0f3-09c9-42d6-817e-fbc78a05c0ea',
        sponsorId: overrides && overrides.hasOwnProperty('sponsorId') ? overrides.sponsorId! : '484ab7fb-2d85-4676-ac8b-c246a0a5d9e1',
        summary: overrides && overrides.hasOwnProperty('summary') ? overrides.summary! : 'voluptatem',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'velit',
        type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : Types.MediaReleaseFormType.Collection,
    };
};

export const makeMediaReleaseOrder = (overrides?: Partial<Types.MediaReleaseOrder>): Types.MediaReleaseOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : Types.OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : Types.MediaReleaseSortableField.CreatedAt,
    };
};

export const makeMediaReleasePayload = (overrides?: Partial<Types.MediaReleasePayload>): Types.MediaReleasePayload => {
    return {
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
        mediaRelease: overrides && overrides.hasOwnProperty('mediaRelease') ? overrides.mediaRelease! : makeMediaRelease(),
    };
};

export const makeMediaReleasePerson = (overrides?: Partial<Types.MediaReleasePerson>): Types.MediaReleasePerson => {
    return {
        address1: overrides && overrides.hasOwnProperty('address1') ? overrides.address1! : 'ut',
        address2: overrides && overrides.hasOwnProperty('address2') ? overrides.address2! : 'ullam',
        city: overrides && overrides.hasOwnProperty('city') ? overrides.city! : 'placeat',
        country: overrides && overrides.hasOwnProperty('country') ? overrides.country! : 'debitis',
        email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'amet',
        givenName: overrides && overrides.hasOwnProperty('givenName') ? overrides.givenName! : 'consequuntur',
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'doloribus',
        phone: overrides && overrides.hasOwnProperty('phone') ? overrides.phone! : 'eveniet',
        postalCode: overrides && overrides.hasOwnProperty('postalCode') ? overrides.postalCode! : 'nulla',
        province: overrides && overrides.hasOwnProperty('province') ? overrides.province! : 'laboriosam',
        surname: overrides && overrides.hasOwnProperty('surname') ? overrides.surname! : 'atque',
    };
};

export const makeMediaReleasePersonCreateInput = (overrides?: Partial<Types.MediaReleasePersonCreateInput>): Types.MediaReleasePersonCreateInput => {
    return {
        address1: overrides && overrides.hasOwnProperty('address1') ? overrides.address1! : 'illum',
        address2: overrides && overrides.hasOwnProperty('address2') ? overrides.address2! : 'nulla',
        city: overrides && overrides.hasOwnProperty('city') ? overrides.city! : 'et',
        country: overrides && overrides.hasOwnProperty('country') ? overrides.country! : 'ullam',
        email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'ratione',
        givenName: overrides && overrides.hasOwnProperty('givenName') ? overrides.givenName! : 'eum',
        phone: overrides && overrides.hasOwnProperty('phone') ? overrides.phone! : 'quas',
        postalCode: overrides && overrides.hasOwnProperty('postalCode') ? overrides.postalCode! : 'aliquid',
        province: overrides && overrides.hasOwnProperty('province') ? overrides.province! : 'quos',
        surname: overrides && overrides.hasOwnProperty('surname') ? overrides.surname! : 'et',
    };
};

export const makeMediaReleasePersonUpdateInput = (overrides?: Partial<Types.MediaReleasePersonUpdateInput>): Types.MediaReleasePersonUpdateInput => {
    return {
        address1: overrides && overrides.hasOwnProperty('address1') ? overrides.address1! : 'recusandae',
        address2: overrides && overrides.hasOwnProperty('address2') ? overrides.address2! : 'dolor',
        city: overrides && overrides.hasOwnProperty('city') ? overrides.city! : 'sapiente',
        country: overrides && overrides.hasOwnProperty('country') ? overrides.country! : 'rerum',
        email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'possimus',
        givenName: overrides && overrides.hasOwnProperty('givenName') ? overrides.givenName! : 'cupiditate',
        phone: overrides && overrides.hasOwnProperty('phone') ? overrides.phone! : 'dicta',
        postalCode: overrides && overrides.hasOwnProperty('postalCode') ? overrides.postalCode! : 'est',
        province: overrides && overrides.hasOwnProperty('province') ? overrides.province! : 'ea',
        surname: overrides && overrides.hasOwnProperty('surname') ? overrides.surname! : 'eos',
    };
};

export const makeMediaReleaseUpdateInput = (overrides?: Partial<Types.MediaReleaseUpdateInput>): Types.MediaReleaseUpdateInput => {
    return {
        mediaReleasePerson: overrides && overrides.hasOwnProperty('mediaReleasePerson') ? overrides.mediaReleasePerson! : makeMediaReleasePersonUpdateInput(),
        notes: overrides && overrides.hasOwnProperty('notes') ? overrides.notes! : 'modi',
        personId: overrides && overrides.hasOwnProperty('personId') ? overrides.personId! : '3d0f9c7e-f38e-4bb8-b96c-cea1b6e39251',
    };
};

export const makeMutation = (overrides?: Partial<Types.Mutation>): Types.Mutation => {
    return {
        blogPostCreate: overrides && overrides.hasOwnProperty('blogPostCreate') ? overrides.blogPostCreate! : makeBlogPostPayload(),
        blogPostDelete: overrides && overrides.hasOwnProperty('blogPostDelete') ? overrides.blogPostDelete! : makeSuccessPayload(),
        blogPostUpdate: overrides && overrides.hasOwnProperty('blogPostUpdate') ? overrides.blogPostUpdate! : makeBlogPostPayload(),
        catalogHistoryCommentDelete: overrides && overrides.hasOwnProperty('catalogHistoryCommentDelete') ? overrides.catalogHistoryCommentDelete! : makeSuccessPayload(),
        catalogHistoryCommentUpdate: overrides && overrides.hasOwnProperty('catalogHistoryCommentUpdate') ? overrides.catalogHistoryCommentUpdate! : makeCatalogHistoryItemPayload(),
        collectionCreate: overrides && overrides.hasOwnProperty('collectionCreate') ? overrides.collectionCreate! : makeCollectionPayload(),
        collectionDelete: overrides && overrides.hasOwnProperty('collectionDelete') ? overrides.collectionDelete! : makeSuccessPayload(),
        collectionFavorite: overrides && overrides.hasOwnProperty('collectionFavorite') ? overrides.collectionFavorite! : makeSuccessPayload(),
        collectionHistoryCommentCreate: overrides && overrides.hasOwnProperty('collectionHistoryCommentCreate') ? overrides.collectionHistoryCommentCreate! : makeCatalogHistoryItemPayload(),
        collectionScreeningLegalOverride: overrides && overrides.hasOwnProperty('collectionScreeningLegalOverride') ? overrides.collectionScreeningLegalOverride! : makeSuccessPayload(),
        collectionUnfavorite: overrides && overrides.hasOwnProperty('collectionUnfavorite') ? overrides.collectionUnfavorite! : makeSuccessPayload(),
        collectionUpdate: overrides && overrides.hasOwnProperty('collectionUpdate') ? overrides.collectionUpdate! : makeCollectionPayload(),
        distributionAgreementCreate: overrides && overrides.hasOwnProperty('distributionAgreementCreate') ? overrides.distributionAgreementCreate! : makeDistributionAgreementPayload(),
        distributionAgreementDelete: overrides && overrides.hasOwnProperty('distributionAgreementDelete') ? overrides.distributionAgreementDelete! : makeSuccessPayload(),
        distributionAgreementHistoryCommentCreate: overrides && overrides.hasOwnProperty('distributionAgreementHistoryCommentCreate') ? overrides.distributionAgreementHistoryCommentCreate! : makeCatalogHistoryItemPayload(),
        distributionAgreementUpdate: overrides && overrides.hasOwnProperty('distributionAgreementUpdate') ? overrides.distributionAgreementUpdate! : makeDistributionAgreementPayload(),
        faqCreate: overrides && overrides.hasOwnProperty('faqCreate') ? overrides.faqCreate! : makeFaqPayload(),
        faqDelete: overrides && overrides.hasOwnProperty('faqDelete') ? overrides.faqDelete! : makeSuccessPayload(),
        faqUpdate: overrides && overrides.hasOwnProperty('faqUpdate') ? overrides.faqUpdate! : makeFaqPayload(),
        favoriteRecording: overrides && overrides.hasOwnProperty('favoriteRecording') ? overrides.favoriteRecording! : true,
        imageUpload: overrides && overrides.hasOwnProperty('imageUpload') ? overrides.imageUpload! : makeImagePayload(),
        licenseCreate: overrides && overrides.hasOwnProperty('licenseCreate') ? overrides.licenseCreate! : makeLicensePayload(),
        licenseDelete: overrides && overrides.hasOwnProperty('licenseDelete') ? overrides.licenseDelete! : makeSuccessPayload(),
        licenseHistoryCommentCreate: overrides && overrides.hasOwnProperty('licenseHistoryCommentCreate') ? overrides.licenseHistoryCommentCreate! : makeCatalogHistoryItemPayload(),
        licenseUpdate: overrides && overrides.hasOwnProperty('licenseUpdate') ? overrides.licenseUpdate! : makeLicensePayload(),
        login: overrides && overrides.hasOwnProperty('login') ? overrides.login! : makeAuthenticatedUserPayload(),
        loginSocial: overrides && overrides.hasOwnProperty('loginSocial') ? overrides.loginSocial! : makeAuthenticatedUserPayload(),
        mediaFileDelete: overrides && overrides.hasOwnProperty('mediaFileDelete') ? overrides.mediaFileDelete! : makeSuccessPayload(),
        mediaFileUploadAbort: overrides && overrides.hasOwnProperty('mediaFileUploadAbort') ? overrides.mediaFileUploadAbort! : makeSuccessPayload(),
        mediaFileUploadAssign: overrides && overrides.hasOwnProperty('mediaFileUploadAssign') ? overrides.mediaFileUploadAssign! : makeSuccessPayload(),
        mediaFileUploadFinish: overrides && overrides.hasOwnProperty('mediaFileUploadFinish') ? overrides.mediaFileUploadFinish! : makeMediaFileUploadPayload(),
        mediaFileUploadStart: overrides && overrides.hasOwnProperty('mediaFileUploadStart') ? overrides.mediaFileUploadStart! : makeMediaFileUploadPayload(),
        mediaReleaseCreate: overrides && overrides.hasOwnProperty('mediaReleaseCreate') ? overrides.mediaReleaseCreate! : makeMediaReleasePayload(),
        mediaReleaseDelete: overrides && overrides.hasOwnProperty('mediaReleaseDelete') ? overrides.mediaReleaseDelete! : makeSuccessPayload(),
        mediaReleaseFormCreate: overrides && overrides.hasOwnProperty('mediaReleaseFormCreate') ? overrides.mediaReleaseFormCreate! : makeMediaReleaseFormPayload(),
        mediaReleaseFormDelete: overrides && overrides.hasOwnProperty('mediaReleaseFormDelete') ? overrides.mediaReleaseFormDelete! : makeSuccessPayload(),
        mediaReleaseFormTemplateUpdate: overrides && overrides.hasOwnProperty('mediaReleaseFormTemplateUpdate') ? overrides.mediaReleaseFormTemplateUpdate! : makeSuccessPayload(),
        mediaReleaseFormUpdate: overrides && overrides.hasOwnProperty('mediaReleaseFormUpdate') ? overrides.mediaReleaseFormUpdate! : makeMediaReleaseFormPayload(),
        mediaReleaseUpdate: overrides && overrides.hasOwnProperty('mediaReleaseUpdate') ? overrides.mediaReleaseUpdate! : makeMediaReleasePayload(),
        pageContactSubmit: overrides && overrides.hasOwnProperty('pageContactSubmit') ? overrides.pageContactSubmit! : makeSuccessPayload(),
        pageCreate: overrides && overrides.hasOwnProperty('pageCreate') ? overrides.pageCreate! : makePagePayload(),
        pageDelete: overrides && overrides.hasOwnProperty('pageDelete') ? overrides.pageDelete! : makeSuccessPayload(),
        pageUpdate: overrides && overrides.hasOwnProperty('pageUpdate') ? overrides.pageUpdate! : makePagePayload(),
        personCreate: overrides && overrides.hasOwnProperty('personCreate') ? overrides.personCreate! : makePersonPayload(),
        personDelete: overrides && overrides.hasOwnProperty('personDelete') ? overrides.personDelete! : makeSuccessPayload(),
        personFavorite: overrides && overrides.hasOwnProperty('personFavorite') ? overrides.personFavorite! : makeSuccessPayload(),
        personHistoryCommentCreate: overrides && overrides.hasOwnProperty('personHistoryCommentCreate') ? overrides.personHistoryCommentCreate! : makeCatalogHistoryItemPayload(),
        personUnfavorite: overrides && overrides.hasOwnProperty('personUnfavorite') ? overrides.personUnfavorite! : makeSuccessPayload(),
        personUpdate: overrides && overrides.hasOwnProperty('personUpdate') ? overrides.personUpdate! : makePersonPayload(),
        playlistAdd: overrides && overrides.hasOwnProperty('playlistAdd') ? overrides.playlistAdd! : makeUserPlaylist(),
        playlistDelete: overrides && overrides.hasOwnProperty('playlistDelete') ? overrides.playlistDelete! : false,
        playlistRecordingAdd: overrides && overrides.hasOwnProperty('playlistRecordingAdd') ? overrides.playlistRecordingAdd! : false,
        playlistRecordingRemove: overrides && overrides.hasOwnProperty('playlistRecordingRemove') ? overrides.playlistRecordingRemove! : true,
        playlistUpdate: overrides && overrides.hasOwnProperty('playlistUpdate') ? overrides.playlistUpdate! : makeUserPlaylist(),
        recordingArchive: overrides && overrides.hasOwnProperty('recordingArchive') ? overrides.recordingArchive! : makeSuccessPayload(),
        recordingCreate: overrides && overrides.hasOwnProperty('recordingCreate') ? overrides.recordingCreate! : makeRecordingPayload(),
        recordingDelete: overrides && overrides.hasOwnProperty('recordingDelete') ? overrides.recordingDelete! : makeSuccessPayload(),
        recordingDrafting: overrides && overrides.hasOwnProperty('recordingDrafting') ? overrides.recordingDrafting! : makeRecordingPayload(),
        recordingFavorite: overrides && overrides.hasOwnProperty('recordingFavorite') ? overrides.recordingFavorite! : makeSuccessPayload(),
        recordingHistoryCommentCreate: overrides && overrides.hasOwnProperty('recordingHistoryCommentCreate') ? overrides.recordingHistoryCommentCreate! : makeCatalogHistoryItemPayload(),
        recordingPlaybackSessionAdvance: overrides && overrides.hasOwnProperty('recordingPlaybackSessionAdvance') ? overrides.recordingPlaybackSessionAdvance! : makeRecordingPayload(),
        recordingPlaybackSessionBegin: overrides && overrides.hasOwnProperty('recordingPlaybackSessionBegin') ? overrides.recordingPlaybackSessionBegin! : makeRecordingPayload(),
        recordingPlaybackSessionFinish: overrides && overrides.hasOwnProperty('recordingPlaybackSessionFinish') ? overrides.recordingPlaybackSessionFinish! : makeRecordingPayload(),
        recordingScreeningContentCheckoutCreate: overrides && overrides.hasOwnProperty('recordingScreeningContentCheckoutCreate') ? overrides.recordingScreeningContentCheckoutCreate! : makeRecordingScreeningCheckoutPayload(),
        recordingScreeningContentCheckoutDelete: overrides && overrides.hasOwnProperty('recordingScreeningContentCheckoutDelete') ? overrides.recordingScreeningContentCheckoutDelete! : makeSuccessPayload(),
        recordingScreeningContentEvaluate: overrides && overrides.hasOwnProperty('recordingScreeningContentEvaluate') ? overrides.recordingScreeningContentEvaluate! : makeRecordingPayload(),
        recordingScreeningContentEvaluationsClear: overrides && overrides.hasOwnProperty('recordingScreeningContentEvaluationsClear') ? overrides.recordingScreeningContentEvaluationsClear! : makeRecordingPayload(),
        recordingScreeningContentMethodsSet: overrides && overrides.hasOwnProperty('recordingScreeningContentMethodsSet') ? overrides.recordingScreeningContentMethodsSet! : makeRecordingContentScreeningEvaluationPayload(),
        recordingScreeningContentUnevaluate: overrides && overrides.hasOwnProperty('recordingScreeningContentUnevaluate') ? overrides.recordingScreeningContentUnevaluate! : makeRecordingPayload(),
        recordingScreeningIssueCreate: overrides && overrides.hasOwnProperty('recordingScreeningIssueCreate') ? overrides.recordingScreeningIssueCreate! : makeRecordingScreeningIssuePayload(),
        recordingScreeningIssueDelete: overrides && overrides.hasOwnProperty('recordingScreeningIssueDelete') ? overrides.recordingScreeningIssueDelete! : makeSuccessPayload(),
        recordingScreeningIssueUpdate: overrides && overrides.hasOwnProperty('recordingScreeningIssueUpdate') ? overrides.recordingScreeningIssueUpdate! : makeRecordingScreeningIssuePayload(),
        recordingScreeningLegalCheckoutCreate: overrides && overrides.hasOwnProperty('recordingScreeningLegalCheckoutCreate') ? overrides.recordingScreeningLegalCheckoutCreate! : makeRecordingScreeningCheckoutPayload(),
        recordingScreeningLegalCheckoutDelete: overrides && overrides.hasOwnProperty('recordingScreeningLegalCheckoutDelete') ? overrides.recordingScreeningLegalCheckoutDelete! : makeSuccessPayload(),
        recordingScreeningLegalEvaluate: overrides && overrides.hasOwnProperty('recordingScreeningLegalEvaluate') ? overrides.recordingScreeningLegalEvaluate! : makeRecordingPayload(),
        recordingScreeningTechnicalCheckoutCreate: overrides && overrides.hasOwnProperty('recordingScreeningTechnicalCheckoutCreate') ? overrides.recordingScreeningTechnicalCheckoutCreate! : makeRecordingScreeningCheckoutPayload(),
        recordingScreeningTechnicalCheckoutDelete: overrides && overrides.hasOwnProperty('recordingScreeningTechnicalCheckoutDelete') ? overrides.recordingScreeningTechnicalCheckoutDelete! : makeSuccessPayload(),
        recordingScreeningTechnicalEvaluate: overrides && overrides.hasOwnProperty('recordingScreeningTechnicalEvaluate') ? overrides.recordingScreeningTechnicalEvaluate! : makeRecordingPayload(),
        recordingTranscriptDelete: overrides && overrides.hasOwnProperty('recordingTranscriptDelete') ? overrides.recordingTranscriptDelete! : makeSuccessPayload(),
        recordingTranscriptUpdate: overrides && overrides.hasOwnProperty('recordingTranscriptUpdate') ? overrides.recordingTranscriptUpdate! : makeRecordingPayload(),
        recordingTranscriptionRequest: overrides && overrides.hasOwnProperty('recordingTranscriptionRequest') ? overrides.recordingTranscriptionRequest! : makeSuccessPayload(),
        recordingUnarchive: overrides && overrides.hasOwnProperty('recordingUnarchive') ? overrides.recordingUnarchive! : makeSuccessPayload(),
        recordingUnfavorite: overrides && overrides.hasOwnProperty('recordingUnfavorite') ? overrides.recordingUnfavorite! : makeSuccessPayload(),
        recordingUpdate: overrides && overrides.hasOwnProperty('recordingUpdate') ? overrides.recordingUpdate! : makeRecordingPayload(),
        sequenceCreate: overrides && overrides.hasOwnProperty('sequenceCreate') ? overrides.sequenceCreate! : makeSequencePayload(),
        sequenceDelete: overrides && overrides.hasOwnProperty('sequenceDelete') ? overrides.sequenceDelete! : makeSuccessPayload(),
        sequenceFavorite: overrides && overrides.hasOwnProperty('sequenceFavorite') ? overrides.sequenceFavorite! : makeSuccessPayload(),
        sequenceHistoryCommentCreate: overrides && overrides.hasOwnProperty('sequenceHistoryCommentCreate') ? overrides.sequenceHistoryCommentCreate! : makeCatalogHistoryItemPayload(),
        sequenceScreeningLegalOverride: overrides && overrides.hasOwnProperty('sequenceScreeningLegalOverride') ? overrides.sequenceScreeningLegalOverride! : makeSuccessPayload(),
        sequenceUnfavorite: overrides && overrides.hasOwnProperty('sequenceUnfavorite') ? overrides.sequenceUnfavorite! : makeSuccessPayload(),
        sequenceUpdate: overrides && overrides.hasOwnProperty('sequenceUpdate') ? overrides.sequenceUpdate! : makeSequencePayload(),
        signup: overrides && overrides.hasOwnProperty('signup') ? overrides.signup! : makeAuthenticatedUserPayload(),
        sponsorCreate: overrides && overrides.hasOwnProperty('sponsorCreate') ? overrides.sponsorCreate! : makeSponsorPayload(),
        sponsorDelete: overrides && overrides.hasOwnProperty('sponsorDelete') ? overrides.sponsorDelete! : makeSuccessPayload(),
        sponsorFavorite: overrides && overrides.hasOwnProperty('sponsorFavorite') ? overrides.sponsorFavorite! : makeSuccessPayload(),
        sponsorHistoryCommentCreate: overrides && overrides.hasOwnProperty('sponsorHistoryCommentCreate') ? overrides.sponsorHistoryCommentCreate! : makeCatalogHistoryItemPayload(),
        sponsorUnfavorite: overrides && overrides.hasOwnProperty('sponsorUnfavorite') ? overrides.sponsorUnfavorite! : makeSuccessPayload(),
        sponsorUpdate: overrides && overrides.hasOwnProperty('sponsorUpdate') ? overrides.sponsorUpdate! : makeSponsorPayload(),
        testimonyCreate: overrides && overrides.hasOwnProperty('testimonyCreate') ? overrides.testimonyCreate! : makeTestimonyPayload(),
        testimonyDelete: overrides && overrides.hasOwnProperty('testimonyDelete') ? overrides.testimonyDelete! : makeSuccessPayload(),
        testimonyUpdate: overrides && overrides.hasOwnProperty('testimonyUpdate') ? overrides.testimonyUpdate! : makeTestimonyPayload(),
        unfavoriteRecording: overrides && overrides.hasOwnProperty('unfavoriteRecording') ? overrides.unfavoriteRecording! : true,
        updateMyProfile: overrides && overrides.hasOwnProperty('updateMyProfile') ? overrides.updateMyProfile! : makeAuthenticatedUserPayload(),
        userCreate: overrides && overrides.hasOwnProperty('userCreate') ? overrides.userCreate! : makeUserPayload(),
        userDelete: overrides && overrides.hasOwnProperty('userDelete') ? overrides.userDelete! : makeSuccessPayload(),
        userNotificationsRead: overrides && overrides.hasOwnProperty('userNotificationsRead') ? overrides.userNotificationsRead! : makeUserPayload(),
        userRecover: overrides && overrides.hasOwnProperty('userRecover') ? overrides.userRecover! : makeSuccessPayload(),
        userReset: overrides && overrides.hasOwnProperty('userReset') ? overrides.userReset! : makeSuccessPayload(),
        userUpdate: overrides && overrides.hasOwnProperty('userUpdate') ? overrides.userUpdate! : makeUserPayload(),
    };
};

export const makeNode = (overrides?: Partial<Types.Node>): Types.Node => {
    return {
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '95bb2f34-6c86-495f-bfdc-f25b025cdba5',
    };
};

export const makeNotificationChannel = (overrides?: Partial<Types.NotificationChannel>): Types.NotificationChannel => {
    return {
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'tempora',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'ff4717b3-f706-4233-b18b-cb1c90798e85',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'qui',
    };
};

export const makeNotificationChannelConnection = (overrides?: Partial<Types.NotificationChannelConnection>): Types.NotificationChannelConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeNotificationChannelEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeNotificationChannel()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeNotificationChannelEdge = (overrides?: Partial<Types.NotificationChannelEdge>): Types.NotificationChannelEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'incidunt',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeNotificationChannel(),
    };
};

export const makeNotificationSubscription = (overrides?: Partial<Types.NotificationSubscription>): Types.NotificationSubscription => {
    return {
        frequency: overrides && overrides.hasOwnProperty('frequency') ? overrides.frequency! : Types.NotificationFrequency.Daily,
        notificationChannel: overrides && overrides.hasOwnProperty('notificationChannel') ? overrides.notificationChannel! : makeNotificationChannel(),
    };
};

export const makeNotificationSubscriptionConnection = (overrides?: Partial<Types.NotificationSubscriptionConnection>): Types.NotificationSubscriptionConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeNotificationSubscriptionEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeNotificationSubscription()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeNotificationSubscriptionEdge = (overrides?: Partial<Types.NotificationSubscriptionEdge>): Types.NotificationSubscriptionEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'repellendus',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeNotificationSubscription(),
    };
};

export const makeNotificationSubscriptionInput = (overrides?: Partial<Types.NotificationSubscriptionInput>): Types.NotificationSubscriptionInput => {
    return {
        frequency: overrides && overrides.hasOwnProperty('frequency') ? overrides.frequency! : Types.NotificationFrequency.Daily,
        notificationChannelId: overrides && overrides.hasOwnProperty('notificationChannelId') ? overrides.notificationChannelId! : '0c9e99cd-cca3-4f80-baee-265006788a70',
    };
};

export const makePage = (overrides?: Partial<Types.Page>): Types.Page => {
    return {
        body: overrides && overrides.hasOwnProperty('body') ? overrides.body! : 'et',
        canonicalPath: overrides && overrides.hasOwnProperty('canonicalPath') ? overrides.canonicalPath! : 'voluptate',
        canonicalUrl: overrides && overrides.hasOwnProperty('canonicalUrl') ? overrides.canonicalUrl! : 'nisi',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'e5182741-96b2-4214-b510-cbc3bfc2a674',
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : true,
        pageMenu: overrides && overrides.hasOwnProperty('pageMenu') ? overrides.pageMenu! : makePageMenu(),
        shareUrl: overrides && overrides.hasOwnProperty('shareUrl') ? overrides.shareUrl! : 'vel',
        slug: overrides && overrides.hasOwnProperty('slug') ? overrides.slug! : 'dignissimos',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'vel',
        type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : Types.PageType.About,
    };
};

export const makePageConnection = (overrides?: Partial<Types.PageConnection>): Types.PageConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makePageEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makePage()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makePageContactSubmitInput = (overrides?: Partial<Types.PageContactSubmitInput>): Types.PageContactSubmitInput => {
    return {
        body: overrides && overrides.hasOwnProperty('body') ? overrides.body! : 'aut',
        email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'nam',
        givenName: overrides && overrides.hasOwnProperty('givenName') ? overrides.givenName! : 'rerum',
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Types.Language.Chinese,
        recipient: overrides && overrides.hasOwnProperty('recipient') ? overrides.recipient! : Types.PageContactRecipient.General,
        surname: overrides && overrides.hasOwnProperty('surname') ? overrides.surname! : 'totam',
    };
};

export const makePageCreateInput = (overrides?: Partial<Types.PageCreateInput>): Types.PageCreateInput => {
    return {
        body: overrides && overrides.hasOwnProperty('body') ? overrides.body! : 'voluptas',
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : false,
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Types.Language.Chinese,
        pageMenuId: overrides && overrides.hasOwnProperty('pageMenuId') ? overrides.pageMenuId! : 'dc5e36aa-07a5-4ff4-be03-dc3807c6ede4',
        slug: overrides && overrides.hasOwnProperty('slug') ? overrides.slug! : 'est',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'quis',
        type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : Types.PageType.About,
    };
};

export const makePageEdge = (overrides?: Partial<Types.PageEdge>): Types.PageEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'in',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makePage(),
    };
};

export const makePageInfo = (overrides?: Partial<Types.PageInfo>): Types.PageInfo => {
    return {
        endCursor: overrides && overrides.hasOwnProperty('endCursor') ? overrides.endCursor! : 'id',
        hasNextPage: overrides && overrides.hasOwnProperty('hasNextPage') ? overrides.hasNextPage! : true,
        hasPreviousPage: overrides && overrides.hasOwnProperty('hasPreviousPage') ? overrides.hasPreviousPage! : false,
        startCursor: overrides && overrides.hasOwnProperty('startCursor') ? overrides.startCursor! : 'eum',
    };
};

export const makePageMenu = (overrides?: Partial<Types.PageMenu>): Types.PageMenu => {
    return {
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'f9148d60-4f99-4d90-9164-81e279d41fcf',
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'maiores',
    };
};

export const makePageMenuConnection = (overrides?: Partial<Types.PageMenuConnection>): Types.PageMenuConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makePageMenuEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makePageMenu()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makePageMenuEdge = (overrides?: Partial<Types.PageMenuEdge>): Types.PageMenuEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'veritatis',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makePageMenu(),
    };
};

export const makePagePayload = (overrides?: Partial<Types.PagePayload>): Types.PagePayload => {
    return {
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
        page: overrides && overrides.hasOwnProperty('page') ? overrides.page! : makePage(),
    };
};

export const makePageUpdateInput = (overrides?: Partial<Types.PageUpdateInput>): Types.PageUpdateInput => {
    return {
        body: overrides && overrides.hasOwnProperty('body') ? overrides.body! : 'odio',
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : false,
        pageMenuId: overrides && overrides.hasOwnProperty('pageMenuId') ? overrides.pageMenuId! : 'f043a2dd-a97b-49b7-ba9e-ce4800271857',
        slug: overrides && overrides.hasOwnProperty('slug') ? overrides.slug! : 'veniam',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'et',
    };
};

export const makePagesOrder = (overrides?: Partial<Types.PagesOrder>): Types.PagesOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : Types.OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : Types.PagesSortableField.CreatedAt,
    };
};

export const makePerson = (overrides?: Partial<Types.Person>): Types.Person => {
    return {
        address: overrides && overrides.hasOwnProperty('address') ? overrides.address! : 'sunt',
        canonicalPath: overrides && overrides.hasOwnProperty('canonicalPath') ? overrides.canonicalPath! : 'accusantium',
        canonicalUrl: overrides && overrides.hasOwnProperty('canonicalUrl') ? overrides.canonicalUrl! : 'quo',
        collections: overrides && overrides.hasOwnProperty('collections') ? overrides.collections! : makeCollectionConnection(),
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'aperiam',
        designations: overrides && overrides.hasOwnProperty('designations') ? overrides.designations! : 'est',
        email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'rem',
        givenName: overrides && overrides.hasOwnProperty('givenName') ? overrides.givenName! : 'doloribus',
        hidingReason: overrides && overrides.hasOwnProperty('hidingReason') ? overrides.hidingReason! : 'provident',
        history: overrides && overrides.hasOwnProperty('history') ? overrides.history! : makeCatalogHistoryItemConnection(),
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '65c296aa-c3f1-451e-9d3b-2950db9db9bb',
        image: overrides && overrides.hasOwnProperty('image') ? overrides.image! : makeImage(),
        imageWithFallback: overrides && overrides.hasOwnProperty('imageWithFallback') ? overrides.imageWithFallback! : makeImage(),
        internalContact: overrides && overrides.hasOwnProperty('internalContact') ? overrides.internalContact! : makeInternalContact(),
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : false,
        isPreapproved: overrides && overrides.hasOwnProperty('isPreapproved') ? overrides.isPreapproved! : true,
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Types.Language.Chinese,
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'et',
        phone: overrides && overrides.hasOwnProperty('phone') ? overrides.phone! : 'eum',
        photo: overrides && overrides.hasOwnProperty('photo') ? overrides.photo! : makeImage(),
        photoWithFallback: overrides && overrides.hasOwnProperty('photoWithFallback') ? overrides.photoWithFallback! : makeImage(),
        recordings: overrides && overrides.hasOwnProperty('recordings') ? overrides.recordings! : makeRecordingConnection(),
        sequences: overrides && overrides.hasOwnProperty('sequences') ? overrides.sequences! : makeSequenceConnection(),
        shareUrl: overrides && overrides.hasOwnProperty('shareUrl') ? overrides.shareUrl! : 'sed',
        skipContentScreening: overrides && overrides.hasOwnProperty('skipContentScreening') ? overrides.skipContentScreening! : true,
        skipLegalScreening: overrides && overrides.hasOwnProperty('skipLegalScreening') ? overrides.skipLegalScreening! : true,
        suffix: overrides && overrides.hasOwnProperty('suffix') ? overrides.suffix! : 'labore',
        summary: overrides && overrides.hasOwnProperty('summary') ? overrides.summary! : 'cumque',
        surname: overrides && overrides.hasOwnProperty('surname') ? overrides.surname! : 'consectetur',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'tenetur',
        viewerHasFavorited: overrides && overrides.hasOwnProperty('viewerHasFavorited') ? overrides.viewerHasFavorited! : true,
        website: overrides && overrides.hasOwnProperty('website') ? overrides.website! : 'dolores',
    };
};

export const makePersonConnection = (overrides?: Partial<Types.PersonConnection>): Types.PersonConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makePersonEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makePerson()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makePersonCreateInput = (overrides?: Partial<Types.PersonCreateInput>): Types.PersonCreateInput => {
    return {
        address: overrides && overrides.hasOwnProperty('address') ? overrides.address! : 'quia',
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'tempore',
        designations: overrides && overrides.hasOwnProperty('designations') ? overrides.designations! : 'enim',
        email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'eligendi',
        givenName: overrides && overrides.hasOwnProperty('givenName') ? overrides.givenName! : 'ab',
        hidingReason: overrides && overrides.hasOwnProperty('hidingReason') ? overrides.hidingReason! : 'nemo',
        image: overrides && overrides.hasOwnProperty('image') ? overrides.image! : makeImageInput(),
        internalContact: overrides && overrides.hasOwnProperty('internalContact') ? overrides.internalContact! : makeInternalContactInput(),
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : false,
        isPreapproved: overrides && overrides.hasOwnProperty('isPreapproved') ? overrides.isPreapproved! : true,
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Types.Language.Chinese,
        phone: overrides && overrides.hasOwnProperty('phone') ? overrides.phone! : 'aut',
        skipContentScreening: overrides && overrides.hasOwnProperty('skipContentScreening') ? overrides.skipContentScreening! : false,
        skipLegalScreening: overrides && overrides.hasOwnProperty('skipLegalScreening') ? overrides.skipLegalScreening! : false,
        suffix: overrides && overrides.hasOwnProperty('suffix') ? overrides.suffix! : 'dicta',
        summary: overrides && overrides.hasOwnProperty('summary') ? overrides.summary! : 'ut',
        surname: overrides && overrides.hasOwnProperty('surname') ? overrides.surname! : 'tempora',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'est',
        website: overrides && overrides.hasOwnProperty('website') ? overrides.website! : 'repudiandae',
    };
};

export const makePersonEdge = (overrides?: Partial<Types.PersonEdge>): Types.PersonEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'ut',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makePerson(),
    };
};

export const makePersonPayload = (overrides?: Partial<Types.PersonPayload>): Types.PersonPayload => {
    return {
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
        person: overrides && overrides.hasOwnProperty('person') ? overrides.person! : makePerson(),
    };
};

export const makePersonUpdateInput = (overrides?: Partial<Types.PersonUpdateInput>): Types.PersonUpdateInput => {
    return {
        address: overrides && overrides.hasOwnProperty('address') ? overrides.address! : 'et',
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'voluptatum',
        designations: overrides && overrides.hasOwnProperty('designations') ? overrides.designations! : 'voluptas',
        email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'perferendis',
        givenName: overrides && overrides.hasOwnProperty('givenName') ? overrides.givenName! : 'id',
        hidingReason: overrides && overrides.hasOwnProperty('hidingReason') ? overrides.hidingReason! : 'libero',
        image: overrides && overrides.hasOwnProperty('image') ? overrides.image! : makeImageInput(),
        internalContact: overrides && overrides.hasOwnProperty('internalContact') ? overrides.internalContact! : makeInternalContactInput(),
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : true,
        isPreapproved: overrides && overrides.hasOwnProperty('isPreapproved') ? overrides.isPreapproved! : true,
        phone: overrides && overrides.hasOwnProperty('phone') ? overrides.phone! : 'et',
        skipContentScreening: overrides && overrides.hasOwnProperty('skipContentScreening') ? overrides.skipContentScreening! : true,
        skipLegalScreening: overrides && overrides.hasOwnProperty('skipLegalScreening') ? overrides.skipLegalScreening! : false,
        suffix: overrides && overrides.hasOwnProperty('suffix') ? overrides.suffix! : 'ullam',
        summary: overrides && overrides.hasOwnProperty('summary') ? overrides.summary! : 'qui',
        surname: overrides && overrides.hasOwnProperty('surname') ? overrides.surname! : 'nihil',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'possimus',
        website: overrides && overrides.hasOwnProperty('website') ? overrides.website! : 'veniam',
    };
};

export const makePersonsOrder = (overrides?: Partial<Types.PersonsOrder>): Types.PersonsOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : Types.OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : Types.PersonsSortableField.CreatedAt,
    };
};

export const makePlaybackSessionAdvanceInput = (overrides?: Partial<Types.PlaybackSessionAdvanceInput>): Types.PlaybackSessionAdvanceInput => {
    return {
        positionPercentage: overrides && overrides.hasOwnProperty('positionPercentage') ? overrides.positionPercentage! : 7.57,
    };
};

export const makePopularPerson = (overrides?: Partial<Types.PopularPerson>): Types.PopularPerson => {
    return {
        person: overrides && overrides.hasOwnProperty('person') ? overrides.person! : makePerson(),
        weight: overrides && overrides.hasOwnProperty('weight') ? overrides.weight! : 6.94,
    };
};

export const makePopularPersonConnection = (overrides?: Partial<Types.PopularPersonConnection>): Types.PopularPersonConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makePopularPersonEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makePopularPerson()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makePopularPersonEdge = (overrides?: Partial<Types.PopularPersonEdge>): Types.PopularPersonEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'unde',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makePopularPerson(),
    };
};

export const makePopularRecording = (overrides?: Partial<Types.PopularRecording>): Types.PopularRecording => {
    return {
        recording: overrides && overrides.hasOwnProperty('recording') ? overrides.recording! : makeRecording(),
        weight: overrides && overrides.hasOwnProperty('weight') ? overrides.weight! : 7.84,
    };
};

export const makePopularRecordingConnection = (overrides?: Partial<Types.PopularRecordingConnection>): Types.PopularRecordingConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makePopularRecordingEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makePopularRecording()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makePopularRecordingEdge = (overrides?: Partial<Types.PopularRecordingEdge>): Types.PopularRecordingEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'nulla',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makePopularRecording(),
    };
};

export const makeQuery = (overrides?: Partial<Types.Query>): Types.Query => {
    return {
        adminImage: overrides && overrides.hasOwnProperty('adminImage') ? overrides.adminImage! : makeImage(),
        adminImages: overrides && overrides.hasOwnProperty('adminImages') ? overrides.adminImages! : makeImageConnectionSlim(),
        audiobible: overrides && overrides.hasOwnProperty('audiobible') ? overrides.audiobible! : makeBible(),
        audiobibleChapter: overrides && overrides.hasOwnProperty('audiobibleChapter') ? overrides.audiobibleChapter! : makeBibleChapter(),
        audiobibles: overrides && overrides.hasOwnProperty('audiobibles') ? overrides.audiobibles! : makeBibleConnection(),
        audiobook: overrides && overrides.hasOwnProperty('audiobook') ? overrides.audiobook! : makeSequence(),
        audiobookSeries: overrides && overrides.hasOwnProperty('audiobookSeries') ? overrides.audiobookSeries! : makeCollection(),
        audiobookSerieses: overrides && overrides.hasOwnProperty('audiobookSerieses') ? overrides.audiobookSerieses! : makeCollectionConnection(),
        audiobookTrack: overrides && overrides.hasOwnProperty('audiobookTrack') ? overrides.audiobookTrack! : makeRecording(),
        audiobookTracks: overrides && overrides.hasOwnProperty('audiobookTracks') ? overrides.audiobookTracks! : makeRecordingConnection(),
        audiobooks: overrides && overrides.hasOwnProperty('audiobooks') ? overrides.audiobooks! : makeSequenceConnection(),
        blogPost: overrides && overrides.hasOwnProperty('blogPost') ? overrides.blogPost! : makeBlogPost(),
        blogPosts: overrides && overrides.hasOwnProperty('blogPosts') ? overrides.blogPosts! : makeBlogPostConnection(),
        collection: overrides && overrides.hasOwnProperty('collection') ? overrides.collection! : makeCollection(),
        collections: overrides && overrides.hasOwnProperty('collections') ? overrides.collections! : makeCollectionConnection(),
        conference: overrides && overrides.hasOwnProperty('conference') ? overrides.conference! : makeCollection(),
        conferences: overrides && overrides.hasOwnProperty('conferences') ? overrides.conferences! : makeCollectionConnection(),
        distributionAgreement: overrides && overrides.hasOwnProperty('distributionAgreement') ? overrides.distributionAgreement! : makeDistributionAgreement(),
        distributionAgreements: overrides && overrides.hasOwnProperty('distributionAgreements') ? overrides.distributionAgreements! : makeDistributionAgreementConnection(),
        faq: overrides && overrides.hasOwnProperty('faq') ? overrides.faq! : makeFaq(),
        faqCategories: overrides && overrides.hasOwnProperty('faqCategories') ? overrides.faqCategories! : makeFaqCategoryConnection(),
        faqs: overrides && overrides.hasOwnProperty('faqs') ? overrides.faqs! : makeFaqConnection(),
        featuredBlogPosts: overrides && overrides.hasOwnProperty('featuredBlogPosts') ? overrides.featuredBlogPosts! : makeBlogPostConnection(),
        featuredPersons: overrides && overrides.hasOwnProperty('featuredPersons') ? overrides.featuredPersons! : makePersonConnection(),
        featuredRecordings: overrides && overrides.hasOwnProperty('featuredRecordings') ? overrides.featuredRecordings! : makeRecordingConnection(),
        featuredSequences: overrides && overrides.hasOwnProperty('featuredSequences') ? overrides.featuredSequences! : makeSequenceConnection(),
        featuredSponsors: overrides && overrides.hasOwnProperty('featuredSponsors') ? overrides.featuredSponsors! : makeSponsorConnection(),
        license: overrides && overrides.hasOwnProperty('license') ? overrides.license! : makeLicense(),
        licenses: overrides && overrides.hasOwnProperty('licenses') ? overrides.licenses! : makeLicenseConnection(),
        me: overrides && overrides.hasOwnProperty('me') ? overrides.me! : makeAuthenticatedUser(),
        mediaFileUploads: overrides && overrides.hasOwnProperty('mediaFileUploads') ? overrides.mediaFileUploads! : makeMediaFileUploadConnection(),
        mediaFiles: overrides && overrides.hasOwnProperty('mediaFiles') ? overrides.mediaFiles! : makeMediaFileResultConnection(),
        mediaRelease: overrides && overrides.hasOwnProperty('mediaRelease') ? overrides.mediaRelease! : makeMediaRelease(),
        mediaReleaseForm: overrides && overrides.hasOwnProperty('mediaReleaseForm') ? overrides.mediaReleaseForm! : makeMediaReleaseForm(),
        mediaReleaseFormTemplates: overrides && overrides.hasOwnProperty('mediaReleaseFormTemplates') ? overrides.mediaReleaseFormTemplates! : [makeMediaReleaseFormTemplate()],
        mediaReleaseForms: overrides && overrides.hasOwnProperty('mediaReleaseForms') ? overrides.mediaReleaseForms! : makeMediaReleaseFormConnection(),
        mediaReleases: overrides && overrides.hasOwnProperty('mediaReleases') ? overrides.mediaReleases! : makeMediaReleaseConnection(),
        musicAlbum: overrides && overrides.hasOwnProperty('musicAlbum') ? overrides.musicAlbum! : makeSequence(),
        musicAlbums: overrides && overrides.hasOwnProperty('musicAlbums') ? overrides.musicAlbums! : makeSequenceConnection(),
        musicBookTags: overrides && overrides.hasOwnProperty('musicBookTags') ? overrides.musicBookTags! : makeTagConnection(),
        musicMoodTags: overrides && overrides.hasOwnProperty('musicMoodTags') ? overrides.musicMoodTags! : makeTagConnection(),
        musicSerieses: overrides && overrides.hasOwnProperty('musicSerieses') ? overrides.musicSerieses! : makeCollectionConnection(),
        musicTrack: overrides && overrides.hasOwnProperty('musicTrack') ? overrides.musicTrack! : makeRecording(),
        musicTracks: overrides && overrides.hasOwnProperty('musicTracks') ? overrides.musicTracks! : makeRecordingConnection(),
        notificationChannels: overrides && overrides.hasOwnProperty('notificationChannels') ? overrides.notificationChannels! : makeNotificationChannelConnection(),
        page: overrides && overrides.hasOwnProperty('page') ? overrides.page! : makePage(),
        pageMenus: overrides && overrides.hasOwnProperty('pageMenus') ? overrides.pageMenus! : makePageMenuConnection(),
        pages: overrides && overrides.hasOwnProperty('pages') ? overrides.pages! : makePageConnection(),
        person: overrides && overrides.hasOwnProperty('person') ? overrides.person! : makePerson(),
        personLetterCounts: overrides && overrides.hasOwnProperty('personLetterCounts') ? overrides.personLetterCounts! : [makeLetterCount()],
        persons: overrides && overrides.hasOwnProperty('persons') ? overrides.persons! : makePersonConnection(),
        popularPersons: overrides && overrides.hasOwnProperty('popularPersons') ? overrides.popularPersons! : makePopularPersonConnection(),
        popularRecordings: overrides && overrides.hasOwnProperty('popularRecordings') ? overrides.popularRecordings! : makePopularRecordingConnection(),
        recording: overrides && overrides.hasOwnProperty('recording') ? overrides.recording! : makeRecording(),
        recordingScreeningIssueType: overrides && overrides.hasOwnProperty('recordingScreeningIssueType') ? overrides.recordingScreeningIssueType! : makeRecordingScreeningIssueType(),
        recordingScreeningIssueTypes: overrides && overrides.hasOwnProperty('recordingScreeningIssueTypes') ? overrides.recordingScreeningIssueTypes! : makeRecordingScreeningIssueTypeConnection(),
        recordings: overrides && overrides.hasOwnProperty('recordings') ? overrides.recordings! : makeRecordingConnection(),
        sequence: overrides && overrides.hasOwnProperty('sequence') ? overrides.sequence! : makeSequence(),
        sequences: overrides && overrides.hasOwnProperty('sequences') ? overrides.sequences! : makeSequenceConnection(),
        series: overrides && overrides.hasOwnProperty('series') ? overrides.series! : makeSequence(),
        serieses: overrides && overrides.hasOwnProperty('serieses') ? overrides.serieses! : makeSequenceConnection(),
        sermon: overrides && overrides.hasOwnProperty('sermon') ? overrides.sermon! : makeRecording(),
        sermons: overrides && overrides.hasOwnProperty('sermons') ? overrides.sermons! : makeRecordingConnection(),
        sponsor: overrides && overrides.hasOwnProperty('sponsor') ? overrides.sponsor! : makeSponsor(),
        sponsorLetterCounts: overrides && overrides.hasOwnProperty('sponsorLetterCounts') ? overrides.sponsorLetterCounts! : [makeLetterCount()],
        sponsors: overrides && overrides.hasOwnProperty('sponsors') ? overrides.sponsors! : makeSponsorConnection(),
        stories: overrides && overrides.hasOwnProperty('stories') ? overrides.stories! : makeRecordingConnection(),
        story: overrides && overrides.hasOwnProperty('story') ? overrides.story! : makeRecording(),
        storyProgram: overrides && overrides.hasOwnProperty('storyProgram') ? overrides.storyProgram! : makeCollection(),
        storyPrograms: overrides && overrides.hasOwnProperty('storyPrograms') ? overrides.storyPrograms! : makeCollectionConnection(),
        storySeason: overrides && overrides.hasOwnProperty('storySeason') ? overrides.storySeason! : makeSequence(),
        storySeasons: overrides && overrides.hasOwnProperty('storySeasons') ? overrides.storySeasons! : makeSequenceConnection(),
        tags: overrides && overrides.hasOwnProperty('tags') ? overrides.tags! : makeTagConnection(),
        testimonies: overrides && overrides.hasOwnProperty('testimonies') ? overrides.testimonies! : makeTestimonyConnection(),
        testimony: overrides && overrides.hasOwnProperty('testimony') ? overrides.testimony! : makeTestimony(),
        topic: overrides && overrides.hasOwnProperty('topic') ? overrides.topic! : makeTopic(),
        topics: overrides && overrides.hasOwnProperty('topics') ? overrides.topics! : makeTopicConnection(),
        user: overrides && overrides.hasOwnProperty('user') ? overrides.user! : makeUser(),
        users: overrides && overrides.hasOwnProperty('users') ? overrides.users! : makeUserConnection(),
        websiteFeaturedCollection: overrides && overrides.hasOwnProperty('websiteFeaturedCollection') ? overrides.websiteFeaturedCollection! : makeCollection(),
        websiteRecentRecordings: overrides && overrides.hasOwnProperty('websiteRecentRecordings') ? overrides.websiteRecentRecordings! : makeRecordingConnection(),
        websites: overrides && overrides.hasOwnProperty('websites') ? overrides.websites! : makeWebsiteConnection(),
    };
};

export const makeRecording = (overrides?: Partial<Types.Recording>): Types.Recording => {
    return {
        archiveDate: overrides && overrides.hasOwnProperty('archiveDate') ? overrides.archiveDate! : 'labore',
        archiveReason: overrides && overrides.hasOwnProperty('archiveReason') ? overrides.archiveReason! : 'est',
        archiveUser: overrides && overrides.hasOwnProperty('archiveUser') ? overrides.archiveUser! : makeUser(),
        attachments: overrides && overrides.hasOwnProperty('attachments') ? overrides.attachments! : [makeAttachment()],
        audioFiles: overrides && overrides.hasOwnProperty('audioFiles') ? overrides.audioFiles! : [makeAudioFile()],
        bibleReferences: overrides && overrides.hasOwnProperty('bibleReferences') ? overrides.bibleReferences! : makeBibleReferenceRangeConnection(),
        canArchive: overrides && overrides.hasOwnProperty('canArchive') ? overrides.canArchive! : false,
        canDelete: overrides && overrides.hasOwnProperty('canDelete') ? overrides.canDelete! : false,
        canRequestTranscription: overrides && overrides.hasOwnProperty('canRequestTranscription') ? overrides.canRequestTranscription! : true,
        canonicalPath: overrides && overrides.hasOwnProperty('canonicalPath') ? overrides.canonicalPath! : 'ut',
        canonicalUrl: overrides && overrides.hasOwnProperty('canonicalUrl') ? overrides.canonicalUrl! : 'voluptatem',
        collection: overrides && overrides.hasOwnProperty('collection') ? overrides.collection! : makeCollection(),
        contentScreeningCheckouts: overrides && overrides.hasOwnProperty('contentScreeningCheckouts') ? overrides.contentScreeningCheckouts! : [makeRecordingScreeningCheckout()],
        contentScreeningEvaluations: overrides && overrides.hasOwnProperty('contentScreeningEvaluations') ? overrides.contentScreeningEvaluations! : [makeRecordingContentScreeningEvaluation()],
        contentScreeningStatus: overrides && overrides.hasOwnProperty('contentScreeningStatus') ? overrides.contentScreeningStatus! : Types.RecordingContentScreeningStatus.AdminOverride,
        contentType: overrides && overrides.hasOwnProperty('contentType') ? overrides.contentType! : Types.RecordingContentType.AudiobookTrack,
        copyrightYear: overrides && overrides.hasOwnProperty('copyrightYear') ? overrides.copyrightYear! : 2552,
        coverImage: overrides && overrides.hasOwnProperty('coverImage') ? overrides.coverImage! : makeImage(),
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'est',
        distributionAgreement: overrides && overrides.hasOwnProperty('distributionAgreement') ? overrides.distributionAgreement! : makeDistributionAgreement(),
        downloadDisabled: overrides && overrides.hasOwnProperty('downloadDisabled') ? overrides.downloadDisabled! : false,
        duration: overrides && overrides.hasOwnProperty('duration') ? overrides.duration! : 8.25,
        hasAudio: overrides && overrides.hasOwnProperty('hasAudio') ? overrides.hasAudio! : false,
        hasVideo: overrides && overrides.hasOwnProperty('hasVideo') ? overrides.hasVideo! : false,
        hidingReason: overrides && overrides.hasOwnProperty('hidingReason') ? overrides.hidingReason! : 'iusto',
        history: overrides && overrides.hasOwnProperty('history') ? overrides.history! : makeCatalogHistoryItemConnection(),
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'f8e93e45-668d-4ec7-af69-f4a1d53d3f63',
        imageWithFallback: overrides && overrides.hasOwnProperty('imageWithFallback') ? overrides.imageWithFallback! : makeImage(),
        isDownloadAllowed: overrides && overrides.hasOwnProperty('isDownloadAllowed') ? overrides.isDownloadAllowed! : false,
        isFeatured: overrides && overrides.hasOwnProperty('isFeatured') ? overrides.isFeatured! : false,
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : false,
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Types.Language.Chinese,
        legalScreeningCheckouts: overrides && overrides.hasOwnProperty('legalScreeningCheckouts') ? overrides.legalScreeningCheckouts! : [makeRecordingScreeningCheckout()],
        legalScreeningStatus: overrides && overrides.hasOwnProperty('legalScreeningStatus') ? overrides.legalScreeningStatus! : Types.RecordingLegalScreeningStatus.AdminOverride,
        mediaReleaseForm: overrides && overrides.hasOwnProperty('mediaReleaseForm') ? overrides.mediaReleaseForm! : makeMediaReleaseForm(),
        persons: overrides && overrides.hasOwnProperty('persons') ? overrides.persons! : [makePerson()],
        publishDate: overrides && overrides.hasOwnProperty('publishDate') ? overrides.publishDate! : 'aut',
        recordingDate: overrides && overrides.hasOwnProperty('recordingDate') ? overrides.recordingDate! : 'atque',
        recordingTagSuggestions: overrides && overrides.hasOwnProperty('recordingTagSuggestions') ? overrides.recordingTagSuggestions! : makeRecordingTagSuggestionConnection(),
        recordingTags: overrides && overrides.hasOwnProperty('recordingTags') ? overrides.recordingTags! : makeRecordingTagConnection(),
        screeningIssues: overrides && overrides.hasOwnProperty('screeningIssues') ? overrides.screeningIssues! : makeRecordingScreeningIssueConnection(),
        sequence: overrides && overrides.hasOwnProperty('sequence') ? overrides.sequence! : makeSequence(),
        sequenceIndex: overrides && overrides.hasOwnProperty('sequenceIndex') ? overrides.sequenceIndex! : 502,
        sequenceNextRecording: overrides && overrides.hasOwnProperty('sequenceNextRecording') ? overrides.sequenceNextRecording! : makeRecording(),
        sequencePreviousRecording: overrides && overrides.hasOwnProperty('sequencePreviousRecording') ? overrides.sequencePreviousRecording! : makeRecording(),
        shareUrl: overrides && overrides.hasOwnProperty('shareUrl') ? overrides.shareUrl! : 'est',
        sponsor: overrides && overrides.hasOwnProperty('sponsor') ? overrides.sponsor! : makeSponsor(),
        stage: overrides && overrides.hasOwnProperty('stage') ? overrides.stage! : Types.RecordingStage.Draft,
        technicalScreeningCheckouts: overrides && overrides.hasOwnProperty('technicalScreeningCheckouts') ? overrides.technicalScreeningCheckouts! : [makeRecordingScreeningCheckout()],
        technicalScreeningStatus: overrides && overrides.hasOwnProperty('technicalScreeningStatus') ? overrides.technicalScreeningStatus! : Types.RecordingTechnicalScreeningStatus.AdminOverride,
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'cumque',
        transcript: overrides && overrides.hasOwnProperty('transcript') ? overrides.transcript! : makeTranscript(),
        transcriptionStatus: overrides && overrides.hasOwnProperty('transcriptionStatus') ? overrides.transcriptionStatus! : Types.RecordingTranscriptionStatus.Complete,
        videoFiles: overrides && overrides.hasOwnProperty('videoFiles') ? overrides.videoFiles! : [makeVideoFile()],
        viewerHasFavorited: overrides && overrides.hasOwnProperty('viewerHasFavorited') ? overrides.viewerHasFavorited! : false,
        viewerPlaybackSession: overrides && overrides.hasOwnProperty('viewerPlaybackSession') ? overrides.viewerPlaybackSession! : makeRecordingPlaybackSession(),
        websites: overrides && overrides.hasOwnProperty('websites') ? overrides.websites! : [makeWebsite()],
    };
};

export const makeRecordingConnection = (overrides?: Partial<Types.RecordingConnection>): Types.RecordingConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeRecordingEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeRecording()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeRecordingContentScreeningEvaluation = (overrides?: Partial<Types.RecordingContentScreeningEvaluation>): Types.RecordingContentScreeningEvaluation => {
    return {
        methods: overrides && overrides.hasOwnProperty('methods') ? overrides.methods! : [Types.RecordingScreeningMethod.Live],
        recommendation: overrides && overrides.hasOwnProperty('recommendation') ? overrides.recommendation! : Types.RecordingContentScreeningEvaluationRecommendation.Approve,
        screener: overrides && overrides.hasOwnProperty('screener') ? overrides.screener! : makeUser(),
    };
};

export const makeRecordingContentScreeningEvaluationPayload = (overrides?: Partial<Types.RecordingContentScreeningEvaluationPayload>): Types.RecordingContentScreeningEvaluationPayload => {
    return {
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
        recordingContentScreeningEvaluation: overrides && overrides.hasOwnProperty('recordingContentScreeningEvaluation') ? overrides.recordingContentScreeningEvaluation! : makeRecordingContentScreeningEvaluation(),
    };
};

export const makeRecordingCreateInput = (overrides?: Partial<Types.RecordingCreateInput>): Types.RecordingCreateInput => {
    return {
        bibleReferences: overrides && overrides.hasOwnProperty('bibleReferences') ? overrides.bibleReferences! : [makeBibleReferenceRangeInput()],
        collectionId: overrides && overrides.hasOwnProperty('collectionId') ? overrides.collectionId! : 'da0c0693-aae8-48aa-af62-55195355e461',
        contentScreeningCheckouts: overrides && overrides.hasOwnProperty('contentScreeningCheckouts') ? overrides.contentScreeningCheckouts! : [makeRecordingScreeningCheckoutInput()],
        contentType: overrides && overrides.hasOwnProperty('contentType') ? overrides.contentType! : Types.RecordingContentType.AudiobookTrack,
        copyrightYear: overrides && overrides.hasOwnProperty('copyrightYear') ? overrides.copyrightYear! : 1446,
        coverImage: overrides && overrides.hasOwnProperty('coverImage') ? overrides.coverImage! : makeImageInput(),
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'laudantium',
        distributionAgreementId: overrides && overrides.hasOwnProperty('distributionAgreementId') ? overrides.distributionAgreementId! : 'fd13bf38-4f88-4118-bc0e-eec007df130e',
        hidingReason: overrides && overrides.hasOwnProperty('hidingReason') ? overrides.hidingReason! : 'non',
        isDownloadAllowed: overrides && overrides.hasOwnProperty('isDownloadAllowed') ? overrides.isDownloadAllowed! : false,
        isFeatured: overrides && overrides.hasOwnProperty('isFeatured') ? overrides.isFeatured! : true,
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : false,
        legalScreeningCheckouts: overrides && overrides.hasOwnProperty('legalScreeningCheckouts') ? overrides.legalScreeningCheckouts! : [makeRecordingScreeningCheckoutInput()],
        publishDate: overrides && overrides.hasOwnProperty('publishDate') ? overrides.publishDate! : 'nesciunt',
        recordingDate: overrides && overrides.hasOwnProperty('recordingDate') ? overrides.recordingDate! : 'possimus',
        recordingPersons: overrides && overrides.hasOwnProperty('recordingPersons') ? overrides.recordingPersons! : [makeRecordingPersonRoleInput()],
        recordingTags: overrides && overrides.hasOwnProperty('recordingTags') ? overrides.recordingTags! : [makeRecordingTagInput()],
        sequenceId: overrides && overrides.hasOwnProperty('sequenceId') ? overrides.sequenceId! : '888d3ff4-f6af-4698-b3b5-d85bc27d5135',
        skipContentScreening: overrides && overrides.hasOwnProperty('skipContentScreening') ? overrides.skipContentScreening! : false,
        skipLegalScreening: overrides && overrides.hasOwnProperty('skipLegalScreening') ? overrides.skipLegalScreening! : false,
        skipTechnicalScreening: overrides && overrides.hasOwnProperty('skipTechnicalScreening') ? overrides.skipTechnicalScreening! : true,
        sponsorId: overrides && overrides.hasOwnProperty('sponsorId') ? overrides.sponsorId! : 'a0cdf9dc-bcbc-4fb2-b94e-9530f67e88ab',
        technicalScreeningCheckouts: overrides && overrides.hasOwnProperty('technicalScreeningCheckouts') ? overrides.technicalScreeningCheckouts! : [makeRecordingScreeningCheckoutInput()],
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'sed',
        websiteIds: overrides && overrides.hasOwnProperty('websiteIds') ? overrides.websiteIds! : ['67473904-3ef4-41ef-b7ab-d7ca4f96610d'],
    };
};

export const makeRecordingEdge = (overrides?: Partial<Types.RecordingEdge>): Types.RecordingEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'a',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeRecording(),
    };
};

export const makeRecordingPayload = (overrides?: Partial<Types.RecordingPayload>): Types.RecordingPayload => {
    return {
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
        recording: overrides && overrides.hasOwnProperty('recording') ? overrides.recording! : makeRecording(),
    };
};

export const makeRecordingPersonInput = (overrides?: Partial<Types.RecordingPersonInput>): Types.RecordingPersonInput => {
    return {
        personId: overrides && overrides.hasOwnProperty('personId') ? overrides.personId! : '8291cd00-6cf9-4748-b2c9-96fab43d22a7',
        role: overrides && overrides.hasOwnProperty('role') ? overrides.role! : Types.PersonsRoleField.Artist,
    };
};

export const makeRecordingPersonRoleInput = (overrides?: Partial<Types.RecordingPersonRoleInput>): Types.RecordingPersonRoleInput => {
    return {
        personId: overrides && overrides.hasOwnProperty('personId') ? overrides.personId! : 'd462ce79-6724-489a-87b7-de9dabfd988b',
        role: overrides && overrides.hasOwnProperty('role') ? overrides.role! : Types.PersonsRoleField.Artist,
    };
};

export const makeRecordingPlaybackSession = (overrides?: Partial<Types.RecordingPlaybackSession>): Types.RecordingPlaybackSession => {
    return {
        createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : 'dolorum',
        positionPercentage: overrides && overrides.hasOwnProperty('positionPercentage') ? overrides.positionPercentage! : 9.64,
        updatedAt: overrides && overrides.hasOwnProperty('updatedAt') ? overrides.updatedAt! : 'id',
    };
};

export const makeRecordingScreeningCheckout = (overrides?: Partial<Types.RecordingScreeningCheckout>): Types.RecordingScreeningCheckout => {
    return {
        assigner: overrides && overrides.hasOwnProperty('assigner') ? overrides.assigner! : makeUser(),
        createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : 'soluta',
        screener: overrides && overrides.hasOwnProperty('screener') ? overrides.screener! : makeUser(),
    };
};

export const makeRecordingScreeningCheckoutInput = (overrides?: Partial<Types.RecordingScreeningCheckoutInput>): Types.RecordingScreeningCheckoutInput => {
    return {
        userId: overrides && overrides.hasOwnProperty('userId') ? overrides.userId! : '8c9f018d-bc8d-466f-afe6-09018c0780a6',
    };
};

export const makeRecordingScreeningCheckoutPayload = (overrides?: Partial<Types.RecordingScreeningCheckoutPayload>): Types.RecordingScreeningCheckoutPayload => {
    return {
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
        recordingScreeningCheckout: overrides && overrides.hasOwnProperty('recordingScreeningCheckout') ? overrides.recordingScreeningCheckout! : makeRecordingScreeningCheckout(),
    };
};

export const makeRecordingScreeningIssue = (overrides?: Partial<Types.RecordingScreeningIssue>): Types.RecordingScreeningIssue => {
    return {
        endTime: overrides && overrides.hasOwnProperty('endTime') ? overrides.endTime! : 'perspiciatis',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'ac7e0ec6-c9fb-4e86-874d-82aa24d9090b',
        notes: overrides && overrides.hasOwnProperty('notes') ? overrides.notes! : 'eos',
        screener: overrides && overrides.hasOwnProperty('screener') ? overrides.screener! : makeUser(),
        startTime: overrides && overrides.hasOwnProperty('startTime') ? overrides.startTime! : 'mollitia',
        target: overrides && overrides.hasOwnProperty('target') ? overrides.target! : Types.RecordingScreeningIssueTarget.Audio,
        type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : makeRecordingScreeningIssueType(),
    };
};

export const makeRecordingScreeningIssueConnection = (overrides?: Partial<Types.RecordingScreeningIssueConnection>): Types.RecordingScreeningIssueConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeRecordingScreeningIssueEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeRecordingScreeningIssue()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeRecordingScreeningIssueEdge = (overrides?: Partial<Types.RecordingScreeningIssueEdge>): Types.RecordingScreeningIssueEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'quia',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeRecordingScreeningIssue(),
    };
};

export const makeRecordingScreeningIssueInput = (overrides?: Partial<Types.RecordingScreeningIssueInput>): Types.RecordingScreeningIssueInput => {
    return {
        endTime: overrides && overrides.hasOwnProperty('endTime') ? overrides.endTime! : 'cupiditate',
        notes: overrides && overrides.hasOwnProperty('notes') ? overrides.notes! : 'facilis',
        recordingScreeningIssueTypeId: overrides && overrides.hasOwnProperty('recordingScreeningIssueTypeId') ? overrides.recordingScreeningIssueTypeId! : '17581dc0-157d-4f3e-b1d1-4b7a15b3c4c3',
        startTime: overrides && overrides.hasOwnProperty('startTime') ? overrides.startTime! : 'aliquid',
        target: overrides && overrides.hasOwnProperty('target') ? overrides.target! : Types.RecordingScreeningIssueTarget.Audio,
    };
};

export const makeRecordingScreeningIssueOrder = (overrides?: Partial<Types.RecordingScreeningIssueOrder>): Types.RecordingScreeningIssueOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : Types.OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : Types.RecordingScreeningIssuesSortableField.CreatedAt,
    };
};

export const makeRecordingScreeningIssuePayload = (overrides?: Partial<Types.RecordingScreeningIssuePayload>): Types.RecordingScreeningIssuePayload => {
    return {
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
        recordingScreeningIssue: overrides && overrides.hasOwnProperty('recordingScreeningIssue') ? overrides.recordingScreeningIssue! : makeRecordingScreeningIssue(),
    };
};

export const makeRecordingScreeningIssueType = (overrides?: Partial<Types.RecordingScreeningIssueType>): Types.RecordingScreeningIssueType => {
    return {
        category: overrides && overrides.hasOwnProperty('category') ? overrides.category! : Types.RecordingScreeningIssueCategory.General,
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'eb38653a-b860-4c5d-86e5-034080bb98be',
        notes: overrides && overrides.hasOwnProperty('notes') ? overrides.notes! : 'esse',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'iste',
    };
};

export const makeRecordingScreeningIssueTypeConnection = (overrides?: Partial<Types.RecordingScreeningIssueTypeConnection>): Types.RecordingScreeningIssueTypeConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeRecordingScreeningIssueTypeEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeRecordingScreeningIssueType()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeRecordingScreeningIssueTypeEdge = (overrides?: Partial<Types.RecordingScreeningIssueTypeEdge>): Types.RecordingScreeningIssueTypeEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'necessitatibus',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeRecordingScreeningIssueType(),
    };
};

export const makeRecordingTag = (overrides?: Partial<Types.RecordingTag>): Types.RecordingTag => {
    return {
        tag: overrides && overrides.hasOwnProperty('tag') ? overrides.tag! : makeTag(),
    };
};

export const makeRecordingTagConnection = (overrides?: Partial<Types.RecordingTagConnection>): Types.RecordingTagConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeRecordingTagEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeRecordingTag()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeRecordingTagEdge = (overrides?: Partial<Types.RecordingTagEdge>): Types.RecordingTagEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'neque',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeRecordingTag(),
    };
};

export const makeRecordingTagInput = (overrides?: Partial<Types.RecordingTagInput>): Types.RecordingTagInput => {
    return {
        tagName: overrides && overrides.hasOwnProperty('tagName') ? overrides.tagName! : 'voluptatem',
    };
};

export const makeRecordingTagSuggestion = (overrides?: Partial<Types.RecordingTagSuggestion>): Types.RecordingTagSuggestion => {
    return {
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'similique',
    };
};

export const makeRecordingTagSuggestionConnection = (overrides?: Partial<Types.RecordingTagSuggestionConnection>): Types.RecordingTagSuggestionConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeRecordingTagSuggestionEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeRecordingTagSuggestion()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeRecordingTagSuggestionEdge = (overrides?: Partial<Types.RecordingTagSuggestionEdge>): Types.RecordingTagSuggestionEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'et',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeRecordingTagSuggestion(),
    };
};

export const makeRecordingUpdateInput = (overrides?: Partial<Types.RecordingUpdateInput>): Types.RecordingUpdateInput => {
    return {
        bibleReferences: overrides && overrides.hasOwnProperty('bibleReferences') ? overrides.bibleReferences! : [makeBibleReferenceRangeInput()],
        collectionId: overrides && overrides.hasOwnProperty('collectionId') ? overrides.collectionId! : '370946d0-0b2e-46eb-badd-2d416f3c7b7d',
        contentScreeningCheckouts: overrides && overrides.hasOwnProperty('contentScreeningCheckouts') ? overrides.contentScreeningCheckouts! : [makeRecordingScreeningCheckoutInput()],
        copyrightYear: overrides && overrides.hasOwnProperty('copyrightYear') ? overrides.copyrightYear! : 3351,
        coverImage: overrides && overrides.hasOwnProperty('coverImage') ? overrides.coverImage! : makeImageInput(),
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'doloremque',
        distributionAgreementId: overrides && overrides.hasOwnProperty('distributionAgreementId') ? overrides.distributionAgreementId! : '83d13b8c-790c-4c78-8c54-ca0319277e5b',
        hidingReason: overrides && overrides.hasOwnProperty('hidingReason') ? overrides.hidingReason! : 'sed',
        isDownloadAllowed: overrides && overrides.hasOwnProperty('isDownloadAllowed') ? overrides.isDownloadAllowed! : true,
        isFeatured: overrides && overrides.hasOwnProperty('isFeatured') ? overrides.isFeatured! : true,
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : false,
        legalScreeningCheckouts: overrides && overrides.hasOwnProperty('legalScreeningCheckouts') ? overrides.legalScreeningCheckouts! : [makeRecordingScreeningCheckoutInput()],
        publishDate: overrides && overrides.hasOwnProperty('publishDate') ? overrides.publishDate! : 'aliquam',
        recordingDate: overrides && overrides.hasOwnProperty('recordingDate') ? overrides.recordingDate! : 'libero',
        recordingPersons: overrides && overrides.hasOwnProperty('recordingPersons') ? overrides.recordingPersons! : [makeRecordingPersonRoleInput()],
        recordingTags: overrides && overrides.hasOwnProperty('recordingTags') ? overrides.recordingTags! : [makeRecordingTagInput()],
        sequenceId: overrides && overrides.hasOwnProperty('sequenceId') ? overrides.sequenceId! : '5d235459-4da8-458e-9fd7-7ab27606ceb9',
        skipContentScreening: overrides && overrides.hasOwnProperty('skipContentScreening') ? overrides.skipContentScreening! : true,
        skipLegalScreening: overrides && overrides.hasOwnProperty('skipLegalScreening') ? overrides.skipLegalScreening! : false,
        skipTechnicalScreening: overrides && overrides.hasOwnProperty('skipTechnicalScreening') ? overrides.skipTechnicalScreening! : false,
        sponsorId: overrides && overrides.hasOwnProperty('sponsorId') ? overrides.sponsorId! : '7c13281c-005c-4e8c-bf79-6f5338581651',
        technicalScreeningCheckouts: overrides && overrides.hasOwnProperty('technicalScreeningCheckouts') ? overrides.technicalScreeningCheckouts! : [makeRecordingScreeningCheckoutInput()],
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'consequatur',
        websiteIds: overrides && overrides.hasOwnProperty('websiteIds') ? overrides.websiteIds! : ['3a3a3d96-a954-4267-abfe-79f14665242b'],
    };
};

export const makeRecordingsOrder = (overrides?: Partial<Types.RecordingsOrder>): Types.RecordingsOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : Types.OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : Types.RecordingsSortableField.CollectionTitle,
    };
};

export const makeSequence = (overrides?: Partial<Types.Sequence>): Types.Sequence => {
    return {
        canonicalPath: overrides && overrides.hasOwnProperty('canonicalPath') ? overrides.canonicalPath! : 'asperiores',
        canonicalUrl: overrides && overrides.hasOwnProperty('canonicalUrl') ? overrides.canonicalUrl! : 'sed',
        collection: overrides && overrides.hasOwnProperty('collection') ? overrides.collection! : makeCollection(),
        contentType: overrides && overrides.hasOwnProperty('contentType') ? overrides.contentType! : Types.SequenceContentType.Audiobook,
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'accusantium',
        duration: overrides && overrides.hasOwnProperty('duration') ? overrides.duration! : 7.28,
        endDate: overrides && overrides.hasOwnProperty('endDate') ? overrides.endDate! : '1970-01-14T07:44:40.972Z',
        hidingReason: overrides && overrides.hasOwnProperty('hidingReason') ? overrides.hidingReason! : 'unde',
        history: overrides && overrides.hasOwnProperty('history') ? overrides.history! : makeCatalogHistoryItemConnection(),
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '192ffd9c-839c-4601-984a-75a72cd77ec1',
        image: overrides && overrides.hasOwnProperty('image') ? overrides.image! : makeImage(),
        imageWithFallback: overrides && overrides.hasOwnProperty('imageWithFallback') ? overrides.imageWithFallback! : makeImage(),
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : false,
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Types.Language.Chinese,
        logoImage: overrides && overrides.hasOwnProperty('logoImage') ? overrides.logoImage! : makeImage(),
        logoImageWithFallback: overrides && overrides.hasOwnProperty('logoImageWithFallback') ? overrides.logoImageWithFallback! : makeImage(),
        mediaReleaseForm: overrides && overrides.hasOwnProperty('mediaReleaseForm') ? overrides.mediaReleaseForm! : makeMediaReleaseForm(),
        persons: overrides && overrides.hasOwnProperty('persons') ? overrides.persons! : makePersonConnection(),
        recordings: overrides && overrides.hasOwnProperty('recordings') ? overrides.recordings! : makeRecordingConnection(),
        shareUrl: overrides && overrides.hasOwnProperty('shareUrl') ? overrides.shareUrl! : 'aut',
        skipContentScreening: overrides && overrides.hasOwnProperty('skipContentScreening') ? overrides.skipContentScreening! : false,
        skipLegalScreening: overrides && overrides.hasOwnProperty('skipLegalScreening') ? overrides.skipLegalScreening! : false,
        sponsor: overrides && overrides.hasOwnProperty('sponsor') ? overrides.sponsor! : makeSponsor(),
        startDate: overrides && overrides.hasOwnProperty('startDate') ? overrides.startDate! : '1970-01-09T02:13:58.826Z',
        summary: overrides && overrides.hasOwnProperty('summary') ? overrides.summary! : 'odit',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'voluptatem',
        viewerHasFavorited: overrides && overrides.hasOwnProperty('viewerHasFavorited') ? overrides.viewerHasFavorited! : false,
        viewerPlaybackCompletedPercentage: overrides && overrides.hasOwnProperty('viewerPlaybackCompletedPercentage') ? overrides.viewerPlaybackCompletedPercentage! : 9.7,
    };
};

export const makeSequenceConnection = (overrides?: Partial<Types.SequenceConnection>): Types.SequenceConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeSequenceEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeSequence()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeSequenceCreateInput = (overrides?: Partial<Types.SequenceCreateInput>): Types.SequenceCreateInput => {
    return {
        collectionId: overrides && overrides.hasOwnProperty('collectionId') ? overrides.collectionId! : '72230959-b7ae-4a2a-8df7-1480b1ea78a8',
        contentType: overrides && overrides.hasOwnProperty('contentType') ? overrides.contentType! : Types.SequenceContentType.Audiobook,
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'enim',
        hidingReason: overrides && overrides.hasOwnProperty('hidingReason') ? overrides.hidingReason! : 'explicabo',
        image: overrides && overrides.hasOwnProperty('image') ? overrides.image! : makeImageInput(),
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : false,
        skipContentScreening: overrides && overrides.hasOwnProperty('skipContentScreening') ? overrides.skipContentScreening! : true,
        skipLegalScreening: overrides && overrides.hasOwnProperty('skipLegalScreening') ? overrides.skipLegalScreening! : false,
        sponsorId: overrides && overrides.hasOwnProperty('sponsorId') ? overrides.sponsorId! : 'd7191dbe-0f18-49c2-b827-2f82efe232b0',
        summary: overrides && overrides.hasOwnProperty('summary') ? overrides.summary! : 'sed',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'praesentium',
    };
};

export const makeSequenceEdge = (overrides?: Partial<Types.SequenceEdge>): Types.SequenceEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'atque',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeSequence(),
    };
};

export const makeSequenceOrder = (overrides?: Partial<Types.SequenceOrder>): Types.SequenceOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : Types.OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : Types.SequenceSortableField.CreatedAt,
    };
};

export const makeSequencePayload = (overrides?: Partial<Types.SequencePayload>): Types.SequencePayload => {
    return {
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
        sequence: overrides && overrides.hasOwnProperty('sequence') ? overrides.sequence! : makeSequence(),
    };
};

export const makeSequenceUpdateInput = (overrides?: Partial<Types.SequenceUpdateInput>): Types.SequenceUpdateInput => {
    return {
        collectionId: overrides && overrides.hasOwnProperty('collectionId') ? overrides.collectionId! : '2f2e8632-d5bf-43f4-9fa6-d64458661530',
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'cupiditate',
        hidingReason: overrides && overrides.hasOwnProperty('hidingReason') ? overrides.hidingReason! : 'mollitia',
        image: overrides && overrides.hasOwnProperty('image') ? overrides.image! : makeImageInput(),
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : false,
        skipContentScreening: overrides && overrides.hasOwnProperty('skipContentScreening') ? overrides.skipContentScreening! : true,
        skipLegalScreening: overrides && overrides.hasOwnProperty('skipLegalScreening') ? overrides.skipLegalScreening! : true,
        sponsorId: overrides && overrides.hasOwnProperty('sponsorId') ? overrides.sponsorId! : 'c9e00aa4-7f6a-425d-8462-8c6b55efc048',
        summary: overrides && overrides.hasOwnProperty('summary') ? overrides.summary! : 'et',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'rerum',
    };
};

export const makeSponsor = (overrides?: Partial<Types.Sponsor>): Types.Sponsor => {
    return {
        address: overrides && overrides.hasOwnProperty('address') ? overrides.address! : 'ad',
        canonicalPath: overrides && overrides.hasOwnProperty('canonicalPath') ? overrides.canonicalPath! : 'itaque',
        canonicalUrl: overrides && overrides.hasOwnProperty('canonicalUrl') ? overrides.canonicalUrl! : 'aliquam',
        collections: overrides && overrides.hasOwnProperty('collections') ? overrides.collections! : makeCollectionConnection(),
        defaultDistributionAgreement: overrides && overrides.hasOwnProperty('defaultDistributionAgreement') ? overrides.defaultDistributionAgreement! : makeDistributionAgreement(),
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'nostrum',
        distributionAgreements: overrides && overrides.hasOwnProperty('distributionAgreements') ? overrides.distributionAgreements! : makeDistributionAgreementConnection(),
        email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'quod',
        hidingReason: overrides && overrides.hasOwnProperty('hidingReason') ? overrides.hidingReason! : 'consectetur',
        history: overrides && overrides.hasOwnProperty('history') ? overrides.history! : makeCatalogHistoryItemConnection(),
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '6d406505-6d81-44f3-9e6d-a7468b659b83',
        image: overrides && overrides.hasOwnProperty('image') ? overrides.image! : makeImage(),
        imageWithFallback: overrides && overrides.hasOwnProperty('imageWithFallback') ? overrides.imageWithFallback! : makeImage(),
        internalContact: overrides && overrides.hasOwnProperty('internalContact') ? overrides.internalContact! : makeInternalContact(),
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : false,
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Types.Language.Chinese,
        location: overrides && overrides.hasOwnProperty('location') ? overrides.location! : 'molestiae',
        logoImage: overrides && overrides.hasOwnProperty('logoImage') ? overrides.logoImage! : makeImage(),
        logoImageWithFallback: overrides && overrides.hasOwnProperty('logoImageWithFallback') ? overrides.logoImageWithFallback! : makeImage(),
        mediaReleaseForm: overrides && overrides.hasOwnProperty('mediaReleaseForm') ? overrides.mediaReleaseForm! : makeMediaReleaseForm(),
        phone: overrides && overrides.hasOwnProperty('phone') ? overrides.phone! : 'aliquam',
        recordings: overrides && overrides.hasOwnProperty('recordings') ? overrides.recordings! : makeRecordingConnection(),
        sequences: overrides && overrides.hasOwnProperty('sequences') ? overrides.sequences! : makeSequenceConnection(),
        shareUrl: overrides && overrides.hasOwnProperty('shareUrl') ? overrides.shareUrl! : 'ut',
        skipContentScreening: overrides && overrides.hasOwnProperty('skipContentScreening') ? overrides.skipContentScreening! : true,
        skipLegalScreening: overrides && overrides.hasOwnProperty('skipLegalScreening') ? overrides.skipLegalScreening! : false,
        summary: overrides && overrides.hasOwnProperty('summary') ? overrides.summary! : 'consequatur',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'omnis',
        viewerHasFavorited: overrides && overrides.hasOwnProperty('viewerHasFavorited') ? overrides.viewerHasFavorited! : true,
        website: overrides && overrides.hasOwnProperty('website') ? overrides.website! : 'possimus',
    };
};

export const makeSponsorConnection = (overrides?: Partial<Types.SponsorConnection>): Types.SponsorConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeSponsorEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeSponsor()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeSponsorCreateInput = (overrides?: Partial<Types.SponsorCreateInput>): Types.SponsorCreateInput => {
    return {
        address: overrides && overrides.hasOwnProperty('address') ? overrides.address! : 'corrupti',
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'et',
        distributionAgreements: overrides && overrides.hasOwnProperty('distributionAgreements') ? overrides.distributionAgreements! : [makeSponsorDistributionAgreementInput()],
        email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'quam',
        hidingReason: overrides && overrides.hasOwnProperty('hidingReason') ? overrides.hidingReason! : 'pariatur',
        image: overrides && overrides.hasOwnProperty('image') ? overrides.image! : makeImageInput(),
        internalContact: overrides && overrides.hasOwnProperty('internalContact') ? overrides.internalContact! : makeInternalContactInput(),
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : false,
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Types.Language.Chinese,
        location: overrides && overrides.hasOwnProperty('location') ? overrides.location! : 'est',
        phone: overrides && overrides.hasOwnProperty('phone') ? overrides.phone! : 'minima',
        skipContentScreening: overrides && overrides.hasOwnProperty('skipContentScreening') ? overrides.skipContentScreening! : false,
        skipLegalScreening: overrides && overrides.hasOwnProperty('skipLegalScreening') ? overrides.skipLegalScreening! : false,
        summary: overrides && overrides.hasOwnProperty('summary') ? overrides.summary! : 'quia',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'aut',
        website: overrides && overrides.hasOwnProperty('website') ? overrides.website! : 'nihil',
    };
};

export const makeSponsorDistributionAgreementInput = (overrides?: Partial<Types.SponsorDistributionAgreementInput>): Types.SponsorDistributionAgreementInput => {
    return {
        isDefault: overrides && overrides.hasOwnProperty('isDefault') ? overrides.isDefault! : true,
        isRetired: overrides && overrides.hasOwnProperty('isRetired') ? overrides.isRetired! : true,
        licenseId: overrides && overrides.hasOwnProperty('licenseId') ? overrides.licenseId! : 'ed91b7cf-90f0-4e65-b540-93b8c2021351',
        summary: overrides && overrides.hasOwnProperty('summary') ? overrides.summary! : 'sit',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'at',
    };
};

export const makeSponsorEdge = (overrides?: Partial<Types.SponsorEdge>): Types.SponsorEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'aliquid',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeSponsor(),
    };
};

export const makeSponsorPayload = (overrides?: Partial<Types.SponsorPayload>): Types.SponsorPayload => {
    return {
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
        sponsor: overrides && overrides.hasOwnProperty('sponsor') ? overrides.sponsor! : makeSponsor(),
    };
};

export const makeSponsorUpdateInput = (overrides?: Partial<Types.SponsorUpdateInput>): Types.SponsorUpdateInput => {
    return {
        address: overrides && overrides.hasOwnProperty('address') ? overrides.address! : 'non',
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'consequatur',
        distributionAgreements: overrides && overrides.hasOwnProperty('distributionAgreements') ? overrides.distributionAgreements! : [makeSponsorDistributionAgreementInput()],
        email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'eum',
        hidingReason: overrides && overrides.hasOwnProperty('hidingReason') ? overrides.hidingReason! : 'iure',
        image: overrides && overrides.hasOwnProperty('image') ? overrides.image! : makeImageInput(),
        internalContact: overrides && overrides.hasOwnProperty('internalContact') ? overrides.internalContact! : makeInternalContactInput(),
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : true,
        location: overrides && overrides.hasOwnProperty('location') ? overrides.location! : 'quia',
        phone: overrides && overrides.hasOwnProperty('phone') ? overrides.phone! : 'sequi',
        skipContentScreening: overrides && overrides.hasOwnProperty('skipContentScreening') ? overrides.skipContentScreening! : false,
        skipLegalScreening: overrides && overrides.hasOwnProperty('skipLegalScreening') ? overrides.skipLegalScreening! : true,
        summary: overrides && overrides.hasOwnProperty('summary') ? overrides.summary! : 'est',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'consectetur',
        website: overrides && overrides.hasOwnProperty('website') ? overrides.website! : 'ad',
    };
};

export const makeSponsorsOrder = (overrides?: Partial<Types.SponsorsOrder>): Types.SponsorsOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : Types.OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : Types.SponsorsSortableField.CreatedAt,
    };
};

export const makeSuccessPayload = (overrides?: Partial<Types.SuccessPayload>): Types.SuccessPayload => {
    return {
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
        success: overrides && overrides.hasOwnProperty('success') ? overrides.success! : false,
    };
};

export const makeTag = (overrides?: Partial<Types.Tag>): Types.Tag => {
    return {
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '7926b150-6296-4e15-b70c-92302664d98c',
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'qui',
        recordings: overrides && overrides.hasOwnProperty('recordings') ? overrides.recordings! : makeRecordingConnection(),
    };
};

export const makeTagConnection = (overrides?: Partial<Types.TagConnection>): Types.TagConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeTagEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeTag()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeTagEdge = (overrides?: Partial<Types.TagEdge>): Types.TagEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'doloremque',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeTag(),
    };
};

export const makeTagsOrder = (overrides?: Partial<Types.TagsOrder>): Types.TagsOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : Types.OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : Types.TagsSortableField.Name,
    };
};

export const makeTestimoniesOrder = (overrides?: Partial<Types.TestimoniesOrder>): Types.TestimoniesOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : Types.OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : Types.TestimoniesSortableField.WrittenDate,
    };
};

export const makeTestimony = (overrides?: Partial<Types.Testimony>): Types.Testimony => {
    return {
        author: overrides && overrides.hasOwnProperty('author') ? overrides.author! : 'in',
        body: overrides && overrides.hasOwnProperty('body') ? overrides.body! : 'non',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '88a5cf98-1f2a-4a4e-9df9-fc565b28baf0',
        publishDate: overrides && overrides.hasOwnProperty('publishDate') ? overrides.publishDate! : 'est',
        writtenDate: overrides && overrides.hasOwnProperty('writtenDate') ? overrides.writtenDate! : 'qui',
    };
};

export const makeTestimonyConnection = (overrides?: Partial<Types.TestimonyConnection>): Types.TestimonyConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeTestimonyEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeTestimony()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeTestimonyCreateInput = (overrides?: Partial<Types.TestimonyCreateInput>): Types.TestimonyCreateInput => {
    return {
        author: overrides && overrides.hasOwnProperty('author') ? overrides.author! : 'doloremque',
        body: overrides && overrides.hasOwnProperty('body') ? overrides.body! : 'tempore',
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Types.Language.Chinese,
        publishDate: overrides && overrides.hasOwnProperty('publishDate') ? overrides.publishDate! : 'est',
        writtenDate: overrides && overrides.hasOwnProperty('writtenDate') ? overrides.writtenDate! : 'placeat',
    };
};

export const makeTestimonyEdge = (overrides?: Partial<Types.TestimonyEdge>): Types.TestimonyEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'laboriosam',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeTestimony(),
    };
};

export const makeTestimonyPayload = (overrides?: Partial<Types.TestimonyPayload>): Types.TestimonyPayload => {
    return {
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
        testimony: overrides && overrides.hasOwnProperty('testimony') ? overrides.testimony! : makeTestimony(),
    };
};

export const makeTestimonyUpdateInput = (overrides?: Partial<Types.TestimonyUpdateInput>): Types.TestimonyUpdateInput => {
    return {
        author: overrides && overrides.hasOwnProperty('author') ? overrides.author! : 'nisi',
        body: overrides && overrides.hasOwnProperty('body') ? overrides.body! : 'aut',
        publishDate: overrides && overrides.hasOwnProperty('publishDate') ? overrides.publishDate! : 'recusandae',
        writtenDate: overrides && overrides.hasOwnProperty('writtenDate') ? overrides.writtenDate! : 'aliquid',
    };
};

export const makeTopic = (overrides?: Partial<Types.Topic>): Types.Topic => {
    return {
        canonicalPath: overrides && overrides.hasOwnProperty('canonicalPath') ? overrides.canonicalPath! : 'illum',
        canonicalUrl: overrides && overrides.hasOwnProperty('canonicalUrl') ? overrides.canonicalUrl! : 'libero',
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'unde',
        duration: overrides && overrides.hasOwnProperty('duration') ? overrides.duration! : 3.2,
        hidingReason: overrides && overrides.hasOwnProperty('hidingReason') ? overrides.hidingReason! : 'neque',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '2fc62363-865b-4b21-9e75-518c6679de7c',
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : false,
        items: overrides && overrides.hasOwnProperty('items') ? overrides.items! : makeTopicItemConnection(),
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Types.Language.Chinese,
        parentTopic: overrides && overrides.hasOwnProperty('parentTopic') ? overrides.parentTopic! : makeTopic(),
        shareUrl: overrides && overrides.hasOwnProperty('shareUrl') ? overrides.shareUrl! : 'optio',
        subTopics: overrides && overrides.hasOwnProperty('subTopics') ? overrides.subTopics! : makeTopicConnection(),
        summary: overrides && overrides.hasOwnProperty('summary') ? overrides.summary! : 'velit',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'suscipit',
    };
};

export const makeTopicConnection = (overrides?: Partial<Types.TopicConnection>): Types.TopicConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeTopicEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeTopic()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeTopicEdge = (overrides?: Partial<Types.TopicEdge>): Types.TopicEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'in',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeTopic(),
    };
};

export const makeTopicItem = (overrides?: Partial<Types.TopicItem>): Types.TopicItem => {
    return {
        entity: overrides && overrides.hasOwnProperty('entity') ? overrides.entity! : makeRecording(),
    };
};

export const makeTopicItemConnection = (overrides?: Partial<Types.TopicItemConnection>): Types.TopicItemConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeTopicItemEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeTopicItem()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeTopicItemEdge = (overrides?: Partial<Types.TopicItemEdge>): Types.TopicItemEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'et',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeTopicItem(),
    };
};

export const makeTopicsOrder = (overrides?: Partial<Types.TopicsOrder>): Types.TopicsOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : Types.OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : Types.TopicsSortableField.Featured,
    };
};

export const makeTranscript = (overrides?: Partial<Types.Transcript>): Types.Transcript => {
    return {
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '9a7ea27e-bbeb-42f9-8129-1b4c548e18bb',
        text: overrides && overrides.hasOwnProperty('text') ? overrides.text! : 'modi',
    };
};

export const makeTranscriptUpdateInput = (overrides?: Partial<Types.TranscriptUpdateInput>): Types.TranscriptUpdateInput => {
    return {
        transcript: overrides && overrides.hasOwnProperty('transcript') ? overrides.transcript! : 'a',
    };
};

export const makeUniformResourceLocatable = (overrides?: Partial<Types.UniformResourceLocatable>): Types.UniformResourceLocatable => {
    return {
        canonicalPath: overrides && overrides.hasOwnProperty('canonicalPath') ? overrides.canonicalPath! : 'voluptas',
        canonicalUrl: overrides && overrides.hasOwnProperty('canonicalUrl') ? overrides.canonicalUrl! : 'incidunt',
        shareUrl: overrides && overrides.hasOwnProperty('shareUrl') ? overrides.shareUrl! : 'eveniet',
    };
};

export const makeUser = (overrides?: Partial<Types.User>): Types.User => {
    return {
        address1: overrides && overrides.hasOwnProperty('address1') ? overrides.address1! : 'voluptatum',
        address2: overrides && overrides.hasOwnProperty('address2') ? overrides.address2! : 'temporibus',
        autoplay: overrides && overrides.hasOwnProperty('autoplay') ? overrides.autoplay! : true,
        city: overrides && overrides.hasOwnProperty('city') ? overrides.city! : 'alias',
        country: overrides && overrides.hasOwnProperty('country') ? overrides.country! : 'nesciunt',
        createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : 'asperiores',
        downloadHistory: overrides && overrides.hasOwnProperty('downloadHistory') ? overrides.downloadHistory! : makeUserDownloadHistoryConnection(),
        email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'sunt',
        favoritePersons: overrides && overrides.hasOwnProperty('favoritePersons') ? overrides.favoritePersons! : makePersonConnection(),
        favoriteRecordings: overrides && overrides.hasOwnProperty('favoriteRecordings') ? overrides.favoriteRecordings! : makeRecordingConnection(),
        favorites: overrides && overrides.hasOwnProperty('favorites') ? overrides.favorites! : makeUserFavoriteConnection(),
        givenName: overrides && overrides.hasOwnProperty('givenName') ? overrides.givenName! : 'voluptas',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'a5756f00-41a6-422a-8a7d-d13ee6a63750',
        image: overrides && overrides.hasOwnProperty('image') ? overrides.image! : makeImage(),
        isSuperuser: overrides && overrides.hasOwnProperty('isSuperuser') ? overrides.isSuperuser! : false,
        isVerified: overrides && overrides.hasOwnProperty('isVerified') ? overrides.isVerified! : false,
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Types.UserLanguage.Abkhazian,
        lastActivity: overrides && overrides.hasOwnProperty('lastActivity') ? overrides.lastActivity! : 'et',
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'porro',
        notificationSubscriptions: overrides && overrides.hasOwnProperty('notificationSubscriptions') ? overrides.notificationSubscriptions! : makeNotificationSubscriptionConnection(),
        notifications: overrides && overrides.hasOwnProperty('notifications') ? overrides.notifications! : makeCatalogHistoryItemConnection(),
        playlist: overrides && overrides.hasOwnProperty('playlist') ? overrides.playlist! : makeUserPlaylist(),
        playlists: overrides && overrides.hasOwnProperty('playlists') ? overrides.playlists! : makeUserPlaylistConnection(),
        postalCode: overrides && overrides.hasOwnProperty('postalCode') ? overrides.postalCode! : 'veniam',
        preferredAudioQuality: overrides && overrides.hasOwnProperty('preferredAudioQuality') ? overrides.preferredAudioQuality! : Types.RecordingQuality.Highest,
        province: overrides && overrides.hasOwnProperty('province') ? overrides.province! : 'autem',
        roles: overrides && overrides.hasOwnProperty('roles') ? overrides.roles! : [makeUserLanguageRole()],
        surname: overrides && overrides.hasOwnProperty('surname') ? overrides.surname! : 'ipsa',
        timezone: overrides && overrides.hasOwnProperty('timezone') ? overrides.timezone! : Types.Timezone.AfricaAbidjan,
    };
};

export const makeUserConnection = (overrides?: Partial<Types.UserConnection>): Types.UserConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeUserEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeUser()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeUserCreateInput = (overrides?: Partial<Types.UserCreateInput>): Types.UserCreateInput => {
    return {
        address1: overrides && overrides.hasOwnProperty('address1') ? overrides.address1! : 'cupiditate',
        address2: overrides && overrides.hasOwnProperty('address2') ? overrides.address2! : 'saepe',
        autoplay: overrides && overrides.hasOwnProperty('autoplay') ? overrides.autoplay! : false,
        city: overrides && overrides.hasOwnProperty('city') ? overrides.city! : 'suscipit',
        country: overrides && overrides.hasOwnProperty('country') ? overrides.country! : 'est',
        email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'ut',
        givenName: overrides && overrides.hasOwnProperty('givenName') ? overrides.givenName! : 'rerum',
        image: overrides && overrides.hasOwnProperty('image') ? overrides.image! : 'voluptatum',
        isSuperuser: overrides && overrides.hasOwnProperty('isSuperuser') ? overrides.isSuperuser! : true,
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Types.Language.Chinese,
        notificationSubscriptions: overrides && overrides.hasOwnProperty('notificationSubscriptions') ? overrides.notificationSubscriptions! : [makeNotificationSubscriptionInput()],
        password: overrides && overrides.hasOwnProperty('password') ? overrides.password! : 'excepturi',
        postalCode: overrides && overrides.hasOwnProperty('postalCode') ? overrides.postalCode! : 'et',
        preferredAudioQuality: overrides && overrides.hasOwnProperty('preferredAudioQuality') ? overrides.preferredAudioQuality! : Types.RecordingQuality.Highest,
        province: overrides && overrides.hasOwnProperty('province') ? overrides.province! : 'aut',
        roles: overrides && overrides.hasOwnProperty('roles') ? overrides.roles! : [makeUserLanguageRoleInput()],
        surname: overrides && overrides.hasOwnProperty('surname') ? overrides.surname! : 'ut',
        timezone: overrides && overrides.hasOwnProperty('timezone') ? overrides.timezone! : Types.Timezone.AfricaAbidjan,
    };
};

export const makeUserDownloadHistory = (overrides?: Partial<Types.UserDownloadHistory>): Types.UserDownloadHistory => {
    return {
        createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : 'deleniti',
        recording: overrides && overrides.hasOwnProperty('recording') ? overrides.recording! : makeRecording(),
    };
};

export const makeUserDownloadHistoryConnection = (overrides?: Partial<Types.UserDownloadHistoryConnection>): Types.UserDownloadHistoryConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeUserDownloadHistoryEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeUserDownloadHistory()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeUserDownloadHistoryEdge = (overrides?: Partial<Types.UserDownloadHistoryEdge>): Types.UserDownloadHistoryEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'unde',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeUserDownloadHistory(),
    };
};

export const makeUserDownloadHistoryOrder = (overrides?: Partial<Types.UserDownloadHistoryOrder>): Types.UserDownloadHistoryOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : Types.OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : Types.UserDownloadHistorySortableField.CreatedAt,
    };
};

export const makeUserEdge = (overrides?: Partial<Types.UserEdge>): Types.UserEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'optio',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeUser(),
    };
};

export const makeUserFavorite = (overrides?: Partial<Types.UserFavorite>): Types.UserFavorite => {
    return {
        createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : 'quia',
        entity: overrides && overrides.hasOwnProperty('entity') ? overrides.entity! : makeCollection(),
    };
};

export const makeUserFavoriteConnection = (overrides?: Partial<Types.UserFavoriteConnection>): Types.UserFavoriteConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeUserFavoriteEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeUserFavorite()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeUserFavoriteEdge = (overrides?: Partial<Types.UserFavoriteEdge>): Types.UserFavoriteEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'voluptatem',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeUserFavorite(),
    };
};

export const makeUserLanguageEntityInput = (overrides?: Partial<Types.UserLanguageEntityInput>): Types.UserLanguageEntityInput => {
    return {
        entityType: overrides && overrides.hasOwnProperty('entityType') ? overrides.entityType! : Types.CatalogEntityType.Collection,
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Types.Language.Chinese,
    };
};

export const makeUserLanguageRole = (overrides?: Partial<Types.UserLanguageRole>): Types.UserLanguageRole => {
    return {
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Types.Language.Chinese,
        role: overrides && overrides.hasOwnProperty('role') ? overrides.role! : Types.UserRole.Administration,
    };
};

export const makeUserLanguageRoleInput = (overrides?: Partial<Types.UserLanguageRoleInput>): Types.UserLanguageRoleInput => {
    return {
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Types.Language.Chinese,
        role: overrides && overrides.hasOwnProperty('role') ? overrides.role! : Types.UserRole.Administration,
    };
};

export const makeUserLoginInput = (overrides?: Partial<Types.UserLoginInput>): Types.UserLoginInput => {
    return {
        email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'dolorem',
        password: overrides && overrides.hasOwnProperty('password') ? overrides.password! : 'voluptas',
    };
};

export const makeUserLoginSocialInput = (overrides?: Partial<Types.UserLoginSocialInput>): Types.UserLoginSocialInput => {
    return {
        givenName: overrides && overrides.hasOwnProperty('givenName') ? overrides.givenName! : 'architecto',
        socialId: overrides && overrides.hasOwnProperty('socialId') ? overrides.socialId! : 'vitae',
        socialName: overrides && overrides.hasOwnProperty('socialName') ? overrides.socialName! : Types.UserSocialServiceName.Apple,
        socialToken: overrides && overrides.hasOwnProperty('socialToken') ? overrides.socialToken! : 'illo',
        surname: overrides && overrides.hasOwnProperty('surname') ? overrides.surname! : 'voluptatibus',
    };
};

export const makeUserPayload = (overrides?: Partial<Types.UserPayload>): Types.UserPayload => {
    return {
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
        user: overrides && overrides.hasOwnProperty('user') ? overrides.user! : makeUser(),
    };
};

export const makeUserPlaylist = (overrides?: Partial<Types.UserPlaylist>): Types.UserPlaylist => {
    return {
        createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : 'possimus',
        hasRecording: overrides && overrides.hasOwnProperty('hasRecording') ? overrides.hasRecording! : false,
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'd180d0cf-eab9-4c9f-b1aa-8ec52c2db4f6',
        isPublic: overrides && overrides.hasOwnProperty('isPublic') ? overrides.isPublic! : false,
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Types.Language.Chinese,
        recordings: overrides && overrides.hasOwnProperty('recordings') ? overrides.recordings! : makeRecordingConnection(),
        summary: overrides && overrides.hasOwnProperty('summary') ? overrides.summary! : 'consequatur',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'aliquam',
        updatedAt: overrides && overrides.hasOwnProperty('updatedAt') ? overrides.updatedAt! : 'autem',
    };
};

export const makeUserPlaylistAddInput = (overrides?: Partial<Types.UserPlaylistAddInput>): Types.UserPlaylistAddInput => {
    return {
        isPublic: overrides && overrides.hasOwnProperty('isPublic') ? overrides.isPublic! : false,
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Types.Language.Chinese,
        recordingIds: overrides && overrides.hasOwnProperty('recordingIds') ? overrides.recordingIds! : ['360d4090-1a6c-4f11-a614-5e1302faba5d'],
        summary: overrides && overrides.hasOwnProperty('summary') ? overrides.summary! : 'ut',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'perspiciatis',
    };
};

export const makeUserPlaylistConnection = (overrides?: Partial<Types.UserPlaylistConnection>): Types.UserPlaylistConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeUserPlaylistEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeUserPlaylist()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeUserPlaylistEdge = (overrides?: Partial<Types.UserPlaylistEdge>): Types.UserPlaylistEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'temporibus',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeUserPlaylist(),
    };
};

export const makeUserPlaylistUpdateInput = (overrides?: Partial<Types.UserPlaylistUpdateInput>): Types.UserPlaylistUpdateInput => {
    return {
        isPublic: overrides && overrides.hasOwnProperty('isPublic') ? overrides.isPublic! : true,
        summary: overrides && overrides.hasOwnProperty('summary') ? overrides.summary! : 'nihil',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'dignissimos',
    };
};

export const makeUserPlaylistsOrder = (overrides?: Partial<Types.UserPlaylistsOrder>): Types.UserPlaylistsOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : Types.OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : Types.UserPlaylistsSortableField.CreatedAt,
    };
};

export const makeUserSignupInput = (overrides?: Partial<Types.UserSignupInput>): Types.UserSignupInput => {
    return {
        email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'repudiandae',
        givenName: overrides && overrides.hasOwnProperty('givenName') ? overrides.givenName! : 'reprehenderit',
        password: overrides && overrides.hasOwnProperty('password') ? overrides.password! : 'nihil',
        surname: overrides && overrides.hasOwnProperty('surname') ? overrides.surname! : 'ullam',
    };
};

export const makeUserUpdateInput = (overrides?: Partial<Types.UserUpdateInput>): Types.UserUpdateInput => {
    return {
        address1: overrides && overrides.hasOwnProperty('address1') ? overrides.address1! : 'quis',
        address2: overrides && overrides.hasOwnProperty('address2') ? overrides.address2! : 'fugiat',
        autoplay: overrides && overrides.hasOwnProperty('autoplay') ? overrides.autoplay! : false,
        city: overrides && overrides.hasOwnProperty('city') ? overrides.city! : 'corrupti',
        country: overrides && overrides.hasOwnProperty('country') ? overrides.country! : 'sit',
        email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'hic',
        givenName: overrides && overrides.hasOwnProperty('givenName') ? overrides.givenName! : 'ipsam',
        image: overrides && overrides.hasOwnProperty('image') ? overrides.image! : 'enim',
        isSuperuser: overrides && overrides.hasOwnProperty('isSuperuser') ? overrides.isSuperuser! : false,
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Types.Language.Chinese,
        notificationSubscriptions: overrides && overrides.hasOwnProperty('notificationSubscriptions') ? overrides.notificationSubscriptions! : [makeNotificationSubscriptionInput()],
        password: overrides && overrides.hasOwnProperty('password') ? overrides.password! : 'inventore',
        postalCode: overrides && overrides.hasOwnProperty('postalCode') ? overrides.postalCode! : 'aspernatur',
        preferredAudioQuality: overrides && overrides.hasOwnProperty('preferredAudioQuality') ? overrides.preferredAudioQuality! : Types.RecordingQuality.Highest,
        province: overrides && overrides.hasOwnProperty('province') ? overrides.province! : 'at',
        roles: overrides && overrides.hasOwnProperty('roles') ? overrides.roles! : [makeUserLanguageRoleInput()],
        surname: overrides && overrides.hasOwnProperty('surname') ? overrides.surname! : 'deleniti',
        timezone: overrides && overrides.hasOwnProperty('timezone') ? overrides.timezone! : Types.Timezone.AfricaAbidjan,
    };
};

export const makeUsersOrder = (overrides?: Partial<Types.UsersOrder>): Types.UsersOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : Types.OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : Types.UsersSortableField.CreatedAt,
    };
};

export const makeVideoFile = (overrides?: Partial<Types.VideoFile>): Types.VideoFile => {
    return {
        bitrate: overrides && overrides.hasOwnProperty('bitrate') ? overrides.bitrate! : 3144,
        canDelete: overrides && overrides.hasOwnProperty('canDelete') ? overrides.canDelete! : true,
        container: overrides && overrides.hasOwnProperty('container') ? overrides.container! : 'aut',
        duration: overrides && overrides.hasOwnProperty('duration') ? overrides.duration! : 0.64,
        filename: overrides && overrides.hasOwnProperty('filename') ? overrides.filename! : 'consequatur',
        filesize: overrides && overrides.hasOwnProperty('filesize') ? overrides.filesize! : 'deleniti',
        height: overrides && overrides.hasOwnProperty('height') ? overrides.height! : 9848,
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '5fa94206-3ab1-41ec-b904-b98fe9d980b3',
        logUrl: overrides && overrides.hasOwnProperty('logUrl') ? overrides.logUrl! : 'fugiat',
        mimeType: overrides && overrides.hasOwnProperty('mimeType') ? overrides.mimeType! : 'nulla',
        recording: overrides && overrides.hasOwnProperty('recording') ? overrides.recording! : makeRecording(),
        transcodingStatus: overrides && overrides.hasOwnProperty('transcodingStatus') ? overrides.transcodingStatus! : Types.MediaFileTranscodingStatus.Complete,
        updatedAt: overrides && overrides.hasOwnProperty('updatedAt') ? overrides.updatedAt! : 'velit',
        url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : 'deserunt',
        width: overrides && overrides.hasOwnProperty('width') ? overrides.width! : 7799,
    };
};

export const makeWebsite = (overrides?: Partial<Types.Website>): Types.Website => {
    return {
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '6f64dc37-c71c-4021-9182-42a9b9f1727c',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'ipsa',
    };
};

export const makeWebsiteConnection = (overrides?: Partial<Types.WebsiteConnection>): Types.WebsiteConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeWebsiteEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeWebsite()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeWebsiteEdge = (overrides?: Partial<Types.WebsiteEdge>): Types.WebsiteEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'et',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeWebsite(),
    };
};
