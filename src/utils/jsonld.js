/* generate json-ld metadata for chunks */

/*
Turn this: Mitchell Thorson, Pamela Ren Larson, Ian James, Frank Pompa/USA TODAY Network 

into this: 

{
	"@type": "Person",
	"name": "Mitchell Thorson, Pamela Ren Larson, Ian James, Frank Pompa"
	}
*/
function credits(credit_line='') {
	credit_line = credit_line.replace('/USA TODAY Network', '');
	if (credit_line) {
		return {
			"@type": "Person",
			"name": credit_line
		}
	}
}

function video(chunk, content) {
	
	return {
		"@type": "VideoObject",
		"name": chunk.title,
		"description": chunk.share_text || chunk.description,
		"thumbnailUrl": chunk.share_image || content.share_image,
		"uploadDate": new Date(content.date),
	}
}

function graphic(chunk, content) {
	
	return {
		"@type": "Article",
		"mainEntityOfPage": {
		  "@type": "WebPage",
		  "@id": `https://www.desertsun.com/poisoned-cities/${chunk.next_full}/${chunk.slug}/`,
		},
		"headline": chunk.headline || chunk.title,
		"image": [
			chunk.image,
			chunk.share_image,
		].filter(Boolean).map(url => {
			return {
				"@type": "ImageObject",
				url,
			}
		})[0],
		"datePublished": new Date(content.date),
		"dateModified": new Date(),
		"author": credits(chunk.credits),
	}
}

export function jsonld(chunk, content) {
	
	const data = {
		"@context": "http://schema.org",
		"publisher": {
		  "@type": "Organization",
		  "name": "Desert Sun",
		  "logo": {
		    "@type": "ImageObject",
		    "url": "https://www.gannett-cdn.com/sites/desertsun/images/site-nav-logo@2x.png"
		  }
		}
	}

	switch (chunk.type) {
		case "Video":
		case "VR":

		Object.assign(data, video(chunk, content));
		break;

		default:

		Object.assign(data, graphic(chunk, content));
	}

	return data;
}
