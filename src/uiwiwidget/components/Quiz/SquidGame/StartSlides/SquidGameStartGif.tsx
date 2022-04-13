import { selectQuiz, useAppDispatch, useAppSelector } from "../../../../store/RTKstore";
// import {Logo} from "../../../Logo/Logo";
import { Story } from "../../../Stories/types";
import { setShowProgress } from "../../../../store/features/quiz/quizSlice";

type SquidGameStartProps = {
      story: Story;
      onAnswer: () => void;
};
const SquidGameStartGif = ({ story, onAnswer, ...props }: SquidGameStartProps) => {
      const quiz = useAppSelector(selectQuiz);
      useAppDispatch()(setShowProgress(true));
      return (
            <div
                  className="quiz start-doll"
                  //TODO fix
            >
                  {/*<Logo props={"tz"}/>*/}
                  <div className="start-image-wrapper">
                        <img className="start-image" src={story.backgroundPictures.doll} />
                  </div>
                  <div className="start-bottom-wrapper">
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
            </div>
      );
};
export default SquidGameStartGif;
