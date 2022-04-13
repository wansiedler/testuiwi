import { ComponentStory as Story, ComponentMeta as Meta } from "@storybook/react";
import { App } from "../../App";
import { NewsletterSeparate } from "./NewsletterSeparate";

export default {
	title: "Components/Newsletter/HNA",
	component: App
} as Meta<typeof App>;

const Template: Story<typeof App> = (args) => (
	<NewsletterSeparate
		{...{
			experimentID: ["cxo-newsletter-hna-verbraucher-nn-b-v1_0", "cxo-newsletter-hna-verbraucher-ts-v1_0"],
			client: "hna-de",
			clientID: 247,
			recipientList: ["verbraucher"],
			classProp: "hna",
			variants: {
				"variant-1": {
					title: "Ihr wöchentlicher Verbraucher-Newsletter",
					subtext: "Der Newsletter mit neuen Produktinformationen und Meldungen über Rückrufe in Ihrer Region. Immer sonntags bequem in Ihr Postfach."
				},
				"variant-2": {
					title: "Der sonntägliche Verbraucher-Newsletter",
					subtext: "Unsere Redaktion fasst Verbraucherinformationen, Tipps zum Sparen und Marktveränderungen für Sie zusammen. Mit uns bleiben Sie up to date."
				},
				"variant-3": {
					title: "Nichts mehr verpassen: Produktneuheiten und Preisänderungen",
					subtext: "Mit dem wöchentlichen Verbraucher-Newsletter sind Sie immer bestens über alle Neuerungen informiert.",
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
