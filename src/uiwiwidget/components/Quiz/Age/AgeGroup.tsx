import React from "react";
import { Logo } from "../Logo/Logo";
import ProgressBar from "../../ProgressBar/ProgressBar";
import { Question } from "../Question";
// import { Subtext } from "../Subtext";
import { selectQuiz, useAppDispatch, useAppSelector } from "../../../store/RTKstore";
import { setSize } from "../../../store/features/quiz/quizSlice";
import { sizes } from "../../../types";

export default ({ story, onAnswer }) => {
      useAppDispatch()(setSize(sizes.big));
      const quiz = useAppSelector(selectQuiz);
      const label = (answer, idx) => {
            return (
                  <a
                        key={answer.id}
                        className="id-uiwi-a id-uiwi-label_inline"
                        onClick={(event) => {
                              event.preventDefault();
                              onAnswer(answer);
                        }}
                  >
                        {answer.text}
                  </a>
            );
      };
      return (
            <div className="quiz">
                  <Question question={story.question} />
                  <div className="subtitle">{story.subtext}</div>
                  <div>{story.choices && story.choices.map((answer, idx) => label(answer, idx))}</div>
                  <div className="compact">
                        {story.choices.map((item, idx) => (
                              <div className="progress-bar-wrapper age-group-progress-bar-wrapper" key={item.id}>
                                    <ProgressBar round={true} left={true} />
                              </div>
                        ))}
                  </div>
                  <Logo />
            </div>
      );
};
