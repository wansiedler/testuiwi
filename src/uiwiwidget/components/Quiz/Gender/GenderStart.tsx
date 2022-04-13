import React, { useEffect, useRef, useState } from "react";
import { setShowProgress, setSize } from "../../../store/features/quiz/quizSlice";
import { selectQuiz, useAppDispatch, useAppSelector } from "../../../store/RTKstore";
// import {Logo} from "../../Logo/Logo";
import { sizes } from "../../../types";
import { getVariantPicture } from "../../../quizAction";

const garden_of_earthly_delights = require("./images/garden-of-earthly-delights.jpg");
export const teasers = [
      require("./images/Gender-Quiz-Pic-1.jpg"),
      require("./images/Gender-Quiz-Pic-2.jpg"),
      require("./images/Gender-Quiz-Pic-3.jpg")
];

const GenderStart = ({ story, onAnswer, ...props }) => {
      // props.action("pause", false);
      const quiz = useAppSelector(selectQuiz);
      const dispatch = useAppDispatch();
      dispatch(setShowProgress(false));
      dispatch(setSize(sizes.small));

      return (
            <div
                  className="quiz"
                  // data-id-elavtr={`{"experimentId":"${quiz.experimentId}","experimentVariantId":"${quiz.variantId}","experimentRoundNr":${quiz.experimentRoundNr}}`}
            >
                  <h2 className="id-uiwi-h2 start-title">{story.question}</h2>

                  <div
                        className={"gender-start-picture"}
                        style={{
                              background: `no-repeat center center url(${getVariantPicture(story.teasers, quiz.variantId)})`
                              // opacity: 0.43,
                        }}
                  />
                  <div className="gender-quiz-question-mark">?</div>
                  <div
                        style={{
                              paddingTop: 10
                        }}
                  >
                        {}
                        <button onClick={onAnswer} className="id-uiwi-button start_button">
                              <a
                                    // data-id-elctr={`{"experimentId":"${quiz.experimentId}","experimentVariantId":"${quiz.variantId}","experimentRoundNr":${quiz.experimentRoundNr}}`}
                                    onClick={(event) => {
                                          event.preventDefault();
                                    }}
                              >
                                    Start
                              </a>
                        </button>
                  </div>
                  {/*<Logo/>*/}
            </div>
      );
};
export default GenderStart;
