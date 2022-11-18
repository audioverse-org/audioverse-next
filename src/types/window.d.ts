type Suggestion =
	| string
	| {
			text: string;
			url: string;
	  };

type HelpScoutLabels = {
	suggestedForYou: string;
	getInTouch: string;
	searchLabel: string;
	tryAgain: string;
	defaultMessageErrorText: string;
	beaconButtonClose: string;
	beaconButtonChatMinimize: string;
	beaconButtonChatOpen: string;
	answer: string;
	ask: string;
	messageButtonLabel: string;
	noTimeToWaitAround: string;
	chatButtonLabel: string;
	chatButtonDescription: string;
	wereHereToHelp: string;
	whatMethodWorks: string;
	previousMessages: string;
	cantFindAnswer: string;
	relatedArticles: string;
	nothingFound: string;
	docsSearchEmptyText: string;
	tryBroaderTerm: string;
	docsArticleErrorText: string;
	docsSearchErrorText: string;
	escalationQuestionFeedback: string;
	escalationQuestionFeedbackNo: string;
	escalationQuestionFeedbackYes: string;
	escalationSearchText: string;
	escalationTalkText: string;
	escalationTalkTitle: string;
	escalationThanksFeedback: string;
	escalationWhatNext: string;
	sendAMessage: string;
	firstAFewQuestions: string;
	howCanWeHelp: string;
	responseTime: string;
	history: string;
	uploadAnImage: string;
	attachAFile: string;
	continueEditing: string;
	lastUpdated: string;
	you: string;
	nameLabel: string;
	subjectLabel: string;
	emailLabel: string;
	messageLabel: string;
	messageSubmitLabel: string;
	next: string;
	weAreOnIt: string;
	messageConfirmationText: string;
	viewAndUpdateMessage: string;
	mayNotBeEmpty: string;
	customFieldsValidationLabel: string;
	emailValidationLabel: string;
	attachmentErrorText: string;
	attachmentSizeErrorText: string;
	addReply: string;
	addYourMessageHere: string;
	sendMessage: string;
	received: string;
	waitingForAnAnswer: string;
	previousMessageErrorText: string;
	justNow: string;
	chatHeadingTitle: string;
	chatHeadingSublabel: string;
	chatEndCalloutHeading: string;
	chatEndCalloutMessage: string;
	chatEndCalloutLink: string;
	chatEndUnassignedCalloutHeading: string;
	chatEndUnassignedCalloutMessage: string;
	chatEndWaitingCustomerHeading: string;
	chatEndWaitingCustomerMessage: string;
	ending: string;
	endChat: string;
	chatEnded: string;
	chatConnected: string;
	chatbotName: string;
	chatbotGreet: string;
	chatbotPromptEmail: string;
	chatbotConfirmationMessage: string;
	chatbotGenericErrorMessage: string;
	chatbotInactivityPrompt: string;
	chatbotInvalidEmailMessage: string;
	chatbotAgentDisconnectedMessage: string;
	chatAvailabilityChangeMessage: string;
	emailHeading: string;
	emailGreeting: string;
	emailCopyOfDiscussion: string;
	emailContinueConversation: string;
	emailJoinedLineItem: string;
	emailEndedLineItem: string;
	emailYou: string;
};

type Beacon = {
	(method: 'init', beaconId: string): unknown;
	(method: 'destroy'): unknown;
	(method: 'open' | 'close' | 'toggle'): unknown;
	(method: 'search', query: string): unknown;
	(method: 'suggest', suggestions?: Suggestion[]): unknown;
	(
		method: 'article',
		articleId: string,
		options?: { type?: 'sidebar' | 'modal' }
	): unknown;
	(method: 'navigate', route: string): unknown;
	(
		method: 'identify',
		userObject: {
			name: string;
			email: string;
			company?: string;
			jobTitle?: string;
			avatar?: string;
			[propertyId: string]: string | number;
		}
	): unknown;
	(
		method: 'prefill',
		formObject: {
			name?: string;
			email?: string;
			subject?: string;
			text?: string;
			fields?: { id: number; value: number | string }[];
		}
	): unknown;
	(method: 'reset'): unknown;
	(
		method: 'logout',
		options?: {
			endActiveChat?: boolean;
		}
	): unknown;
	(
		method: 'config',
		formObject: {
			docsEnabled?: boolean;
			messagingEnabled?: boolean;
			enableFabAnimation?: boolean;
			enablePreviousMessages?: boolean;
			color?: string;
			mode?: 'selfService' | 'neutral' | 'askFirst';
			hideAvatars?: boolean;
			hideFABOnMobile?: boolean;
			hideFABLabelOnMobile?: boolean;
			showPrefilledCustomFields?: boolean;
			display?: {
				style?: 'icon' | 'text' | 'iconAndText' | 'manual';
				text?: string;
				textAlign?: 'left' | 'right';
				iconImage?: 'message' | 'beacon' | 'search' | 'buoy' | 'question';
				position?: 'left' | 'right';
				zIndex?: number;
			};
			messaging?: {
				chatEnabled?: boolean;
				contactForm?: {
					customFieldsEnabled?: boolean;
					showName?: boolean;
					showSubject?: boolean;
					allowAttachments?: boolean;
					showGetInTouch?: boolean;
				};
			};
			labels?: Partial<HelpScoutLabels>;
		}
	): unknown;
	(
		method: 'on' | 'once',
		event: 'open' | 'close' | 'ready',
		callback: () => void
	): unknown;
	(
		method: 'on' | 'once',
		event:
			| 'article-viewed'
			| 'message-clicked'
			| 'message-closed'
			| 'message-triggered',
		callback: (id: string) => void
	);
	(
		method: 'on' | 'once',
		event: 'chat-started',
		callback: (name: string, email: string, subject: string) => void
	);
	(
		method: 'on' | 'once',
		event: 'email-sent',
		callback: (name: string, email: string, text: string) => void
	);
	(method: 'on' | 'once', event: 'search', callback: (query: string) => void);
	(
		method: 'off',
		event: string,
		callback?: (...args: unknown[]) => void
	): unknown;
	(
		method: 'event',
		eventObject: {
			type: 'page-viewed';
			url: string;
			title: string;
		}
	): unknown;
	(method: 'session-data', data: Record<string, string>): unknown;
	(
		method: 'show-message',
		messageId: string,
		options: {
			delay?: number;
			force?: boolean;
		}
	): unknown;
	(method: 'info'): unknown;
};

export declare global {
	interface Window {
		// https://developer.helpscout.com/beacon-2/web/javascript-api/
		Beacon?: Beacon;
	}
}
