import React, { FC, useEffect, useState } from "react";

interface ChoiceProps {
      topic?: "string";
      story: {
            choices: Array<{ correct: boolean } | string>;
      };

      answered: {
            topic?: string;
            values?: {
                  id?: string;
            }[];
      }[];

      inline: boolean;

      onAnswer(string): void;
}

export const Choice: FC<ChoiceProps> = ({ story, answered, onAnswer, inline = false, topic = null, ...props }) => {
      // const correct = story.choices.filter((choice) => {return (typeof choice === 'object') && choice.correct})
      const interest = answered.find((a) => a.topic === topic);
      const label = (answer, idx) => {
            const input = (
                  <input
                        className="id-uiwi-input"
                        id={answer.id}
                        type="radio"
                        key={answer.id}
                        value={topic ? { [topic]: answer.text } : answer.text}
                        hidden={true}
                        onClick={(event) => {
                              event.preventDefault();
                              onAnswer(answer);
                        }}
                  />
            );
            return (
                  <label
                        key={answer.id}
                        htmlFor={answer.id}
                        // ${answered.length && correct.length ? answer.correct ? "correct" : "not_correct" : ''}
                        className={`
                ${interest && interest.values.some((a) => a.id === answer.id) ? "selected" : ""} 
                ${inline ? "label_inline" : "id-uiwi-label"} 
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
