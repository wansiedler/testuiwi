import { ComponentStory as Story, ComponentMeta as Meta } from "@storybook/react";
import { App } from "../../App";
import { NewsletterSeparate } from "./NewsletterSeparate";

export default {
	title: "Components/Newsletter/Frankfurter",
	component: App
} as Meta<typeof App>;

const Template: Story<typeof App> = (args) => (
	<NewsletterSeparate
		{...{
			experimentID: ["cxo-newsletter-fnp-frankfurt-nn-b-v1_0", "cxo-newsletter-fnp-frankfurt-ts-v1_0"],
			client: "fnp",
			clientID: 316,
			recipientList: ["frankfurt"],
			classProp: "frankfurter",
			variants: {
				"variant-1": {
					title: "Ihr wöchentlicher Frankfurt-Newsletter",
					subtext: "Persönlich ausgewählte Meldungen des Tages aus der Stadt Frankfurt von unserer Redaktion bequem in Ihr Postfach."
				},
				"variant-2": {
					title: "Der samstägliche Frankfurt-Newsletter",
					subtext: "Unsere Redaktion fasst alle spannenden Entwicklungen aus der Bankenmetropole für Sie zusammen. Mit uns bleiben Sie up to date."
				},
				"variant-3": {
					title: "Nichts mehr verpassen: die wichtigsten Frankfurt-Updates",
					subtext: "Der samstägliche Newsletter hält Sie auf dem Laufenden, damit Sie bestens über Ihre Stadt informiert sind.",
					button: "Jetzt zum Newsletter anmelden ➞"
				}
			}
		}}
		{...args}
	/>
);

export const Variant1 = Template.bind({});
Variant1.args = {
	propVariant: "variant-1"
};
export const Variant2 = Template.bind({});
Variant2.args = {
	propVariant: "variant-2"
};

export const Variant3 = Template.bind({});
Variant3.args = {
	propVariant: "variant-3"
};

export const completedVariant1 = Template.bind({});
completedVariant1.args = {
	propVariant: "variant-1",
	propCompleted: true
};

export const completedVariant2 = Template.bind({});
completedVariant2.args = {
	propVariant: "variant-2",
	propCompleted: true
};

export const completedVariant3 = Template.bind({});
completedVariant3.args = {
	propVariant: "variant-3",
	propCompleted: true
};
