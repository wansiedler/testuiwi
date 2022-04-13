import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "./uiwiwidget/App";

test("App rendered", () => {
	const { container } = render(<App/>);
	// const linkElement = screen.getByTestId(/UIWIWidget/i);
	// const linkElement = screen.getByTestId(/UIWIWidgetContainer/i);
	const linkElement = container.querySelector("#UIWIWidgetContainer");

	expect(linkElement).toBeInTheDocument();
});
 
