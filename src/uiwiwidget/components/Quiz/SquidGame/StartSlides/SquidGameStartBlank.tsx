import { selectQuiz, useAppDispatch, useAppSelector } from "../../../../store/RTKstore";
// import {Logo} from "../../../Logo/Logo";
import { Story } from "../../../Stories/types";
import { setShowProgress } from "../../../../store/features/quiz/quizSlice";

type SquidGameStartProps = {
      story: Story;
      onAnswer: () => void;
};
const SquidGameStartBlank = ({ story, onAnswer, ...props }: SquidGameStartProps) => {
      const quiz = useAppSelector(selectQuiz);
      useAppDispatch()(setShowProgress(true));
      return (
            <div className="quiz start-soldier">
                  {/*<Logo props={"tz"}/>*/}
                  <div className="start-soldier-container">
                        <div className="start-headline-wrapper">
                              <h2 className="id-uiwi-h2 start-headline">{story.question}</h2>

                              <button className="id-uiwi-button" onClick={onAnswer}>
                                    <a
                                          onClick={(event) => {
                                                event.preventDefault();
                                          }}
                                    >
                                          {story.subtext2} →
                                    </a>
                              </button>
                        </div>
                        <div />
                  </div>
            </div>
      );
};
export default SquidGameStartBlank;
