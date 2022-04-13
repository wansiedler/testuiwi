import { ComponentStory as Story, ComponentMeta as Meta } from "@storybook/react";
import { UiWiWidget } from "../../../../App";

import React from "react";
import { quizTypes } from "../../../../types";

import { MockStory } from "../../Storybook/MockStore";
import { Template } from "../../Storybook/Template";
import { incomeUserStory } from "../incomeUserStory";
import { mockedIncomeStart, mockedIncomeResult } from "./mockedIncomeStates";

export default {
	title: "Quizzes/Income",
	component: UiWiWidget,
	decorators: [
		(story) => {
			return MockStory(story, mockedIncomeStart);
		}
	],
	args: {
		experimentId: "storybook",
		quizType: quizTypes.income
	}
} as Meta<typeof UiWiWidget>;

export const Question = Template.bind({});

export const Result = Template.bind({});
Result.decorators = [
	(story) => {
		return MockStory(story, mockedIncomeResult);
	}
];
