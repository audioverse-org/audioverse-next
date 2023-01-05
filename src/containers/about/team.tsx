import Image from 'next/legacy/image';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading1 from '@/components/atoms/heading1';
import Heading2 from '@/components/atoms/heading2';
import RoundImage from '@/components/atoms/roundImage';
import Button from '@/components/molecules/button';
import ContentWidthLimiter from '@/components/molecules/contentWidthLimiter';
import TypeLockup from '@/components/molecules/typeLockup';
import AboutNav from '@/components/organisms/aboutNav';
import { BaseColors } from '@/lib/constants';
import { makeAboutPage } from '@/lib/routes';
import useLanguageRoute from '@/lib/useLanguageRoute';

import IconUser from '../../../public/img/icons/fa-user-light.svg';
import IconBack from '../../../public/img/icons/icon-back-light.svg';
import IconForward from '../../../public/img/icons/icon-forward-light.svg';

import sharedStyles from './shared.module.scss';
import styles from './team.module.scss';

export default function Team(): JSX.Element {
	const languageRoute = useLanguageRoute();

	const teamMembers: Array<{
		title: JSX.Element;
		image: string;
		name: string;
		bio: JSX.Element;
	}> = [
		{
			title: (
				<FormattedMessage
					id="about__teamExecutiveDirector"
					defaultMessage="Executive Director"
				/>
			),
			image: 'Alistair',
			name: 'Alistair Huong',
			bio: (
				<FormattedMessage
					id="about__teamAlistairBio"
					defaultMessage="From his stand-up desk, Alistair oversees the strategy and day-to-day management by ensuring that we are doing the right things and that we are doing things right."
				/>
			),
		},
		{
			title: (
				<FormattedMessage
					id="about__teamBusinessManager"
					defaultMessage="Business Manager"
				/>
			),
			image: '', // 'Debby'
			name: 'Debby Williams',
			bio: (
				<FormattedMessage
					id="about__teamDebbyBio"
					defaultMessage="With her background as a CPA, wife, and mother, Debby capably manages the finances, HR, and correspondence for the ministry."
				/>
			),
		},
		{
			title: (
				<FormattedMessage
					id="about__teamTechnologyDirector"
					defaultMessage="Technology Director"
				/>
			),
			image: 'Nathan',
			name: 'Nathan Arthur',
			bio: (
				<FormattedMessage
					id="about__teamNathanBio"
					defaultMessage="Nathan contributes to the ministry by solving big problems, managing development projects, and keeping the ministry’s technology humming."
				/>
			),
		},
		{
			title: (
				<FormattedMessage
					id="about__team"
					defaultMessage="Digital Marketing Coordinator"
				/>
			),
			image: 'Liz',
			name: 'Liz Neascu',
			bio: (
				<FormattedMessage
					id="about__teamLizBio"
					defaultMessage="A social media dynamo, e-commerce go-getter, and energetic marketer, Liz helps grow our social media audience and oversees our digital marketing efforts."
				/>
			),
		},
		{
			title: (
				<FormattedMessage
					id="about__teamAssistantOperationsCoordinator"
					defaultMessage="Assistant Operations Coordinator"
				/>
			),
			image: 'Annette',
			name: 'Annette Roblero Miller',
			bio: (
				<FormattedMessage
					id="about__teamAnnetteBio"
					defaultMessage="All the media on AudioVerse has Annette’s fingerprints on it. She works with partners, obtains content, edits them, and publishes them on AudioVerse."
				/>
			),
		},
		{
			title: (
				<FormattedMessage
					id="about__teamSoftwareEngineer"
					defaultMessage="Software Engineer"
				/>
			),
			image: 'Matthew',
			name: 'Matthew Leffler',
			bio: (
				<FormattedMessage
					id="about__teamMatthewBio"
					defaultMessage="Frontend, backend, full-stack and more. Matthew churns out code and builds beautiful things all while walking on a treadmill."
				/>
			),
		},
	];

	const boardMembers: Array<{
		name: string;
		title: JSX.Element;
		image: string;
	}> = [
		{
			name: 'Tim Arakawa',
			title: (
				<FormattedMessage
					id="about__teamBoardArakawaTitle"
					defaultMessage="Chairman (Co-founder) | Physician, Albany, Oregon"
				/>
			),
			image: 'Arakawa',
		},
		{
			name: 'Alistair Huong',
			title: (
				<FormattedMessage
					id="about__teamBoardHuongTitle"
					defaultMessage="Secretary | Executive Director, AudioVerse"
				/>
			),
			image: 'Huong',
		},
		{
			name: 'Vonn Williams',
			title: (
				<FormattedMessage
					id="about__teamBoardWilliamsTitle"
					defaultMessage="Treasurer | Finance Professional, Chattanooga, Tennessee"
				/>
			),
			image: 'Williams',
		},
		{
			name: 'Chester Clark III',
			title: (
				<FormattedMessage
					id="about__teamBoardClarkTitle"
					defaultMessage="Vice President for Administration, Georgia-Cumberland Conference"
				/>
			),
			image: 'Clark',
		},
		{
			name: 'Kathy Irizarry',
			title: (
				<FormattedMessage
					id="about__teamBoardIrizarryTitle"
					defaultMessage="Physician, Amity, Arkansas"
				/>
			),
			image: 'Irizarry',
		},
		{
			name: 'Eli Kim',
			title: (
				<FormattedMessage
					id="about__teamBoardKimTitle"
					defaultMessage="Physician, Chattanooga, Tennessee"
				/>
			),
			image: 'Kim',
		},
		{
			name: 'Don Mackintosh',
			title: (
				<FormattedMessage
					id="about__teamBoardMackintoshTitle"
					defaultMessage="Director, NEWSTART Global"
				/>
			),
			image: 'Mackintosh',
		},
		{
			name: 'Jesse Zwiker',
			title: (
				<FormattedMessage
					id="about__teamBoardZwikerTitle"
					defaultMessage="President, Hyve International"
				/>
			),
			image: 'Zwiker',
		},
	];

	return (
		<>
			<AboutNav current="meettheteam" />
			<Heading1>
				<FormattedMessage id="about__teamTitle" defaultMessage="The Team" />
			</Heading1>
			<ContentWidthLimiter>
				<div className={sharedStyles.base}>
					<Heading2>
						<FormattedMessage
							id="about__teamExecutive"
							defaultMessage="Executive Team"
						/>
					</Heading2>
					<p>
						<FormattedMessage
							id="about__teamIntro"
							defaultMessage="The AudioVerse Executive Team are responsible for the day-to-day operations of the ministry. This group of dedicated individuals with their their common passion for the proclamation of the three angels' messages is what keeps this ministry running."
						/>
					</p>
					<div className={styles.cardGrid}>
						{teamMembers.map(({ title, image, name, bio }) => (
							<div key={name}>
								<TypeLockup
									label={title}
									textColor={BaseColors.DARK}
									Icon={IconUser}
									iconColor={BaseColors.RED}
								/>
								<div className={styles.imageBackground}>
									{image && (
										<Image
											width={280}
											height={187}
											src={`/img/staff/${image}.jpg`}
										/>
									)}
								</div>
								<Heading2 sans>{name}</Heading2>
								<div className={styles.bio}>{bio}</div>
							</div>
						))}
					</div>

					<Heading2>
						<FormattedMessage
							id="about__teamBoard"
							defaultMessage="Board of Directors"
						/>
					</Heading2>
					<p>
						<FormattedMessage
							id="about__teamBoardIntro"
							defaultMessage="The AudioVerse Board of Directors provides guidance and vision for the ministry. This dedicated group of individuals with their collective experience and wisdom helps the ministry steer a true course in advancing the work of the Lord."
						/>
					</p>
					<div className={styles.boardList}>
						{boardMembers.map(({ image, name, title }) => (
							<div key={name}>
								<RoundImage image={`/img/board/${image}.jpg`} />
								<span className={styles.name}>{name}</span>
								<span className={styles.title}>{title}</span>
							</div>
						))}
					</div>

					<div className={sharedStyles.navigation}>
						<Button
							type="secondary"
							IconRight={IconForward}
							text={
								<FormattedMessage
									id="about__navPurpose"
									defaultMessage="Our Purpose"
								/>
							}
							href={makeAboutPage(languageRoute, 7)}
						/>
						<Button
							type="secondary"
							IconLeft={IconBack}
							text={
								<FormattedMessage
									id="about__navStory"
									defaultMessage="Our Story"
								/>
							}
							href={makeAboutPage(languageRoute, 1)}
						/>
					</div>
				</div>
			</ContentWidthLimiter>
		</>
	);
}
