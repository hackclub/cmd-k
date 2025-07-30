const content = [
	{
		name: 'Welcome to cmd + k',
		content: [
			{
				name: 'What is this?',
				short: 'About',
				type: 'Walkthrough',
				icon: '/what-this.svg',
				action: {
					type: 'page',
					text: 'Open Walkthrough',
					key: 'enter',
					value: '/guide/about'
				}
			},
			{
				name: 'Request a Windows invite',
				type: 'Quicklink',
				icon: '/invite.svg',
				action: {
					type: 'link',
					text: 'Open in New Tab',
					key: 'enter',
					value: 'https://submit.hackclub.com/cmdkreq'
				}
			},
			{
				name: 'Submit your extension',
				type: 'Quicklink',
				icon: '/submit.svg',
				action: {
					type: 'link',
					text: 'Open in New Tab',
					key: 'enter',
					value: 'https://submit.hackclub.com/cmdk'
				}
			}
		]
	},
	{
		name: 'Raycast extension guides',
		content: [
			{
				name: 'Build a Raycast extension on MacOS',
				short: 'Guide (MacOS)',
				type: 'Guide',
				icon: '/mac.svg',
				action: {
					type: 'page',
					text: 'Open Guide',
					key: 'enter',
					value: '/guide/mac'
				}
			},
			{
				name: 'Build a Raycast extension on Windows',
				short: 'Guide (Windows)',
				type: 'Guide',
				icon: '/windows.svg',
				action: {
					type: 'page',
					text: 'Open Guide',
					key: 'enter',
					value: '/guide/windows'
				}
			}
		]
	},
	{
		name: 'Other resources',
		content: [
			{
				name: 'Raycast developer documentation',
				type: 'Quicklink',
				icon: '/docs.svg',
				action: {
					type: 'link',
					text: 'Open in New Tab',
					key: 'enter',
					value: 'https://developers.raycast.com'
				}
			},
			{
				name: 'Slack channel',
				type: 'Quicklink',
				icon: '/slack.svg',
				action: {
					type: 'link',
					text: 'Open Slack',
					key: 'enter',
					value: 'https://hackclub.slack.com/archives/C0981BXG124'
				}
			}
		]
	}
];

export function getContent(mainPage: boolean) {
	if (!mainPage) {
		// add a back to home to "welcome to cmd + k"
		return [
			{
				name: content[0].name,
				content: [
					{
						name: 'Back to Home',
						type: 'Quicklink',
						icon: '/home.svg',
						action: {
							type: 'page',
							text: 'Back to Home',
							key: 'enter',
							value: '/'
						}
					},
					...content[0].content
				]
			},
			...content.slice(1)
		];
	}
	return content;
}
