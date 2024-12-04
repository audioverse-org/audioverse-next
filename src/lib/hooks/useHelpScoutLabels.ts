import { useIntl } from 'react-intl';

import { HelpScoutLabels } from '../../types/window';

export default function useHelpScoutLabels(): HelpScoutLabels {
	const intl = useIntl();

	// https://developer.helpscout.com/beacon-2/web/javascript-api/#translate-options
	return {
		addReply: intl.formatMessage({
			id: 'helpScout.addReply',
			defaultMessage: 'Add a reply',
		}),
		addYourMessageHere: intl.formatMessage({
			id: 'helpScout.addYourMessageHere',
			defaultMessage: 'Add your message here...',
		}),
		answer: intl.formatMessage({
			id: 'helpScout.answer',
			defaultMessage: 'Answers',
		}),
		ask: intl.formatMessage({
			id: 'helpScout.ask',
			defaultMessage: 'Ask',
		}),
		attachAFile: intl.formatMessage({
			id: 'helpScout.attachAFile',
			defaultMessage: 'Attach a file',
		}),
		attachmentErrorText: intl.formatMessage({
			id: 'helpScout.attachmentErrorText',
			defaultMessage:
				'There was a problem uploading your attachment. Please try again in a moment.',
		}),
		attachmentSizeErrorText: intl.formatMessage({
			id: 'helpScout.attachmentSizeErrorText',
			defaultMessage: 'Attachments may be no larger than 10MB',
		}),
		beaconButtonChatMinimize: intl.formatMessage({
			id: 'helpScout.beaconButtonChatMinimize',
			defaultMessage: 'Minimize chat',
		}),
		beaconButtonChatOpen: intl.formatMessage({
			id: 'helpScout.beaconButtonChatOpen',
			defaultMessage: 'Open chat',
		}),
		beaconButtonClose: intl.formatMessage({
			id: 'helpScout.beaconButtonClose',
			defaultMessage: 'Close',
		}),
		cantFindAnswer: intl.formatMessage({
			id: 'helpScout.cantFindAnswer',
			defaultMessage: 'Can’t find an answer?',
		}),
		chatAvailabilityChangeMessage: intl.formatMessage({
			id: 'helpScout.chatAvailabilityChangeMessage',
			defaultMessage:
				'Our team’s availability has changed and there’s no longer anyone available to chat. Send us a message instead and we’ll get back to you.',
		}),
		chatButtonDescription: intl.formatMessage({
			id: 'helpScout.chatButtonDescription',
			defaultMessage: 'We’re online right now, talk with our team in real-time',
		}),
		chatButtonLabel: intl.formatMessage({
			id: 'helpScout.chatButtonLabel',
			defaultMessage: 'Chat',
		}),
		chatConnected: intl.formatMessage({
			id: 'helpScout.chatConnected',
			defaultMessage: 'Connected to ',
		}),
		chatEndCalloutHeading: intl.formatMessage({
			id: 'helpScout.chatEndCalloutHeading',
			defaultMessage: 'All done!',
		}),
		chatEndCalloutLink: intl.formatMessage({
			id: 'helpScout.chatEndCalloutLink',
			defaultMessage: 'Return home',
		}),
		chatEndCalloutMessage: intl.formatMessage({
			id: 'helpScout.chatEndCalloutMessage',
			defaultMessage:
				'A copy of this conversation will land in your inbox shortly.',
		}),
		chatEndUnassignedCalloutHeading: intl.formatMessage({
			id: 'helpScout.chatEndUnassignedCalloutHeading',
			defaultMessage: 'Sorry about that',
		}),
		chatEndUnassignedCalloutMessage: intl.formatMessage({
			id: 'helpScout.chatEndUnassignedCalloutMessage',
			defaultMessage:
				'It looks like nobody made it to your chat. We’ll send you an email response as soon as possible.',
		}),
		chatEndWaitingCustomerHeading: intl.formatMessage({
			id: 'helpScout.chatEndWaitingCustomerHeading',
			defaultMessage: 'Sorry about that',
		}),
		chatEndWaitingCustomerMessage: intl.formatMessage({
			id: 'helpScout.chatEndWaitingCustomerMessage',
			defaultMessage:
				'Your question has been added to our email queue and we’ll get back to you shortly.',
		}),
		chatEnded: intl.formatMessage({
			id: 'helpScout.chatEnded',
			defaultMessage: ' ended the chat',
		}),
		chatHeadingSublabel: intl.formatMessage({
			id: 'helpScout.chatHeadingSublabel',
			defaultMessage: "We'll be with you soon",
		}),
		chatHeadingTitle: intl.formatMessage({
			id: 'helpScout.chatHeadingTitle',
			defaultMessage: 'Chat with our team',
		}),
		chatbotAgentDisconnectedMessage: intl.formatMessage({
			id: 'helpScout.chatbotAgentDisconnectedMessage',
			defaultMessage:
				' has disconnected from the chat. It’s possible they lost their internet connection, so I’m looking for someone else to take over. Sorry for the delay!',
		}),
		chatbotConfirmationMessage: intl.formatMessage({
			id: 'helpScout.chatbotConfirmationMessage',
			defaultMessage:
				'Thanks! Someone from our team will jump into the chat soon.',
		}),
		chatbotGenericErrorMessage: intl.formatMessage({
			id: 'helpScout.chatbotGenericErrorMessage',
			defaultMessage:
				'Something went wrong sending your message, please try again in a few minutes.',
		}),
		chatbotGreet: intl.formatMessage({
			id: 'helpScout.chatbotGreet',
			defaultMessage:
				'Hi there! You can begin by asking your question below. Someone will be with you shortly.',
		}),
		chatbotInactivityPrompt: intl.formatMessage({
			id: 'helpScout.chatbotInactivityPrompt',
			defaultMessage:
				'Since the chat has gone idle, I’ll end this chat in a few minutes.',
		}),
		chatbotInvalidEmailMessage: intl.formatMessage({
			id: 'helpScout.chatbotInvalidEmailMessage',
			defaultMessage:
				'Looks like you’ve entered an invalid email address. Want to try again?',
		}),
		chatbotName: intl.formatMessage({
			id: 'helpScout.chatbotName',
			defaultMessage: 'Help Bot',
		}),
		chatbotPromptEmail: intl.formatMessage({
			id: 'helpScout.chatbotPromptEmail',
			defaultMessage:
				'Got it. Real quick, what’s your email address? We’ll use it for any follow-up messages.',
		}),
		continueEditing: intl.formatMessage({
			id: 'helpScout.continueEditing',
			defaultMessage: 'Continue writing...',
		}),
		customFieldsValidationLabel: intl.formatMessage({
			id: 'helpScout.customFieldsValidationLabel',
			defaultMessage: 'Please complete all fields',
		}),
		defaultMessageErrorText: intl.formatMessage({
			id: 'helpScout.defaultMessageErrorText',
			defaultMessage:
				'There was a problem sending your message. Please try again in a moment.',
		}),
		docsArticleErrorText: intl.formatMessage({
			id: 'helpScout.docsArticleErrorText',
			defaultMessage:
				'There was a problem retrieving this article. Please double-check your internet connection and try again.',
		}),
		docsSearchEmptyText: intl.formatMessage({
			id: 'helpScout.docsSearchEmptyText',
			defaultMessage: 'We couldn’t find any articles that match your search.',
		}),
		docsSearchErrorText: intl.formatMessage({
			id: 'helpScout.docsSearchErrorText',
			defaultMessage:
				'There was a problem retrieving articles. Please double-check your internet connection and try again.',
		}),
		emailContinueConversation: intl.formatMessage({
			id: 'helpScout.emailContinueConversation',
			defaultMessage:
				'If you’ve got any other questions, feel free to hit reply and continue the conversation.',
		}),
		emailCopyOfDiscussion: intl.formatMessage({
			id: 'helpScout.emailCopyOfDiscussion',
			defaultMessage: 'Here’s a copy of your discussion',
		}),
		emailEndedLineItem: intl.formatMessage({
			id: 'helpScout.emailEndedLineItem',
			defaultMessage: ' ended the chat',
		}),
		emailGreeting: intl.formatMessage({
			id: 'helpScout.emailGreeting',
			defaultMessage: 'Hey ',
		}),
		emailHeading: intl.formatMessage({
			id: 'helpScout.emailHeading',
			defaultMessage: "Today's chat with ",
		}),
		emailJoinedLineItem: intl.formatMessage({
			id: 'helpScout.emailJoinedLineItem',
			defaultMessage: ' joined the chat',
		}),
		emailLabel: intl.formatMessage({
			id: 'helpScout.emailLabel',
			defaultMessage: 'Email address',
		}),
		emailValidationLabel: intl.formatMessage({
			id: 'helpScout.emailValidationLabel',
			defaultMessage: 'Please use a valid email address',
		}),
		emailYou: intl.formatMessage({
			id: 'helpScout.emailYou',
			defaultMessage: 'You',
		}),
		endChat: intl.formatMessage({
			id: 'helpScout.endChat',
			defaultMessage: 'End chat',
		}),
		ending: intl.formatMessage({
			id: 'helpScout.ending',
			defaultMessage: 'Ending...',
		}),
		escalationQuestionFeedback: intl.formatMessage({
			id: 'helpScout.escalationQuestionFeedback',
			defaultMessage: 'Did this answer your question?',
		}),
		escalationQuestionFeedbackNo: intl.formatMessage({
			id: 'helpScout.escalationQuestionFeedbackNo',
			defaultMessage: 'No',
		}),
		escalationQuestionFeedbackYes: intl.formatMessage({
			id: 'helpScout.escalationQuestionFeedbackYes',
			defaultMessage: 'Yes',
		}),
		escalationSearchText: intl.formatMessage({
			id: 'helpScout.escalationSearchText',
			defaultMessage: 'Browse our help docs for an answer to your question',
		}),
		escalationTalkText: intl.formatMessage({
			id: 'helpScout.escalationTalkText',
			defaultMessage: 'Talk with a friendly member of our support team',
		}),
		escalationTalkTitle: intl.formatMessage({
			id: 'helpScout.escalationTalkTitle',
			defaultMessage: 'Talk to us',
		}),
		escalationThanksFeedback: intl.formatMessage({
			id: 'helpScout.escalationThanksFeedback',
			defaultMessage: 'Thanks for the feedback',
		}),
		escalationWhatNext: intl.formatMessage({
			id: 'helpScout.escalationWhatNext',
			defaultMessage: 'What next?',
		}),
		firstAFewQuestions: intl.formatMessage({
			id: 'helpScout.firstAFewQuestions',
			defaultMessage: "Let's begin with a few questions.",
		}),
		getInTouch: intl.formatMessage({
			id: 'helpScout.getInTouch',
			defaultMessage: 'Get in touch',
		}),
		history: intl.formatMessage({
			id: 'helpScout.history',
			defaultMessage: 'History',
		}),
		howCanWeHelp: intl.formatMessage({
			id: 'helpScout.howCanWeHelp',
			defaultMessage: 'How can we help?',
		}),
		justNow: intl.formatMessage({
			id: 'helpScout.justNow',
			defaultMessage: 'Just Now',
		}),
		lastUpdated: intl.formatMessage({
			id: 'helpScout.lastUpdated',
			defaultMessage: 'Last updated',
		}),
		mayNotBeEmpty: intl.formatMessage({
			id: 'helpScout.mayNotBeEmpty',
			defaultMessage: 'May not be empty',
		}),
		messageButtonLabel: intl.formatMessage({
			id: 'helpScout.messageButtonLabel',
			defaultMessage: 'Email',
		}),
		messageConfirmationText: intl.formatMessage({
			id: 'helpScout.messageConfirmationText',
			defaultMessage: "You'll receive an email reply within a few hours.",
		}),
		messageLabel: intl.formatMessage({
			id: 'helpScout.messageLabel',
			defaultMessage: 'How can we help?',
		}),
		messageSubmitLabel: intl.formatMessage({
			id: 'helpScout.messageSubmitLabel',
			defaultMessage: 'Send a message',
		}),
		nameLabel: intl.formatMessage({
			id: 'helpScout.nameLabel',
			defaultMessage: 'Name',
		}),
		next: intl.formatMessage({
			id: 'helpScout.next',
			defaultMessage: 'Next',
		}),
		noTimeToWaitAround: intl.formatMessage({
			id: 'helpScout.noTimeToWaitAround',
			defaultMessage:
				'No time to wait around? We usually respond within a few hours',
		}),
		nothingFound: intl.formatMessage({
			id: 'helpScout.nothingFound',
			defaultMessage: 'Hmm...',
		}),
		previousMessageErrorText: intl.formatMessage({
			id: 'helpScout.previousMessageErrorText',
			defaultMessage:
				'There was a problem retrieving this message. Please double-check your Internet connection and try again.',
		}),
		previousMessages: intl.formatMessage({
			id: 'helpScout.previousMessages',
			defaultMessage: 'Previous Conversations',
		}),
		received: intl.formatMessage({
			id: 'helpScout.received',
			defaultMessage: 'Received',
		}),
		relatedArticles: intl.formatMessage({
			id: 'helpScout.relatedArticles',
			defaultMessage: 'Related Articles',
		}),
		responseTime: intl.formatMessage({
			id: 'helpScout.responseTime',
			defaultMessage: 'We usually respond within a few hours',
		}),
		searchLabel: intl.formatMessage({
			id: 'helpScout.searchLabel',
			defaultMessage: 'What can we help you with?',
		}),
		sendAMessage: intl.formatMessage({
			id: 'helpScout.sendAMessage',
			defaultMessage: 'Send a message',
		}),
		sendMessage: intl.formatMessage({
			id: 'helpScout.sendMessage',
			defaultMessage: 'Send message',
		}),
		subjectLabel: intl.formatMessage({
			id: 'helpScout.subjectLabel',
			defaultMessage: 'Subject',
		}),
		suggestedForYou: intl.formatMessage({
			id: 'helpScout.suggestedForYou',
			defaultMessage: 'Instant Answers',
		}),
		tryAgain: intl.formatMessage({
			id: 'helpScout.tryAgain',
			defaultMessage: 'Try again',
		}),
		tryBroaderTerm: intl.formatMessage({
			id: 'helpScout.tryBroaderTerm',
			defaultMessage: 'Try searching a broader term, or',
		}),
		uploadAnImage: intl.formatMessage({
			id: 'helpScout.uploadAnImage',
			defaultMessage: 'Upload an image',
		}),
		viewAndUpdateMessage: intl.formatMessage({
			id: 'helpScout.viewAndUpdateMessage',
			defaultMessage: 'You can view and update your message in',
		}),
		waitingForAnAnswer: intl.formatMessage({
			id: 'helpScout.waitingForAnAnswer',
			defaultMessage: 'Waiting for an answer',
		}),
		weAreOnIt: intl.formatMessage({
			id: 'helpScout.weAreOnIt',
			defaultMessage: "We're on it!",
		}),
		wereHereToHelp: intl.formatMessage({
			id: 'helpScout.wereHereToHelp',
			defaultMessage: 'Start a conversation',
		}),
		whatMethodWorks: intl.formatMessage({
			id: 'helpScout.whatMethodWorks',
			defaultMessage: 'What channel do you prefer?',
		}),
		you: intl.formatMessage({
			id: 'helpScout.you',
			defaultMessage: 'You',
		}),
	} as const;
}
