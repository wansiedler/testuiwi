import habitat from "preact-habitat";
import { App } from "./uiwiwidget/App";

import { data, quizTypes, sizes } from "./uiwiwidget/types";
import React from "react";

let elms = document.getElementsByClassName("cxo-widget-host");

Array.from(elms).map((UIWIWidgetAnchor) => {
	const elementAttribute = UIWIWidgetAnchor.getAttribute("data-cxo-conf") || "";

	const UIWIWidgetProps: data = JSON.parse(elementAttribute);

	const { render } = habitat(() => <App {...UIWIWidgetProps} />);

	render({
		selector: `[id="${UIWIWidgetAnchor.id}"]`,
		clean: true
	});
});

const UIWIWidgetAnchor = document.getElementById("cxo-widget-host");
if (UIWIWidgetAnchor) {
	const elementAttribute = UIWIWidgetAnchor.getAttribute("data-cxo-conf") || "";

	let UIWIWidgetProps = JSON.parse(elementAttribute);

	UIWIWidgetProps = {
		...UIWIWidgetProps
	};

	const { render } = habitat(() => <App {...UIWIWidgetProps} />);
	render({
		selector: "[id='cxo-widget-host']",
		clean: true
	});
}
