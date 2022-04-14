import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "../uiwiwidget/App";
import { ageUserStory } from "../uiwiwidget/components/Quiz/Age/ageUserStory";
import { QuizState } from "../uiwiwidget/store/RTKstore";
import { ageMockStateBase } from "../uiwiwidget/components/Quiz/Age/Storybook/mockedAgeStates";
import { sizes, variants } from "../uiwiwidget/types";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import quizSlice from "../uiwiwidget/store/features/quiz/quizSlice";

import fetchMock from "jest-fetch-mock";
import "jest-fetch-mock";
import * as API from "../uiwiwidget/quizAction";
// const axios = require("axios");
// jest.mock("axios");

export const createReduxStore = (initialState = null) => {
	return configureStore({
		reducer: quizSlice,
		preloadedState: initialState
	});
};

export const renderTestApp = (component, options) => {
	const store = createReduxStore(options?.initialState);

	return <Provider store={store}>{component}</Provider>;
};

// test("App rendered", async () => {
//       const { container } = render(
//             <App
//                   {...{
//                         categoryName: "genuss",
//                         clientId: 268,
//                         uid: "1212-12412-12412"
//                   }}
//             />
//       );
//       // const linkElement = screen.getByTestId(/UIWIWidget/i);
//       // const linkElement = screen.getByTestId(/UIWIWidgetContainer/i);
//
//       expect(await container.querySelector("#UIWIWidgetContainer")).toBeInTheDocument();
// });

beforeEach(() => {
	// if you have an existing `beforeEach` just add the following line to it
	// fetchMock.doMock();
	jest.spyOn(API, "fetchMetaExperimentId").mockImplementation(() => new Promise((res) => setTimeout(() => res("cxo-meta-experiment-west-merkur-genuss-nn-v3_0"), 10)));
	jest.spyOn(API, "fetchExperimentData").mockImplementation(() => new Promise((res) => setTimeout(() => res({
		"result": {
			"variant": variants["variant-3"],
			"parameters": null,
			"sub_experiment": "age-grill-genuss",
			"meta_experiment_variant": "variant-3"
		}
	}), 10)));
	jest.spyOn(API, "getGadget").mockImplementation(() => new Promise((res) => setTimeout(() => res("Gadget"), 10)));
});
it("renders first slide", async () => {
	const story = ageUserStory.grill.variants["variant-1"][0];
	const question = story.question;
	let initState: QuizState = ageMockStateBase;

	initState = {
		...initState,
		stories: [story],
		theme: "grill"
	};
	// fetchMock.mockResponseOnce(JSON.stringify({ data: "12345" }));
	const { container, getByText } = await render(
		renderTestApp(
			<App
				{...{
					categoryName: "genuss",
					clientId: 268,
					uid: "1212-12412-12412"
				}}
			/>,
			{
				initialState: initState
			}
		)
	);

	// axios.get.mockReturnValue(response);
	// const data = await getData()
	// expect(axios.get).toBeCalledTimes(1);
	// expect(data).toEqual(['1', '2', 3])
	// expect(data).toMatchSnapshot()

	// expect(await container.querySelector("#UIWIWidget")).toBeInTheDocument();
	// expect(await screen.getByText(question)).toBeInTheDocument();
	// = screen.getByTestId(/UIWIWidgetContainer/i);
	// expect(await screen.findByText(/loaded/i)).toBeInTheDocument();
	expect(await container.querySelector("#UIWIWidgetContainer")).toBeInTheDocument();

});
//
// it("should find a result via fetch", () => {
//       return fetch("http://www.google.com")
//             .then(() => console.log("Success"))
//             .catch((err) => console.log("Error!!!!" + err));
// });
