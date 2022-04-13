import React from "react";
import { MockStory } from "../../Storybook/MockStore";
import { themes } from "../../../../types";
import { Story } from "@storybook/react";
import { UiWiWidget } from "../../../../App";
import { selectQuiz, useAppDispatch, useAppSelector } from "../../../../store/RTKstore";
import { capitalizeFirstLetter, getRandomInt } from "../../../../util";
import ProgressBar from "../../../ProgressBar/ProgressBar";
import Slider from "./Slider";

import "./../../../../styles/App.scss";

export default {
	title: "Components/Slider",
	component: Slider
};

const Template: Story<typeof Slider> = (args) => {
	return (
		<div className={"stories traditionalist age variant-1 big ageVote"}>
			<div className="grill" style={{ background: "none" }}>
				<Slider
					disabled={true}
					rtl={false}
					STEP={1}
					MIN={0}
					MAX={100}
					onFinalChange={() => {
					}}
					{...args}
				/>
			</div>
		</div>
	);
};

export const SliderGrill100 = Template.bind({});
SliderGrill100.args = {
	// @ts-ignore
	valuesProps: [99]
};
export const SliderGrill75 = Template.bind({});
SliderGrill75.args = {
	// @ts-ignore
	valuesProps: [75]
};
export const SliderGrill50 = Template.bind({});
SliderGrill50.args = {
	// @ts-ignore
	valuesProps: [50]
};
export const SliderGrill25 = Template.bind({});
SliderGrill25.args = {
	// @ts-ignore
	valuesProps: [25]
};
export const SliderGrill0 = Template.bind({});
SliderGrill0.args = {
	// @ts-ignore
	valuesProps: [0]
};
