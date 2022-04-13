import Slider from "./Slider/Slider";
import { Logo } from "../Logo/Logo";
import { StimmeZu } from "./StimmeZu";
import * as React from "react";
import { Question } from "../Question";
import { selectQuiz, useAppDispatch, useAppSelector } from "../../../store/RTKstore";
import { setShowProgress, setSize } from "../../../store/features/quiz/quizSlice";
import { sizes } from "../../../types";

export default ({ story, onAnswer, ...props }) => {
      const quiz = useAppSelector(selectQuiz);
      useAppDispatch()(setSize(sizes.big));
      useAppDispatch()(setShowProgress(true));

      return (
            <div className="quiz">
                  <Question question={story.question} />
                  {((story.subtext || props.subtext) &&
                        <div className="subtitle">{story.subtext || props.subtext}</div>)
                  }
                  <Slider rtl={false} onFinalChange={onAnswer} />
                  <StimmeZu left={story.votes[0]} right={story.votes[1]} />
                  <Logo/>
            </div>
      );
};
