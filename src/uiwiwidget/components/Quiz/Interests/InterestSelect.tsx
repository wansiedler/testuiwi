import React from "react";
import { Logo } from "../Logo/Logo";
import { selectQuiz, useAppDispatch, useAppSelector } from "../../../store/RTKstore";
import { Question } from "../Question";
// import { Subtext } from "../Subtext";
import { InterestsChoices } from "./InterestsChoices";
import { setShowProgress, setSize } from "../../../store/features/quiz/quizSlice";
import { sizes } from "../../../types";

export default ({ story, onAnswer, limbicType, dataAttrib, ...props }) => {
      // console.log(dataAttrib)
      // props.action("pause", false)

      const dispatch = useAppDispatch();
      dispatch(setShowProgress(false));
      dispatch(setSize(sizes.big));

      const quiz = useAppSelector(selectQuiz);
      return (
            <div
                  className="quiz"
                  // data-id-elavtr={`{"experimentId":"${quiz.experimentId}","experimentVariantId":"${quiz.variantId}","experimentRoundNr":${quiz.experimentRoundNr}}`}
                  // data-id-elctr={(dataAttrib) ? dataAttrib : ""}
            >
                  <Question question={story.question} />
                  {/*<Subtext story={story} />*/}
                  <InterestsChoices
                        story={story}
                        answered={quiz.answeredQuestions.interests}
                        onAnswer={onAnswer}
                        limbicType={limbicType}
                  />
                  <Logo />
            </div>
      );
};
