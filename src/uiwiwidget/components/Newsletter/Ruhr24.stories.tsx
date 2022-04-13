import { ComponentStory as Story, ComponentMeta as Meta } from "@storybook/react";
import { App } from "../../App";
import { NewsletterSeparate } from "./NewsletterSeparate";

export default {
	title: "Components/Newsletter/Ruhr24",
	component: App
} as Meta<typeof App>;

const titleConfirmed = "Danke für deine Newsletter-Anmeldung!";
const subtextConfirmed =
	"Wir haben dir eine Mail mit dem Bestätigungslink gesendet - bitte schau jetzt in dein Postfach!";

const Template: Story<typeof App> = (args) => (
	<NewsletterSeparate
		{...{
			experimentID: "unset",
			classProp: "ruhr24",
			client: "ruhr24",
			clientID: 322,
			recipientList: ["daily"],
			variants: {
				"variant-1": {
					title: "Dein täglicher RUHR24-Newsletter",
					subtext: "Persönlich ausgewählte Meldungen des Tages aus unserer Redaktion bequem in dein Postfach.",
					titleConfirmed,
					subtextConfirmed,
					button: "Zum Newsletter anmelden"
				},
				"variant-2": {
					title: "Nichts mehr verpassen: die wichtigsten Updates im Überblick",
					subtext: "Der tägliche RUHR24-Newsletter hält dich auf dem Laufenden, damit du immer bestens informiert bist. Jetzt abonnieren!",
					titleConfirmed,
					subtextConfirmed,
					imageCopyright: "unsplash",
					button: "Zum Newsletter anmelden"
				},
				"variant-3": {
					title: "Der tägliche RUHR24-Newsletter informiert dich",
					subtext: "Mit uns bleibst du up to date. Unsere Redaktion fasst täglich alle spannenden Entwicklungen der Region für dich zusammen.",
					titleConfirmed,
					subtextConfirmed,
					imageCopyright: "unsplash",
					button: "Zum Newsletter anmelden"
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
