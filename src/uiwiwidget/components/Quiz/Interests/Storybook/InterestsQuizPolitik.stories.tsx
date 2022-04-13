import { ComponentStory as Story, ComponentMeta as Meta } from "@storybook/react";
import { getStore } from "../../../../store/RTKstore";
import { UiWiWidget } from "../../../../App";

import React from "react";
import { AppProps, limbicTypes, quizTypes, themes } from "../../../../types";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { MockStory } from "../../Storybook/MockStore";
import { Template } from "../../Storybook/Template";

const { wirtschaft, politik, corona } = topics;
import { mockedInterests, mockedInterestsWithAnswers } from "./mockedInterestsStates";
import { topics } from "../interestsUserStory";
import { interests } from "../interests";

export default {
	title: "Quizzes/Interests/Themes/Politik",
	component: UiWiWidget
} as Meta<typeof UiWiWidget>;

export const Start = Template.bind({});
Start.decorators = [
	(story) => {
		return MockStory(story, {
			...mockedInterests,
			theme: themes.politik,
			currentIndex: 0
		});
	}
];

export const Question1 = Template.bind({});
Question1.decorators = [
	(story) => {
		return MockStory(story, {
			...mockedInterestsWithAnswers,
			theme: themes.politik,
			currentIndex: 1
		});
	}
];

export const Question2 = Template.bind({});
Question2.decorators = [
	(story) => {
		return MockStory(story, {
			...mockedInterestsWithAnswers,
			theme: themes.politik,
			currentIndex: 2
		});
	}
];

export const Question3 = Template.bind({});
Question3.decorators = [
	(story) => {
		return MockStory(story, {
			...mockedInterestsWithAnswers,
			theme: themes.politik,
			currentIndex: 3
		});
	}
];

export const Question4 = Template.bind({});
Question4.decorators = [
	(story) => {
		return MockStory(story, {
			...mockedInterestsWithAnswers,
			theme: themes.politik,
			currentIndex: 4
		});
	}
];

export const Question5 = Template.bind({});
Question5.decorators = [
	(story) => {
		return MockStory(story, {
			...mockedInterestsWithAnswers,
			theme: themes.politik,
			currentIndex: 5
		});
	}
];

export const Question6 = Template.bind({});
Question6.decorators = [
	(story) => {
		return MockStory(story, {
			...mockedInterestsWithAnswers,
			theme: themes.politik,
			currentIndex: 6
		});
	}
];

export const Result = Template.bind({});
Result.decorators = [
	(story) => {
		return MockStory(story, {
			...mockedInterestsWithAnswers,
			theme: themes.politik,
			currentIndex: 7
		});
	}
];
