
export const makeAggregate = (overrides?: Partial<Aggregate>): Aggregate => {
    return {
        count: overrides && overrides.hasOwnProperty('count') ? overrides.count! : 6985,
    };
};

export const makeAttachment = (overrides?: Partial<Attachment>): Attachment => {
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

export const makeAudioFile = (overrides?: Partial<AudioFile>): AudioFile => {
    return {
        bitrate: overrides && overrides.hasOwnProperty('bitrate') ? overrides.bitrate! : 2386,
        canDelete: overrides && overrides.hasOwnProperty('canDelete') ? overrides.canDelete! : true,
        duration: overrides && overrides.hasOwnProperty('duration') ? overrides.duration! : 3.76,
        filename: overrides && overrides.hasOwnProperty('filename') ? overrides.filename! : 'non',
        filesize: overrides && overrides.hasOwnProperty('filesize') ? overrides.filesize! : 'sint',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'bf398da8-a428-41b1-8529-1ecd0f939412',
        mimeType: overrides && overrides.hasOwnProperty('mimeType') ? overrides.mimeType! : 'eos',
        recording: overrides && overrides.hasOwnProperty('recording') ? overrides.recording! : makeRecording(),
        transcodingStatus: overrides && overrides.hasOwnProperty('transcodingStatus') ? overrides.transcodingStatus! : MediaFileTranscodingStatus.Complete,
        updatedAt: overrides && overrides.hasOwnProperty('updatedAt') ? overrides.updatedAt! : 'deleniti',
        url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : 'et',
    };
};

export const makeAuthenticatedUser = (overrides?: Partial<AuthenticatedUser>): AuthenticatedUser => {
    return {
        sessionToken: overrides && overrides.hasOwnProperty('sessionToken') ? overrides.sessionToken! : 'velit',
        user: overrides && overrides.hasOwnProperty('user') ? overrides.user! : makeUser(),
    };
};

export const makeAuthenticatedUserPayload = (overrides?: Partial<AuthenticatedUserPayload>): AuthenticatedUserPayload => {
    return {
        authenticatedUser: overrides && overrides.hasOwnProperty('authenticatedUser') ? overrides.authenticatedUser! : makeAuthenticatedUser(),
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
    };
};

export const makeBible = (overrides?: Partial<Bible>): Bible => {
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

export const makeBibleBook = (overrides?: Partial<BibleBook>): BibleBook => {
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

export const makeBibleChapter = (overrides?: Partial<BibleChapter>): BibleChapter => {
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

export const makeBibleConnection = (overrides?: Partial<BibleConnection>): BibleConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeBibleEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeBible()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeBibleEdge = (overrides?: Partial<BibleEdge>): BibleEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'quis',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeBible(),
    };
};

export const makeBibleReference = (overrides?: Partial<BibleReference>): BibleReference => {
    return {
        book: overrides && overrides.hasOwnProperty('book') ? overrides.book! : BibleReferenceBook.Acts,
        chapter: overrides && overrides.hasOwnProperty('chapter') ? overrides.chapter! : 414,
        verse: overrides && overrides.hasOwnProperty('verse') ? overrides.verse! : 532,
    };
};

export const makeBibleReferenceInput = (overrides?: Partial<BibleReferenceInput>): BibleReferenceInput => {
    return {
        book: overrides && overrides.hasOwnProperty('book') ? overrides.book! : BibleReferenceBook.Acts,
        chapter: overrides && overrides.hasOwnProperty('chapter') ? overrides.chapter! : 4873,
        verse: overrides && overrides.hasOwnProperty('verse') ? overrides.verse! : 3999,
    };
};

export const makeBibleReferenceRange = (overrides?: Partial<BibleReferenceRange>): BibleReferenceRange => {
    return {
        endReference: overrides && overrides.hasOwnProperty('endReference') ? overrides.endReference! : makeBibleReference(),
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '2d673cb7-fde2-4142-9b90-645424da91c1',
        startReference: overrides && overrides.hasOwnProperty('startReference') ? overrides.startReference! : makeBibleReference(),
    };
};

export const makeBibleReferenceRangeConnection = (overrides?: Partial<BibleReferenceRangeConnection>): BibleReferenceRangeConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeBibleReferenceRangeEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeBibleReferenceRange()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeBibleReferenceRangeEdge = (overrides?: Partial<BibleReferenceRangeEdge>): BibleReferenceRangeEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'laudantium',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeBibleReferenceRange(),
    };
};

export const makeBibleReferenceRangeInput = (overrides?: Partial<BibleReferenceRangeInput>): BibleReferenceRangeInput => {
    return {
        endReference: overrides && overrides.hasOwnProperty('endReference') ? overrides.endReference! : makeBibleReferenceInput(),
        startReference: overrides && overrides.hasOwnProperty('startReference') ? overrides.startReference! : makeBibleReferenceInput(),
    };
};

export const makeBibleSponsor = (overrides?: Partial<BibleSponsor>): BibleSponsor => {
    return {
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'consequatur',
        url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : 'illum',
    };
};

export const makeBibleVerse = (overrides?: Partial<BibleVerse>): BibleVerse => {
    return {
        number: overrides && overrides.hasOwnProperty('number') ? overrides.number! : 6429,
        text: overrides && overrides.hasOwnProperty('text') ? overrides.text! : 'aspernatur',
    };
};

export const makeBlogPost = (overrides?: Partial<BlogPost>): BlogPost => {
    return {
        body: overrides && overrides.hasOwnProperty('body') ? overrides.body! : 'est',
        canonicalPath: overrides && overrides.hasOwnProperty('canonicalPath') ? overrides.canonicalPath! : 'est',
        canonicalUrl: overrides && overrides.hasOwnProperty('canonicalUrl') ? overrides.canonicalUrl! : 'explicabo',
        featuredDuration: overrides && overrides.hasOwnProperty('featuredDuration') ? overrides.featuredDuration! : 5629,
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'cc3d7a27-1ad5-4451-8923-d6e74ec2ad72',
        image: overrides && overrides.hasOwnProperty('image') ? overrides.image! : makeImage(),
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : false,
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Language.Chinese,
        publishDate: overrides && overrides.hasOwnProperty('publishDate') ? overrides.publishDate! : 'exercitationem',
        readingDuration: overrides && overrides.hasOwnProperty('readingDuration') ? overrides.readingDuration! : 2.15,
        shareUrl: overrides && overrides.hasOwnProperty('shareUrl') ? overrides.shareUrl! : 'necessitatibus',
        teaser: overrides && overrides.hasOwnProperty('teaser') ? overrides.teaser! : 'voluptas',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'nihil',
    };
};

export const makeBlogPostConnection = (overrides?: Partial<BlogPostConnection>): BlogPostConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeBlogPostEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeBlogPost()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeBlogPostCreateInput = (overrides?: Partial<BlogPostCreateInput>): BlogPostCreateInput => {
    return {
        body: overrides && overrides.hasOwnProperty('body') ? overrides.body! : 'similique',
        featuredDuration: overrides && overrides.hasOwnProperty('featuredDuration') ? overrides.featuredDuration! : 3411,
        image: overrides && overrides.hasOwnProperty('image') ? overrides.image! : makeImageInput(),
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : false,
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Language.Chinese,
        publishDate: overrides && overrides.hasOwnProperty('publishDate') ? overrides.publishDate! : 'voluptas',
        teaser: overrides && overrides.hasOwnProperty('teaser') ? overrides.teaser! : 'qui',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'qui',
    };
};

export const makeBlogPostEdge = (overrides?: Partial<BlogPostEdge>): BlogPostEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'voluptates',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeBlogPost(),
    };
};

export const makeBlogPostOrder = (overrides?: Partial<BlogPostOrder>): BlogPostOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : BlogPostSortableField.PublishedAt,
    };
};

export const makeBlogPostPayload = (overrides?: Partial<BlogPostPayload>): BlogPostPayload => {
    return {
        blogPost: overrides && overrides.hasOwnProperty('blogPost') ? overrides.blogPost! : makeBlogPost(),
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
    };
};

export const makeBlogPostUpdateInput = (overrides?: Partial<BlogPostUpdateInput>): BlogPostUpdateInput => {
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

export const makeCatalogHistoryComment = (overrides?: Partial<CatalogHistoryComment>): CatalogHistoryComment => {
    return {
        isSticky: overrides && overrides.hasOwnProperty('isSticky') ? overrides.isSticky! : false,
        mentions: overrides && overrides.hasOwnProperty('mentions') ? overrides.mentions! : [makeUser()],
        message: overrides && overrides.hasOwnProperty('message') ? overrides.message! : 'ut',
    };
};

export const makeCatalogHistoryCommentCreateInput = (overrides?: Partial<CatalogHistoryCommentCreateInput>): CatalogHistoryCommentCreateInput => {
    return {
        isSticky: overrides && overrides.hasOwnProperty('isSticky') ? overrides.isSticky! : false,
        message: overrides && overrides.hasOwnProperty('message') ? overrides.message! : 'quisquam',
    };
};

export const makeCatalogHistoryCommentUpdateInput = (overrides?: Partial<CatalogHistoryCommentUpdateInput>): CatalogHistoryCommentUpdateInput => {
    return {
        isSticky: overrides && overrides.hasOwnProperty('isSticky') ? overrides.isSticky! : true,
        message: overrides && overrides.hasOwnProperty('message') ? overrides.message! : 'repellat',
    };
};

export const makeCatalogHistoryItem = (overrides?: Partial<CatalogHistoryItem>): CatalogHistoryItem => {
    return {
        comment: overrides && overrides.hasOwnProperty('comment') ? overrides.comment! : makeCatalogHistoryComment(),
        createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : 'est',
        entity: overrides && overrides.hasOwnProperty('entity') ? overrides.entity! : makeCollection(),
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '39bb0a73-e103-4a91-9054-5e017d58c20e',
        performer: overrides && overrides.hasOwnProperty('performer') ? overrides.performer! : makeUser(),
        type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : CatalogHistoryItemType.Archive,
    };
};

export const makeCatalogHistoryItemConnection = (overrides?: Partial<CatalogHistoryItemConnection>): CatalogHistoryItemConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeCatalogHistoryItemEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeCatalogHistoryItem()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeCatalogHistoryItemEdge = (overrides?: Partial<CatalogHistoryItemEdge>): CatalogHistoryItemEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'esse',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeCatalogHistoryItem(),
    };
};

export const makeCatalogHistoryItemOrder = (overrides?: Partial<CatalogHistoryItemOrder>): CatalogHistoryItemOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : CatalogHistoryItemSortableField.CreatedAt,
    };
};

export const makeCatalogHistoryItemPayload = (overrides?: Partial<CatalogHistoryItemPayload>): CatalogHistoryItemPayload => {
    return {
        catalogHistoryItem: overrides && overrides.hasOwnProperty('catalogHistoryItem') ? overrides.catalogHistoryItem! : makeCatalogHistoryItem(),
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
    };
};

export const makeCollection = (overrides?: Partial<Collection>): Collection => {
    return {
        canonicalPath: overrides && overrides.hasOwnProperty('canonicalPath') ? overrides.canonicalPath! : 'incidunt',
        canonicalUrl: overrides && overrides.hasOwnProperty('canonicalUrl') ? overrides.canonicalUrl! : 'vel',
        contentType: overrides && overrides.hasOwnProperty('contentType') ? overrides.contentType! : CollectionContentType.AudiobookSeries,
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'suscipit',
        duration: overrides && overrides.hasOwnProperty('duration') ? overrides.duration! : 8.21,
        endDate: overrides && overrides.hasOwnProperty('endDate') ? overrides.endDate! : '1970-01-04T22:39:13.305Z',
        hidingReason: overrides && overrides.hasOwnProperty('hidingReason') ? overrides.hidingReason! : 'tempora',
        history: overrides && overrides.hasOwnProperty('history') ? overrides.history! : makeCatalogHistoryItemConnection(),
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'df601c0f-3a8f-423d-af58-d8e8270ac85e',
        image: overrides && overrides.hasOwnProperty('image') ? overrides.image! : makeImage(),
        imageWithFallback: overrides && overrides.hasOwnProperty('imageWithFallback') ? overrides.imageWithFallback! : makeImage(),
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : false,
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Language.Chinese,
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

export const makeCollectionConnection = (overrides?: Partial<CollectionConnection>): CollectionConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeCollectionEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeCollection()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeCollectionCreateInput = (overrides?: Partial<CollectionCreateInput>): CollectionCreateInput => {
    return {
        contentType: overrides && overrides.hasOwnProperty('contentType') ? overrides.contentType! : CollectionContentType.AudiobookSeries,
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

export const makeCollectionEdge = (overrides?: Partial<CollectionEdge>): CollectionEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'et',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeCollection(),
    };
};

export const makeCollectionPayload = (overrides?: Partial<CollectionPayload>): CollectionPayload => {
    return {
        collection: overrides && overrides.hasOwnProperty('collection') ? overrides.collection! : makeCollection(),
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
    };
};

export const makeCollectionUpdateInput = (overrides?: Partial<CollectionUpdateInput>): CollectionUpdateInput => {
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

export const makeCollectionsOrder = (overrides?: Partial<CollectionsOrder>): CollectionsOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : CollectionsSortableField.CreatedAt,
    };
};

export const makeDateRangeInput = (overrides?: Partial<DateRangeInput>): DateRangeInput => {
    return {
        greaterThan: overrides && overrides.hasOwnProperty('greaterThan') ? overrides.greaterThan! : '1970-01-08T09:56:28.668Z',
        greaterThanOrEqualTo: overrides && overrides.hasOwnProperty('greaterThanOrEqualTo') ? overrides.greaterThanOrEqualTo! : '1970-01-07T00:46:33.192Z',
        lessThan: overrides && overrides.hasOwnProperty('lessThan') ? overrides.lessThan! : '1970-01-13T17:05:46.394Z',
        lessThanOrEqualTo: overrides && overrides.hasOwnProperty('lessThanOrEqualTo') ? overrides.lessThanOrEqualTo! : '1970-01-13T17:11:33.424Z',
    };
};

export const makeDistributionAgreement = (overrides?: Partial<DistributionAgreement>): DistributionAgreement => {
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

export const makeDistributionAgreementConnection = (overrides?: Partial<DistributionAgreementConnection>): DistributionAgreementConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeDistributionAgreementEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeDistributionAgreement()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeDistributionAgreementCreateInput = (overrides?: Partial<DistributionAgreementCreateInput>): DistributionAgreementCreateInput => {
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

export const makeDistributionAgreementEdge = (overrides?: Partial<DistributionAgreementEdge>): DistributionAgreementEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'corrupti',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeDistributionAgreement(),
    };
};

export const makeDistributionAgreementPayload = (overrides?: Partial<DistributionAgreementPayload>): DistributionAgreementPayload => {
    return {
        distributionAgreement: overrides && overrides.hasOwnProperty('distributionAgreement') ? overrides.distributionAgreement! : makeDistributionAgreement(),
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
    };
};

export const makeDistributionAgreementUpdateInput = (overrides?: Partial<DistributionAgreementUpdateInput>): DistributionAgreementUpdateInput => {
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

export const makeDistributionAgreementsOrder = (overrides?: Partial<DistributionAgreementsOrder>): DistributionAgreementsOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : DistributionAgreementsSortableField.CreatedAt,
    };
};

export const makeFaq = (overrides?: Partial<Faq>): Faq => {
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

export const makeFaqCategory = (overrides?: Partial<FaqCategory>): FaqCategory => {
    return {
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'a22fd09d-b485-49d3-8c68-203ea6df58d5',
        index: overrides && overrides.hasOwnProperty('index') ? overrides.index! : 5027,
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'vero',
    };
};

export const makeFaqCategoryConnection = (overrides?: Partial<FaqCategoryConnection>): FaqCategoryConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeFaqCategoryEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeFaqCategory()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeFaqCategoryEdge = (overrides?: Partial<FaqCategoryEdge>): FaqCategoryEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'est',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeFaqCategory(),
    };
};

export const makeFaqConnection = (overrides?: Partial<FaqConnection>): FaqConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeFaqEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeFaq()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeFaqCreateInput = (overrides?: Partial<FaqCreateInput>): FaqCreateInput => {
    return {
        body: overrides && overrides.hasOwnProperty('body') ? overrides.body! : 'dicta',
        faqCategoryId: overrides && overrides.hasOwnProperty('faqCategoryId') ? overrides.faqCategoryId! : '765f8fae-f7bd-45ac-abe5-a2cb15c89775',
        index: overrides && overrides.hasOwnProperty('index') ? overrides.index! : 7748,
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : true,
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Language.Chinese,
        publishDate: overrides && overrides.hasOwnProperty('publishDate') ? overrides.publishDate! : 'explicabo',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'blanditiis',
    };
};

export const makeFaqEdge = (overrides?: Partial<FaqEdge>): FaqEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'facere',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeFaq(),
    };
};

export const makeFaqPayload = (overrides?: Partial<FaqPayload>): FaqPayload => {
    return {
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
        faq: overrides && overrides.hasOwnProperty('faq') ? overrides.faq! : makeFaq(),
    };
};

export const makeFaqUpdateInput = (overrides?: Partial<FaqUpdateInput>): FaqUpdateInput => {
    return {
        body: overrides && overrides.hasOwnProperty('body') ? overrides.body! : 'facere',
        faqCategoryId: overrides && overrides.hasOwnProperty('faqCategoryId') ? overrides.faqCategoryId! : '45090427-6bae-4ef4-b8ee-3c4845f78811',
        index: overrides && overrides.hasOwnProperty('index') ? overrides.index! : 8704,
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : true,
        publishDate: overrides && overrides.hasOwnProperty('publishDate') ? overrides.publishDate! : 'facere',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'itaque',
    };
};

export const makeFaqsOrder = (overrides?: Partial<FaqsOrder>): FaqsOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : FaqsSortableField.CreatedAt,
    };
};

export const makeFavoritesOrder = (overrides?: Partial<FavoritesOrder>): FavoritesOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : FavoritesSortableField.EntityTitle,
    };
};

export const makeImage = (overrides?: Partial<Image>): Image => {
    return {
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '8cd950ba-96bb-470a-aecf-4194f25bbbb9',
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'cum',
        updatedAt: overrides && overrides.hasOwnProperty('updatedAt') ? overrides.updatedAt! : 'cupiditate',
        url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : 'rerum',
    };
};

export const makeImageConnectionSlim = (overrides?: Partial<ImageConnectionSlim>): ImageConnectionSlim => {
    return {
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeImageEdge()],
    };
};

export const makeImageEdge = (overrides?: Partial<ImageEdge>): ImageEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'nostrum',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeImage(),
    };
};

export const makeImageInput = (overrides?: Partial<ImageInput>): ImageInput => {
    return {
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'beatae',
    };
};

export const makeImagePayload = (overrides?: Partial<ImagePayload>): ImagePayload => {
    return {
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
        image: overrides && overrides.hasOwnProperty('image') ? overrides.image! : makeImage(),
    };
};

export const makeInputValidationError = (overrides?: Partial<InputValidationError>): InputValidationError => {
    return {
        message: overrides && overrides.hasOwnProperty('message') ? overrides.message! : 'in',
    };
};

export const makeIntegerRangeInput = (overrides?: Partial<IntegerRangeInput>): IntegerRangeInput => {
    return {
        greaterThan: overrides && overrides.hasOwnProperty('greaterThan') ? overrides.greaterThan! : 9976,
        greaterThanOrEqualTo: overrides && overrides.hasOwnProperty('greaterThanOrEqualTo') ? overrides.greaterThanOrEqualTo! : 2131,
        lessThan: overrides && overrides.hasOwnProperty('lessThan') ? overrides.lessThan! : 2601,
        lessThanOrEqualTo: overrides && overrides.hasOwnProperty('lessThanOrEqualTo') ? overrides.lessThanOrEqualTo! : 1946,
    };
};

export const makeInternalContact = (overrides?: Partial<InternalContact>): InternalContact => {
    return {
        address: overrides && overrides.hasOwnProperty('address') ? overrides.address! : 'id',
        email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'sit',
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'vero',
        phone: overrides && overrides.hasOwnProperty('phone') ? overrides.phone! : 'in',
    };
};

export const makeInternalContactInput = (overrides?: Partial<InternalContactInput>): InternalContactInput => {
    return {
        address: overrides && overrides.hasOwnProperty('address') ? overrides.address! : 'sint',
        email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'eligendi',
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'odit',
        phone: overrides && overrides.hasOwnProperty('phone') ? overrides.phone! : 'quo',
    };
};

export const makeLetterCount = (overrides?: Partial<LetterCount>): LetterCount => {
    return {
        count: overrides && overrides.hasOwnProperty('count') ? overrides.count! : 3877,
        letter: overrides && overrides.hasOwnProperty('letter') ? overrides.letter! : 'quod',
    };
};

export const makeLicense = (overrides?: Partial<License>): License => {
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

export const makeLicenseConnection = (overrides?: Partial<LicenseConnection>): LicenseConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeLicenseEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeLicense()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeLicenseCreateInput = (overrides?: Partial<LicenseCreateInput>): LicenseCreateInput => {
    return {
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'quis',
        image: overrides && overrides.hasOwnProperty('image') ? overrides.image! : makeImageInput(),
        isDefault: overrides && overrides.hasOwnProperty('isDefault') ? overrides.isDefault! : true,
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : true,
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Language.Chinese,
        permitsSales: overrides && overrides.hasOwnProperty('permitsSales') ? overrides.permitsSales! : false,
        summary: overrides && overrides.hasOwnProperty('summary') ? overrides.summary! : 'aut',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'veniam',
    };
};

export const makeLicenseEdge = (overrides?: Partial<LicenseEdge>): LicenseEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'dignissimos',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeLicense(),
    };
};

export const makeLicensePayload = (overrides?: Partial<LicensePayload>): LicensePayload => {
    return {
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
        license: overrides && overrides.hasOwnProperty('license') ? overrides.license! : makeLicense(),
    };
};

export const makeLicenseUpdateInput = (overrides?: Partial<LicenseUpdateInput>): LicenseUpdateInput => {
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

export const makeLicensesOrder = (overrides?: Partial<LicensesOrder>): LicensesOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : LicensesSortableField.CreatedAt,
    };
};

export const makeMediaFileResultConnection = (overrides?: Partial<MediaFileResultConnection>): MediaFileResultConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeMediaFileResultEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeAttachment()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeMediaFileResultEdge = (overrides?: Partial<MediaFileResultEdge>): MediaFileResultEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'necessitatibus',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeAttachment(),
    };
};

export const makeMediaFileUpload = (overrides?: Partial<MediaFileUpload>): MediaFileUpload => {
    return {
        canDelete: overrides && overrides.hasOwnProperty('canDelete') ? overrides.canDelete! : false,
        filename: overrides && overrides.hasOwnProperty('filename') ? overrides.filename! : 'cupiditate',
        filesize: overrides && overrides.hasOwnProperty('filesize') ? overrides.filesize! : 'sed',
        hasUploaded: overrides && overrides.hasOwnProperty('hasUploaded') ? overrides.hasUploaded! : true,
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'b6594681-f145-4354-b764-7393d194a379',
        mimeType: overrides && overrides.hasOwnProperty('mimeType') ? overrides.mimeType! : 'delectus',
        partUploadUrls: overrides && overrides.hasOwnProperty('partUploadUrls') ? overrides.partUploadUrls! : ['rerum'],
        recording: overrides && overrides.hasOwnProperty('recording') ? overrides.recording! : makeRecording(),
        transcodingStatus: overrides && overrides.hasOwnProperty('transcodingStatus') ? overrides.transcodingStatus! : MediaFileTranscodingStatus.Complete,
        updatedAt: overrides && overrides.hasOwnProperty('updatedAt') ? overrides.updatedAt! : 'nisi',
        url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : 'nihil',
    };
};

export const makeMediaFileUploadConnection = (overrides?: Partial<MediaFileUploadConnection>): MediaFileUploadConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeMediaFileUploadEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeMediaFileUpload()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeMediaFileUploadEdge = (overrides?: Partial<MediaFileUploadEdge>): MediaFileUploadEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'occaecati',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeMediaFileUpload(),
    };
};

export const makeMediaFileUploadFinishInput = (overrides?: Partial<MediaFileUploadFinishInput>): MediaFileUploadFinishInput => {
    return {
        uploadPartEtags: overrides && overrides.hasOwnProperty('uploadPartEtags') ? overrides.uploadPartEtags! : ['perspiciatis'],
    };
};

export const makeMediaFileUploadPayload = (overrides?: Partial<MediaFileUploadPayload>): MediaFileUploadPayload => {
    return {
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
        mediaFileUpload: overrides && overrides.hasOwnProperty('mediaFileUpload') ? overrides.mediaFileUpload! : makeMediaFileUpload(),
    };
};

export const makeMediaFileUploadStartInput = (overrides?: Partial<MediaFileUploadStartInput>): MediaFileUploadStartInput => {
    return {
        filename: overrides && overrides.hasOwnProperty('filename') ? overrides.filename! : 'enim',
        filesize: overrides && overrides.hasOwnProperty('filesize') ? overrides.filesize! : 'sed',
        recordingId: overrides && overrides.hasOwnProperty('recordingId') ? overrides.recordingId! : '78c3b2c4-1058-42db-a5f0-d85d981d037e',
    };
};

export const makeMediaFileUploadsOrder = (overrides?: Partial<MediaFileUploadsOrder>): MediaFileUploadsOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : MediaFileUploadsSortableField.CreatedAt,
    };
};

export const makeMediaFilesOrder = (overrides?: Partial<MediaFilesOrder>): MediaFilesOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : MediaFilesSortableField.CreatedAt,
    };
};

export const makeMediaRelease = (overrides?: Partial<MediaRelease>): MediaRelease => {
    return {
        createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : 'qui',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '5bc277cd-6641-48d8-a643-ae4fe12a2868',
        mediaReleaseForm: overrides && overrides.hasOwnProperty('mediaReleaseForm') ? overrides.mediaReleaseForm! : makeMediaReleaseForm(),
        mediaReleasePerson: overrides && overrides.hasOwnProperty('mediaReleasePerson') ? overrides.mediaReleasePerson! : makeMediaReleasePerson(),
        notes: overrides && overrides.hasOwnProperty('notes') ? overrides.notes! : 'porro',
        person: overrides && overrides.hasOwnProperty('person') ? overrides.person! : makePerson(),
    };
};

export const makeMediaReleaseConnection = (overrides?: Partial<MediaReleaseConnection>): MediaReleaseConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeMediaReleaseEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeMediaRelease()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeMediaReleaseCreateInput = (overrides?: Partial<MediaReleaseCreateInput>): MediaReleaseCreateInput => {
    return {
        mediaReleaseFormId: overrides && overrides.hasOwnProperty('mediaReleaseFormId') ? overrides.mediaReleaseFormId! : 'beca14ba-c319-45cd-a6ce-27d2de9f3401',
        mediaReleasePerson: overrides && overrides.hasOwnProperty('mediaReleasePerson') ? overrides.mediaReleasePerson! : makeMediaReleasePersonCreateInput(),
        notes: overrides && overrides.hasOwnProperty('notes') ? overrides.notes! : 'quis',
        personId: overrides && overrides.hasOwnProperty('personId') ? overrides.personId! : '6bc062a1-7f32-4279-a764-c4a7999aba5d',
    };
};

export const makeMediaReleaseEdge = (overrides?: Partial<MediaReleaseEdge>): MediaReleaseEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'nihil',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeMediaRelease(),
    };
};

export const makeMediaReleaseForm = (overrides?: Partial<MediaReleaseForm>): MediaReleaseForm => {
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
        type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : MediaReleaseFormType.Collection,
        url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : 'qui',
    };
};

export const makeMediaReleaseFormConnection = (overrides?: Partial<MediaReleaseFormConnection>): MediaReleaseFormConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeMediaReleaseFormEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeMediaReleaseForm()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeMediaReleaseFormCreateInput = (overrides?: Partial<MediaReleaseFormCreateInput>): MediaReleaseFormCreateInput => {
    return {
        collectionId: overrides && overrides.hasOwnProperty('collectionId') ? overrides.collectionId! : 'a5126647-bd07-42b0-bb76-0b7e037e7c4c',
        isClosed: overrides && overrides.hasOwnProperty('isClosed') ? overrides.isClosed! : true,
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Language.Chinese,
        recordingId: overrides && overrides.hasOwnProperty('recordingId') ? overrides.recordingId! : '73d7bd18-dbb9-4b4c-8768-ff726f682f4b',
        sequenceId: overrides && overrides.hasOwnProperty('sequenceId') ? overrides.sequenceId! : 'c3066efd-7160-4fdf-8acf-c9fd3bb91e63',
        sponsorId: overrides && overrides.hasOwnProperty('sponsorId') ? overrides.sponsorId! : 'd7e8860c-2e4b-41b4-804b-b7a9a318ba05',
        summary: overrides && overrides.hasOwnProperty('summary') ? overrides.summary! : 'consectetur',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'aliquid',
        type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : MediaReleaseFormType.Collection,
    };
};

export const makeMediaReleaseFormEdge = (overrides?: Partial<MediaReleaseFormEdge>): MediaReleaseFormEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'eveniet',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeMediaReleaseForm(),
    };
};

export const makeMediaReleaseFormOrder = (overrides?: Partial<MediaReleaseFormOrder>): MediaReleaseFormOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : MediaReleaseFormSortableField.CreatedAt,
    };
};

export const makeMediaReleaseFormPayload = (overrides?: Partial<MediaReleaseFormPayload>): MediaReleaseFormPayload => {
    return {
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
        mediaReleaseForm: overrides && overrides.hasOwnProperty('mediaReleaseForm') ? overrides.mediaReleaseForm! : makeMediaReleaseForm(),
    };
};

export const makeMediaReleaseFormTemplate = (overrides?: Partial<MediaReleaseFormTemplate>): MediaReleaseFormTemplate => {
    return {
        summary: overrides && overrides.hasOwnProperty('summary') ? overrides.summary! : 'eum',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'consequatur',
        type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : MediaReleaseFormType.Collection,
    };
};

export const makeMediaReleaseFormUpdateInput = (overrides?: Partial<MediaReleaseFormUpdateInput>): MediaReleaseFormUpdateInput => {
    return {
        collectionId: overrides && overrides.hasOwnProperty('collectionId') ? overrides.collectionId! : '34f3bbf3-7bd3-4b88-b07e-72af60e0e856',
        isClosed: overrides && overrides.hasOwnProperty('isClosed') ? overrides.isClosed! : false,
        recordingId: overrides && overrides.hasOwnProperty('recordingId') ? overrides.recordingId! : '7c804dbc-a58a-482a-853c-ac0e82a03c78',
        sequenceId: overrides && overrides.hasOwnProperty('sequenceId') ? overrides.sequenceId! : '7938a0f3-09c9-42d6-817e-fbc78a05c0ea',
        sponsorId: overrides && overrides.hasOwnProperty('sponsorId') ? overrides.sponsorId! : '484ab7fb-2d85-4676-ac8b-c246a0a5d9e1',
        summary: overrides && overrides.hasOwnProperty('summary') ? overrides.summary! : 'voluptatem',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'velit',
        type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : MediaReleaseFormType.Collection,
    };
};

export const makeMediaReleaseOrder = (overrides?: Partial<MediaReleaseOrder>): MediaReleaseOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : MediaReleaseSortableField.CreatedAt,
    };
};

export const makeMediaReleasePayload = (overrides?: Partial<MediaReleasePayload>): MediaReleasePayload => {
    return {
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
        mediaRelease: overrides && overrides.hasOwnProperty('mediaRelease') ? overrides.mediaRelease! : makeMediaRelease(),
    };
};

export const makeMediaReleasePerson = (overrides?: Partial<MediaReleasePerson>): MediaReleasePerson => {
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

export const makeMediaReleasePersonCreateInput = (overrides?: Partial<MediaReleasePersonCreateInput>): MediaReleasePersonCreateInput => {
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

export const makeMediaReleasePersonUpdateInput = (overrides?: Partial<MediaReleasePersonUpdateInput>): MediaReleasePersonUpdateInput => {
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

export const makeMediaReleaseUpdateInput = (overrides?: Partial<MediaReleaseUpdateInput>): MediaReleaseUpdateInput => {
    return {
        mediaReleasePerson: overrides && overrides.hasOwnProperty('mediaReleasePerson') ? overrides.mediaReleasePerson! : makeMediaReleasePersonUpdateInput(),
        notes: overrides && overrides.hasOwnProperty('notes') ? overrides.notes! : 'modi',
        personId: overrides && overrides.hasOwnProperty('personId') ? overrides.personId! : '3d0f9c7e-f38e-4bb8-b96c-cea1b6e39251',
    };
};

export const makeMutation = (overrides?: Partial<Mutation>): Mutation => {
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

export const makeNode = (overrides?: Partial<Node>): Node => {
    return {
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '95bb2f34-6c86-495f-bfdc-f25b025cdba5',
    };
};

export const makeNotificationChannel = (overrides?: Partial<NotificationChannel>): NotificationChannel => {
    return {
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'tempora',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'ff4717b3-f706-4233-b18b-cb1c90798e85',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'qui',
    };
};

export const makeNotificationChannelConnection = (overrides?: Partial<NotificationChannelConnection>): NotificationChannelConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeNotificationChannelEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeNotificationChannel()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeNotificationChannelEdge = (overrides?: Partial<NotificationChannelEdge>): NotificationChannelEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'incidunt',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeNotificationChannel(),
    };
};

export const makeNotificationSubscription = (overrides?: Partial<NotificationSubscription>): NotificationSubscription => {
    return {
        frequency: overrides && overrides.hasOwnProperty('frequency') ? overrides.frequency! : NotificationFrequency.Daily,
        notificationChannel: overrides && overrides.hasOwnProperty('notificationChannel') ? overrides.notificationChannel! : makeNotificationChannel(),
    };
};

export const makeNotificationSubscriptionConnection = (overrides?: Partial<NotificationSubscriptionConnection>): NotificationSubscriptionConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeNotificationSubscriptionEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeNotificationSubscription()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeNotificationSubscriptionEdge = (overrides?: Partial<NotificationSubscriptionEdge>): NotificationSubscriptionEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'repellendus',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeNotificationSubscription(),
    };
};

export const makeNotificationSubscriptionInput = (overrides?: Partial<NotificationSubscriptionInput>): NotificationSubscriptionInput => {
    return {
        frequency: overrides && overrides.hasOwnProperty('frequency') ? overrides.frequency! : NotificationFrequency.Daily,
        notificationChannelId: overrides && overrides.hasOwnProperty('notificationChannelId') ? overrides.notificationChannelId! : '0c9e99cd-cca3-4f80-baee-265006788a70',
    };
};

export const makePage = (overrides?: Partial<Page>): Page => {
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
        type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : PageType.About,
    };
};

export const makePageConnection = (overrides?: Partial<PageConnection>): PageConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makePageEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makePage()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makePageContactSubmitInput = (overrides?: Partial<PageContactSubmitInput>): PageContactSubmitInput => {
    return {
        body: overrides && overrides.hasOwnProperty('body') ? overrides.body! : 'aut',
        email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'nam',
        givenName: overrides && overrides.hasOwnProperty('givenName') ? overrides.givenName! : 'rerum',
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Language.Chinese,
        recipient: overrides && overrides.hasOwnProperty('recipient') ? overrides.recipient! : PageContactRecipient.General,
        surname: overrides && overrides.hasOwnProperty('surname') ? overrides.surname! : 'totam',
    };
};

export const makePageCreateInput = (overrides?: Partial<PageCreateInput>): PageCreateInput => {
    return {
        body: overrides && overrides.hasOwnProperty('body') ? overrides.body! : 'voluptas',
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : false,
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Language.Chinese,
        pageMenuId: overrides && overrides.hasOwnProperty('pageMenuId') ? overrides.pageMenuId! : 'dc5e36aa-07a5-4ff4-be03-dc3807c6ede4',
        slug: overrides && overrides.hasOwnProperty('slug') ? overrides.slug! : 'est',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'quis',
        type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : PageType.About,
    };
};

export const makePageEdge = (overrides?: Partial<PageEdge>): PageEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'in',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makePage(),
    };
};

export const makePageInfo = (overrides?: Partial<PageInfo>): PageInfo => {
    return {
        endCursor: overrides && overrides.hasOwnProperty('endCursor') ? overrides.endCursor! : 'id',
        hasNextPage: overrides && overrides.hasOwnProperty('hasNextPage') ? overrides.hasNextPage! : true,
        hasPreviousPage: overrides && overrides.hasOwnProperty('hasPreviousPage') ? overrides.hasPreviousPage! : false,
        startCursor: overrides && overrides.hasOwnProperty('startCursor') ? overrides.startCursor! : 'eum',
    };
};

export const makePageMenu = (overrides?: Partial<PageMenu>): PageMenu => {
    return {
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'f9148d60-4f99-4d90-9164-81e279d41fcf',
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'maiores',
    };
};

export const makePageMenuConnection = (overrides?: Partial<PageMenuConnection>): PageMenuConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makePageMenuEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makePageMenu()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makePageMenuEdge = (overrides?: Partial<PageMenuEdge>): PageMenuEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'veritatis',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makePageMenu(),
    };
};

export const makePagePayload = (overrides?: Partial<PagePayload>): PagePayload => {
    return {
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
        page: overrides && overrides.hasOwnProperty('page') ? overrides.page! : makePage(),
    };
};

export const makePageUpdateInput = (overrides?: Partial<PageUpdateInput>): PageUpdateInput => {
    return {
        body: overrides && overrides.hasOwnProperty('body') ? overrides.body! : 'odio',
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : false,
        pageMenuId: overrides && overrides.hasOwnProperty('pageMenuId') ? overrides.pageMenuId! : 'f043a2dd-a97b-49b7-ba9e-ce4800271857',
        slug: overrides && overrides.hasOwnProperty('slug') ? overrides.slug! : 'veniam',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'et',
    };
};

export const makePagesOrder = (overrides?: Partial<PagesOrder>): PagesOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : PagesSortableField.CreatedAt,
    };
};

export const makePerson = (overrides?: Partial<Person>): Person => {
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
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Language.Chinese,
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

export const makePersonConnection = (overrides?: Partial<PersonConnection>): PersonConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makePersonEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makePerson()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makePersonCreateInput = (overrides?: Partial<PersonCreateInput>): PersonCreateInput => {
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
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Language.Chinese,
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

export const makePersonEdge = (overrides?: Partial<PersonEdge>): PersonEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'ut',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makePerson(),
    };
};

export const makePersonPayload = (overrides?: Partial<PersonPayload>): PersonPayload => {
    return {
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
        person: overrides && overrides.hasOwnProperty('person') ? overrides.person! : makePerson(),
    };
};

export const makePersonUpdateInput = (overrides?: Partial<PersonUpdateInput>): PersonUpdateInput => {
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

export const makePersonsOrder = (overrides?: Partial<PersonsOrder>): PersonsOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : PersonsSortableField.CreatedAt,
    };
};

export const makePlaybackSessionAdvanceInput = (overrides?: Partial<PlaybackSessionAdvanceInput>): PlaybackSessionAdvanceInput => {
    return {
        positionPercentage: overrides && overrides.hasOwnProperty('positionPercentage') ? overrides.positionPercentage! : 7.57,
    };
};

export const makePopularPerson = (overrides?: Partial<PopularPerson>): PopularPerson => {
    return {
        person: overrides && overrides.hasOwnProperty('person') ? overrides.person! : makePerson(),
        weight: overrides && overrides.hasOwnProperty('weight') ? overrides.weight! : 6.94,
    };
};

export const makePopularPersonConnection = (overrides?: Partial<PopularPersonConnection>): PopularPersonConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makePopularPersonEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makePopularPerson()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makePopularPersonEdge = (overrides?: Partial<PopularPersonEdge>): PopularPersonEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'unde',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makePopularPerson(),
    };
};

export const makePopularRecording = (overrides?: Partial<PopularRecording>): PopularRecording => {
    return {
        recording: overrides && overrides.hasOwnProperty('recording') ? overrides.recording! : makeRecording(),
        weight: overrides && overrides.hasOwnProperty('weight') ? overrides.weight! : 7.84,
    };
};

export const makePopularRecordingConnection = (overrides?: Partial<PopularRecordingConnection>): PopularRecordingConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makePopularRecordingEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makePopularRecording()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makePopularRecordingEdge = (overrides?: Partial<PopularRecordingEdge>): PopularRecordingEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'nulla',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makePopularRecording(),
    };
};

export const makeQuery = (overrides?: Partial<Query>): Query => {
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

export const makeRecording = (overrides?: Partial<Recording>): Recording => {
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
        contentScreeningStatus: overrides && overrides.hasOwnProperty('contentScreeningStatus') ? overrides.contentScreeningStatus! : RecordingContentScreeningStatus.AdminOverride,
        contentType: overrides && overrides.hasOwnProperty('contentType') ? overrides.contentType! : RecordingContentType.AudiobookTrack,
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
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Language.Chinese,
        legalScreeningCheckouts: overrides && overrides.hasOwnProperty('legalScreeningCheckouts') ? overrides.legalScreeningCheckouts! : [makeRecordingScreeningCheckout()],
        legalScreeningStatus: overrides && overrides.hasOwnProperty('legalScreeningStatus') ? overrides.legalScreeningStatus! : RecordingLegalScreeningStatus.AdminOverride,
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
        stage: overrides && overrides.hasOwnProperty('stage') ? overrides.stage! : RecordingStage.Draft,
        technicalScreeningCheckouts: overrides && overrides.hasOwnProperty('technicalScreeningCheckouts') ? overrides.technicalScreeningCheckouts! : [makeRecordingScreeningCheckout()],
        technicalScreeningStatus: overrides && overrides.hasOwnProperty('technicalScreeningStatus') ? overrides.technicalScreeningStatus! : RecordingTechnicalScreeningStatus.AdminOverride,
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'cumque',
        transcript: overrides && overrides.hasOwnProperty('transcript') ? overrides.transcript! : makeTranscript(),
        transcriptionStatus: overrides && overrides.hasOwnProperty('transcriptionStatus') ? overrides.transcriptionStatus! : RecordingTranscriptionStatus.Complete,
        videoFiles: overrides && overrides.hasOwnProperty('videoFiles') ? overrides.videoFiles! : [makeVideoFile()],
        viewerHasFavorited: overrides && overrides.hasOwnProperty('viewerHasFavorited') ? overrides.viewerHasFavorited! : false,
        viewerPlaybackSession: overrides && overrides.hasOwnProperty('viewerPlaybackSession') ? overrides.viewerPlaybackSession! : makeRecordingPlaybackSession(),
        websites: overrides && overrides.hasOwnProperty('websites') ? overrides.websites! : [makeWebsite()],
    };
};

export const makeRecordingConnection = (overrides?: Partial<RecordingConnection>): RecordingConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeRecordingEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeRecording()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeRecordingContentScreeningEvaluation = (overrides?: Partial<RecordingContentScreeningEvaluation>): RecordingContentScreeningEvaluation => {
    return {
        methods: overrides && overrides.hasOwnProperty('methods') ? overrides.methods! : [RecordingScreeningMethod.Live],
        recommendation: overrides && overrides.hasOwnProperty('recommendation') ? overrides.recommendation! : RecordingContentScreeningEvaluationRecommendation.Approve,
        screener: overrides && overrides.hasOwnProperty('screener') ? overrides.screener! : makeUser(),
    };
};

export const makeRecordingContentScreeningEvaluationPayload = (overrides?: Partial<RecordingContentScreeningEvaluationPayload>): RecordingContentScreeningEvaluationPayload => {
    return {
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
        recordingContentScreeningEvaluation: overrides && overrides.hasOwnProperty('recordingContentScreeningEvaluation') ? overrides.recordingContentScreeningEvaluation! : makeRecordingContentScreeningEvaluation(),
    };
};

export const makeRecordingCreateInput = (overrides?: Partial<RecordingCreateInput>): RecordingCreateInput => {
    return {
        bibleReferences: overrides && overrides.hasOwnProperty('bibleReferences') ? overrides.bibleReferences! : [makeBibleReferenceRangeInput()],
        collectionId: overrides && overrides.hasOwnProperty('collectionId') ? overrides.collectionId! : 'da0c0693-aae8-48aa-af62-55195355e461',
        contentScreeningCheckouts: overrides && overrides.hasOwnProperty('contentScreeningCheckouts') ? overrides.contentScreeningCheckouts! : [makeRecordingScreeningCheckoutInput()],
        contentType: overrides && overrides.hasOwnProperty('contentType') ? overrides.contentType! : RecordingContentType.AudiobookTrack,
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

export const makeRecordingEdge = (overrides?: Partial<RecordingEdge>): RecordingEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'a',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeRecording(),
    };
};

export const makeRecordingPayload = (overrides?: Partial<RecordingPayload>): RecordingPayload => {
    return {
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
        recording: overrides && overrides.hasOwnProperty('recording') ? overrides.recording! : makeRecording(),
    };
};

export const makeRecordingPersonInput = (overrides?: Partial<RecordingPersonInput>): RecordingPersonInput => {
    return {
        personId: overrides && overrides.hasOwnProperty('personId') ? overrides.personId! : '8291cd00-6cf9-4748-b2c9-96fab43d22a7',
        role: overrides && overrides.hasOwnProperty('role') ? overrides.role! : PersonsRoleField.Artist,
    };
};

export const makeRecordingPersonRoleInput = (overrides?: Partial<RecordingPersonRoleInput>): RecordingPersonRoleInput => {
    return {
        personId: overrides && overrides.hasOwnProperty('personId') ? overrides.personId! : 'd462ce79-6724-489a-87b7-de9dabfd988b',
        role: overrides && overrides.hasOwnProperty('role') ? overrides.role! : PersonsRoleField.Artist,
    };
};

export const makeRecordingPlaybackSession = (overrides?: Partial<RecordingPlaybackSession>): RecordingPlaybackSession => {
    return {
        createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : 'dolorum',
        positionPercentage: overrides && overrides.hasOwnProperty('positionPercentage') ? overrides.positionPercentage! : 9.64,
        updatedAt: overrides && overrides.hasOwnProperty('updatedAt') ? overrides.updatedAt! : 'id',
    };
};

export const makeRecordingScreeningCheckout = (overrides?: Partial<RecordingScreeningCheckout>): RecordingScreeningCheckout => {
    return {
        assigner: overrides && overrides.hasOwnProperty('assigner') ? overrides.assigner! : makeUser(),
        createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : 'soluta',
        screener: overrides && overrides.hasOwnProperty('screener') ? overrides.screener! : makeUser(),
    };
};

export const makeRecordingScreeningCheckoutInput = (overrides?: Partial<RecordingScreeningCheckoutInput>): RecordingScreeningCheckoutInput => {
    return {
        userId: overrides && overrides.hasOwnProperty('userId') ? overrides.userId! : '8c9f018d-bc8d-466f-afe6-09018c0780a6',
    };
};

export const makeRecordingScreeningCheckoutPayload = (overrides?: Partial<RecordingScreeningCheckoutPayload>): RecordingScreeningCheckoutPayload => {
    return {
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
        recordingScreeningCheckout: overrides && overrides.hasOwnProperty('recordingScreeningCheckout') ? overrides.recordingScreeningCheckout! : makeRecordingScreeningCheckout(),
    };
};

export const makeRecordingScreeningIssue = (overrides?: Partial<RecordingScreeningIssue>): RecordingScreeningIssue => {
    return {
        endTime: overrides && overrides.hasOwnProperty('endTime') ? overrides.endTime! : 'perspiciatis',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'ac7e0ec6-c9fb-4e86-874d-82aa24d9090b',
        notes: overrides && overrides.hasOwnProperty('notes') ? overrides.notes! : 'eos',
        screener: overrides && overrides.hasOwnProperty('screener') ? overrides.screener! : makeUser(),
        startTime: overrides && overrides.hasOwnProperty('startTime') ? overrides.startTime! : 'mollitia',
        target: overrides && overrides.hasOwnProperty('target') ? overrides.target! : RecordingScreeningIssueTarget.Audio,
        type: overrides && overrides.hasOwnProperty('type') ? overrides.type! : makeRecordingScreeningIssueType(),
    };
};

export const makeRecordingScreeningIssueConnection = (overrides?: Partial<RecordingScreeningIssueConnection>): RecordingScreeningIssueConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeRecordingScreeningIssueEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeRecordingScreeningIssue()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeRecordingScreeningIssueEdge = (overrides?: Partial<RecordingScreeningIssueEdge>): RecordingScreeningIssueEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'quia',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeRecordingScreeningIssue(),
    };
};

export const makeRecordingScreeningIssueInput = (overrides?: Partial<RecordingScreeningIssueInput>): RecordingScreeningIssueInput => {
    return {
        endTime: overrides && overrides.hasOwnProperty('endTime') ? overrides.endTime! : 'cupiditate',
        notes: overrides && overrides.hasOwnProperty('notes') ? overrides.notes! : 'facilis',
        recordingScreeningIssueTypeId: overrides && overrides.hasOwnProperty('recordingScreeningIssueTypeId') ? overrides.recordingScreeningIssueTypeId! : '17581dc0-157d-4f3e-b1d1-4b7a15b3c4c3',
        startTime: overrides && overrides.hasOwnProperty('startTime') ? overrides.startTime! : 'aliquid',
        target: overrides && overrides.hasOwnProperty('target') ? overrides.target! : RecordingScreeningIssueTarget.Audio,
    };
};

export const makeRecordingScreeningIssueOrder = (overrides?: Partial<RecordingScreeningIssueOrder>): RecordingScreeningIssueOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : RecordingScreeningIssuesSortableField.CreatedAt,
    };
};

export const makeRecordingScreeningIssuePayload = (overrides?: Partial<RecordingScreeningIssuePayload>): RecordingScreeningIssuePayload => {
    return {
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
        recordingScreeningIssue: overrides && overrides.hasOwnProperty('recordingScreeningIssue') ? overrides.recordingScreeningIssue! : makeRecordingScreeningIssue(),
    };
};

export const makeRecordingScreeningIssueType = (overrides?: Partial<RecordingScreeningIssueType>): RecordingScreeningIssueType => {
    return {
        category: overrides && overrides.hasOwnProperty('category') ? overrides.category! : RecordingScreeningIssueCategory.General,
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'eb38653a-b860-4c5d-86e5-034080bb98be',
        notes: overrides && overrides.hasOwnProperty('notes') ? overrides.notes! : 'esse',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'iste',
    };
};

export const makeRecordingScreeningIssueTypeConnection = (overrides?: Partial<RecordingScreeningIssueTypeConnection>): RecordingScreeningIssueTypeConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeRecordingScreeningIssueTypeEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeRecordingScreeningIssueType()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeRecordingScreeningIssueTypeEdge = (overrides?: Partial<RecordingScreeningIssueTypeEdge>): RecordingScreeningIssueTypeEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'necessitatibus',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeRecordingScreeningIssueType(),
    };
};

export const makeRecordingTag = (overrides?: Partial<RecordingTag>): RecordingTag => {
    return {
        tag: overrides && overrides.hasOwnProperty('tag') ? overrides.tag! : makeTag(),
    };
};

export const makeRecordingTagConnection = (overrides?: Partial<RecordingTagConnection>): RecordingTagConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeRecordingTagEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeRecordingTag()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeRecordingTagEdge = (overrides?: Partial<RecordingTagEdge>): RecordingTagEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'neque',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeRecordingTag(),
    };
};

export const makeRecordingTagInput = (overrides?: Partial<RecordingTagInput>): RecordingTagInput => {
    return {
        tagName: overrides && overrides.hasOwnProperty('tagName') ? overrides.tagName! : 'voluptatem',
    };
};

export const makeRecordingTagSuggestion = (overrides?: Partial<RecordingTagSuggestion>): RecordingTagSuggestion => {
    return {
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'similique',
    };
};

export const makeRecordingTagSuggestionConnection = (overrides?: Partial<RecordingTagSuggestionConnection>): RecordingTagSuggestionConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeRecordingTagSuggestionEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeRecordingTagSuggestion()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeRecordingTagSuggestionEdge = (overrides?: Partial<RecordingTagSuggestionEdge>): RecordingTagSuggestionEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'et',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeRecordingTagSuggestion(),
    };
};

export const makeRecordingUpdateInput = (overrides?: Partial<RecordingUpdateInput>): RecordingUpdateInput => {
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

export const makeRecordingsOrder = (overrides?: Partial<RecordingsOrder>): RecordingsOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : RecordingsSortableField.CollectionTitle,
    };
};

export const makeSequence = (overrides?: Partial<Sequence>): Sequence => {
    return {
        canonicalPath: overrides && overrides.hasOwnProperty('canonicalPath') ? overrides.canonicalPath! : 'asperiores',
        canonicalUrl: overrides && overrides.hasOwnProperty('canonicalUrl') ? overrides.canonicalUrl! : 'sed',
        collection: overrides && overrides.hasOwnProperty('collection') ? overrides.collection! : makeCollection(),
        contentType: overrides && overrides.hasOwnProperty('contentType') ? overrides.contentType! : SequenceContentType.Audiobook,
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'accusantium',
        duration: overrides && overrides.hasOwnProperty('duration') ? overrides.duration! : 7.28,
        endDate: overrides && overrides.hasOwnProperty('endDate') ? overrides.endDate! : '1970-01-14T07:44:40.972Z',
        hidingReason: overrides && overrides.hasOwnProperty('hidingReason') ? overrides.hidingReason! : 'unde',
        history: overrides && overrides.hasOwnProperty('history') ? overrides.history! : makeCatalogHistoryItemConnection(),
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '192ffd9c-839c-4601-984a-75a72cd77ec1',
        image: overrides && overrides.hasOwnProperty('image') ? overrides.image! : makeImage(),
        imageWithFallback: overrides && overrides.hasOwnProperty('imageWithFallback') ? overrides.imageWithFallback! : makeImage(),
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : false,
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Language.Chinese,
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

export const makeSequenceConnection = (overrides?: Partial<SequenceConnection>): SequenceConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeSequenceEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeSequence()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeSequenceCreateInput = (overrides?: Partial<SequenceCreateInput>): SequenceCreateInput => {
    return {
        collectionId: overrides && overrides.hasOwnProperty('collectionId') ? overrides.collectionId! : '72230959-b7ae-4a2a-8df7-1480b1ea78a8',
        contentType: overrides && overrides.hasOwnProperty('contentType') ? overrides.contentType! : SequenceContentType.Audiobook,
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

export const makeSequenceEdge = (overrides?: Partial<SequenceEdge>): SequenceEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'atque',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeSequence(),
    };
};

export const makeSequenceOrder = (overrides?: Partial<SequenceOrder>): SequenceOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : SequenceSortableField.CreatedAt,
    };
};

export const makeSequencePayload = (overrides?: Partial<SequencePayload>): SequencePayload => {
    return {
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
        sequence: overrides && overrides.hasOwnProperty('sequence') ? overrides.sequence! : makeSequence(),
    };
};

export const makeSequenceUpdateInput = (overrides?: Partial<SequenceUpdateInput>): SequenceUpdateInput => {
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

export const makeSponsor = (overrides?: Partial<Sponsor>): Sponsor => {
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
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Language.Chinese,
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

export const makeSponsorConnection = (overrides?: Partial<SponsorConnection>): SponsorConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeSponsorEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeSponsor()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeSponsorCreateInput = (overrides?: Partial<SponsorCreateInput>): SponsorCreateInput => {
    return {
        address: overrides && overrides.hasOwnProperty('address') ? overrides.address! : 'corrupti',
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'et',
        distributionAgreements: overrides && overrides.hasOwnProperty('distributionAgreements') ? overrides.distributionAgreements! : [makeSponsorDistributionAgreementInput()],
        email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'quam',
        hidingReason: overrides && overrides.hasOwnProperty('hidingReason') ? overrides.hidingReason! : 'pariatur',
        image: overrides && overrides.hasOwnProperty('image') ? overrides.image! : makeImageInput(),
        internalContact: overrides && overrides.hasOwnProperty('internalContact') ? overrides.internalContact! : makeInternalContactInput(),
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : false,
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Language.Chinese,
        location: overrides && overrides.hasOwnProperty('location') ? overrides.location! : 'est',
        phone: overrides && overrides.hasOwnProperty('phone') ? overrides.phone! : 'minima',
        skipContentScreening: overrides && overrides.hasOwnProperty('skipContentScreening') ? overrides.skipContentScreening! : false,
        skipLegalScreening: overrides && overrides.hasOwnProperty('skipLegalScreening') ? overrides.skipLegalScreening! : false,
        summary: overrides && overrides.hasOwnProperty('summary') ? overrides.summary! : 'quia',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'aut',
        website: overrides && overrides.hasOwnProperty('website') ? overrides.website! : 'nihil',
    };
};

export const makeSponsorDistributionAgreementInput = (overrides?: Partial<SponsorDistributionAgreementInput>): SponsorDistributionAgreementInput => {
    return {
        isDefault: overrides && overrides.hasOwnProperty('isDefault') ? overrides.isDefault! : true,
        isRetired: overrides && overrides.hasOwnProperty('isRetired') ? overrides.isRetired! : true,
        licenseId: overrides && overrides.hasOwnProperty('licenseId') ? overrides.licenseId! : 'ed91b7cf-90f0-4e65-b540-93b8c2021351',
        summary: overrides && overrides.hasOwnProperty('summary') ? overrides.summary! : 'sit',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'at',
    };
};

export const makeSponsorEdge = (overrides?: Partial<SponsorEdge>): SponsorEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'aliquid',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeSponsor(),
    };
};

export const makeSponsorPayload = (overrides?: Partial<SponsorPayload>): SponsorPayload => {
    return {
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
        sponsor: overrides && overrides.hasOwnProperty('sponsor') ? overrides.sponsor! : makeSponsor(),
    };
};

export const makeSponsorUpdateInput = (overrides?: Partial<SponsorUpdateInput>): SponsorUpdateInput => {
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

export const makeSponsorsOrder = (overrides?: Partial<SponsorsOrder>): SponsorsOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : SponsorsSortableField.CreatedAt,
    };
};

export const makeSuccessPayload = (overrides?: Partial<SuccessPayload>): SuccessPayload => {
    return {
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
        success: overrides && overrides.hasOwnProperty('success') ? overrides.success! : false,
    };
};

export const makeTag = (overrides?: Partial<Tag>): Tag => {
    return {
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '7926b150-6296-4e15-b70c-92302664d98c',
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'qui',
        recordings: overrides && overrides.hasOwnProperty('recordings') ? overrides.recordings! : makeRecordingConnection(),
    };
};

export const makeTagConnection = (overrides?: Partial<TagConnection>): TagConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeTagEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeTag()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeTagEdge = (overrides?: Partial<TagEdge>): TagEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'doloremque',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeTag(),
    };
};

export const makeTagsOrder = (overrides?: Partial<TagsOrder>): TagsOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : TagsSortableField.Name,
    };
};

export const makeTestimoniesOrder = (overrides?: Partial<TestimoniesOrder>): TestimoniesOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : TestimoniesSortableField.WrittenDate,
    };
};

export const makeTestimony = (overrides?: Partial<Testimony>): Testimony => {
    return {
        author: overrides && overrides.hasOwnProperty('author') ? overrides.author! : 'in',
        body: overrides && overrides.hasOwnProperty('body') ? overrides.body! : 'non',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '88a5cf98-1f2a-4a4e-9df9-fc565b28baf0',
        publishDate: overrides && overrides.hasOwnProperty('publishDate') ? overrides.publishDate! : 'est',
        writtenDate: overrides && overrides.hasOwnProperty('writtenDate') ? overrides.writtenDate! : 'qui',
    };
};

export const makeTestimonyConnection = (overrides?: Partial<TestimonyConnection>): TestimonyConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeTestimonyEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeTestimony()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeTestimonyCreateInput = (overrides?: Partial<TestimonyCreateInput>): TestimonyCreateInput => {
    return {
        author: overrides && overrides.hasOwnProperty('author') ? overrides.author! : 'doloremque',
        body: overrides && overrides.hasOwnProperty('body') ? overrides.body! : 'tempore',
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Language.Chinese,
        publishDate: overrides && overrides.hasOwnProperty('publishDate') ? overrides.publishDate! : 'est',
        writtenDate: overrides && overrides.hasOwnProperty('writtenDate') ? overrides.writtenDate! : 'placeat',
    };
};

export const makeTestimonyEdge = (overrides?: Partial<TestimonyEdge>): TestimonyEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'laboriosam',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeTestimony(),
    };
};

export const makeTestimonyPayload = (overrides?: Partial<TestimonyPayload>): TestimonyPayload => {
    return {
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
        testimony: overrides && overrides.hasOwnProperty('testimony') ? overrides.testimony! : makeTestimony(),
    };
};

export const makeTestimonyUpdateInput = (overrides?: Partial<TestimonyUpdateInput>): TestimonyUpdateInput => {
    return {
        author: overrides && overrides.hasOwnProperty('author') ? overrides.author! : 'nisi',
        body: overrides && overrides.hasOwnProperty('body') ? overrides.body! : 'aut',
        publishDate: overrides && overrides.hasOwnProperty('publishDate') ? overrides.publishDate! : 'recusandae',
        writtenDate: overrides && overrides.hasOwnProperty('writtenDate') ? overrides.writtenDate! : 'aliquid',
    };
};

export const makeTopic = (overrides?: Partial<Topic>): Topic => {
    return {
        canonicalPath: overrides && overrides.hasOwnProperty('canonicalPath') ? overrides.canonicalPath! : 'illum',
        canonicalUrl: overrides && overrides.hasOwnProperty('canonicalUrl') ? overrides.canonicalUrl! : 'libero',
        description: overrides && overrides.hasOwnProperty('description') ? overrides.description! : 'unde',
        duration: overrides && overrides.hasOwnProperty('duration') ? overrides.duration! : 3.2,
        hidingReason: overrides && overrides.hasOwnProperty('hidingReason') ? overrides.hidingReason! : 'neque',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '2fc62363-865b-4b21-9e75-518c6679de7c',
        isHidden: overrides && overrides.hasOwnProperty('isHidden') ? overrides.isHidden! : false,
        items: overrides && overrides.hasOwnProperty('items') ? overrides.items! : makeTopicItemConnection(),
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Language.Chinese,
        parentTopic: overrides && overrides.hasOwnProperty('parentTopic') ? overrides.parentTopic! : makeTopic(),
        shareUrl: overrides && overrides.hasOwnProperty('shareUrl') ? overrides.shareUrl! : 'optio',
        subTopics: overrides && overrides.hasOwnProperty('subTopics') ? overrides.subTopics! : makeTopicConnection(),
        summary: overrides && overrides.hasOwnProperty('summary') ? overrides.summary! : 'velit',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'suscipit',
    };
};

export const makeTopicConnection = (overrides?: Partial<TopicConnection>): TopicConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeTopicEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeTopic()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeTopicEdge = (overrides?: Partial<TopicEdge>): TopicEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'in',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeTopic(),
    };
};

export const makeTopicItem = (overrides?: Partial<TopicItem>): TopicItem => {
    return {
        entity: overrides && overrides.hasOwnProperty('entity') ? overrides.entity! : makeRecording(),
    };
};

export const makeTopicItemConnection = (overrides?: Partial<TopicItemConnection>): TopicItemConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeTopicItemEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeTopicItem()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeTopicItemEdge = (overrides?: Partial<TopicItemEdge>): TopicItemEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'et',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeTopicItem(),
    };
};

export const makeTopicsOrder = (overrides?: Partial<TopicsOrder>): TopicsOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : TopicsSortableField.Featured,
    };
};

export const makeTranscript = (overrides?: Partial<Transcript>): Transcript => {
    return {
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '9a7ea27e-bbeb-42f9-8129-1b4c548e18bb',
        text: overrides && overrides.hasOwnProperty('text') ? overrides.text! : 'modi',
    };
};

export const makeTranscriptUpdateInput = (overrides?: Partial<TranscriptUpdateInput>): TranscriptUpdateInput => {
    return {
        transcript: overrides && overrides.hasOwnProperty('transcript') ? overrides.transcript! : 'a',
    };
};

export const makeUniformResourceLocatable = (overrides?: Partial<UniformResourceLocatable>): UniformResourceLocatable => {
    return {
        canonicalPath: overrides && overrides.hasOwnProperty('canonicalPath') ? overrides.canonicalPath! : 'voluptas',
        canonicalUrl: overrides && overrides.hasOwnProperty('canonicalUrl') ? overrides.canonicalUrl! : 'incidunt',
        shareUrl: overrides && overrides.hasOwnProperty('shareUrl') ? overrides.shareUrl! : 'eveniet',
    };
};

export const makeUser = (overrides?: Partial<User>): User => {
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
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : UserLanguage.Abkhazian,
        lastActivity: overrides && overrides.hasOwnProperty('lastActivity') ? overrides.lastActivity! : 'et',
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'porro',
        notificationSubscriptions: overrides && overrides.hasOwnProperty('notificationSubscriptions') ? overrides.notificationSubscriptions! : makeNotificationSubscriptionConnection(),
        notifications: overrides && overrides.hasOwnProperty('notifications') ? overrides.notifications! : makeCatalogHistoryItemConnection(),
        playlist: overrides && overrides.hasOwnProperty('playlist') ? overrides.playlist! : makeUserPlaylist(),
        playlists: overrides && overrides.hasOwnProperty('playlists') ? overrides.playlists! : makeUserPlaylistConnection(),
        postalCode: overrides && overrides.hasOwnProperty('postalCode') ? overrides.postalCode! : 'veniam',
        preferredAudioQuality: overrides && overrides.hasOwnProperty('preferredAudioQuality') ? overrides.preferredAudioQuality! : RecordingQuality.Highest,
        province: overrides && overrides.hasOwnProperty('province') ? overrides.province! : 'autem',
        roles: overrides && overrides.hasOwnProperty('roles') ? overrides.roles! : [makeUserLanguageRole()],
        surname: overrides && overrides.hasOwnProperty('surname') ? overrides.surname! : 'ipsa',
        timezone: overrides && overrides.hasOwnProperty('timezone') ? overrides.timezone! : Timezone.AfricaAbidjan,
    };
};

export const makeUserConnection = (overrides?: Partial<UserConnection>): UserConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeUserEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeUser()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeUserCreateInput = (overrides?: Partial<UserCreateInput>): UserCreateInput => {
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
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Language.Chinese,
        notificationSubscriptions: overrides && overrides.hasOwnProperty('notificationSubscriptions') ? overrides.notificationSubscriptions! : [makeNotificationSubscriptionInput()],
        password: overrides && overrides.hasOwnProperty('password') ? overrides.password! : 'excepturi',
        postalCode: overrides && overrides.hasOwnProperty('postalCode') ? overrides.postalCode! : 'et',
        preferredAudioQuality: overrides && overrides.hasOwnProperty('preferredAudioQuality') ? overrides.preferredAudioQuality! : RecordingQuality.Highest,
        province: overrides && overrides.hasOwnProperty('province') ? overrides.province! : 'aut',
        roles: overrides && overrides.hasOwnProperty('roles') ? overrides.roles! : [makeUserLanguageRoleInput()],
        surname: overrides && overrides.hasOwnProperty('surname') ? overrides.surname! : 'ut',
        timezone: overrides && overrides.hasOwnProperty('timezone') ? overrides.timezone! : Timezone.AfricaAbidjan,
    };
};

export const makeUserDownloadHistory = (overrides?: Partial<UserDownloadHistory>): UserDownloadHistory => {
    return {
        createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : 'deleniti',
        recording: overrides && overrides.hasOwnProperty('recording') ? overrides.recording! : makeRecording(),
    };
};

export const makeUserDownloadHistoryConnection = (overrides?: Partial<UserDownloadHistoryConnection>): UserDownloadHistoryConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeUserDownloadHistoryEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeUserDownloadHistory()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeUserDownloadHistoryEdge = (overrides?: Partial<UserDownloadHistoryEdge>): UserDownloadHistoryEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'unde',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeUserDownloadHistory(),
    };
};

export const makeUserDownloadHistoryOrder = (overrides?: Partial<UserDownloadHistoryOrder>): UserDownloadHistoryOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : UserDownloadHistorySortableField.CreatedAt,
    };
};

export const makeUserEdge = (overrides?: Partial<UserEdge>): UserEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'optio',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeUser(),
    };
};

export const makeUserFavorite = (overrides?: Partial<UserFavorite>): UserFavorite => {
    return {
        createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : 'quia',
        entity: overrides && overrides.hasOwnProperty('entity') ? overrides.entity! : makeCollection(),
    };
};

export const makeUserFavoriteConnection = (overrides?: Partial<UserFavoriteConnection>): UserFavoriteConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeUserFavoriteEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeUserFavorite()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeUserFavoriteEdge = (overrides?: Partial<UserFavoriteEdge>): UserFavoriteEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'voluptatem',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeUserFavorite(),
    };
};

export const makeUserLanguageEntityInput = (overrides?: Partial<UserLanguageEntityInput>): UserLanguageEntityInput => {
    return {
        entityType: overrides && overrides.hasOwnProperty('entityType') ? overrides.entityType! : CatalogEntityType.Collection,
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Language.Chinese,
    };
};

export const makeUserLanguageRole = (overrides?: Partial<UserLanguageRole>): UserLanguageRole => {
    return {
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Language.Chinese,
        role: overrides && overrides.hasOwnProperty('role') ? overrides.role! : UserRole.Administration,
    };
};

export const makeUserLanguageRoleInput = (overrides?: Partial<UserLanguageRoleInput>): UserLanguageRoleInput => {
    return {
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Language.Chinese,
        role: overrides && overrides.hasOwnProperty('role') ? overrides.role! : UserRole.Administration,
    };
};

export const makeUserLoginInput = (overrides?: Partial<UserLoginInput>): UserLoginInput => {
    return {
        email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'dolorem',
        password: overrides && overrides.hasOwnProperty('password') ? overrides.password! : 'voluptas',
    };
};

export const makeUserLoginSocialInput = (overrides?: Partial<UserLoginSocialInput>): UserLoginSocialInput => {
    return {
        givenName: overrides && overrides.hasOwnProperty('givenName') ? overrides.givenName! : 'architecto',
        socialId: overrides && overrides.hasOwnProperty('socialId') ? overrides.socialId! : 'vitae',
        socialName: overrides && overrides.hasOwnProperty('socialName') ? overrides.socialName! : UserSocialServiceName.Apple,
        socialToken: overrides && overrides.hasOwnProperty('socialToken') ? overrides.socialToken! : 'illo',
        surname: overrides && overrides.hasOwnProperty('surname') ? overrides.surname! : 'voluptatibus',
    };
};

export const makeUserPayload = (overrides?: Partial<UserPayload>): UserPayload => {
    return {
        errors: overrides && overrides.hasOwnProperty('errors') ? overrides.errors! : [makeInputValidationError()],
        user: overrides && overrides.hasOwnProperty('user') ? overrides.user! : makeUser(),
    };
};

export const makeUserPlaylist = (overrides?: Partial<UserPlaylist>): UserPlaylist => {
    return {
        createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : 'possimus',
        hasRecording: overrides && overrides.hasOwnProperty('hasRecording') ? overrides.hasRecording! : false,
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'd180d0cf-eab9-4c9f-b1aa-8ec52c2db4f6',
        isPublic: overrides && overrides.hasOwnProperty('isPublic') ? overrides.isPublic! : false,
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Language.Chinese,
        recordings: overrides && overrides.hasOwnProperty('recordings') ? overrides.recordings! : makeRecordingConnection(),
        summary: overrides && overrides.hasOwnProperty('summary') ? overrides.summary! : 'consequatur',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'aliquam',
        updatedAt: overrides && overrides.hasOwnProperty('updatedAt') ? overrides.updatedAt! : 'autem',
    };
};

export const makeUserPlaylistAddInput = (overrides?: Partial<UserPlaylistAddInput>): UserPlaylistAddInput => {
    return {
        isPublic: overrides && overrides.hasOwnProperty('isPublic') ? overrides.isPublic! : false,
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Language.Chinese,
        recordingIds: overrides && overrides.hasOwnProperty('recordingIds') ? overrides.recordingIds! : ['360d4090-1a6c-4f11-a614-5e1302faba5d'],
        summary: overrides && overrides.hasOwnProperty('summary') ? overrides.summary! : 'ut',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'perspiciatis',
    };
};

export const makeUserPlaylistConnection = (overrides?: Partial<UserPlaylistConnection>): UserPlaylistConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeUserPlaylistEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeUserPlaylist()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeUserPlaylistEdge = (overrides?: Partial<UserPlaylistEdge>): UserPlaylistEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'temporibus',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeUserPlaylist(),
    };
};

export const makeUserPlaylistUpdateInput = (overrides?: Partial<UserPlaylistUpdateInput>): UserPlaylistUpdateInput => {
    return {
        isPublic: overrides && overrides.hasOwnProperty('isPublic') ? overrides.isPublic! : true,
        summary: overrides && overrides.hasOwnProperty('summary') ? overrides.summary! : 'nihil',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'dignissimos',
    };
};

export const makeUserPlaylistsOrder = (overrides?: Partial<UserPlaylistsOrder>): UserPlaylistsOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : UserPlaylistsSortableField.CreatedAt,
    };
};

export const makeUserSignupInput = (overrides?: Partial<UserSignupInput>): UserSignupInput => {
    return {
        email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'repudiandae',
        givenName: overrides && overrides.hasOwnProperty('givenName') ? overrides.givenName! : 'reprehenderit',
        password: overrides && overrides.hasOwnProperty('password') ? overrides.password! : 'nihil',
        surname: overrides && overrides.hasOwnProperty('surname') ? overrides.surname! : 'ullam',
    };
};

export const makeUserUpdateInput = (overrides?: Partial<UserUpdateInput>): UserUpdateInput => {
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
        language: overrides && overrides.hasOwnProperty('language') ? overrides.language! : Language.Chinese,
        notificationSubscriptions: overrides && overrides.hasOwnProperty('notificationSubscriptions') ? overrides.notificationSubscriptions! : [makeNotificationSubscriptionInput()],
        password: overrides && overrides.hasOwnProperty('password') ? overrides.password! : 'inventore',
        postalCode: overrides && overrides.hasOwnProperty('postalCode') ? overrides.postalCode! : 'aspernatur',
        preferredAudioQuality: overrides && overrides.hasOwnProperty('preferredAudioQuality') ? overrides.preferredAudioQuality! : RecordingQuality.Highest,
        province: overrides && overrides.hasOwnProperty('province') ? overrides.province! : 'at',
        roles: overrides && overrides.hasOwnProperty('roles') ? overrides.roles! : [makeUserLanguageRoleInput()],
        surname: overrides && overrides.hasOwnProperty('surname') ? overrides.surname! : 'deleniti',
        timezone: overrides && overrides.hasOwnProperty('timezone') ? overrides.timezone! : Timezone.AfricaAbidjan,
    };
};

export const makeUsersOrder = (overrides?: Partial<UsersOrder>): UsersOrder => {
    return {
        direction: overrides && overrides.hasOwnProperty('direction') ? overrides.direction! : OrderByDirection.Asc,
        field: overrides && overrides.hasOwnProperty('field') ? overrides.field! : UsersSortableField.CreatedAt,
    };
};

export const makeVideoFile = (overrides?: Partial<VideoFile>): VideoFile => {
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
        transcodingStatus: overrides && overrides.hasOwnProperty('transcodingStatus') ? overrides.transcodingStatus! : MediaFileTranscodingStatus.Complete,
        updatedAt: overrides && overrides.hasOwnProperty('updatedAt') ? overrides.updatedAt! : 'velit',
        url: overrides && overrides.hasOwnProperty('url') ? overrides.url! : 'deserunt',
        width: overrides && overrides.hasOwnProperty('width') ? overrides.width! : 7799,
    };
};

export const makeWebsite = (overrides?: Partial<Website>): Website => {
    return {
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '6f64dc37-c71c-4021-9182-42a9b9f1727c',
        title: overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'ipsa',
    };
};

export const makeWebsiteConnection = (overrides?: Partial<WebsiteConnection>): WebsiteConnection => {
    return {
        aggregate: overrides && overrides.hasOwnProperty('aggregate') ? overrides.aggregate! : makeAggregate(),
        edges: overrides && overrides.hasOwnProperty('edges') ? overrides.edges! : [makeWebsiteEdge()],
        nodes: overrides && overrides.hasOwnProperty('nodes') ? overrides.nodes! : [makeWebsite()],
        pageInfo: overrides && overrides.hasOwnProperty('pageInfo') ? overrides.pageInfo! : makePageInfo(),
    };
};

export const makeWebsiteEdge = (overrides?: Partial<WebsiteEdge>): WebsiteEdge => {
    return {
        cursor: overrides && overrides.hasOwnProperty('cursor') ? overrides.cursor! : 'et',
        node: overrides && overrides.hasOwnProperty('node') ? overrides.node! : makeWebsite(),
    };
};
