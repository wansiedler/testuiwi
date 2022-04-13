import { UiWiWidget } from "../../../App";
import React from "react";

import { ComponentStory as Story, ComponentMeta as Meta } from "@storybook/react";

export const Template: Story<typeof UiWiWidget> = (args) => (
	<UiWiWidget
		{...{
			experimentIdProp: "storybook"
		}}
		{...args}
		{...{
			categoryName: "genuss",
			clientId: 268,
			uid: "1212-12412-12412"
		}}
	/>
);
