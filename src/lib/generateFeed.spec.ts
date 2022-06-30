import { RecordingContentType } from '@src/__generated__/graphql';
import { advanceTo } from 'jest-date-mock';

import { generateFeed } from './generateFeed';

describe('generateFeed', () => {
	beforeAll(() => {
		advanceTo(new Date(2021, 8, 13, 12, 34, 56));
	});

	it('matches handles no recordings', async () => {
		const result = await generateFeed(
			'en',
			{
				link: 'https://www.audioverse.org/en/conferences/378/gyc-2019-by-many-or-by-few.html',
				title: 'GYC 2019: By Many Or By Few',
			},
			[]
		);
		expect(result).toMatchSnapshot();
	});

	it('matches prior story season feed', async () => {
		const result = await generateFeed(
			'en',
			{
				link: 'https://www.audioverse.org/english/audiobooks/books/1167/acts-of-the-apostles.html',
				title: 'Acts of the Apostles',
				description:
					'Acts of the Apostles, by , narrated by Uncle Dan, Aunt Sue',
				image:
					'https://s.audioverse.org/english/gallery/seriess/2/350/350/AA-YSH.jpg',
			},
			[
				{
					id: '15565',
					title: 'The Persecutor From Tarsus',
					contentType: RecordingContentType.Story,
					description:
						'<p>Saul’s persecution of the early church and Stephen’s stoning&nbsp;-&nbsp;Acts 6, 7 &amp; 8.</p>\r\n<p>AudioVerse is grateful to Your Story Hour for allowing our users to stream these stories completely for free. To purchase a copy that you can download or to get the entire set, please visit the&nbsp;<a href=“http://www.yourstoryhour.org/store/product/acts-of-the-apostles/” target=“_blank”>Your Story Hour</a>&nbsp;website for more information.</p>',
					publishDate: '2017-01-19T05:10:47.000Z',
					audioFiles: [
						{
							id: '41097',
							url: 'https://www.audioverse.org/english/download/dl/41097/2016/11/15565/_narr_AuntSueUncleDan-ThePersecutorFromTarsus-80k.mp3',
							filesize: '15495259',
							duration: 1540,
							mimeType: 'audio/mpeg',
							bitrate: 80,
						},
						{
							id: '41098',
							url: 'https://www.audioverse.org/english/download/dl/41098/2016/11/15565/_narr_AuntSueUncleDan-ThePersecutorFromTarsus-48k.mp3',
							filesize: '9332294',
							duration: 1540,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '41099',
							url: 'https://www.audioverse.org/english/download/dl/41099/2016/11/15565/_narr_AuntSueUncleDan-ThePersecutorFromTarsus-16k.mp3',
							filesize: '3169121',
							duration: 1540,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: ' Aunt Sue',
						},
						{
							name: ' Uncle Dan',
						},
					],
					sequence: {
						title: 'Acts of the Apostles',
					},
					sponsor: {
						title: 'Your Story Hour',
					},
				},
			]
		);

		expect(result).toMatchSnapshot();
	});

	it('matches prior conference feed', async () => {
		const result = await generateFeed(
			'en',
			{
				link: 'https://www.audioverse.org/en/conferences/378/gyc-2019-by-many-or-by-few.html',
				title: 'GYC 2019: By Many Or By Few',
				subtitle: 'GYC 2019: By Many Or By Few',
			},
			[
				{
					id: '21136',
					title: 'A Thousand Shall Run',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>1 Sam 14:6 tells of Jonathan’s brave foray against the camp of the Philistines. Was this really faith? Or was it presumption? How can we be sure of the difference between the two, and what significance might this have for God’s last day church?</p>',
					publishDate: '2020-02-03T06:51:59.000Z',
					audioFiles: [
						{
							id: '73420',
							url: 'https://www.audioverse.org/english/download/dl/73420/2020/01/21136/20200101-1800-21136-8060b7b0508e04cdb832225bf2c426a1-64k.mp3',
							filesize: '20729713',
							duration: 2591.2,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
					],
					videoFiles: [
						{
							id: '73397',
							url: 'https://www.audioverse.org/english/download/dl/73397/2020/01/21136/20200101-1800-21136-8060b7b0508e04cdb832225bf2c426a1-860k_360.mp4',
							filesize: '684040759',
							duration: 6274.8,
							mimeType: 'video/mp4',
							bitrate: 799,
							container: 'mp4',
						},
						{
							id: '73395',
							url: 'https://www.audioverse.org/english/download/dl/73395/2020/01/21136/20200101-1800-21136-8060b7b0508e04cdb832225bf2c426a1-860k.mp4',
							filesize: '674207433',
							duration: 6274.8,
							mimeType: 'video/mp4',
							bitrate: 728,
							container: 'mp4',
						},
						{
							id: '73396',
							url: 'https://www.audioverse.org/english/download/dl/73396/2020/01/21136/20200101-1800-21136-8060b7b0508e04cdb832225bf2c426a1-860k_240.mp4',
							filesize: '214092931',
							duration: 6274.8,
							mimeType: 'video/mp4',
							bitrate: 200,
							container: 'mp4',
						},
					],
					persons: [
						{
							name: 'Dean Cullinane',
						},
					],
					sequence: {
						title: 'Plenary',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21137',
					title: 'Elkanah and Hannah',
					contentType: RecordingContentType.Sermon,
					description: '',
					publishDate: '2020-02-10T03:47:40.000Z',
					audioFiles: [
						{
							id: '73185',
							url: 'https://www.audioverse.org/english/download/dl/73185/2020/01/21137/20200102-0700-21137-e92fa3e2c08cfb1c85e5ad3dccf5c881-64k.mp3',
							filesize: '20295624',
							duration: 2537,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73300',
							url: 'https://www.audioverse.org/english/download/dl/73300/2020/01/21137/20200102-0700-21137-e92fa3e2c08cfb1c85e5ad3dccf5c881-48k.mp3',
							filesize: '15256602',
							duration: 2542.8,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73301',
							url: 'https://www.audioverse.org/english/download/dl/73301/2020/01/21137/20200102-0700-21137-e92fa3e2c08cfb1c85e5ad3dccf5c881-16k.mp3',
							filesize: '5178196',
							duration: 2589.1,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [
						{
							id: '73644',
							url: 'https://www.audioverse.org/english/download/dl/73644/2020/01/21137/20200102-0700-21137-e92fa3e2c08cfb1c85e5ad3dccf5c881-1k.mp4',
							filesize: '798270712',
							duration: 3538,
							mimeType: 'video/mp4',
							bitrate: 1674,
							container: 'mp4',
						},
						{
							id: '73646',
							url: 'https://www.audioverse.org/english/download/dl/73646/2020/01/21137/20200102-0700-21137-e92fa3e2c08cfb1c85e5ad3dccf5c881-1k_360.mp4',
							filesize: '384772994',
							duration: 3538,
							mimeType: 'video/mp4',
							bitrate: 797,
							container: 'mp4',
						},
						{
							id: '73645',
							url: 'https://www.audioverse.org/english/download/dl/73645/2020/01/21137/20200102-0700-21137-e92fa3e2c08cfb1c85e5ad3dccf5c881-1k_240.mp4',
							filesize: '120628302',
							duration: 3538,
							mimeType: 'video/mp4',
							bitrate: 200,
							container: 'mp4',
						},
					],
					persons: [
						{
							name: 'Sikhu Daco',
						},
					],
					sequence: {
						title: 'Morning Devotional',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21170',
					title: 'The Life of Sabbath School',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Discover the purpose of Sabbath School, why it may be weak in some churches, and learn some principles to bring it back to its original goal.</p>',
					publishDate: '2020-02-03T06:48:10.000Z',
					audioFiles: [
						{
							id: '73256',
							url: 'https://www.audioverse.org/english/download/dl/73256/2020/01/21170/20200102-0915-21170-5d3e1b5139e2248f65947f47bbd7f6b5-64k.mp3',
							filesize: '28288896',
							duration: 3536.1,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73324',
							url: 'https://www.audioverse.org/english/download/dl/73324/2020/01/21170/20200102-0915-21170-5d3e1b5139e2248f65947f47bbd7f6b5-48k.mp3',
							filesize: '21453329',
							duration: 3575.6,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73325',
							url: 'https://www.audioverse.org/english/download/dl/73325/2020/01/21170/20200102-0915-21170-5d3e1b5139e2248f65947f47bbd7f6b5-16k.mp3',
							filesize: '7781832',
							duration: 3890.9,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Sikhu Daco',
						},
						{
							name: 'Justin Kim',
						},
						{
							name: 'Israel Ramos',
						},
						{
							name: 'Jonathan Walter',
						},
					],
					sequence: {
						title: 'The Life, Death, and Resurrection of Sabbath School',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21191',
					title: 'Mission, Miracles, and You',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Do you want to be inspired by current miracle stories from around the world? Join us to hear how God is reaching assassins, rebels, prisoners, closed countries, and those in the hardest-to-reach places on the planet! Do you also want to learn how you can be an evangelist from the palm of your hand? Join us to learn how to use your cell phone and social media to reach your friends, coworkers and others all over the world. Come and gain practical tools that will help you take the gospel to the world in this generation!</p>',
					publishDate: '2020-02-10T03:47:21.000Z',
					audioFiles: [
						{
							id: '73171',
							url: 'https://www.audioverse.org/english/download/dl/73171/2020/01/21191/20200102-0915-21191-731fb639a626b7566bdf2c2129ae93cf-64k.mp3',
							filesize: '30407519',
							duration: 3800.9,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73218',
							url: 'https://www.audioverse.org/english/download/dl/73218/2020/01/21191/20200102-0915-21191-731fb639a626b7566bdf2c2129ae93cf-48k.mp3',
							filesize: '22845330',
							duration: 3807.6,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73219',
							url: 'https://www.audioverse.org/english/download/dl/73219/2020/01/21191/20200102-0915-21191-731fb639a626b7566bdf2c2129ae93cf-16k.mp3',
							filesize: '7720589',
							duration: 3860.3,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Kyle Allen',
						},
					],
					sequence: {
						title: 'Breakouts',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21138',
					title:
						'Abraham and the Heathen: Does God Actually Listen to the Prayers of Hindus, Buddhists and Muslims?',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Tackle the big ideas of God, sex, relationships, the gospel and how to do life well! Grasp inspirational and relevant lessons from the incredible story of Abraham. These practical presentations will combine the most up-to-date Biblical and apologetic research o many hot topics in the world and church today.</p>',
					publishDate: '2020-02-10T03:46:45.000Z',
					audioFiles: [
						{
							id: '73188',
							url: 'https://www.audioverse.org/english/download/dl/73188/2020/01/21138/20200102-0930-21138-97ff5b1f64ce4b5826f7c928d293ac27-64k.mp3',
							filesize: '28681018',
							duration: 3585.1,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73298',
							url: 'https://www.audioverse.org/english/download/dl/73298/2020/01/21138/20200102-0930-21138-97ff5b1f64ce4b5826f7c928d293ac27-48k.mp3',
							filesize: '21539609',
							duration: 3589.9,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73299',
							url: 'https://www.audioverse.org/english/download/dl/73299/2020/01/21138/20200102-0930-21138-97ff5b1f64ce4b5826f7c928d293ac27-16k.mp3',
							filesize: '7256429',
							duration: 3628.2,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Anil Kanda',
						},
					],
					sequence: {
						title: 'Abraham, Apologetics, and the Big Ideas of Scripture',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21142',
					title: 'Are You Entrepreneurial Material?',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Join Sebastien and Jesse on an in-depth, hands-on, and practical dive into Christian entrepreneurship. Explore why business is important to God, if you are entrepreneurial material, how to get started with no money and how to share the gospel through your business.</p>',
					publishDate: '2020-02-03T06:48:46.000Z',
					audioFiles: [
						{
							id: '73193',
							url: 'https://www.audioverse.org/english/download/dl/73193/2020/01/21142/20200102-0930-21142-ae567a108959e303b2265e3154e02398-64k.mp3',
							filesize: '32689846',
							duration: 4086.2,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73290',
							url: 'https://www.audioverse.org/english/download/dl/73290/2020/01/21142/20200102-0930-21142-ae567a108959e303b2265e3154e02398-48k.mp3',
							filesize: '24562628',
							duration: 4093.8,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73291',
							url: 'https://www.audioverse.org/english/download/dl/73291/2020/01/21142/20200102-0930-21142-ae567a108959e303b2265e3154e02398-16k.mp3',
							filesize: '8307830',
							duration: 4153.9,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Sebastien Braxton',
						},
						{
							name: 'Jesse Zwiker',
						},
					],
					sequence: {
						title: 'God Means Business',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21146',
					title: 'Be Done with Fear',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Learn how to take a sledgehammer to Satan’s kingdom and build up the walls of Zion! Faith, rightly understood, will change your life from boring to amazing, from feebleness to power, and from failure to triumph! Paul Ratsara, who faced the guns of kidnappers and the crocodiles of the Congo, with nothing but faith, will join Jay Gallimore in this powerful life-changing seminar. They want young Christians to have great influence, to go up against Babylon and rescue multitudes of Satan’s victims. If put this seminar into practice, it will change your life and the world around you!</p>',
					publishDate: '2020-02-03T06:50:11.000Z',
					audioFiles: [
						{
							id: '73198',
							url: 'https://www.audioverse.org/english/download/dl/73198/2020/01/21146/20200102-0930-21146-d7bbc940e74cab07b9a4f298762a96a4-64k.mp3',
							filesize: '27966207',
							duration: 3495.8,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73282',
							url: 'https://www.audioverse.org/english/download/dl/73282/2020/01/21146/20200102-0930-21146-d7bbc940e74cab07b9a4f298762a96a4-48k.mp3',
							filesize: '21012984',
							duration: 3502.2,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73283',
							url: 'https://www.audioverse.org/english/download/dl/73283/2020/01/21146/20200102-0930-21146-d7bbc940e74cab07b9a4f298762a96a4-16k.mp3',
							filesize: '7106177',
							duration: 3553.1,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Jay Gallimore',
						},
					],
					sequence: {
						title: 'Rebuke Winds and Move Mountains!',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21150',
					title:
						'How to Interpret Scripture: How did we get Here? Tracing the Origin of the Bible in History',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>How do we face the crucial questions that confront us in society and culture? How do we interpret the Bible in the face of significant challenges in science, history and prophecy? What about the bigger issues facing our church? This seminar seeks to answer these crucial questions by pointing us back to basic principles of biblical interpretation that will guide our understanding of the living Word of God with the assurance that it is more relevant today than it has ever been.</p>',
					publishDate: '2020-02-03T06:50:31.000Z',
					audioFiles: [
						{
							id: '73750',
							url: 'https://www.audioverse.org/english/download/dl/73750/2020/01/21150/20200102-0930-21150-c6e155d63d7e9686c2cf15e07f48e0af-64k.mp3',
							filesize: '29226156',
							duration: 3653.3,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73751',
							url: 'https://www.audioverse.org/english/download/dl/73751/2020/01/21150/20200102-0930-21150-c6e155d63d7e9686c2cf15e07f48e0af-48k.mp3',
							filesize: '21957792',
							duration: 3659.6,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73752',
							url: 'https://www.audioverse.org/english/download/dl/73752/2020/01/21150/20200102-0930-21150-c6e155d63d7e9686c2cf15e07f48e0af-16k.mp3',
							filesize: '7420702',
							duration: 3710.4,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Michael Hasel',
						},
					],
					sequence: {
						title: 'How to Interpret Scripture',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21154',
					title: 'How to be a Match-Maker',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Do you feel the need to become equipped as parents to be able to disciple your children? Join Ben and Brianna as they explore the different facets and challenges of Christian parenting. You’ll leave with actionable next-steps for your family discipleship plan.</p>',
					publishDate: '2020-02-03T06:45:43.000Z',
					audioFiles: [
						{
							id: '73208',
							url: 'https://www.audioverse.org/english/download/dl/73208/2020/01/21154/20200102-0930-21154-3e15e18bdced653e23cf98726e2470e6-64k.mp3',
							filesize: '20485762',
							duration: 2560.7,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73240',
							url: 'https://www.audioverse.org/english/download/dl/73240/2020/01/21154/20200102-0930-21154-3e15e18bdced653e23cf98726e2470e6-48k.mp3',
							filesize: '15391883',
							duration: 2565.3,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73241',
							url: 'https://www.audioverse.org/english/download/dl/73241/2020/01/21154/20200102-0930-21154-3e15e18bdced653e23cf98726e2470e6-16k.mp3',
							filesize: '5203763',
							duration: 2601.9,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Ben Martin',
						},
						{
							name: 'Brianna Martin',
						},
					],
					sequence: {
						title: "Discipleship: A Parent's Guide",
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21158',
					title: 'How to be Human Again',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>It goes without saying - media use is out of control and may be the single biggest stumbling block in spiritual, social and family life today. Which begs the question: what does the latest research say about the stranglehold of ‘big tech’ upon our lives and how to break free? What are the essential biblical principles for establishing a balanced use of technological tools? And how can we truly restore spirituality and relationships in the digital age?</p>',
					publishDate: '2020-02-10T03:45:31.000Z',
					audioFiles: [
						{
							id: '73271',
							url: 'https://www.audioverse.org/english/download/dl/73271/2020/01/21158/20200102-0930-21158-f4ba434b994c20e322c5c99678ce918f-64k.mp3',
							filesize: '30004158',
							duration: 3750.5,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73348',
							url: 'https://www.audioverse.org/english/download/dl/73348/2020/01/21158/20200102-0930-21158-f4ba434b994c20e322c5c99678ce918f-48k.mp3',
							filesize: '22549175',
							duration: 3758.2,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73349',
							url: 'https://www.audioverse.org/english/download/dl/73349/2020/01/21158/20200102-0930-21158-f4ba434b994c20e322c5c99678ce918f-16k.mp3',
							filesize: '7638848',
							duration: 3819.4,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Scott Ritsema',
						},
					],
					sequence: {
						title:
							'The Media Mind: Reclaiming the Human Soul in the Digital Dark Age',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21162',
					title: 'Mission of the Word',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Explore ways that you, as young people, can really impact your local church, engage the community where you live, and work for God right where you are.</p>',
					publishDate: '2020-02-03T06:49:52.000Z',
					audioFiles: [
						{
							id: '73266',
							url: 'https://www.audioverse.org/english/download/dl/73266/2020/01/21162/20200102-0930-21162-14212dcf7c930ebe1420954b65ed0590-64k.mp3',
							filesize: '29224958',
							duration: 3653.1,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73340',
							url: 'https://www.audioverse.org/english/download/dl/73340/2020/01/21162/20200102-0930-21162-14212dcf7c930ebe1420954b65ed0590-48k.mp3',
							filesize: '21973416',
							duration: 3662.2,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73341',
							url: 'https://www.audioverse.org/english/download/dl/73341/2020/01/21162/20200102-0930-21162-14212dcf7c930ebe1420954b65ed0590-16k.mp3',
							filesize: '7469972',
							duration: 3735,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'David Wright',
						},
					],
					sequence: {
						title: 'Ignite Your Local Church for Mission',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21166',
					title: 'Stop Playing Games',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Ever had questions about the whole ‘finding love’ thing? Like why is it so hard to find that someone? Am I doing something wrong? Will my heart ever heal from the pain I&rsquo;ve experienced along the way? More than just finding that special someone, how do I love them right when I do find them? What is marriage really like anyway? How do I prepare for it and how do I survive its challenges? Clive and Charlene Coutet desire to share their hearts with you and give real, honest and practical answers to many of these questions.</p>',
					publishDate: '2020-02-10T03:46:18.000Z',
					audioFiles: [
						{
							id: '73262',
							url: 'https://www.audioverse.org/english/download/dl/73262/2020/01/21166/20200102-0930-21166-eb783b4da145c05fe07cbc7d9e0ce64d-64k.mp3',
							filesize: '28409178',
							duration: 3551.2,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73332',
							url: 'https://www.audioverse.org/english/download/dl/73332/2020/01/21166/20200102-0930-21166-eb783b4da145c05fe07cbc7d9e0ce64d-48k.mp3',
							filesize: '21355436',
							duration: 3559.2,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73333',
							url: 'https://www.audioverse.org/english/download/dl/73333/2020/01/21166/20200102-0930-21166-eb783b4da145c05fe07cbc7d9e0ce64d-16k.mp3',
							filesize: '7247590',
							duration: 3623.8,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Clive Coutet',
						},
						{
							name: 'Charlene Coutet',
						},
					],
					sequence: {
						title: 'True Love: Mission or Myth?',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21174',
					title: 'The Roots of Postmodern Logic',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>While there are growing churches in both urban and country settings, churchgoers and students today are actually less likely to keep a Christian worldview than in the past. In fact, the greater part of our contemporary society today does not even believe in absolute truth. A modern-day disciple of Christ out of touch with this culture is like an uninformed missionary trying to teach in a foreign country. To share God&rsquo;s Word effectively in the twenty-first century, soul-winners need to know how to connect with and confront a society of postmodern thinkers. In this seminar, Pastor Christian Martin shows how we can reach the present age with the everlasting gospel.</p>',
					publishDate: '2020-02-10T03:45:57.000Z',
					audioFiles: [
						{
							id: '73250',
							url: 'https://www.audioverse.org/english/download/dl/73250/2020/01/21174/20200102-0930-21174-6d9d780caf4887743a92b740dab7bc4a-64k.mp3',
							filesize: '30287961',
							duration: 3786,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73316',
							url: 'https://www.audioverse.org/english/download/dl/73316/2020/01/21174/20200102-0930-21174-6d9d780caf4887743a92b740dab7bc4a-48k.mp3',
							filesize: '22775404',
							duration: 3795.9,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73317',
							url: 'https://www.audioverse.org/english/download/dl/73317/2020/01/21174/20200102-0930-21174-6d9d780caf4887743a92b740dab7bc4a-16k.mp3',
							filesize: '7749929',
							duration: 3875,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Christian Martin',
						},
					],
					sequence: {
						title: 'Winning Postmodern Souls to Christ',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21178',
					title: 'When I don’t Feel Like It',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Sam Walters will be unpacking what it means to live life evangelistically. Many times, people live lives that are segregated into different sectors, where their spirituality does not necessarily permeate the rest of their lives. Discover how your relationship with God can become visible, audible and tangible to those around you, whether at your workplace, university, with family or whatever setting you find yourself in.</p>',
					publishDate: '2020-02-03T06:46:29.000Z',
					audioFiles: [
						{
							id: '73246',
							url: 'https://www.audioverse.org/english/download/dl/73246/2020/01/21178/20200102-0930-21178-23dd2e28a3ee128f6128688a038b1190-64k.mp3',
							filesize: '30367542',
							duration: 3795.9,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73308',
							url: 'https://www.audioverse.org/english/download/dl/73308/2020/01/21178/20200102-0930-21178-23dd2e28a3ee128f6128688a038b1190-48k.mp3',
							filesize: '22803210',
							duration: 3800.5,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73309',
							url: 'https://www.audioverse.org/english/download/dl/73309/2020/01/21178/20200102-0930-21178-23dd2e28a3ee128f6128688a038b1190-16k.mp3',
							filesize: '7674185',
							duration: 3837.1,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Sam Walters',
						},
					],
					sequence: {
						title: 'The Evangelistic Perspecitive',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21192',
					title: 'Original Leadership',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Many feel overwhelmed by the thought of taking on a leadership position, often because of preconceived ideas of the type of skills required to fulfill the role. Yet, through studying scripture and seeking out illustrations in everyday life, you will find out that anyone can be a leader because the best leaders are those that lead from who they are--their character. Come for inspiration on how to embrace being the type of leader God has created you to be in the spheres of influence he has placed you.</p>',
					publishDate: '2020-02-10T03:47:26.000Z',
					audioFiles: [
						{
							id: '73170',
							url: 'https://www.audioverse.org/english/download/dl/73170/2020/01/21192/20200102-0930-21192-54815ba681134f3d467e13c8a4ca6921-64k.mp3',
							filesize: '30006375',
							duration: 3750.8,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73216',
							url: 'https://www.audioverse.org/english/download/dl/73216/2020/01/21192/20200102-0930-21192-54815ba681134f3d467e13c8a4ca6921-48k.mp3',
							filesize: '22532323',
							duration: 3755.4,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73217',
							url: 'https://www.audioverse.org/english/download/dl/73217/2020/01/21192/20200102-0930-21192-54815ba681134f3d467e13c8a4ca6921-16k.mp3',
							filesize: '7583856',
							duration: 3791.9,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Amy Ratsara',
						},
					],
					sequence: {
						title: 'Breakouts',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21193',
					title: 'Walking Dead',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Have you ever visited a church, school, restaurant, or store that was dead? They didn’t know they were dead, but you knew. How did you know? What influenced your thinking? In this seminar, we will be discussing what causes this death and how God can use you to bring it back to life again. Caution, this presentation will probably offend you or it might convict you. Either way, you will hear straight talk on this issue utilizing group discussions, stories, and principles learned over 20 years in ministry.</p>',
					publishDate: '2020-02-10T03:47:30.000Z',
					audioFiles: [
						{
							id: '73169',
							url: 'https://www.audioverse.org/english/download/dl/73169/2020/01/21193/20200102-0930-21193-3bf99d9b7476fa9f8d74ccb7322229ca-64k.mp3',
							filesize: '26679484',
							duration: 3334.9,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73214',
							url: 'https://www.audioverse.org/english/download/dl/73214/2020/01/21193/20200102-0930-21193-3bf99d9b7476fa9f8d74ccb7322229ca-48k.mp3',
							filesize: '20038163',
							duration: 3339.7,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73215',
							url: 'https://www.audioverse.org/english/download/dl/73215/2020/01/21193/20200102-0930-21193-3bf99d9b7476fa9f8d74ccb7322229ca-16k.mp3',
							filesize: '6755160',
							duration: 3377.6,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Chad Bernard',
						},
					],
					sequence: {
						title: 'Breakouts',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21179',
					title: 'Drifting vs Driven',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Sam Walters will be unpacking what it means to live life evangelistically. Many times people live lives that are segregated into different sectors, where their spirituality does not necessarily permeate the rest of their lives. Discover how your relationship with God can become visible, audible and tangible to those around you, whether at your workplace, university, with family or whatever setting you find yourself in.</p>',
					publishDate: '2020-02-03T06:46:33.000Z',
					audioFiles: [
						{
							id: '73244',
							url: 'https://www.audioverse.org/english/download/dl/73244/2020/01/21179/20200102-0945-21179-3f59c58223f501e0d48cab4980149f6d-64k.mp3',
							filesize: '28144612',
							duration: 3518.1,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73306',
							url: 'https://www.audioverse.org/english/download/dl/73306/2020/01/21179/20200102-0945-21179-3f59c58223f501e0d48cab4980149f6d-48k.mp3',
							filesize: '21136009',
							duration: 3522.7,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73307',
							url: 'https://www.audioverse.org/english/download/dl/73307/2020/01/21179/20200102-0945-21179-3f59c58223f501e0d48cab4980149f6d-16k.mp3',
							filesize: '7118442',
							duration: 3559.2,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Sam Walters',
						},
					],
					sequence: {
						title: 'The Evangelistic Perspecitive',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21171',
					title: 'The Death of Sabbath School',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Discover the purpose of Sabbath School, why it may be weak in some churches, and learn some principles to bring it back to its original goal.</p>',
					publishDate: '2020-02-03T06:48:19.000Z',
					audioFiles: [
						{
							id: '73255',
							url: 'https://www.audioverse.org/english/download/dl/73255/2020/01/21171/20200102-1000-21171-2ef1d72d1ca0a04c52b8bffe7cc75074-64k.mp3',
							filesize: '30153414',
							duration: 3769.2,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73322',
							url: 'https://www.audioverse.org/english/download/dl/73322/2020/01/21171/20200102-1000-21171-2ef1d72d1ca0a04c52b8bffe7cc75074-48k.mp3',
							filesize: '22851718',
							duration: 3808.6,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73323',
							url: 'https://www.audioverse.org/english/download/dl/73323/2020/01/21171/20200102-1000-21171-2ef1d72d1ca0a04c52b8bffe7cc75074-16k.mp3',
							filesize: '8247963',
							duration: 4124,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Sikhu Daco',
						},
						{
							name: 'Justin Kim',
						},
						{
							name: 'Israel Ramos',
						},
						{
							name: 'Jonathan Walter',
						},
					],
					sequence: {
						title: 'The Life, Death, and Resurrection of Sabbath School',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21139',
					title: 'Romance and Courtship: Who has a Better Love Story?',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Tackle the big ideas of God, sex, relationships, the gospel and how to do life well! Grasp inspirational and relevant lessons from the incredible story of Abraham. These practical presentations will combine the most up-to-date Biblical and apologetic research o many hot topics in the world and church today.</p>',
					publishDate: '2020-02-10T03:46:52.000Z',
					audioFiles: [
						{
							id: '73189',
							url: 'https://www.audioverse.org/english/download/dl/73189/2020/01/21139/20200102-1045-21139-733f06264035bb0efd7128a8f3bcfc15-64k.mp3',
							filesize: '26028346',
							duration: 3253.5,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73296',
							url: 'https://www.audioverse.org/english/download/dl/73296/2020/01/21139/20200102-1045-21139-733f06264035bb0efd7128a8f3bcfc15-48k.mp3',
							filesize: '19550081',
							duration: 3258.4,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73297',
							url: 'https://www.audioverse.org/english/download/dl/73297/2020/01/21139/20200102-1045-21139-733f06264035bb0efd7128a8f3bcfc15-16k.mp3',
							filesize: '6593190',
							duration: 3296.6,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Anil Kanda',
						},
					],
					sequence: {
						title: 'Abraham, Apologetics, and the Big Ideas of Scripture',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21143',
					title: 'Is your Idea Feasible?',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Join Sebastien and Jesse on an in-depth, hands-on, and practical dive into Christian entrepreneurship. Explore why business is important to God, if you are entrepreneurial material, how to get started with no money and how to share the gospel through your business.</p>',
					publishDate: '2020-02-03T06:48:51.000Z',
					audioFiles: [
						{
							id: '73194',
							url: 'https://www.audioverse.org/english/download/dl/73194/2020/01/21143/20200102-1045-21143-6485fb496f6d40c3bf02bfd3cc485e0e-64k.mp3',
							filesize: '31869579',
							duration: 3983.7,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73288',
							url: 'https://www.audioverse.org/english/download/dl/73288/2020/01/21143/20200102-1045-21143-6485fb496f6d40c3bf02bfd3cc485e0e-48k.mp3',
							filesize: '23947422',
							duration: 3991.2,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73289',
							url: 'https://www.audioverse.org/english/download/dl/73289/2020/01/21143/20200102-1045-21143-6485fb496f6d40c3bf02bfd3cc485e0e-16k.mp3',
							filesize: '8102747',
							duration: 4051.4,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Sebastien Braxton',
						},
						{
							name: 'Jesse Zwiker',
						},
					],
					sequence: {
						title: 'God Means Business',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21147',
					title: 'Be Done With Doubt!',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Learn how to take a sledge hammer to Satan’s kingdom and build up the walls of Zion! Faith, rightly understood, will change your life from boring to amazing, from feebleness to power, and from failure to triumph! Paul Ratsara, who faced the guns of kidnappers and the crocodiles of the Congo, with nothing but faith, will join Jay Gallimore in this powerful life-changing seminar. They want young Christians to have great influence, to go up against Babylon and rescue multitudes of Satan’s victims. If put this seminar into practice, it will change your life and the world around you!</p>',
					publishDate: '2020-02-03T06:50:15.000Z',
					audioFiles: [
						{
							id: '73199',
							url: 'https://www.audioverse.org/english/download/dl/73199/2020/01/21147/20200102-1045-21147-85e335df824b8300a06655bc5dcfd856-64k.mp3',
							filesize: '28797532',
							duration: 3599.7,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73280',
							url: 'https://www.audioverse.org/english/download/dl/73280/2020/01/21147/20200102-1045-21147-85e335df824b8300a06655bc5dcfd856-48k.mp3',
							filesize: '21636479',
							duration: 3606.1,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73281',
							url: 'https://www.audioverse.org/english/download/dl/73281/2020/01/21147/20200102-1045-21147-85e335df824b8300a06655bc5dcfd856-16k.mp3',
							filesize: '7314011',
							duration: 3657,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Jay Gallimore',
						},
					],
					sequence: {
						title: 'Rebuke Winds and Move Mountains!',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21155',
					title: 'How to be a Super Model',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Do you feel the need to become equipped as parents to be able to disciple your children? Join Ben and Brianna as they explore the different facets and challenges of Christian parenting. You’ll leave with actionable next-steps for your family discipleship plan.</p>',
					publishDate: '2020-02-03T06:45:49.000Z',
					audioFiles: [
						{
							id: '73209',
							url: 'https://www.audioverse.org/english/download/dl/73209/2020/01/21155/20200102-1045-21155-31b80652e368daff51d59d11da3f727c-64k.mp3',
							filesize: '28064825',
							duration: 3508.1,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73238',
							url: 'https://www.audioverse.org/english/download/dl/73238/2020/01/21155/20200102-1045-21155-31b80652e368daff51d59d11da3f727c-48k.mp3',
							filesize: '21076180',
							duration: 3512.7,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73239',
							url: 'https://www.audioverse.org/english/download/dl/73239/2020/01/21155/20200102-1045-21155-31b80652e368daff51d59d11da3f727c-16k.mp3',
							filesize: '7098529',
							duration: 3549.3,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Ben Martin',
						},
						{
							name: 'Brianna Martin',
						},
					],
					sequence: {
						title: "Discipleship: A Parent's Guide",
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21159',
					title: 'Antisocial Media and Digital Pharmakeia',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>It goes without saying - media use is out of control and may be the single biggest stumbling block in spiritual, social and family life today. Which begs the question: what does the latest research say about the stranglehold of ‘big tech’ upon our lives and how to break free? What are the essential biblical principles for establishing a balanced use of technological tools? And how can we truly restore spirituality and relationships in the digital age?</p>',
					publishDate: '2020-02-10T03:45:36.000Z',
					audioFiles: [
						{
							id: '73270',
							url: 'https://www.audioverse.org/english/download/dl/73270/2020/01/21159/20200102-1045-21159-4626f0c055d4d0f729b4b4571678b459-64k.mp3',
							filesize: '28728374',
							duration: 3591.1,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73346',
							url: 'https://www.audioverse.org/english/download/dl/73346/2020/01/21159/20200102-1045-21159-4626f0c055d4d0f729b4b4571678b459-48k.mp3',
							filesize: '21592346',
							duration: 3598.7,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73347',
							url: 'https://www.audioverse.org/english/download/dl/73347/2020/01/21159/20200102-1045-21159-4626f0c055d4d0f729b4b4571678b459-16k.mp3',
							filesize: '7319929',
							duration: 3660,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Scott Ritsema',
						},
					],
					sequence: {
						title:
							'The Media Mind: Reclaiming the Human Soul in the Digital Dark Age',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21163',
					title: 'Mission of Attendance and Involvement',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Explore ways that you, as young people, can really impact your local church, engage the community where you live, and work for God right where you are.</p>',
					publishDate: '2020-02-03T06:49:57.000Z',
					audioFiles: [
						{
							id: '73264',
							url: 'https://www.audioverse.org/english/download/dl/73264/2020/01/21163/20200102-1045-21163-645cb83b6ce257965c1b85845f6681f6-64k.mp3',
							filesize: '31025353',
							duration: 3878.2,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73338',
							url: 'https://www.audioverse.org/english/download/dl/73338/2020/01/21163/20200102-1045-21163-645cb83b6ce257965c1b85845f6681f6-48k.mp3',
							filesize: '23323722',
							duration: 3887.3,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73339',
							url: 'https://www.audioverse.org/english/download/dl/73339/2020/01/21163/20200102-1045-21163-645cb83b6ce257965c1b85845f6681f6-16k.mp3',
							filesize: '7920098',
							duration: 3960.1,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'David Wright',
						},
					],
					sequence: {
						title: 'Ignite Your Local Church for Mission',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21167',
					title: 'The Gateway',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Ever had questions about the whole ‘finding love’ thing? Like why is it so hard to find that someone? Am I doing something wrong? Will my heart ever heal from the pain I&rsquo;ve experienced along the way? More than just finding that special someone, how do I love them right when I do find them? What is marriage really like anyway? How do I prepare for it and how do I survive its challenges? Clive and Charlene Coutet desire to share their hearts with you and give real, honest and practical answers to many of these questions.</p>',
					publishDate: '2020-02-10T03:46:23.000Z',
					audioFiles: [
						{
							id: '73260',
							url: 'https://www.audioverse.org/english/download/dl/73260/2020/01/21167/20200102-1045-21167-da67466428eceeff91341833c0e4e375-64k.mp3',
							filesize: '29009562',
							duration: 3626.2,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73330',
							url: 'https://www.audioverse.org/english/download/dl/73330/2020/01/21167/20200102-1045-21167-da67466428eceeff91341833c0e4e375-48k.mp3',
							filesize: '21805721',
							duration: 3634.3,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73331',
							url: 'https://www.audioverse.org/english/download/dl/73331/2020/01/21167/20200102-1045-21167-da67466428eceeff91341833c0e4e375-16k.mp3',
							filesize: '7397675',
							duration: 3698.8,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Charlene Coutet',
						},
						{
							name: 'Clive Coutet',
						},
					],
					sequence: {
						title: 'True Love: Mission or Myth?',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21175',
					title: 'The Postmodern way of Thinking and Modus Operandi',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>While there are growing churches in both urban and country settings, church-goers and students today are actually less likely to keep a Christian worldview than in the past. In fact, the greater part of our contemporary society today does not even believe in absolute truth. A modern-day disciple of Christ out of touch with this culture is like an uninformed missionary trying to teach in a foreign country. To share God&rsquo;s Word effectively in the twenty-first century, soul-winners need to know how to connect with and confront a society of postmodern thinkers. In this seminar, Pastor Christian Martin shows how we can reach the present age with the everlasting gospel.</p>',
					publishDate: '2020-02-10T03:46:03.000Z',
					audioFiles: [
						{
							id: '73249',
							url: 'https://www.audioverse.org/english/download/dl/73249/2020/01/21175/20200102-1045-21175-dfc2f1cbba3120028dec101bf34d3d59-64k.mp3',
							filesize: '26032551',
							duration: 3254.1,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73314',
							url: 'https://www.audioverse.org/english/download/dl/73314/2020/01/21175/20200102-1045-21175-dfc2f1cbba3120028dec101bf34d3d59-48k.mp3',
							filesize: '19583857',
							duration: 3264,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73315',
							url: 'https://www.audioverse.org/english/download/dl/73315/2020/01/21175/20200102-1045-21175-dfc2f1cbba3120028dec101bf34d3d59-16k.mp3',
							filesize: '6686108',
							duration: 3343.1,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Christian Martin',
						},
					],
					sequence: {
						title: 'Winning Postmodern Souls to Christ',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21194',
					title: 'So... Should I take Time off for God?',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Okay, what&rsquo;s this missions thing REALLY about? I don&rsquo;t have time to postpone my life! What would I actually be doing? Is it worth it?</p>\r\n<p>&nbsp;</p>\r\n<p>Maybe these are all thoughts or questions you&rsquo;ve had about taking time off for God. Whether just interested, or you&rsquo;re seriously considering a decision along these lines, find answers as Andrew breaks down his one year in mission experience in Hong Kong. Hear about what actually happened, the lessons learned, and honest thoughts as you consider this potentially life-changing decision.</p>',
					publishDate: '2020-02-10T03:47:35.000Z',
					audioFiles: [
						{
							id: '73168',
							url: 'https://www.audioverse.org/english/download/dl/73168/2020/01/21194/20200102-1045-21194-465c5060c59b7efbd6fd72bd03f77893-64k.mp3',
							filesize: '24544938',
							duration: 3068.1,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73212',
							url: 'https://www.audioverse.org/english/download/dl/73212/2020/01/21194/20200102-1045-21194-465c5060c59b7efbd6fd72bd03f77893-48k.mp3',
							filesize: '18436254',
							duration: 3072.7,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73213',
							url: 'https://www.audioverse.org/english/download/dl/73213/2020/01/21194/20200102-1045-21194-465c5060c59b7efbd6fd72bd03f77893-16k.mp3',
							filesize: '6218524',
							duration: 3109.3,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Andrew Park',
						},
					],
					sequence: {
						title: 'Breakouts',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21195',
					title: 'Our Greatest Need: Testimony',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Ryan and Kristyn share their testimony of how God reached them.</p>',
					publishDate: '2020-02-03T06:47:13.000Z',
					audioFiles: [
						{
							id: '73167',
							url: 'https://www.audioverse.org/english/download/dl/73167/2020/01/21195/20200102-1045-21195-664e3941f5c4ab8f55a22258665f6f45-64k.mp3',
							filesize: '31109923',
							duration: 3888.7,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73210',
							url: 'https://www.audioverse.org/english/download/dl/73210/2020/01/21195/20200102-1045-21195-664e3941f5c4ab8f55a22258665f6f45-48k.mp3',
							filesize: '23385931',
							duration: 3897.7,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73211',
							url: 'https://www.audioverse.org/english/download/dl/73211/2020/01/21195/20200102-1045-21195-664e3941f5c4ab8f55a22258665f6f45-16k.mp3',
							filesize: '7937586',
							duration: 3968.8,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Kristyn Dolinsky',
						},
						{
							name: 'Ryan Dolinsky',
						},
					],
					sequence: {
						title: 'Breakouts',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21196',
					title: 'Why I Don’t get the Gospel',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>It’s easy to assume that the message of Christ Our Righteousness is just a theological concept. But it’s actually a beautiful truth that is meant to transform every area of our lives. Spiritually, physically, and psychologically. This breakout session will show what God intended this most precious message to do in our daily life.</p>',
					publishDate: '2020-02-03T06:47:19.000Z',
					audioFiles: [
						{
							id: '73166',
							url: 'https://www.audioverse.org/english/download/dl/73166/2020/01/21196/20200102-1045-21196-99590e83893c08bd7ddd6856e8cb098d-64k.mp3',
							filesize: '29905917',
							duration: 3738.2,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73202',
							url: 'https://www.audioverse.org/english/download/dl/73202/2020/01/21196/20200102-1045-21196-99590e83893c08bd7ddd6856e8cb098d-48k.mp3',
							filesize: '22478467',
							duration: 3746.4,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73206',
							url: 'https://www.audioverse.org/english/download/dl/73206/2020/01/21196/20200102-1045-21196-99590e83893c08bd7ddd6856e8cb098d-16k.mp3',
							filesize: '7623206',
							duration: 3811.6,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Dee Casper',
						},
					],
					sequence: {
						title: 'Breakouts',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21140',
					title: 'Sodom and Sexuality: God Created Sex!',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Tackle the big ideas of God, sex, relationships, the gospel and how to do life well! Grasp inspirational and relevant lessons from the incredible story of Abraham. These practical presentations will combine the most up-to-date Biblical and apologetic research o many hot topics in the world and church today.</p>',
					publishDate: '2020-02-10T03:46:57.000Z',
					audioFiles: [
						{
							id: '73190',
							url: 'https://www.audioverse.org/english/download/dl/73190/2020/01/21140/20200102-1200-21140-3659cea39f42ccbf045e73e4fa65411d-64k.mp3',
							filesize: '28717885',
							duration: 3589.7,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73294',
							url: 'https://www.audioverse.org/english/download/dl/73294/2020/01/21140/20200102-1200-21140-3659cea39f42ccbf045e73e4fa65411d-48k.mp3',
							filesize: '21567229',
							duration: 3594.5,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73295',
							url: 'https://www.audioverse.org/english/download/dl/73295/2020/01/21140/20200102-1200-21140-3659cea39f42ccbf045e73e4fa65411d-16k.mp3',
							filesize: '7265554',
							duration: 3632.8,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Anil Kanda',
						},
					],
					sequence: {
						title: 'Abraham, Apologetics, and the Big Ideas of Scripture',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21144',
					title: 'What is a Business Model and How do I Create One?',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Join Sebastien and Jesse on an in-depth, hands-on, and practical dive into Christian entrepreneurship. Explore why business is important to God, if you are entrepreneurial material, how to get started with no money and how to share the gospel through your business.</p>',
					publishDate: '2020-02-03T06:48:56.000Z',
					audioFiles: [
						{
							id: '73196',
							url: 'https://www.audioverse.org/english/download/dl/73196/2020/01/21144/20200102-1200-21144-ab328fc8238dd97413224e6452e0ee78-64k.mp3',
							filesize: '20901966',
							duration: 2612.8,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73286',
							url: 'https://www.audioverse.org/english/download/dl/73286/2020/01/21144/20200102-1200-21144-ab328fc8238dd97413224e6452e0ee78-48k.mp3',
							filesize: '15721726',
							duration: 2620.3,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73287',
							url: 'https://www.audioverse.org/english/download/dl/73287/2020/01/21144/20200102-1200-21144-ab328fc8238dd97413224e6452e0ee78-16k.mp3',
							filesize: '5360884',
							duration: 2680.4,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Sebastien Braxton',
						},
						{
							name: 'Jesse Zwiker',
						},
					],
					sequence: {
						title: 'God Means Business',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21148',
					title: 'Moving Mountains!',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Learn how to take a sledge hammer to Satan’s kingdom and build up the walls of Zion! Faith, rightly understood, will change your life from boring to amazing, from feebleness to power, and from failure to triumph! Paul Ratsara, who faced the guns of kidnappers and the crocodiles of the Congo, with nothing but faith, will join Jay Gallimore in this powerful life-changing seminar. They want young Christians to have great influence, to go up against Babylon and rescue multitudes of Satan’s victims. If put this seminar into practice, it will change your life and the world around you!</p>',
					publishDate: '2020-02-03T06:50:20.000Z',
					audioFiles: [
						{
							id: '73200',
							url: 'https://www.audioverse.org/english/download/dl/73200/2020/01/21148/20200102-1200-21148-0f3a73c6e74a9e39db10de999b3a318a-64k.mp3',
							filesize: '22460640',
							duration: 2807.6,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73278',
							url: 'https://www.audioverse.org/english/download/dl/73278/2020/01/21148/20200102-1200-21148-0f3a73c6e74a9e39db10de999b3a318a-48k.mp3',
							filesize: '16883809',
							duration: 2814,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73279',
							url: 'https://www.audioverse.org/english/download/dl/73279/2020/01/21148/20200102-1200-21148-0f3a73c6e74a9e39db10de999b3a318a-16k.mp3',
							filesize: '5729785',
							duration: 2864.9,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Jay Gallimore',
						},
					],
					sequence: {
						title: 'Rebuke Winds and Move Mountains!',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21156',
					title: 'How to Tell the Story',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Do you feel the need to become equipped as parents to be able to disciple your children? Join Ben and Brianna as they explore the different facets and challenges of Christian parenting. You’ll leave with actionable next-steps for your family discipleship plan.</p>',
					publishDate: '2020-02-03T06:45:53.000Z',
					audioFiles: [
						{
							id: '73273',
							url: 'https://www.audioverse.org/english/download/dl/73273/2020/01/21156/20200102-1200-21156-b6015e1fd7be11f33a7bbc4df4dea060-64k.mp3',
							filesize: '24063489',
							duration: 3007.9,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73352',
							url: 'https://www.audioverse.org/english/download/dl/73352/2020/01/21156/20200102-1200-21156-b6015e1fd7be11f33a7bbc4df4dea060-48k.mp3',
							filesize: '18075177',
							duration: 3012.5,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73353',
							url: 'https://www.audioverse.org/english/download/dl/73353/2020/01/21156/20200102-1200-21156-b6015e1fd7be11f33a7bbc4df4dea060-16k.mp3',
							filesize: '6098192',
							duration: 3049.1,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Ben Martin',
						},
						{
							name: 'Brianna Martin',
						},
					],
					sequence: {
						title: "Discipleship: A Parent's Guide",
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21160',
					title: 'People of the Book in the Age of the App',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>It goes without saying - media use is out of control and may be the single biggest stumbling block in spiritual, social and family life today. Which begs the question: what does the latest research say about the stranglehold of ‘big tech’ upon our lives and how to break free? What are the essential biblical principles for establishing a balanced use of technological tools? And how can we truly restore spirituality and relationships in the digital age?</p>',
					publishDate: '2020-02-10T03:45:41.000Z',
					audioFiles: [
						{
							id: '73269',
							url: 'https://www.audioverse.org/english/download/dl/73269/2020/01/21160/20200102-1200-21160-0a5b38515dbff9d3d684e75b1e93dc7a-64k.mp3',
							filesize: '30291961',
							duration: 3786.5,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73344',
							url: 'https://www.audioverse.org/english/download/dl/73344/2020/01/21160/20200102-1200-21160-0a5b38515dbff9d3d684e75b1e93dc7a-48k.mp3',
							filesize: '22765037',
							duration: 3794.2,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73345',
							url: 'https://www.audioverse.org/english/download/dl/73345/2020/01/21160/20200102-1200-21160-0a5b38515dbff9d3d684e75b1e93dc7a-16k.mp3',
							filesize: '7710827',
							duration: 3855.4,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Scott Ritsema',
						},
					],
					sequence: {
						title:
							'The Media Mind: Reclaiming the Human Soul in the Digital Dark Age',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21164',
					title: 'Mission to the Community',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Explore ways that you, as young people, can really impact your local church, engage the community where you live, and work for God right where you are.</p>',
					publishDate: '2020-02-03T06:50:02.000Z',
					audioFiles: [
						{
							id: '73263',
							url: 'https://www.audioverse.org/english/download/dl/73263/2020/01/21164/20200102-1200-21164-a7a0d4adf6844006eff12f8bc9580a43-64k.mp3',
							filesize: '22461134',
							duration: 2807.6,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73336',
							url: 'https://www.audioverse.org/english/download/dl/73336/2020/01/21164/20200102-1200-21164-a7a0d4adf6844006eff12f8bc9580a43-48k.mp3',
							filesize: '16900551',
							duration: 2816.8,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73337',
							url: 'https://www.audioverse.org/english/download/dl/73337/2020/01/21164/20200102-1200-21164-a7a0d4adf6844006eff12f8bc9580a43-16k.mp3',
							filesize: '5779024',
							duration: 2889.5,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'David Wright',
						},
					],
					sequence: {
						title: 'Ignite Your Local Church for Mission',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21168',
					title: 'The Heart of It',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Ever had questions about the whole ‘finding love’ thing? Like why is it so hard to find that someone? Am I doing something wrong? Will my heart ever heal from the pain I&rsquo;ve experienced along the way? More than just finding that special someone, how do I love them right when I do find them? What is marriage really like anyway? How do I prepare for it and how do I survive its challenges? Clive and Charlene Coutet desire to share their hearts with you and give real, honest and practical answers to many of these questions.</p>',
					publishDate: '2020-02-10T03:46:29.000Z',
					audioFiles: [
						{
							id: '73259',
							url: 'https://www.audioverse.org/english/download/dl/73259/2020/01/21168/20200102-1200-21168-40faeba83e06d3959fff8c87ced3fff2-64k.mp3',
							filesize: '25302481',
							duration: 3162.8,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73328',
							url: 'https://www.audioverse.org/english/download/dl/73328/2020/01/21168/20200102-1200-21168-40faeba83e06d3959fff8c87ced3fff2-48k.mp3',
							filesize: '19025412',
							duration: 3170.9,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73329',
							url: 'https://www.audioverse.org/english/download/dl/73329/2020/01/21168/20200102-1200-21168-40faeba83e06d3959fff8c87ced3fff2-16k.mp3',
							filesize: '6470911',
							duration: 3235.5,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Charlene Coutet',
						},
						{
							name: 'Clive Coutet',
						},
					],
					sequence: {
						title: 'True Love: Mission or Myth?',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21172',
					title: 'The Resurrection of the Sabbath School',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Discover the purpose of Sabbath School, why it may be weak in some churches, and learn some principles to bring it back to its original goal.</p>',
					publishDate: '2020-02-03T06:48:25.000Z',
					audioFiles: [
						{
							id: '73254',
							url: 'https://www.audioverse.org/english/download/dl/73254/2020/01/21172/20200102-1200-21172-9e23f0bca41306dc150dd3913ab025ad-64k.mp3',
							filesize: '29656901',
							duration: 3707.1,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73320',
							url: 'https://www.audioverse.org/english/download/dl/73320/2020/01/21172/20200102-1200-21172-9e23f0bca41306dc150dd3913ab025ad-48k.mp3',
							filesize: '22479338',
							duration: 3746.6,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73321',
							url: 'https://www.audioverse.org/english/download/dl/73321/2020/01/21172/20200102-1200-21172-9e23f0bca41306dc150dd3913ab025ad-16k.mp3',
							filesize: '8123851',
							duration: 4061.9,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Sikhu Daco',
						},
						{
							name: 'Justin Kim',
						},
						{
							name: 'Israel Ramos',
						},
						{
							name: 'Jonathan Walter',
						},
					],
					sequence: {
						title: 'The Life, Death, and Resurrection of Sabbath School',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21197',
					title: 'Infinite Movement',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>What is a successful youth ministry?</p>\r\n<p>How does it look like?</p>\r\n<p>Our youth are desiring something beyond what they can see. Come and see what is moving these young people in this generation.</p>',
					publishDate: '2020-02-03T06:47:24.000Z',
					audioFiles: [
						{
							id: '73164',
							url: 'https://www.audioverse.org/english/download/dl/73164/2020/01/21197/20200102-1200-21197-3045d21b00a0095e68943784bb4f8455-64k.mp3',
							filesize: '28832739',
							duration: 3604.1,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73192',
							url: 'https://www.audioverse.org/english/download/dl/73192/2020/01/21197/20200102-1200-21197-3045d21b00a0095e68943784bb4f8455-48k.mp3',
							filesize: '21652094',
							duration: 3608.7,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73195',
							url: 'https://www.audioverse.org/english/download/dl/73195/2020/01/21197/20200102-1200-21197-3045d21b00a0095e68943784bb4f8455-16k.mp3',
							filesize: '7290443',
							duration: 3645.2,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'David Paño',
						},
					],
					sequence: {
						title: 'Breakouts',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21199',
					title: 'When the Mission Field Comes to You',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Learn how to share with those that God has sent to your campus from overseas or just down the street. There are close to twenty million student currently enrolled at a college or campus. One percent of these students are from international countries. God is giving us an opportunity to reach one of the most ripe fields on the secular campuses. Come learn who these people are and how God can use you to impact them for eternity.</p>',
					publishDate: '2020-02-03T06:47:30.000Z',
					audioFiles: [
						{
							id: '73162',
							url: 'https://www.audioverse.org/english/download/dl/73162/2020/01/21199/20200102-1200-21199-a3e63160d245b730c16c0b40a54508bb-64k.mp3',
							filesize: '26630769',
							duration: 3328.9,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73186',
							url: 'https://www.audioverse.org/english/download/dl/73186/2020/01/21199/20200102-1200-21199-a3e63160d245b730c16c0b40a54508bb-48k.mp3',
							filesize: '20000629',
							duration: 3333.4,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73187',
							url: 'https://www.audioverse.org/english/download/dl/73187/2020/01/21199/20200102-1200-21199-a3e63160d245b730c16c0b40a54508bb-16k.mp3',
							filesize: '6739986',
							duration: 3370,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Alanna Rodriguez',
						},
					],
					sequence: {
						title: 'Breakouts',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21176',
					title: 'Provactive Challenges and Real Opportunities',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>While there are growing churches in both urban and country settings, church-goers and students today are actually less likely to keep a Christian worldview than in the past. In fact, the greater part of our contemporary society today does not even believe in absolute truth. A modern-day disciple of Christ out of touch with this culture is like an uninformed missionary trying to teach in a foreign country. To share God&rsquo;s Word effectively in the twenty-first century, soul-winners need to know how to connect with and confront a society of postmodern thinkers. In this seminar, Pastor Christian Martin shows how we can reach the present age with the everlasting gospel.</p>',
					publishDate: '2020-02-10T03:46:08.000Z',
					audioFiles: [
						{
							id: '73248',
							url: 'https://www.audioverse.org/english/download/dl/73248/2020/01/21176/20200102-1400-21176-77ffa393e735afe9323e7906abb9c47f-64k.mp3',
							filesize: '24484420',
							duration: 3060.6,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73312',
							url: 'https://www.audioverse.org/english/download/dl/73312/2020/01/21176/20200102-1400-21176-77ffa393e735afe9323e7906abb9c47f-48k.mp3',
							filesize: '18422757',
							duration: 3070.5,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73313',
							url: 'https://www.audioverse.org/english/download/dl/73313/2020/01/21176/20200102-1400-21176-77ffa393e735afe9323e7906abb9c47f-16k.mp3',
							filesize: '6299068',
							duration: 3149.5,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Christian Martin',
						},
					],
					sequence: {
						title: 'Winning Postmodern Souls to Christ',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21173',
					title: 'Questions and Answers',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Discover the purpose of Sabbath School, why it may be weak in some churches, and learn some principles to bring it back to its original goal.</p>',
					publishDate: '2020-02-03T06:48:34.000Z',
					audioFiles: [
						{
							id: '73253',
							url: 'https://www.audioverse.org/english/download/dl/73253/2020/01/21173/20200102-1415-21173-904e6525da8e65fb4e7e64c52f841188-64k.mp3',
							filesize: '30281925',
							duration: 3785.2,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73318',
							url: 'https://www.audioverse.org/english/download/dl/73318/2020/01/21173/20200102-1415-21173-904e6525da8e65fb4e7e64c52f841188-48k.mp3',
							filesize: '22948098',
							duration: 3824.7,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73319',
							url: 'https://www.audioverse.org/english/download/dl/73319/2020/01/21173/20200102-1415-21173-904e6525da8e65fb4e7e64c52f841188-16k.mp3',
							filesize: '8280082',
							duration: 4140,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Sikhu Daco',
						},
						{
							name: 'Justin Kim',
						},
						{
							name: 'Israel Ramos',
						},
						{
							name: 'Jonathan Walter',
						},
					],
					sequence: {
						title: 'The Life, Death, and Resurrection of Sabbath School',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21141',
					title: 'Build Your House: How to Die Like Abraham',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Tackle the big ideas of God, sex, relationships, the gospel and how to do life well! Grasp inspirational and relevant lessons from the incredible story of Abraham. These practical presentations will combine the most up-to-date Biblical and apologetic research o many hot topics in the world and church today.</p>',
					publishDate: '2020-02-10T03:47:01.000Z',
					audioFiles: [
						{
							id: '73191',
							url: 'https://www.audioverse.org/english/download/dl/73191/2020/01/21141/20200102-1430-21141-be7b1332e2e1c56e4c8802c29805523d-64k.mp3',
							filesize: '34186471',
							duration: 4273.3,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73292',
							url: 'https://www.audioverse.org/english/download/dl/73292/2020/01/21141/20200102-1430-21141-be7b1332e2e1c56e4c8802c29805523d-48k.mp3',
							filesize: '25668670',
							duration: 4278.1,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73293',
							url: 'https://www.audioverse.org/english/download/dl/73293/2020/01/21141/20200102-1430-21141-be7b1332e2e1c56e4c8802c29805523d-16k.mp3',
							filesize: '8632707',
							duration: 4316.4,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Anil Kanda',
						},
					],
					sequence: {
						title: 'Abraham, Apologetics, and the Big Ideas of Scripture',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21145',
					title: 'Branding: How to Share the Gospel Through my Business',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Join Sebastien and Jesse on an in-depth, hands-on, and practical dive into Christian entrepreneurship. Explore why business is important to God, if you are entrepreneurial material, how to get started with no money and how to share the gospel through your business.</p>',
					publishDate: '2020-02-03T06:49:00.000Z',
					audioFiles: [
						{
							id: '73197',
							url: 'https://www.audioverse.org/english/download/dl/73197/2020/01/21145/20200102-1430-21145-c2cd6693696a0e9b7251f2143a31389e-64k.mp3',
							filesize: '37136345',
							duration: 4642,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73284',
							url: 'https://www.audioverse.org/english/download/dl/73284/2020/01/21145/20200102-1430-21145-c2cd6693696a0e9b7251f2143a31389e-48k.mp3',
							filesize: '27897512',
							duration: 4649.6,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73285',
							url: 'https://www.audioverse.org/english/download/dl/73285/2020/01/21145/20200102-1430-21145-c2cd6693696a0e9b7251f2143a31389e-16k.mp3',
							filesize: '9419484',
							duration: 4709.7,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Sebastien Braxton',
						},
						{
							name: 'Jesse Zwiker',
						},
					],
					sequence: {
						title: 'God Means Business',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21149',
					title: 'Paying the Price!',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Learn how to take a sledge hammer to Satan’s kingdom and build up the walls of Zion! Faith, rightly understood, will change your life from boring to amazing, from feebleness to power, and from failure to triumph! Paul Ratsara, who faced the guns of kidnappers and the crocodiles of the Congo, with nothing but faith, will join Jay Gallimore in this powerful life-changing seminar. They want young Christians to have great influence, to go up against Babylon and rescue multitudes of Satan’s victims. If put this seminar into practice, it will change your life and the world around you!</p>',
					publishDate: '2020-02-03T06:50:23.000Z',
					audioFiles: [
						{
							id: '73201',
							url: 'https://www.audioverse.org/english/download/dl/73201/2020/01/21149/20200102-1430-21149-1609dab1fdbce1ddd1454fb275eda827-64k.mp3',
							filesize: '30698825',
							duration: 3837.4,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73274',
							url: 'https://www.audioverse.org/english/download/dl/73274/2020/01/21149/20200102-1430-21149-1609dab1fdbce1ddd1454fb275eda827-48k.mp3',
							filesize: '23062447',
							duration: 3843.7,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73275',
							url: 'https://www.audioverse.org/english/download/dl/73275/2020/01/21149/20200102-1430-21149-1609dab1fdbce1ddd1454fb275eda827-16k.mp3',
							filesize: '7789331',
							duration: 3894.7,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Jay Gallimore',
						},
					],
					sequence: {
						title: 'Rebuke Winds and Move Mountains!',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21153',
					title:
						'How to Interpret Scripture: How do we Approach the Bible with Serious Questions? Facing the Major (and Minor) Issues',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>How do we face the crucial questions that confront us in society and culture? How do we interpret the Bible in the face of significant challenges in science, history and prophecy? What about the bigger issues facing our church? This seminar seeks to answer these crucial questions by pointing us back to basic principles of biblical interpretation that will guide our understanding of the living Word of God with the assurance that it is more relevant today than it has ever been.</p>',
					publishDate: '2020-02-03T06:50:39.000Z',
					audioFiles: [
						{
							id: '73207',
							url: 'https://www.audioverse.org/english/download/dl/73207/2020/01/21153/20200102-1430-21153-2e21e123b1dbd1a0ebf438cedeeacd2a-64k.mp3',
							filesize: '37454971',
							duration: 4681.9,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73242',
							url: 'https://www.audioverse.org/english/download/dl/73242/2020/01/21153/20200102-1430-21153-2e21e123b1dbd1a0ebf438cedeeacd2a-48k.mp3',
							filesize: '28129411',
							duration: 4688.2,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73245',
							url: 'https://www.audioverse.org/english/download/dl/73245/2020/01/21153/20200102-1430-21153-2e21e123b1dbd1a0ebf438cedeeacd2a-16k.mp3',
							filesize: '9477931',
							duration: 4739,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Michael Hasel',
						},
					],
					sequence: {
						title: 'How to Interpret Scripture',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21157',
					title: 'How to Define Success',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Do you feel the need to become equipped as parents to be able to disciple your children? Join Ben and Brianna as they explore the different facets and challenges of Christian parenting. You’ll leave with actionable next-steps for your family discipleship plan.</p>',
					publishDate: '2020-02-03T06:45:58.000Z',
					audioFiles: [
						{
							id: '73272',
							url: 'https://www.audioverse.org/english/download/dl/73272/2020/01/21157/20200102-1430-21157-96921dd2f1596d99a2fb0bd20c2b9d90-64k.mp3',
							filesize: '28295326',
							duration: 3536.9,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73350',
							url: 'https://www.audioverse.org/english/download/dl/73350/2020/01/21157/20200102-1430-21157-96921dd2f1596d99a2fb0bd20c2b9d90-48k.mp3',
							filesize: '21249055',
							duration: 3541.5,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73351',
							url: 'https://www.audioverse.org/english/download/dl/73351/2020/01/21157/20200102-1430-21157-96921dd2f1596d99a2fb0bd20c2b9d90-16k.mp3',
							filesize: '7156151',
							duration: 3578.1,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Ben Martin',
						},
						{
							name: 'Brianna Martin',
						},
					],
					sequence: {
						title: "Discipleship: A Parent's Guide",
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21161',
					title: 'Media on the Brain, Revisited',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>It goes without saying - media use is out of control and may be the single biggest stumbling block in spiritual, social and family life today. Which begs the question: what does the latest research say about the stranglehold of ‘big tech’ upon our lives and how to break free? What are the essential biblical principles for establishing a balanced use of technological tools? And how can we truly restore spirituality and relationships in the digital age?</p>',
					publishDate: '2020-02-10T03:45:45.000Z',
					audioFiles: [
						{
							id: '73267',
							url: 'https://www.audioverse.org/english/download/dl/73267/2020/01/21161/20200102-1430-21161-b02dfbfaf78b61b4ab22b5f38b55abd9-64k.mp3',
							filesize: '29931660',
							duration: 3741.5,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73342',
							url: 'https://www.audioverse.org/english/download/dl/73342/2020/01/21161/20200102-1430-21161-b02dfbfaf78b61b4ab22b5f38b55abd9-48k.mp3',
							filesize: '22494806',
							duration: 3749.1,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73343',
							url: 'https://www.audioverse.org/english/download/dl/73343/2020/01/21161/20200102-1430-21161-b02dfbfaf78b61b4ab22b5f38b55abd9-16k.mp3',
							filesize: '7620737',
							duration: 3810.4,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Scott Ritsema',
						},
					],
					sequence: {
						title:
							'The Media Mind: Reclaiming the Human Soul in the Digital Dark Age',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21165',
					title: 'Q and A and Final Charge',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Explore ways that you, as young people, can really impact your local church, engage the community where you live, and work for God right where you are.</p>',
					publishDate: '2020-02-03T06:50:06.000Z',
					audioFiles: [
						{
							id: '73277',
							url: 'https://www.audioverse.org/english/download/dl/73277/2020/01/21165/20200102-1430-21165-627df16d82c8307e89c71efacfa6ee1b-64k.mp3',
							filesize: '28936785',
							duration: 3617.1,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73334',
							url: 'https://www.audioverse.org/english/download/dl/73334/2020/01/21165/20200102-1430-21165-627df16d82c8307e89c71efacfa6ee1b-48k.mp3',
							filesize: '21757289',
							duration: 3626.2,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73335',
							url: 'https://www.audioverse.org/english/download/dl/73335/2020/01/21165/20200102-1430-21165-627df16d82c8307e89c71efacfa6ee1b-16k.mp3',
							filesize: '7397936',
							duration: 3699,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'David Wright',
						},
					],
					sequence: {
						title: 'Ignite Your Local Church for Mission',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21169',
					title: 'Real Talk: The Morning After',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Ever had questions about the whole ‘finding love’ thing? Like why is it so hard to find that someone? Am I doing something wrong? Will my heart ever heal from the pain I&rsquo;ve experienced along the way? More than just finding that special someone, how do I love them right when I do find them? What is marriage really like anyway? How do I prepare for it and how do I survive its challenges? Clive and Charlene Coutet desire to share their hearts with you and give real, honest and practical answers to many of these questions.</p>',
					publishDate: '2020-02-10T03:46:34.000Z',
					audioFiles: [
						{
							id: '73257',
							url: 'https://www.audioverse.org/english/download/dl/73257/2020/01/21169/20200102-1430-21169-263dd572e11c7fcd0d716771dcd588d7-64k.mp3',
							filesize: '32518782',
							duration: 4064.9,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73326',
							url: 'https://www.audioverse.org/english/download/dl/73326/2020/01/21169/20200102-1430-21169-263dd572e11c7fcd0d716771dcd588d7-48k.mp3',
							filesize: '24437644',
							duration: 4072.9,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73327',
							url: 'https://www.audioverse.org/english/download/dl/73327/2020/01/21169/20200102-1430-21169-263dd572e11c7fcd0d716771dcd588d7-16k.mp3',
							filesize: '8275006',
							duration: 4137.5,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Charlene Coutet',
						},
						{
							name: 'Clive Coutet',
						},
					],
					sequence: {
						title: 'True Love: Mission or Myth?',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21181',
					title: 'Work Your Cycle in Your Circle',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Sam Walters will be unpacking what it means to live life evangelistically. Many times people live lives that are segregated into different sectors, where their spirituality does not necessarily permeate the rest of their lives. Discover how your relationship with God can become visible, audible and tangible to those around you, whether at your workplace, university, with family or whatever setting you find yourself in.</p>',
					publishDate: '2020-02-03T06:46:44.000Z',
					audioFiles: [
						{
							id: '73179',
							url: 'https://www.audioverse.org/english/download/dl/73179/2020/01/21181/20200102-1430-21181-17a7d5681866e5f8eb6390e5e8afb925-64k.mp3',
							filesize: '30143108',
							duration: 3767.9,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73236',
							url: 'https://www.audioverse.org/english/download/dl/73236/2020/01/21181/20200102-1430-21181-17a7d5681866e5f8eb6390e5e8afb925-48k.mp3',
							filesize: '22634887',
							duration: 3772.5,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73237',
							url: 'https://www.audioverse.org/english/download/dl/73237/2020/01/21181/20200102-1430-21181-17a7d5681866e5f8eb6390e5e8afb925-16k.mp3',
							filesize: '7618084',
							duration: 3809,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Sam Walters',
						},
					],
					sequence: {
						title: 'The Evangelistic Perspecitive',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21200',
					title: 'God’s Call to the Jungle',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Have you ever sensed God calling you? How do you know for sure? And how can you get up the nerve to take that leap of faith? Jason will tell how he and his family went from living a comfortable life as a pastor to wholeheartedly heading to work in the jungle of Papua New Guinea. God is calling you, too. Will you put yourself on the launch pad?</p>',
					publishDate: '2020-02-03T06:49:35.000Z',
					audioFiles: [
						{
							id: '73161',
							url: 'https://www.audioverse.org/english/download/dl/73161/2020/01/21200/20200102-1430-21200-43405716124ebe56572b2ce9ad4cfa80-64k.mp3',
							filesize: '29993436',
							duration: 3749.2,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73182',
							url: 'https://www.audioverse.org/english/download/dl/73182/2020/01/21200/20200102-1430-21200-43405716124ebe56572b2ce9ad4cfa80-48k.mp3',
							filesize: '22553448',
							duration: 3758.9,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73184',
							url: 'https://www.audioverse.org/english/download/dl/73184/2020/01/21200/20200102-1430-21200-43405716124ebe56572b2ce9ad4cfa80-16k.mp3',
							filesize: '7673108',
							duration: 3836.6,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Jason Sliger',
						},
					],
					sequence: {
						title: 'Breakouts',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21201',
					title:
						'How you can be an Effective Witness for Jesus in Post-Christian Culture',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>There are so many lost and lonely people, locked behind closed doors of darkness, depression and sin. These people have an urgent need for the abundant life that is only found in a vibrant relationship with Jesus Christ.</p>\r\n<p>The real question we want to answer is how? How do we do evangelism in a world where social scientists tell us we are now living an un-Christian and un-churched culture, a world where people do not see any relevance in Christianity or in attending church?</p>\r\n<p>Our objective in our breakout session is to show you how you can reach this world, where people definitely have a need for the life-giving message of the gospel, although they may not see their need. We are going to look at how you can bring people to Christ right where you are.</p>\r\n<p>Yes, whether you are a carpenter, a physician, a mechanic, hairdresser, chef, waitress or a student, God is calling you to reach lost and lonely people with the life-giving message of God&rsquo;s love.</p>',
					publishDate: '2020-02-03T06:47:34.000Z',
					audioFiles: [
						{
							id: '73160',
							url: 'https://www.audioverse.org/english/download/dl/73160/2020/01/21201/20200102-1430-21201-de71bde92e709c28cd34b77385bd22de-64k.mp3',
							filesize: '35048771',
							duration: 4381.1,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73180',
							url: 'https://www.audioverse.org/english/download/dl/73180/2020/01/21201/20200102-1430-21201-de71bde92e709c28cd34b77385bd22de-48k.mp3',
							filesize: '26314153',
							duration: 4385.7,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73181',
							url: 'https://www.audioverse.org/english/download/dl/73181/2020/01/21201/20200102-1430-21201-de71bde92e709c28cd34b77385bd22de-16k.mp3',
							filesize: '8844557',
							duration: 4422.3,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Michael Lemon',
						},
						{
							name: 'René Lemon',
						},
					],
					sequence: {
						title: 'Breakouts',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21202',
					title:
						'When Translation isn’t Enough: How to Communicate Present Truth Cross-Culturally',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Whether by many or by few, it is only God and His method that will result in end-time mission success. God has modeled what true missionary work looks like&mdash;He came and dwelled among us and used imperfect human speech so that human beings with dulled senses could comprehend His love and understand His plan to restore us to perfection. God&rsquo;s communication model is sinner-centered. We will demonstrate how this type of communication can be applied in cross-cultural settings with anecdotes and stories from our time living in South-east Asia.</p>',
					publishDate: '2020-02-03T06:47:37.000Z',
					audioFiles: [
						{
							id: '73159',
							url: 'https://www.audioverse.org/english/download/dl/73159/2020/01/21202/20200102-1430-21202-022d0eb719c102bf5de46ebaf8918c36-64k.mp3',
							filesize: '33402660',
							duration: 4175.3,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73163',
							url: 'https://www.audioverse.org/english/download/dl/73163/2020/01/21202/20200102-1430-21202-022d0eb719c102bf5de46ebaf8918c36-48k.mp3',
							filesize: '25079576',
							duration: 4179.9,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73165',
							url: 'https://www.audioverse.org/english/download/dl/73165/2020/01/21202/20200102-1430-21202-022d0eb719c102bf5de46ebaf8918c36-16k.mp3',
							filesize: '8433046',
							duration: 4216.5,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Amy Whitsett',
						},
						{
							name: 'Greg Whitsett',
						},
					],
					sequence: {
						title: 'Breakouts',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21182',
					title: 'The Great Gates of Hell',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>The second plenary will be looking at the importance of True Education as it relates to the Three Angels Message.</p>\r\n<p>What is the purpose of our academic institutions today, and how can we make a difference as mere students?</p>',
					publishDate: '2020-02-03T06:52:06.000Z',
					audioFiles: [
						{
							id: '73178',
							url: 'https://www.audioverse.org/english/download/dl/73178/2020/01/21182/20200102-1830-21182-34d42095d6e6b0d3349c5383942f50b0-64k.mp3',
							filesize: '19246382',
							duration: 2405.8,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73234',
							url: 'https://www.audioverse.org/english/download/dl/73234/2020/01/21182/20200102-1830-21182-34d42095d6e6b0d3349c5383942f50b0-48k.mp3',
							filesize: '14497319',
							duration: 2416.2,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73235',
							url: 'https://www.audioverse.org/english/download/dl/73235/2020/01/21182/20200102-1830-21182-34d42095d6e6b0d3349c5383942f50b0-16k.mp3',
							filesize: '4998832',
							duration: 2499.4,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [
						{
							id: '73358',
							url: 'https://www.audioverse.org/english/download/dl/73358/2020/01/21182/20200102-1830-21182-34d42095d6e6b0d3349c5383942f50b0-838k_360.mp4',
							filesize: '593267487',
							duration: 5441.5,
							mimeType: 'video/mp4',
							bitrate: 799,
							container: 'mp4',
						},
						{
							id: '73356',
							url: 'https://www.audioverse.org/english/download/dl/73356/2020/01/21182/20200102-1830-21182-34d42095d6e6b0d3349c5383942f50b0-838k.mp4',
							filesize: '569905062',
							duration: 5441.5,
							mimeType: 'video/mp4',
							bitrate: 706,
							container: 'mp4',
						},
						{
							id: '73357',
							url: 'https://www.audioverse.org/english/download/dl/73357/2020/01/21182/20200102-1830-21182-34d42095d6e6b0d3349c5383942f50b0-838k_240.mp4',
							filesize: '185865021',
							duration: 5441.5,
							mimeType: 'video/mp4',
							bitrate: 200,
							container: 'mp4',
						},
					],
					persons: [
						{
							name: 'Dean Cullinane',
						},
					],
					sequence: {
						title: 'Plenary',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21184',
					title: 'The Sidekick',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Poured Out: Consecrated, Committed, and Connected to Christ.</p>',
					publishDate: '2020-02-10T03:47:44.000Z',
					audioFiles: [
						{
							id: '73176',
							url: 'https://www.audioverse.org/english/download/dl/73176/2020/01/21184/20200103-0700-21184-b1f156e8c1d31eb2a12097d33124fac6-64k.mp3',
							filesize: '21364542',
							duration: 2670.6,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73228',
							url: 'https://www.audioverse.org/english/download/dl/73228/2020/01/21184/20200103-0700-21184-b1f156e8c1d31eb2a12097d33124fac6-48k.mp3',
							filesize: '16058288',
							duration: 2676.4,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73229',
							url: 'https://www.audioverse.org/english/download/dl/73229/2020/01/21184/20200103-0700-21184-b1f156e8c1d31eb2a12097d33124fac6-16k.mp3',
							filesize: '5445417',
							duration: 2722.7,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [
						{
							id: '73366',
							url: 'https://www.audioverse.org/english/download/dl/73366/2020/01/21184/20200103-0700-21184-b1f156e8c1d31eb2a12097d33124fac6-1k.mp4',
							filesize: '677956768',
							duration: 3481,
							mimeType: 'video/mp4',
							bitrate: 1427,
							container: 'mp4',
						},
						{
							id: '73368',
							url: 'https://www.audioverse.org/english/download/dl/73368/2020/01/21184/20200103-0700-21184-b1f156e8c1d31eb2a12097d33124fac6-1k_360.mp4',
							filesize: '379627653',
							duration: 3481,
							mimeType: 'video/mp4',
							bitrate: 799,
							container: 'mp4',
						},
						{
							id: '73367',
							url: 'https://www.audioverse.org/english/download/dl/73367/2020/01/21184/20200103-0700-21184-b1f156e8c1d31eb2a12097d33124fac6-1k_240.mp4',
							filesize: '119046111',
							duration: 3481,
							mimeType: 'video/mp4',
							bitrate: 201,
							container: 'mp4',
						},
					],
					persons: [
						{
							name: 'Sikhu Daco',
						},
					],
					sequence: {
						title: 'Morning Devotional',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21186',
					title: 'GYC Prayer Mission: Iceland',
					contentType: RecordingContentType.Sermon,
					description: '',
					publishDate: '2020-02-10T03:47:16.000Z',
					audioFiles: [
						{
							id: '73174',
							url: 'https://www.audioverse.org/english/download/dl/73174/2020/01/21186/20200103-0930-21186-0b591df9a636d09190281655e5669601-64k.mp3',
							filesize: '23779272',
							duration: 2972.4,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73224',
							url: 'https://www.audioverse.org/english/download/dl/73224/2020/01/21186/20200103-0930-21186-0b591df9a636d09190281655e5669601-48k.mp3',
							filesize: '17898219',
							duration: 2983,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73225',
							url: 'https://www.audioverse.org/english/download/dl/73225/2020/01/21186/20200103-0930-21186-0b591df9a636d09190281655e5669601-16k.mp3',
							filesize: '6135751',
							duration: 3067.9,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [
						{
							id: '73376',
							url: 'https://www.audioverse.org/english/download/dl/73376/2020/01/21186/20200103-0930-21186-0b591df9a636d09190281655e5669601-1k.mp4',
							filesize: '608318324',
							duration: 3540.7,
							mimeType: 'video/mp4',
							bitrate: 1243,
							container: 'mp4',
						},
						{
							id: '73378',
							url: 'https://www.audioverse.org/english/download/dl/73378/2020/01/21186/20200103-0930-21186-0b591df9a636d09190281655e5669601-1k_360.mp4',
							filesize: '386103234',
							duration: 3540.7,
							mimeType: 'video/mp4',
							bitrate: 799,
							container: 'mp4',
						},
						{
							id: '73377',
							url: 'https://www.audioverse.org/english/download/dl/73377/2020/01/21186/20200103-0930-21186-0b591df9a636d09190281655e5669601-1k_240.mp4',
							filesize: '120964092',
							duration: 3540.7,
							mimeType: 'video/mp4',
							bitrate: 200,
							container: 'mp4',
						},
					],
					persons: [
						{
							name: 'Jonathan Walter',
						},
					],
					sequence: {
						title: 'Plenary',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21183',
					title: 'Kingmakers',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>The final plenary will be something of a character study on the life of Jonathan and specifically his relationship with David, as expressed in 1 Sam 18. What can we learn from these ancient friends, and how might this relationship change the future of adventism?</p>',
					publishDate: '2020-02-03T06:52:11.000Z',
					audioFiles: [
						{
							id: '73177',
							url: 'https://www.audioverse.org/english/download/dl/73177/2020/01/21183/20200103-1830-21183-d6ef282e726ffede1b1ae0d899bc92fe-64k.mp3',
							filesize: '18892762',
							duration: 2361.6,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73232',
							url: 'https://www.audioverse.org/english/download/dl/73232/2020/01/21183/20200103-1830-21183-d6ef282e726ffede1b1ae0d899bc92fe-48k.mp3',
							filesize: '14232098',
							duration: 2372,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73233',
							url: 'https://www.audioverse.org/english/download/dl/73233/2020/01/21183/20200103-1830-21183-d6ef282e726ffede1b1ae0d899bc92fe-16k.mp3',
							filesize: '4910407',
							duration: 2455.2,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [
						{
							id: '73361',
							url: 'https://www.audioverse.org/english/download/dl/73361/2020/01/21183/20200103-1830-21183-d6ef282e726ffede1b1ae0d899bc92fe-944k.mp4',
							filesize: '623319895',
							duration: 5281.8,
							mimeType: 'video/mp4',
							bitrate: 812,
							container: 'mp4',
						},
						{
							id: '73363',
							url: 'https://www.audioverse.org/english/download/dl/73363/2020/01/21183/20200103-1830-21183-d6ef282e726ffede1b1ae0d899bc92fe-944k_360.mp4',
							filesize: '575249557',
							duration: 5281.8,
							mimeType: 'video/mp4',
							bitrate: 798,
							container: 'mp4',
						},
						{
							id: '73362',
							url: 'https://www.audioverse.org/english/download/dl/73362/2020/01/21183/20200103-1830-21183-d6ef282e726ffede1b1ae0d899bc92fe-944k_240.mp4',
							filesize: '180333599',
							duration: 5281.8,
							mimeType: 'video/mp4',
							bitrate: 200,
							container: 'mp4',
						},
					],
					persons: [
						{
							name: 'Dean Cullinane',
						},
					],
					sequence: {
						title: 'Plenary',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21185',
					title: 'Little David',
					contentType: RecordingContentType.Sermon,
					description: '',
					publishDate: '2020-02-10T03:47:49.000Z',
					audioFiles: [
						{
							id: '73175',
							url: 'https://www.audioverse.org/english/download/dl/73175/2020/01/21185/20200104-0700-21185-95b5b61454d69105a629bd379f5d4a07-64k.mp3',
							filesize: '22703475',
							duration: 2837.9,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73226',
							url: 'https://www.audioverse.org/english/download/dl/73226/2020/01/21185/20200104-0700-21185-95b5b61454d69105a629bd379f5d4a07-48k.mp3',
							filesize: '17062487',
							duration: 2843.8,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73227',
							url: 'https://www.audioverse.org/english/download/dl/73227/2020/01/21185/20200104-0700-21185-95b5b61454d69105a629bd379f5d4a07-16k.mp3',
							filesize: '5780150',
							duration: 2890.1,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [
						{
							id: '73371',
							url: 'https://www.audioverse.org/english/download/dl/73371/2020/01/21185/20200104-0700-21185-95b5b61454d69105a629bd379f5d4a07-1k.mp4',
							filesize: '842739470',
							duration: 3552.6,
							mimeType: 'video/mp4',
							bitrate: 1766,
							container: 'mp4',
						},
						{
							id: '73373',
							url: 'https://www.audioverse.org/english/download/dl/73373/2020/01/21185/20200104-0700-21185-95b5b61454d69105a629bd379f5d4a07-1k_360.mp4',
							filesize: '386742272',
							duration: 3552.6,
							mimeType: 'video/mp4',
							bitrate: 798,
							container: 'mp4',
						},
						{
							id: '73372',
							url: 'https://www.audioverse.org/english/download/dl/73372/2020/01/21185/20200104-0700-21185-95b5b61454d69105a629bd379f5d4a07-1k_240.mp4',
							filesize: '121156916',
							duration: 3552.6,
							mimeType: 'video/mp4',
							bitrate: 200,
							container: 'mp4',
						},
					],
					persons: [
						{
							name: 'Sikhu Daco',
						},
					],
					sequence: {
						title: 'Morning Devotional',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21187',
					title: 'Sabbath School',
					contentType: RecordingContentType.Sermon,
					description: '',
					publishDate: '2020-02-03T06:52:17.000Z',
					audioFiles: [
						{
							id: '73173',
							url: 'https://www.audioverse.org/english/download/dl/73173/2020/01/21187/20200104-0930-21187-025b5f6167a1a9a7e3f83cd370b15430-64k.mp3',
							filesize: '20054931',
							duration: 2506.9,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73222',
							url: 'https://www.audioverse.org/english/download/dl/73222/2020/01/21187/20200104-0930-21187-025b5f6167a1a9a7e3f83cd370b15430-48k.mp3',
							filesize: '15291397',
							duration: 2548.6,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73223',
							url: 'https://www.audioverse.org/english/download/dl/73223/2020/01/21187/20200104-0930-21187-025b5f6167a1a9a7e3f83cd370b15430-16k.mp3',
							filesize: '5763966',
							duration: 2882,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [
						{
							id: '73381',
							url: 'https://www.audioverse.org/english/download/dl/73381/2020/01/21187/20200104-0930-21187-025b5f6167a1a9a7e3f83cd370b15430-1k.mp4',
							filesize: '761140790',
							duration: 4400,
							mimeType: 'video/mp4',
							bitrate: 1253,
							container: 'mp4',
						},
						{
							id: '73383',
							url: 'https://www.audioverse.org/english/download/dl/73383/2020/01/21187/20200104-0930-21187-025b5f6167a1a9a7e3f83cd370b15430-1k_360.mp4',
							filesize: '478246799',
							duration: 4400,
							mimeType: 'video/mp4',
							bitrate: 796,
							container: 'mp4',
						},
						{
							id: '73382',
							url: 'https://www.audioverse.org/english/download/dl/73382/2020/01/21187/20200104-0930-21187-025b5f6167a1a9a7e3f83cd370b15430-1k_240.mp4',
							filesize: '150314991',
							duration: 4400,
							mimeType: 'video/mp4',
							bitrate: 200,
							container: 'mp4',
						},
					],
					persons: [
						{
							name: 'Sebastien Braxton',
						},
						{
							name: 'Sikhu Daco',
						},
						{
							name: 'Justin Kim',
						},
						{
							name: 'Israel Ramos',
						},
						{
							name: 'Jonathan Walter',
						},
					],
					sequence: {
						title: 'Plenary',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21188',
					title: 'What About the Few',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Jesus told us in Matthew 24, the world will increase in conflict, become more unpredictable in natural disasters, and intensify in deception. September 12th, 2019 Pope Francis announced an initiative inviting global heads of state, business leaders, academic leaders, and sport personalities to Rome May 14, 2020. His theme: Reinventing the Global Educational Alliance. His purpose: Reeducating the world to a new perspective in environmental stewardship. His goal: The unification of people and religions.</p>',
					publishDate: '2020-02-03T06:52:21.000Z',
					audioFiles: [
						{
							id: '73172',
							url: 'https://www.audioverse.org/english/download/dl/73172/2020/01/21188/20200104-1100-21188-d057f032618d6305a811d183d9aa8158-64k.mp3',
							filesize: '25405275',
							duration: 3175.7,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73220',
							url: 'https://www.audioverse.org/english/download/dl/73220/2020/01/21188/20200104-1100-21188-d057f032618d6305a811d183d9aa8158-48k.mp3',
							filesize: '19081499',
							duration: 3180.3,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73221',
							url: 'https://www.audioverse.org/english/download/dl/73221/2020/01/21188/20200104-1100-21188-d057f032618d6305a811d183d9aa8158-16k.mp3',
							filesize: '6433584',
							duration: 3216.8,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [
						{
							id: '73386',
							url: 'https://www.audioverse.org/english/download/dl/73386/2020/01/21188/20200104-1100-21188-d057f032618d6305a811d183d9aa8158-1k.mp4',
							filesize: '1221015211',
							duration: 6313,
							mimeType: 'video/mp4',
							bitrate: 1416,
							container: 'mp4',
						},
						{
							id: '73391',
							url: 'https://www.audioverse.org/english/download/dl/73391/2020/01/21188/20200104-1100-21188-d057f032618d6305a811d183d9aa8158-1k_360.mp4',
							filesize: '687583316',
							duration: 6313,
							mimeType: 'video/mp4',
							bitrate: 798,
							container: 'mp4',
						},
						{
							id: '73387',
							url: 'https://www.audioverse.org/english/download/dl/73387/2020/01/21188/20200104-1100-21188-d057f032618d6305a811d183d9aa8158-1k_240.mp4',
							filesize: '215339819',
							duration: 6313,
							mimeType: 'video/mp4',
							bitrate: 200,
							container: 'mp4',
						},
					],
					persons: [
						{
							name: 'Samuel Thomas',
						},
					],
					sequence: {
						title: 'Plenary',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21190',
					title: 'Final Charge: Make Adventism Good Again',
					contentType: RecordingContentType.Sermon,
					description: '',
					publishDate: '2020-02-03T06:52:24.000Z',
					audioFiles: [
						{
							id: '73276',
							url: 'https://www.audioverse.org/english/download/dl/73276/2020/01/21190/20200104-1730-21190-47150ae08e899bd2d15b97fb3a40f171-64k.mp3',
							filesize: '23040971',
							duration: 2880.1,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73302',
							url: 'https://www.audioverse.org/english/download/dl/73302/2020/01/21190/20200104-1730-21190-47150ae08e899bd2d15b97fb3a40f171-48k.mp3',
							filesize: '17385773',
							duration: 2897.6,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73303',
							url: 'https://www.audioverse.org/english/download/dl/73303/2020/01/21190/20200104-1730-21190-47150ae08e899bd2d15b97fb3a40f171-16k.mp3',
							filesize: '6075014',
							duration: 3037.5,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [
						{
							id: '73066',
							url: 'https://www.audioverse.org/english/download/dl/73066/2020/01/21190/20200104-1730-21190-47150ae08e899bd2d15b97fb3a40f171-1k_720.mp4',
							filesize: '5123801727',
							duration: 7981.3,
							mimeType: 'video/mp4',
							bitrate: 4996,
							container: 'mp4',
						},
						{
							id: '73069',
							url: 'https://www.audioverse.org/english/download/dl/73069/2020/01/21190/20200104-1730-21190-47150ae08e899bd2d15b97fb3a40f171-1k.mp4',
							filesize: '1508305669',
							duration: 7981.3,
							mimeType: 'video/mp4',
							bitrate: 800,
							container: 'mp4',
						},
						{
							id: '73068',
							url: 'https://www.audioverse.org/english/download/dl/73068/2020/01/21190/20200104-1730-21190-47150ae08e899bd2d15b97fb3a40f171-1k_360.mp4',
							filesize: '870707782',
							duration: 7981.3,
							mimeType: 'video/mp4',
							bitrate: 800,
							container: 'mp4',
						},
						{
							id: '73067',
							url: 'https://www.audioverse.org/english/download/dl/73067/2020/01/21190/20200104-1730-21190-47150ae08e899bd2d15b97fb3a40f171-1k_240.mp4',
							filesize: '272264846',
							duration: 7981.3,
							mimeType: 'video/mp4',
							bitrate: 200,
							container: 'mp4',
						},
					],
					persons: [
						{
							name: 'Israel Ramos',
						},
					],
					sequence: {
						title: 'Plenary',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21151',
					title:
						'How to Interpret Scripture: Do Historical Matters Really Matter? Reconciling the Bible with Science',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>How do we face the crucial questions that confront us in society and culture? How do we interpret the Bible in the face of significant challenges in science, history and prophecy? What about the bigger issues facing our church? This seminar seeks to answer these crucial questions by pointing us back to basic principles of biblical interpretation that will guide our understanding of the living Word of God with the assurance that it is more relevant today than it has ever been.</p>',
					publishDate: '2020-02-03T06:50:32.000Z',
					audioFiles: [
						{
							id: '73204',
							url: 'https://www.audioverse.org/english/download/dl/73204/2020/01/21151/20200108-1045-21151-d1a02c0c96e235f72d081e730c1d58ec-64k.mp3',
							filesize: '33799675',
							duration: 4225,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73258',
							url: 'https://www.audioverse.org/english/download/dl/73258/2020/01/21151/20200108-1045-21151-d1a02c0c96e235f72d081e730c1d58ec-48k.mp3',
							filesize: '25387931',
							duration: 4231.3,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73261',
							url: 'https://www.audioverse.org/english/download/dl/73261/2020/01/21151/20200108-1045-21151-d1a02c0c96e235f72d081e730c1d58ec-16k.mp3',
							filesize: '8564082',
							duration: 4282,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Michael Hasel',
						},
					],
					sequence: {
						title: 'How to Interpret Scripture',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21152',
					title:
						'How to Interpret Scripture: Does the Bible Really Reveal the Future? Prophecy and the New World Order',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>How do we face the crucial questions that confront us in society and culture? How do we interpret the Bible in the face of significant challenges in science, history and prophecy? What about the bigger issues facing our church? This seminar seeks to answer these crucial questions by pointing us back to basic principles of biblical interpretation that will guide our understanding of the living Word of God with the assurance that it is more relevant today than it has ever been.</p>',
					publishDate: '2020-02-03T06:50:36.000Z',
					audioFiles: [
						{
							id: '73205',
							url: 'https://www.audioverse.org/english/download/dl/73205/2020/01/21152/20200108-1200-21152-88aea9c7915de83b946fb136a3858d6e-64k.mp3',
							filesize: '30093635',
							duration: 3761.7,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73251',
							url: 'https://www.audioverse.org/english/download/dl/73251/2020/01/21152/20200108-1200-21152-88aea9c7915de83b946fb136a3858d6e-48k.mp3',
							filesize: '22608402',
							duration: 3768.1,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73252',
							url: 'https://www.audioverse.org/english/download/dl/73252/2020/01/21152/20200108-1200-21152-88aea9c7915de83b946fb136a3858d6e-16k.mp3',
							filesize: '7637574',
							duration: 3818.8,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Michael Hasel',
						},
					],
					sequence: {
						title: 'How to Interpret Scripture',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21177',
					title: 'Strategies on how to Reach Postmoderns',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>While there are growing churches in both urban and country settings, church-goers and students today are actually less likely to keep a Christian worldview than in the past. In fact, the greater part of our contemporary society today does not even believe in absolute truth. A modern-day disciple of Christ out of touch with this culture is like an uninformed missionary trying to teach in a foreign country. To share God&rsquo;s Word effectively in the twenty-first century, soul-winners need to know how to connect with and confront a society of postmodern thinkers. In this seminar, Pastor Christian Martin shows how we can reach the present age with the everlasting gospel.</p>',
					publishDate: '2020-02-10T03:46:12.000Z',
					audioFiles: [
						{
							id: '73247',
							url: 'https://www.audioverse.org/english/download/dl/73247/2020/01/21177/20200108-1412-21177-b1856c25c7a0480df15b57b930d7543b-64k.mp3',
							filesize: '30080671',
							duration: 3760.1,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73310',
							url: 'https://www.audioverse.org/english/download/dl/73310/2020/01/21177/20200108-1412-21177-b1856c25c7a0480df15b57b930d7543b-48k.mp3',
							filesize: '22619941',
							duration: 3770,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73311',
							url: 'https://www.audioverse.org/english/download/dl/73311/2020/01/21177/20200108-1412-21177-b1856c25c7a0480df15b57b930d7543b-16k.mp3',
							filesize: '7698120',
							duration: 3849.1,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Christian Martin',
						},
					],
					sequence: {
						title: 'Winning Postmodern Souls to Christ',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
				{
					id: '21180',
					title: 'Christ on the Shop Floor',
					contentType: RecordingContentType.Sermon,
					description:
						'<p>Sam Walters will be unpacking what it means to live life evangelistically. Many times people live lives that are segregated into different sectors, where their spirituality does not necessarily permeate the rest of their lives. Discover how your relationship with God can become visible, audible and tangible to those around you, whether at your workplace, university, with family or whatever setting you find yourself in.</p>',
					publishDate: '2020-02-03T06:46:38.000Z',
					audioFiles: [
						{
							id: '73243',
							url: 'https://www.audioverse.org/english/download/dl/73243/2020/01/21180/20200108-1426-21180-ae2a471ce356f0b989aba52c85826168-64k.mp3',
							filesize: '25919827',
							duration: 3240,
							mimeType: 'audio/mpeg',
							bitrate: 64,
						},
						{
							id: '73304',
							url: 'https://www.audioverse.org/english/download/dl/73304/2020/01/21180/20200108-1426-21180-ae2a471ce356f0b989aba52c85826168-48k.mp3',
							filesize: '19467424',
							duration: 3244.6,
							mimeType: 'audio/mpeg',
							bitrate: 48,
						},
						{
							id: '73305',
							url: 'https://www.audioverse.org/english/download/dl/73305/2020/01/21180/20200108-1426-21180-ae2a471ce356f0b989aba52c85826168-16k.mp3',
							filesize: '6562255',
							duration: 3281.1,
							mimeType: 'audio/mpeg',
							bitrate: 16,
						},
					],
					videoFiles: [],
					persons: [
						{
							name: 'Sam Walters',
						},
					],
					sequence: {
						title: 'The Evangelistic Perspecitive',
					},
					sponsor: {
						title: 'Generation. Youth. Christ.',
					},
				},
			]
		);
		expect(result).toMatchSnapshot();
	});
});
