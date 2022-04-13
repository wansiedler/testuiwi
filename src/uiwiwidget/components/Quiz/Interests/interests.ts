import { guid } from "../../../util";
import { slideTypes as types } from "../../../types";

// const girl = require("./images/girl.jpg");

const topics = {
      politik: "politik",
      wirtschaft: "wirtschaft",
      karriere: "karriere",
      corona: "corona",
      wohnen: "wohnen",
      verbraucher: "verbraucher",
      gesundheit: "gesundheit"
};

const questionSubtext = "Maximal 1 Antwort.";

export const interests = {
      politik: [
            {
                  //
                  id: guid(),
                  choiceAmount: 1,
                  type: types.interestsQuestion,
                  // backgroundPicture: girl,
                  topic: topics.politik,
                  question: "Wer war der erste Bundespräsident der BRD?",
                  subtext: questionSubtext,
                  choices: [
                        { id: guid(), text: "Theodor Heuss", correct: true },
                        { id: guid(), text: "Heinrich Lübke" },
                        { id: guid(), text: "Helmut Kohl" },
                        { id: guid(), text: "Frank-Walter Steinmeier" }
                  ]
            },
            {
                  id: guid(),
                  choiceAmount: 1,
                  type: types.interestsQuestion,
                  topic: topics.politik,
                  question: "Bei welcher Partei war Karl Lauterbach Mitglied bevor er der SPD beigetreten ist?",
                  subtext: questionSubtext,
                  choices: [
                        { id: guid(), text: "CDU", correct: true },
                        { id: guid(), text: "FDP" },
                        { id: guid(), text: "Grüne" },
                        { id: guid(), text: "Die Linke" }
                  ]
            }
      ],
      wirtschaft: [
            {
                  id: guid(),
                  choiceAmount: 1,
                  type: types.interestsQuestion,
                  topic: topics.wirtschaft,
                  question: "Was ist der all-time-high des Bitcoin?",
                  subtext: questionSubtext,
                  choices: [
                        { id: guid(), text: "61,252.56$" },
                        { id: guid(), text: "64,832.23$" },
                        { id: guid(), text: "60,203.58$" },
                        { id: guid(), text: "64,400.00$", correct: true }
                  ]
            },
            {
                  id: guid(),
                  choiceAmount: 1,
                  type: types.interestsQuestion,
                  topic: topics.wirtschaft,
                  question: "Wie groß ist der E-Auto Anteil am PKW-Markt im Jahr 2021?",
                  subtext: questionSubtext,
                  choices: [
                        { id: guid(), text: "8,6%" },
                        { id: guid(), text: "11,4%" },
                        { id: guid(), text: "13,6%", correct: true },
                        { id: guid(), text: "10,9%" }
                  ]
            }
      ],
      karriere: [
            {
                  id: guid(),
                  choiceAmount: 1,
                  type: types.interestsQuestion,
                  topic: topics.karriere,
                  question: "Wie viele Menschen waren zu Beginn der Coronakrise in Kurzarbeit (April, 2020)?",
                  subtext: questionSubtext,
                  choices: [
                        { id: guid(), text: "5.976.223" },
                        { id: guid(), text: "6.253.429" },
                        { id: guid(), text: "6.006.765", correct: true },
                        { id: guid(), text: "7.464.299" }
                  ]
            },
            {
                  id: guid(),
                  choiceAmount: 1,
                  type: types.interestsQuestion,
                  topic: topics.karriere,
                  question: "Welcher dieser Soft Skills zählte 2020 nicht zu den wichtigsten?",
                  subtext: questionSubtext,
                  choices: [
                        { id: guid(), text: "Zeitmanagement" },
                        { id: guid(), text: "Anpassungsfähigkeit" },
                        { id: guid(), text: "Kreativität" },
                        { id: guid(), text: "Ehrgeiz", correct: true }
                  ]
            }
      ],
      corona: [
            {
                  id: guid(),
                  choiceAmount: 1,
                  type: types.interestsQuestion,
                  topic: topics.corona,
                  question: "Wie heißt der Werbeslogan der Bundesregierung zur Coronaimpfung?",
                  subtext: questionSubtext,
                  choices: [
                        { id: guid(), text: "#ÄrmelHoch", correct: true },
                        { id: guid(), text: "#WirBleibenZuhause" },
                        { id: guid(), text: "#JedeSpritzeHilft" },
                        { id: guid(), text: "#WirSchaffenDas" }
                  ]
            },
            {
                  id: guid(),
                  choiceAmount: 1,
                  type: types.interestsQuestion,
                  topic: topics.corona,
                  question: "Wo brach das Coronavirus erstmalig aus?",
                  subtext: questionSubtext,
                  choices: [
                        { id: guid(), text: "Xiaogan" },
                        { id: guid(), text: "Wuhan", correct: true },
                        { id: guid(), text: "Ezhou" },
                        { id: guid(), text: "Zhengzhou" }
                  ]
            }
      ],
      wohnen: [
            {
                  id: guid(),
                  choiceAmount: 1,
                  type: types.interestsQuestion,
                  topic: topics.wohnen,
                  question: "Wie groß ist der Anteil an Eigenheimbesitzern in Deutschland?",
                  subtext: questionSubtext,
                  choices: [
                        { id: guid(), text: "42,10%", correct: true },
                        { id: guid(), text: "45,70%" },
                        { id: guid(), text: "52,30%" },
                        { id: guid(), text: "49,40%" }
                  ]
            },
            {
                  id: guid(),
                  choiceAmount: 1,
                  type: types.interestsQuestion,
                  topic: topics.wohnen,
                  question: "Welchen Namen für ein Gewächs gibt es wirklich?",
                  subtext: questionSubtext,
                  choices: [
                        { id: guid(), text: "Hau-ab-Busch" },
                        { id: guid(), text: "Finger-weg-Tulpe" },
                        { id: guid(), text: "Gleich-klatschts-Fliegenfalle" },
                        {
                              id: guid(),
                              text: "Verpiss-dich-Pflanze",
                              correct: true
                        }
                  ]
            }
      ],
      verbraucher: [
            {
                  id: guid(),
                  choiceAmount: 1,
                  type: types.interestsQuestion,
                  topic: topics.verbraucher,
                  question: "Welcher ist der Lieblingswein der Deutschen? ",
                  subtext: questionSubtext,
                  choices: [
                        { id: guid(), text: "Spätburgunder" },
                        { id: guid(), text: "Müller-Thurgau" },
                        { id: guid(), text: "Dornfelder" },
                        { id: guid(), text: "Riesling", correct: true }
                  ]
            },
            {
                  id: guid(),
                  choiceAmount: 1,
                  type: types.interestsQuestion,
                  topic: topics.verbraucher,
                  question: "Welcher ist der Lieblingskäse der Deutschen?",
                  subtext: questionSubtext,
                  choices: [
                        { id: guid(), text: "Gouda", correct: true },
                        { id: guid(), text: "Camembert" },
                        { id: guid(), text: "Emmentaler" },
                        { id: guid(), text: "Butterkäse" }
                  ]
            }
      ],
      gesundheit: [
            {
                  id: guid(),
                  choiceAmount: 1,
                  type: types.interestsQuestion,
                  topic: topics.gesundheit,
                  question: "Wie viele Menschen werden jährlich ca. in Deutschland (wortwörtlich) vom Blitz getroffen?",
                  subtext: questionSubtext,
                  choices: [
                        { id: guid(), text: "3-5", correct: true },
                        { id: guid(), text: "6-8" },
                        { id: guid(), text: "9-12" },
                        { id: guid(), text: "> 12" }
                  ]
            },
            {
                  id: guid(),
                  choiceAmount: 1,
                  type: types.interestsQuestion,
                  topic: topics.gesundheit,
                  question: "Wie viel Prozent der Deutschen leiden an einem Vitamin D3 Mangel?",
                  subtext: questionSubtext,
                  choices: [
                        { id: guid(), text: "81%" },
                        { id: guid(), text: "42%" },
                        { id: guid(), text: "56%", correct: true },
                        { id: guid(), text: "49%" }
                  ]
            }
      ]
};
