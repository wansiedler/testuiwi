import { ComponentStory as Story, ComponentMeta as Meta } from "@storybook/react";
import { UiWiWidget } from "../../../../App";

import React from "react";
import { quizTypes, themes } from "../../../../types";

import { MockStory } from "../../Storybook/MockStore";
import { Template } from "../../Storybook/Template";
import { ageChoices } from "../ageUserStory";
import { ageMockStateBase, mockedAgeQuestion2, mockedAgeResult } from "./mockedAgeStates";

export default {
	title: "Quizzes/Age/Themes/Politik",
	component: UiWiWidget
} as Meta<typeof UiWiWidget>;

export const Question2 = Template.bind({});
Question2.decorators = [
	(story) => {
		return MockStory(story, {
			...mockedAgeQuestion2,
			theme: themes.politik
		});
	}
];

export const Result = Template.bind({});
Result.decorators = [
	(story) => {
		return MockStory(story, {
			...mockedAgeResult,
			theme: themes.politik
		});
	}
];
