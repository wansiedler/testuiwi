// import { Meta, Story } from "@storybook/preact";
import { ComponentStory as Story, ComponentMeta as Meta } from "@storybook/react";
import { UiWiWidget } from "../../../../App";

import React from "react";
import { quizTypes } from "../../../../types";

import { MockStory } from "../../Storybook/MockStore";
import { Template } from "../../Storybook/Template";
import { choicesFirstQuestion, choicesSecondQuestion } from "../genderUserStory";

import {
	genderMockStateBase,
	mockedGenderPicture,
	mockedGenderResultFemale,
	mockedGenderResultMale,
	mockedGenderResultNone,
	mockedGenderQuestion1,
	mockedGenderQuestion2,
	mockedGenderConfirm
} from "./mockedGenderStates";

export default {
	title: "Quizzes/Gender",
	component: UiWiWidget
} as Meta<typeof UiWiWidget>;

export const Picture = Template.bind({});
Picture.decorators = [
	(story) => {
		return MockStory(story, mockedGenderPicture);
	}
];

export const Question1 = Template.bind({});
Question1.decorators = [
	(story) => {
		return MockStory(story, mockedGenderQuestion1);
	}
];

export const Question2 = Template.bind({});
Question2.decorators = [
	(story) => {
		return MockStory(story, mockedGenderQuestion2);
	}
];

export const Confirm = Template.bind({});
Confirm.decorators = [
	(story) => {
		return MockStory(story, mockedGenderConfirm);
	}
];

export const ResultFemale = Template.bind({});
ResultFemale.decorators = [
	(story) => {
		return MockStory(story, mockedGenderResultFemale);
	}
];

export const ResultMale = Template.bind({});
ResultMale.decorators = [
	(story) => {
		return MockStory(story, mockedGenderResultMale);
	}
];

export const ResultNone = Template.bind({});
ResultNone.decorators = [
	(story) => {
		return MockStory(story, mockedGenderResultNone);
	}
];
