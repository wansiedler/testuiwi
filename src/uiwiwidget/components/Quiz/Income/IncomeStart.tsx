import React from "react";
import { selectQuiz, useAppDispatch } from "../../../store/RTKstore";
import { setSize } from "../../../store/features/quiz/quizSlice";
import { SquidGameChoice } from "../SquidGame/SquidGameChoice";
import IncomeTitle from "./IncomeTitle";
import { sizes } from "../../../types";

export const IncomeStart = ({ story, onAnswer }) => {
      useAppDispatch()(setSize(sizes.rectangular));

      return (
            <>
                  <IncomeTitle title={story.title} subtext={story.subtext} />
                  <h3 className="id-uiwi-h3 start-question">{story.question}</h3>
                  <div className="answers-wrapper">
                        <SquidGameChoice story={story} onAnswer={onAnswer} />
                  </div>
            </>
      );
};
