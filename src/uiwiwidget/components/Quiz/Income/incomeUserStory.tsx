import { guid } from "../../../util";
import { slideTypes } from "../../../types";
import { Story } from "../../Stories/types";

const title = "Gehälter in Deutschland";
const subtext = "Vergleichen Sie sich!";
const lowestSalary = "< 500,00€";
const highestSalary = "> 6.000,00€";

export const incomeChoices = [
      {
            id: guid(),
            text: lowestSalary,
            value: 1
      },
      {
            id: guid(),
            text: "500,00€ - 1.500,00€",
            value: 2
      },
      {
            id: guid(),
            text: "1.500,00€ - 2.500,00€",
            value: 3
      },
      {
            id: guid(),
            text: "2.500,00€ - 4.000,00€",
            value: 4
      },
      {
            id: guid(),
            text: "4.000,00€ - 6.000,00€",
            value: 5
      },
      {
            id: guid(),
            text: highestSalary,
            value: 6
      }
]

export const incomeUserStory: Story[] = [
      {
            id: guid(),
            type: slideTypes.incomeStart,
            choiceAmount: 1,
            title,
            subtext,
            question: "Wie hoch ist Ihr monatliches Netto-Gehalt?",
            choices: incomeChoices
      },
      {
            id: guid(),
            type: slideTypes.incomeResult,
            subtext,
            title,
            lowestSalary,
            highestSalary
      }
];
