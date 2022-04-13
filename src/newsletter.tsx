import habitat from "preact-habitat";
import { NewsletterSeparate, NewsletterSeparateProps } from "./uiwiwidget/components/Newsletter/NewsletterSeparate";

import { data } from "./uiwiwidget/types";

const newsletterAnchor = document.getElementById("uiwiwidget:newsletter");

if (newsletterAnchor) {
	const dataAttribute = newsletterAnchor.getAttribute("data-cxo-conf") || "";
	const elementData: NewsletterSeparateProps = JSON.parse(dataAttribute);
	const habitatT = habitat(() => <NewsletterSeparate {...elementData} />);

	// 1. Splittest-FNP in the category Frankfurt
	// 50% of traffic: cxo-newsletter-fnp-frankfurt-nn-b-v1_0
	// 50% of traffic: cxo-newsletter-fnp-frankfurt-ts-v1_0

	// 2. Splittest-HNA in the category Verbraucher
	// 50% of traffic: cxo-newsletter-hna-verbraucher-nn-b-v1_0
	// 50% of traffic: cxo-newsletter-hna-verbraucher-ts-v1_0

	habitatT.render({
		selector: "[id='uiwiwidget:newsletter']",
		clean: true
	});
}
 

