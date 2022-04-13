import React, { useEffect } from "react";
import ProgressBar from "../../ProgressBar/ProgressBar";
import { Logo } from "../Logo/Logo";
import { getRandomInt, capitalizeFirstLetter } from "../../../util";
import { Question } from "../Question";
import { selectQuiz, useAppDispatch, useAppSelector } from "../../../store/RTKstore";
import { setFinished, setShowProgress } from "../../../store/features/quiz/quizSlice";
import { newsLetter } from "../../../quizAction";
import { themes } from "../../../types";
import GrillMan from "./GrillMan";

export default ({ story, ...props }) => {
      // props.action("pause", false)
      const dispatch = useAppDispatch();
      const quiz = useAppSelector(selectQuiz);
      const choices = quiz.answeredQuestions.interests.map((interest) => {
            return interest;
      });
      dispatch(setShowProgress(true));
      // const choices = quiz.answeredQuestions.interests;
      useEffect(() => {
            dispatch(setFinished());
            // dispatch(setInteractive());
      }, []);
      const getInterestsResults = () => {
            return choices.map((item, key) => (
                  <div className="interests-result-progress" key={key}>
                        {/*<span className="id-uiwi-span tab">{item.topic}</span>*/}
                        <span className="result-label">{capitalizeFirstLetter(item.topic)}</span>
                        <ProgressBar
                              completed={50 * item.values.filter((v) => v.correct && v.correct).length}
                              // show={false}
                              round={true}
                              interestResultLabel={item.values.filter((v) => v.correct && v.correct).length}
                              selectedAnswer={true}
                        />
                  </div>
            ));
      };
      return (
            <div className="quiz">
                  <div>
                        <Question question={story.question} />
                        {story.subtext && <div className="id-uiwi-label_ergebnis"> {story.subtext} </div>}

                        {(quiz.theme !== themes.grill && (
                              <>
                                    <div className="id-uiwi-label_ergebnis">
                                          <span className="label_ergebnis-title">Expertenstatus:</span> <br />
                                          Sie sind im Vergleich zu unseren Lesern {" "}
                                          <span style={{ fontWeight: 600 }}>20%</span> besser!
                                          Herzlichen Glückwunsch.
                                    </div>
                                    <div className="answer-results-container">{getInterestsResults()}</div>
                              </>
                        )) || (
                              <div style={{ display: "flex" }}>
                                    {quiz.answeredQuestions.interests.map((item, idx) => (
                                          <GrillMan
                                                key={idx}
                                                data={{
                                                      // value: 50 * item.values.filter((v) => v.correct).length,
                                                      value: 50 * item.values.filter((v) => v.correct).length,
                                                      topic: capitalizeFirstLetter(item.topic)
                                                }}
                                                idx={idx}
                                          />
                                    ))}
                              </div>
                        )}
                        {/*<button
                              className="id-uiwi-label"
                              style={{
                                    font: "normal normal bold 20px/23px Arial",
                                    letterSpacing: 1.3,
                                    color: "#FFFFFF"
                              }}
                              onClick={() => dispatch(newsLetter())}
                        >
                              Newsletter abonnieren
                        </button>*/}
                  </div>
                  <Logo />
            </div>
      );
};
