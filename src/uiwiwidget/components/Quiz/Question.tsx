import React from "react";
import { selectQuiz, useAppSelector } from "../../store/RTKstore";
import { themes } from "../../types";

/**
 * Renders question of a quiz slide
 * @param question - story.question
 * @param subtext - story.subtext (optional)
 */
export const Question: React.FC<{
      question: string;
      subtext?: string;
      answer?: string;
}> = ({ question, subtext, answer }) => {
      return (
            <div className="question-overlay">
                  <div className="question" />
                  <div className="question-header">
                        <div>
                              <h3 className="id-uiwi-h3">{question}</h3>
                              {subtext ? <div className="id-uiwi-span">{subtext}</div> : null}
                        </div>
                        {answer && (
                              <div
                                    id={"age_result"}
                                    style={{
                                          background: "#B31D04",
                                          textAlign: "center",
                                          minWidth: 100,
                                          height: 60,
                                          width: 150,
                                          verticalAlign: "middle",
                                          color: "white",
                                          position: "absolute",
                                          font: "normal normal normal 20px/40px Arial",
                                          transform: "translate(0, 65px)",
                                          boxShadow: "0px 4px 8px #0000008C",
                                          margin: "0 auto"
                                    }}
                              >
                                    <div>{answer}</div>
                              </div>
                        )}
                  </div>
            </div>
      );
};
