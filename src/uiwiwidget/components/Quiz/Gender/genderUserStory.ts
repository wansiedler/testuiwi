import { guid } from "../../../util";
import { slideTypes } from "../../../types";
import { Story } from "../../Stories/types";

const genderPictureStart = require("./images/garden-of-earthly-delights.jpg");
export const teasers = [
      require("./images/Gender-Quiz-Pic-1.jpg"),
      require("./images/Gender-Quiz-Pic-2.jpg"),
      require("./images/Gender-Quiz-Pic-3.jpg")
];
export const genderUserStoryConfig = {
      showIdle: true
};

export const choicesFirstQuestion = [
      { id: guid(), text: "a) grün, blau, rosa", correct: true },
      { id: guid(), text: "b) lila, blau, grün" },
      { id: guid(), text: "c) braun, orange, gelb" },
      { id: guid(), text: "d) türkis, rosa, grün" }
];

export const choicesSecondQuestion = [
      { id: guid(), text: "a) Pferd" },
      { id: guid(), text: "b) Schwein" },
      { id: guid(), text: "c) Zebra", correct: true },
      { id: guid(), text: "d) Kamel" }
];

export const genderUserStory: Story[] = [
      /*{
            id: guid(),
            type: slideTypes?.genderStart,
            question: "Prägen Sie es sich gut ein!",
            teasers
      },*/
      {
            id: guid(),
            type: slideTypes?.genderPicture,
            backgroundPicture: genderPictureStart,
            question: "Prägen Sie es sich gut ein!"
      },
      {
            id: guid(),
            type: slideTypes?.genderQuestion,
            question: "Welche Farben sind auf dem Bild am dominantesten?",
            choices: choicesFirstQuestion
      },
      {
            id: guid(),
            type: slideTypes?.genderQuestion,
            question: "Welches Detail war nicht auf dem Bild zu sehen?",
            choices: choicesSecondQuestion
      },
      {
            id: guid(),
            type: slideTypes?.genderConfirm,
            question: "Es wurde festgestellt, dass sich das weibliche Geschlecht leichter Farben und das männliche Geschlecht eher Details einprägen kann.",
            subtext: "Bestätigen Sie die Forschungskenntnisse?",
            subtext2: "Sagen Sie uns Ihr Geschlecht und schauen Sie jetzt Ihr Ergebnis an. Wählen Sie ihr Geschlecht um direkt Ihr Ergebnis zu erhalten.",
            choices: [
                  { id: guid(), text: "m" },
                  { id: guid(), text: "w" }
            ]
      },
      {
            question: "Hier ist Ihr Ergebnis:",
            type: slideTypes?.genderResults
      }
];
