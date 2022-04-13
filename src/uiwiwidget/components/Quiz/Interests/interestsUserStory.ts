import { guid } from "../../../util";
import { slideTypes } from "../../../types";
import { Story } from "../../Stories/types";

// const girl = require("./images/girl.jpg");

export enum topics {
      wirtschaft = "wirtschaft",
      politik = "politik",
      corona = "corona",
      karriere = "karriere",
      gesundheit = "gesundheit",
      verbraucher = "verbraucher",
      wohnen = "wohnen"
}

export const interestChoices = [
      { id: guid(), text: "Wirtschaft" },
      { id: guid(), text: "Politik" },
      { id: guid(), text: "Corona" },
      { id: guid(), text: "Karriere" },
      { id: guid(), text: "Gesundheit" },
      { id: guid(), text: "Verbraucher" },
      { id: guid(), text: "Wohnen" }
];

export const interestsUserStory: Story[] = [
      {
            id: guid(),
            type: slideTypes?.interestsSelect,
            // backgroundPicture: girl,
            choiceAmount: 3,
            question: "Wie ist Ihr Wissenstand im Vergleich in Ihren Interessenbereichen?",
            choices: interestChoices
      },
      {
            question: "Hier ist Ihr Ergebnis! Danke für die Teilnahme.",
            type: slideTypes?.interestsResult
      }
];
