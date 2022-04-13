import { ComponentStory as Story, ComponentMeta as Meta } from "@storybook/react";
import { UiWiWidget } from "../../../../App";

import React from "react";
import { quizTypes, themes } from "../../../../types";

import { MockStory } from "../../Storybook/MockStore";
import { Template } from "../../Storybook/Template";
import { ageChoices } from "../ageUserStory";
import { ageMockStateBase } from "./mockedAgeStates";

export default {
	title: "Quizzes/Age/Themes/Grill/Start",
	component: UiWiWidget
} as Meta<typeof UiWiWidget>;

export const Variant1 = Template.bind({});
Variant1.decorators = [
	(story) => {
		return MockStory(story, {
			...ageMockStateBase,
			theme: themes.grill
		});
	}
];

export const Variant2 = Template.bind({});
Variant2.decorators = [
	(story) => {
		return MockStory(story, {
			...ageMockStateBase,
			theme: themes.grill,
			variantId: "variant-2"
		});
	}
];

export const Variant3 = Template.bind({});
Variant3.decorators = [
	(story) => {
		return MockStory(story, {
			...ageMockStateBase,
			theme: themes.grill,
			variantId: "variant-3"
		});
	}
];
