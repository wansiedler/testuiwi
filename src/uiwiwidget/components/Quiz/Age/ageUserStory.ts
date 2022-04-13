import { guid } from "../../../util";
import { Story } from "../../Stories/types";
import { slideTypes } from "../../../types";

const girl = require("./images/Age-Quiz-Picture-1.jpg");
const smile = require("./images/Age-Quiz-Pic-2.jpg");
const head = require("./images/Age-Quiz-Pic-3.jpg");

const teasers = [girl, smile, head];

export const ageChoices = [
      // { id: guid(), text: "20-29" },
      { id: guid(), text: "20 - 29" },
      { id: guid(), text: "30 - 39" },
      { id: guid(), text: "40 - 49" },
      { id: guid(), text: "50 - 59" },
      { id: guid(), text: "60 - 99" }
];

const politikQuestion = "Wie schlägt sich unser Kanzler in den aktuellen Zeiten?";
const politikVotes = ["Schlecht", "Gut"];

export const grillQuestion = "Die Grillsaison ist eröffnet - Kann man sie auch vegetarisch genießen?";
const grillVotes = ["Nein, lieber mit Fleisch", "Ja, viel lieber vegetarisch"];

export const ageUserStory: { [key: string]: any } = {
      grill: {
            variants: {
                  "variant-1": [
                        {
                              id: guid(),
                              type: slideTypes?.ageVote,
                              subtext: "Vergleichen Sie sich jetzt!",
                              question: grillQuestion,
                              votes: grillVotes
                        }
                  ],
                  "variant-2": [
                        {
                              id: guid(),
                              type: slideTypes?.ageVote,
                              subtext: "Let's go!",
                              question: grillQuestion,
                              votes: grillVotes
                        }
                  ],
                  "variant-3": [
                        {
                              id: guid(),
                              type: slideTypes?.ageVote,
                              subtext: "Hier starten",
                              question: grillQuestion,
                              votes: grillVotes
                        }
                  ]
            },
            slides: [
                  {
                        id: guid(),
                        type: slideTypes?.ageGroup,
                        choiceAmount: 1,
                        question: "Interessiert wie es in Ihrer Altersgruppe aussieht?",
                        subtext: "Geben Sie jetzt ihr Alter an.",
                        choices: ageChoices
                  },
                  {
                        id: guid(),
                        question: "Danke für Ihre Teilnahme!",
                        subtext: "Ergebnisse",
                        type: slideTypes?.ageResult,
                        choices: ageChoices
                  }
            ]
      },

      politik: {
            variants: {
                  "variant-1": [
                        {
                              id: guid(),
                              type: slideTypes?.ageVote,
                              question: politikQuestion,
                              subtext: "Vergleichen Sie sich jetzt!",
                              votes: politikVotes
                        }
                  ],
                  "variant-2": [
                        {
                              id: guid(),
                              type: slideTypes?.ageVote,
                              question: politikQuestion,
                              subtext: "Let's go!",
                              votes: politikVotes
                        }
                  ],
                  "variant-3": [
                        {
                              id: guid(),
                              type: slideTypes?.ageVote,
                              question: politikQuestion,
                              subtext: "Hier starten",
                              votes: politikVotes
                        }
                  ]
            },
            slides: [
                  {
                        id: guid(),
                        type: slideTypes?.ageGroup,
                        choiceAmount: 1,
                        question: "Interessiert wie es in Ihrer Altersgruppe aussieht?",
                        subtext: "Geben Sie jetzt ihr Alter an.",
                        choices: ageChoices
                  },
                  {
                        id: guid(),
                        question: "Danke für Ihre Teilnahme!",
                        subtext: "Ergebnisse",
                        type: slideTypes?.ageResult,
                        choices: ageChoices
                  }
            ]
      }
};
