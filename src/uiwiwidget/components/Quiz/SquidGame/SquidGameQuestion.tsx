import React from "react";
import { selectQuiz, useAppSelector } from "../../../store/RTKstore";
// import {Logo} from "../../Logo/Logo";
import { SquidGameChoice } from "./SquidGameChoice";

/**
 * Component for displaying Squid Game questions.
 * @param param
 * @returns
 */
const SquidGameQuestion = ({ story, onAnswer, ...props }) => {
      const quiz = useAppSelector(selectQuiz);
      return (
            <>
                  {/*<Logo props={"tz"}/>*/}
                  <div className="question-header-bar">
                        <h2 className="id-uiwi-h2">{story.question}</h2>
                  </div>
                  <div className="question-container">
                        <div className="question-image-wrapper">
                              <img className="question-image" src={story.backgroundPicture} />
                        </div>
                        <div className="question-right-container">
                              <div className="question-subtext-header">{story.title}</div>
                              <div className="question-main-text">{story.subtext}</div>
                              <div className="question-grid">
                                    <SquidGameChoice story={story} onAnswer={onAnswer} />
                              </div>
                        </div>
                  </div>
            </>
      );
};
export default SquidGameQuestion;
