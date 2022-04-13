import React from "react";
import { Logo } from "../Logo/Logo";
import { selectQuiz, useAppDispatch, useAppSelector } from "../../../store/RTKstore";
import { Question } from "../Question";
// import { Subtext } from "../Subtext";
import { Choice } from "./Choice";
import { setShowProgress } from "../../../store/features/quiz/quizSlice";

export default ({ story, onAnswer, ...props }) => {
      const quiz = useAppSelector(selectQuiz);
      const dispatch = useAppDispatch();
      dispatch(setShowProgress(true));
      // console.log(story)
      return (
            <div className="quiz">
                  <Question question={story.question} subtext={story.subtext} />
                  {/*<Subtext story={story} />*/}
                  <Choice
                        story={story}
                        answered={quiz.answeredQuestions.interests}
                        onAnswer={onAnswer}
                        inline={false}
                        topic={story.topic && story.topic}
                  />
                  <Logo />
            </div>
      );
};
