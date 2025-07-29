import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = (event) => {
	const userAgent = event.request.headers.get('user-agent') || '';
	const isBot =
		userAgent.includes('bot') || userAgent.includes('crawl') || userAgent.includes('spider');

	return {
		isMac: userAgent.includes('Mac') || isBot
	};
};
