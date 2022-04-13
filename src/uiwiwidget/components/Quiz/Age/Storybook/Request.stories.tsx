import { UiWiWidget } from "../../../../App";
import { limbicTypes, quizTypes } from "../../../../types";
import React from "react";
import { Meta, Story } from "@storybook/react";
import { MockStore } from "../../Storybook/MockStore";
import { initialState, QuizState } from "../../../../store/features/quiz/quizSlice";

export default {
	title: "Quizzes/Age/Request",
	component: UiWiWidget,
	decorators: [
		(story, context) => {
			return <MockStore initialState={{ ...mockedState }}>{story()}</MockStore>;
		}
	],
	// argTypes: typeof AppProps,
	args: {
		...{
			clientId: 268,
			categoryName: "genuss",
			pageViewId: "a0fe5ff9-e47f-a9e4-818b-f8e43164ec64-1646760000-1052213932",
			uid: "a0fe5ff9-e47f-a9e4-818b-f8e43164ec64"
		}
	}
} as Meta<typeof UiWiWidget>;

let mockedState: QuizState = {
	...initialState
	// limbicType: limbicTypes.traditionalist,
	// currentIndex: 0
};

// const Template: Story<typeof UiWiWidget> = (args) => <UiWiWidget {...args} />;
//
// export const Request = Template.bind({});
// Request.args = {
//       variant: "variant-1"
// };
