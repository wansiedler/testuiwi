import { selectQuiz, useAppDispatch, useAppSelector } from "../../../../store/RTKstore";
import { getRandomInt } from "../../../../util";
// import {Logo} from "../../../Logo/Logo";
import { Story } from "../../../Stories/types";
import { useEffect, useState } from "react";
import { setShowProgress } from "../../../../store/features/quiz/quizSlice";

type SquidGameStartProps = {
      story: Story;
      onAnswer: () => void;
};
const SquidGameStartCounter = ({ story, onAnswer, ...props }: SquidGameStartProps) => {
      const quiz = useAppSelector(selectQuiz);
      useAppDispatch()(setShowProgress(true));
      const [users, setUsers] = useState(getRandomInt(100000));

      useEffect(() => {
            const timer = setInterval(() => {
                  setUsers(users + 1);
            }, 1000);
            return () => {
                  clearInterval(timer);
            };
      });
      return (
            <div className="quiz start-cookies">
                  {/*<Logo props={"tz"}/>*/}
                  <div className="start-image-wrapper">
                        <img className="start-image" src={story.backgroundPictures.cookies} />
                  </div>
                  <div className="start-headline-wrapper">
                        <h2 className="id-uiwi-h2 start-headline">{story.question}</h2>
                  </div>
                  <div className="start-counter">👁 {users.toLocaleString()}</div>
                  <div className="button-wrapper">
                        <button className="id-uiwi-button" onClick={onAnswer}>
                              <a className="id-uiwi-a">{story.subtext} →</a>
                        </button>
                  </div>
            </div>
      );
};
export default SquidGameStartCounter;
