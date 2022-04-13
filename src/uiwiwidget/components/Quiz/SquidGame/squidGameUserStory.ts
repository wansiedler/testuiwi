import { guid } from "../../../util";
import { slideTypes } from "../../../types";
import { Story } from "../../Stories/types";

const question = "Welcher Squid Game Charakter bist du?";
const cookiesImg = require("./images/Kekse_SquidGame.png");
const redManImg = require("./images/RedMan.png");
const dollGif = require("./images/doll.gif");
const presentImg = require("./images/Present.png");

export const squidGameUserStory: Story[] = [
      {
            id: guid(),
            type: slideTypes?.squidGameStart,
            question,
            subtext: "Jetzt starten",
            subtext2: "Jetzt herausfinden",
            backgroundPictures: {
                  cookies: cookiesImg,
                  redMan: redManImg,
                  doll: dollGif
            }
      },
      {
            id: guid(),
            type: slideTypes?.squidGameQuestion,
            choiceAmount: 1,
            title: "Frage 1",
            question,
            subtext: "In stressigen Situationen ...",
            choices: [
                  {
                        id: guid(),
                        text: "Konzentriere ich mich auf mich selbst."
                  },
                  { id: guid(), text: "Kann ich mich kaum kontrollieren." },
                  { id: guid(), text: "Verlasse ich mich auf andere." },
                  { id: guid(), text: "Lenke ich mich ab." }
            ],
            backgroundPicture: presentImg
      },
      {
            id: guid(),
            type: slideTypes?.squidGameQuestion,
            choiceAmount: 1,
            title: "Frage 2",
            question,
            subtext: "Mein Bildungsabschluss ist ...",
            choices: [
                  { id: guid(), text: "Ich habe (noch) keinen Abschluss" },
                  { id: guid(), text: "Haupt- oder Realschulabschluss" },
                  { id: guid(), text: "(Fach-) Abitur" },
                  { id: guid(), text: "Hochschulabschluss" }
            ],
            backgroundPicture: presentImg
      },
      {
            id: guid(),
            type: slideTypes?.squidGameResult,
            question,
            subtext: "Du bist Seong Gi-Hun!",
            subtext2: "Du hast mehr Glück als Verstand!"
      }
];
