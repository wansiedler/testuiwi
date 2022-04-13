// import {Logo} from "../../Logo/Logo";
import { selectQuiz, useAppDispatch, useAppSelector } from "../../../store/RTKstore";
import { Question } from "../Question";
import { Subtext } from "../Subtext";
import { GenderChoice } from "./GenderChoice";
import React from "react";
import { setSize } from "../../../store/features/quiz/quizSlice";
import { sizes } from "../../../types";

export default ({ story, onAnswer, ...props }) => {
      props.action("pause", false);
      const quiz = useAppSelector(selectQuiz);
      useAppDispatch()(setSize(sizes.big));
      return (
            <div className="quiz">
                  <Question question={story.question} />
                  <Subtext story={story} />
                  <GenderChoice
                        story={story}
                        // answered={quiz.answeredQuestions.genderAnswers || []}
                        onAnswer={onAnswer}
                  />
                  {/*<Logo/>*/}
            </div>
      );
};
