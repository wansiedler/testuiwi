import React, { FC, useState } from "react";
import { useAppDispatch } from "../../../store/RTKstore";
import { setShowProgress } from "../../../store/features/quiz/quizSlice";

interface ChoiceProps {
      story: {
            choices: Array<{ correct: boolean } | string>;
      };

      answered?: { topic?: string; values?: object[] }[];

      limbicType?: string;

      onAnswer(string): void;
}

export const InterestsChoices: FC<ChoiceProps> = ({ story, onAnswer, answered = [], limbicType }) => {
      const label = (answer, idx) => {
            const input = (
                  <input
                        className="id-uiwi-input"
                        id={answer.id}
                        key={answer.id}
                        hidden={true}
                        type="radio"
                        value={answer.text}
                  />
            );
            return (
                  <label
                        key={answer.id}
                        htmlFor={answer.id}
                        onClick={(event) => {
                              event.preventDefault();
                              onAnswer(answer.text);
                        }}
                        className={`id-uiwi-label ${
                              answered.find((a) => a.topic === answer.text.toLowerCase()) ? "selected" : ""
                        } 
                        ${idx % 2 ? "right" : ""}
                        `}
                  >
                        {input}
                        {answer.text}
                  </label>
            );
      };
      return (
            <div className={"choices"}>
                  {story.choices &&
                        story.choices.map((answer, idx) => {
                              return label(answer, idx);
                        })}
            </div>
      );
};
