// import {Logo} from "../../Logo/Logo";
import { selectQuiz, useAppDispatch, useAppSelector } from "../../../store/RTKstore";
import React from "react";

export default ({ story, onAnswer, ...props }) => {
      const dispatch = useAppDispatch();
      const quiz = useAppSelector(selectQuiz);
      return (
            <div className="quiz">
                  {props.idleGender ? (
                        ""
                  ) : (
                        <div
                              //TODO: Convert to CSS
                              className="circleQuestion"
                              style={{
                                    background: `top center/200% url("${quiz.backgroundPicture}")`,
                                    opacity: 0.6
                              }}
                        />
                  )}
                  <div className="circleQuestion">
                        <div
                        //style={{
                        //>    width: 290,
                        //}}
                        >
                              <h2
                                    className="id-uiwi-h2"
                                    /*style={{
                            marginBottom: 20,
                        }}*/
                              >
                                    {story.question}
                              </h2>
                              {/*<button*/}
                              {/*    className="label"*/}
                              {/*    onClick={(event) => dispatch(newsLetter())}*/}
                              {/*>*/}
                              {/*    Trotzdem verlassen*/}
                              {/*</button>*/}
                              <button className="id-uiwi-label" onClick={onAnswer}>
                                    Ok, weiter quizzen!
                              </button>
                        </div>
                  </div>
                  {/*<Logo/>*/}
            </div>
      );
};
