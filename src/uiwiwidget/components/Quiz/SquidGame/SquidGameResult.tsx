import React, { useEffect } from "react";
import { selectQuiz, useAppDispatch, useAppSelector } from "../../../store/RTKstore";
import { setFinished } from "../../../store/features/quiz/quizSlice";
// import {Logo} from "../../Logo/Logo";
import { guid } from "../../../util";

const getResult = (answers) => {

      const persons = [
            {
                  name: "Cho Sang-Woo",
                  picture: require("./images/Present-218.png"),
                  text: "Du weißt deine Stärken einzu- schätzen und damit umzugehen!"
            },
            {
                  name: "der alte Mann",
                  picture: require("./images/Present-001.png"),
                  text: "Du kannst alle hinters Licht führen!"
            },
            {
                  name: "Han Mi-Nyeo",
                  picture: require("./images/Present-212.png"),
                  text: "Die Verrückte!"
            },
            {
                  name: "Seong Gi-Hun",
                  picture: require("./images/Present-456.png"),
                  text: "Du hast mehr Glück als Verstand!"
            },
            {
                  name: "Ji-Yeong",
                  picture: require("./images/Present-067.png"),
                  text: "Die Einzelkämpferin!"
            },
            {
                  name: "der Doktor",
                  picture: require("./images/Present-111.png"),
                  text: "Lerne deine Stärken besser einzusetzen!"
            }
      ];
      const results = [
            {
                  choices: [
                        {
                              id: guid(),
                              text: "Konzentriere ich mich auf mich selbst."
                        },
                        {
                              id: guid(),
                              text: "Kann ich mich kaum kontrollieren."
                        },
                        { id: guid(), text: "Verlasse ich mich auf andere." },
                        { id: guid(), text: "Lenke ich mich ab." }
                  ]
            },
            {
                  choices: [
                        {
                              id: guid(),
                              text: "Ich habe (noch) keinen Abschluss"
                        },
                        { id: guid(), text: "Haupt- oder Realschulabschluss" },
                        { id: guid(), text: "(Fach-) Abitur" },
                        { id: guid(), text: "Hochschulabschluss" }
                  ]
            }
      ];
      switch (answers[0]) {
            case "Konzentriere ich mich auf mich selbst.":
                  switch (answers[1]) {
                        case "Ich habe (noch) keinen Abschluss":
                              return persons[4];
                        case "Haupt- oder Realschulabschluss":
                              return persons[4];
                        case "(Fach-) Abitur":
                              return persons[0];
                        case "Hochschulabschluss":
                              return persons[0];
                        default:
                              return persons[0];
                  }
            case "Kann ich mich kaum kontrollieren.":
                  switch (answers[1]) {
                        case "Ich habe (noch) keinen Abschluss":
                              return persons[2];
                        case "Haupt- oder Realschulabschluss":
                              return persons[2];
                        case "(Fach-) Abitur":
                              return persons[5];
                        case "Hochschulabschluss":
                              return persons[5];
                        default:
                              return persons[0];
                  }
            case "Verlasse ich mich auf andere.":
                  switch (answers[1]) {
                        case "Ich habe (noch) keinen Abschluss":
                              return persons[3];
                        case "Haupt- oder Realschulabschluss":
                              return persons[3];
                        case "(Fach-) Abitur":
                              return persons[1];
                        case "Hochschulabschluss":
                              return persons[1];
                        default:
                              return persons[0];
                  }
            case "Lenke ich mich ab.":
                  switch (answers[1]) {
                        case "Ich habe (noch) keinen Abschluss":
                              return persons[2];
                        case "Haupt- oder Realschulabschluss":
                              return persons[2];
                        case "(Fach-) Abitur":
                              return persons[1];
                        case "Hochschulabschluss":
                              return persons[1];
                        default:
                              return persons[0];
                  }
            default:
                  return persons[0];
      }
      // return randomize(persons);
};
const SquidGameResult = ({ story, ...props }) => {
      props.action("pause", false);
      const quiz = useAppSelector(selectQuiz);
      const dispatch = useAppDispatch();
      useEffect(() => {
            dispatch(setFinished());
      }, []);
      const answers = quiz.answeredQuestions.squidGameAnswers;
      const winner = getResult(answers);
      return (
            <>
                  {/*<Logo props={"tz"}/>*/}
                  <div className="question-header-bar">
                        <h2 className="id-uiwi-h2">{story.question}</h2>
                  </div>
                  <div className="question-container">
                        <div className="question-image-wrapper">
                              {/*<img className="question-image" src={story.backgroundPicture}/>*/}
                              <img className="question-image" src={winner.picture} />
                        </div>
                        <div
                              className="question-right-container-answer"
                              // style={{
                              //     paddingTop: 30
                              // }}
                        >
                              <div className="question-main-text">
                                    <div>
                                          {/*<p className="answer-text">{story.subtext}</p>*/}
                                          <p className="answer-text">Du bist {winner.name}!</p>
                                          {/*<p className="answer-subtext">{story.subtext2}</p>*/}
                                          <p className="answer-subtext">{winner.text}</p>
                                    </div>
                              </div>
                        </div>
                  </div>
            </>
      );
};
export default SquidGameResult;
