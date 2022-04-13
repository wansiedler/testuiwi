import { render } from "@testing-library/react";
import React from "react";

test("renders a message", () => {
	const { container, getByText } = render(<div>Hello, world!</div>);
	expect(getByText("Hello, world!")).toBeInTheDocument();
	// expect(container.firstChild).toMatchInlineSnapshot(`
	//   <h1>Hello, World!</h1>
	// `);
});

 
