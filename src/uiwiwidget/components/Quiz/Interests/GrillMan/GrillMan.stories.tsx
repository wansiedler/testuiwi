// import React from "react";
//
// import { ComponentMeta } from "@storybook/react";
//

//
// export default {
// 	/* 👇 The title prop is optional.
// 	* See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
// 	* to learn how to generate automatic titles
// 	*/
// 	title: "Button",
// 	component: x,
// 	//👇 Creates specific parameters for the story
// 	parameters: {
// 		backgrounds: {
// 			values: [
// 				{ name: "red", value: "#f00" },
// 				{ name: "green", value: "#0f0" },
// 				{ name: "blue", value: "#00f" }
// 			]
// 		}
// 	}
// } as ComponentMeta<typeof x>;

import React from "react";
import GrillMan, { GrillManProps } from "./index";
import { MockStory } from "../../Storybook/MockStore";

import { mockedInterests, mockedInterestsWithAnswers } from "../Storybook/mockedInterestsStates";
import { themes } from "../../../../types";
// import { Story } from "@storybook/preact";
import { ComponentStory as Story, ComponentMeta as Meta } from "@storybook/react";
import { UiWiWidget } from "../../../../App";
import { selectQuiz, useAppDispatch, useAppSelector } from "../../../../store/RTKstore";
import { capitalizeFirstLetter } from "../../../../util";
import ProgressBar from "../../../ProgressBar/ProgressBar";

const x = () => (<div></div>)
export default {
	/* 👇 The title prop is optional.
	* See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	* to learn how to generate automatic titles
	*/
	title: "Button",
	component: x,
	//👇 Creates specific parameters for the story
	parameters: {
		backgrounds: {
			values: [
				{ name: "red", value: "#f00" },
				{ name: "green", value: "#0f0" },
				{ name: "blue", value: "#00f" }
			]
		}
	}
} as Meta<typeof x>;

// export default {
// 	title: "Components/Grill Man",
// 	component: GrillMan
// } as ComponentMeta<typeof GrillMan>;

const Template = (args) => {
	const dispatch = useAppDispatch();
	const quiz = useAppSelector(selectQuiz);

	return (
		<>
			{quiz.answeredQuestions.interests.map((item, idx) => (
				<GrillMan
					key={idx}
					data={{
						// value: 50 * item.values.filter((v) => v.correct).length,
						value: 50 * item.values.filter((v) => v.correct).length,
						topic: capitalizeFirstLetter(item.topic)
					}}
					idx={idx}
				/>
			))}
		</>
	);
};

export const Results = Template.bind({});
Results.decorators = [
	(story) => {
		return MockStory(story, {
			...mockedInterestsWithAnswers,
			theme: themes.grill,
			currentIndex: 0
		});
	}
];
