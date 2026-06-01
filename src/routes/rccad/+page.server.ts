const DOC_ID = '1T4U5VOsDqcmou5giRA20IkG3fDiiY_yvRYNOpNfrU1I';

export async function load({ fetch }) {
	try {
		const url = `https://docs.google.com/document/d/${DOC_ID}/export?format=html`;
		const res = await fetch(url);

		if (!res.ok) {
			return { html: '', error: true };
		}

		let rawHtml = await res.text();

		// 1. Strip the "Office Rent" or "Office Rental" title paragraph (handling spans and non-breaking spaces)
		rawHtml = rawHtml.replace(
			/<p[^>]*>(?:<span[^>]*>)?[\s\u00A0]*Office[\s\u00A0]*Rent(?:al)?[\s\u00A0]*(?:<\/span>)?<\/p>/gi,
			''
		);

		// 2. Identify the first image and replace its parent paragraph with a full-width banner
		const firstImgMatch = rawHtml.match(/<img[^>]+src="([^"]+)"[^>]*>/i);
		if (firstImgMatch) {
			const firstImgSrc = firstImgMatch[1];
			const paragraphs = rawHtml.match(/<p[^>]*>[\s\S]*?<\/p>/gi);
			if (paragraphs) {
				for (const p of paragraphs) {
					if (p.includes(firstImgSrc)) {
						rawHtml = rawHtml.replace(p, `<div class="full-width-banner"><img src="${firstImgSrc}" alt="Banner" /></div>`);
						break;
					}
				}
			}
		}

		// 3. Inject styles: Override Google's layout to go edge-to-edge, and center everything else
		const enhancedHtml = rawHtml.replace(
			'</head>',
			`<style>
				/* Override Google's default constrained body styles */
				html, body {
					background-color: #ffffff !important;
					padding: 0 !important;
					margin: 0 !important;
					max-width: 100% !important;
					width: 100% !important;
				}
				
				/* Full width banner container - keeps original height, crops horizontally */
				.full-width-banner {
					width: 100vw !important;
					max-width: 100vw !important;
					height: 350px !important; /* Keep original vertical height */
					margin: 0 !important;
					padding: 0 !important;
					overflow: hidden !important;
				}
				.full-width-banner img {
					width: 100% !important;
					max-width: 100% !important;
					height: 100% !important;
					object-fit: cover !important;
					object-position: center !important;
					display: block !important;
				}

				/* Center and constrain all other direct content elements */
				body > *:not(.full-width-banner) {
					max-width: 816px !important;
					margin-left: auto !important;
					margin-right: auto !important;
					padding-left: 40px !important;
					padding-right: 40px !important;
					box-sizing: border-box !important;
				}

				/* Ensure nested images in the content center properly */
				body > *:not(.full-width-banner) img {
					max-width: 100% !important;
					height: auto !important;
				}
			</style></head>`
		);

		return { html: enhancedHtml, error: false };
	} catch (err) {
		console.error('Failed to fetch Google Doc:', err);
		return { html: '', error: true };
	}
}
