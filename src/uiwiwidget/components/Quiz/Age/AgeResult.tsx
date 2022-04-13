import * as React from "react";
import { useEffect } from "react";
import ProgressBar from "../../ProgressBar/ProgressBar";
import { Logo } from "../Logo/Logo";
import { getRandomInt, shuffle } from "../../../util";
import { selectQuiz, useAppDispatch, useAppSelector } from "../../../store/RTKstore";
import { Question } from "../Question";
import { setFinished, setSize } from "../../../store/features/quiz/quizSlice";
import { quizTypes, sizes, themes } from "../../../types";
import Slider from "./Slider/Slider";


export default ({ story, left, right, choices = [], content, ...props }) => {
      // const { limbicType } = props;
      // props.action("pause", false)
      const dispatch = useAppDispatch();
      useEffect(() => {
            dispatch(setFinished());
      }, []);

      let quiz = useAppSelector(selectQuiz);
      useAppDispatch()(setSize(sizes.big));

      const MIN_RANDOM_VALUE = 20;
      //For now, we can display these results randomly:
      let resultLabels = [
            "stimmen voll zu",
            "stimmen eher zu",
            "stimmen neutral",
            "stimmen eher nicht zu",
            "stimmen gar nicht zu"
      ];
      resultLabels = shuffle(resultLabels);

      const checkIfAnswerWasSelectedByUser = (item) => {
            return item !== null && (quiz.answeredQuestions.age.text === item.text);
      }

      const renderResultBars = () => {
            return choices.map((item) => {
                  if (quiz.theme === "politik") {
                        return (
                              <div key={item.id} className="progress-bar-wrapper">
                                    <span
                                          className={`id-uiwi-span left_tab ${
                                          quiz.answeredQuestions.age.text === item.text
                                                ? " selected"
                                                : ""
                                          }`}
                                    >
                                          {item.text}
                                    </span>
                                    {quiz.answeredQuestions.age && (
                                          <div
                                                {...{
                                                      className:
                                                            quiz.answeredQuestions.age.text === item.text
                                                                  ? "progress-selected"
                                                                  : "progresss"
                                                }}
                                          >
                                                <ProgressBar
                                                      completed={getRandomInt(100, MIN_RANDOM_VALUE)}
                                                      round={true}
                                                      left={true}
                                                      ageResultLabel={resultLabels.pop()}
                                                      selectedAnswer={
                                                            quiz.answeredQuestions.age.text === item.text
                                                      }
                                                />
                                          </div>
                                    )}
                              </div>
                        );
                  }
                  if (quiz.theme === "grill") {
                        return (
                              <div key={item.id} className="progress-bar-wrapper">
                                    <span className="result-label">{item.text}</span>
                                    <Slider
                                          MIN={0}
                                          MAX={100}
                                          disabled={true}
                                          rtl={false}
                                          onFinalChange={() => {}}
                                          isSelected={checkIfAnswerWasSelectedByUser(item)}
                                          valuesProps={[getRandomInt(100, MIN_RANDOM_VALUE)]}
                                    />
                              </div>
                        );
                  }
            });
      }

      return (
            <div className="quiz">
                  <div>
                        <Question
                              question={story.question}
                              answer={
                                    quiz.theme === themes.grill &&
                                    quiz.answeredQuestions.age &&
                                    quiz.answeredQuestions.age.text
                              }
                        />
                        {choices && renderResultBars()}
                  </div>
                  <Logo />
            </div>
      );
};
