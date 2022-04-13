import { selectQuiz, useAppDispatch, useAppSelector } from "../../../store/RTKstore";
// import {Logo} from "../../Logo/Logo";
import { Story } from "../../Stories/types";
import { setBackgroundPicture, setShowProgress, setSize } from "../../../store/features/quiz/quizSlice";
import { getVariantPicture } from "../../../quizAction";
import { sizes } from "../../../types";

type AgeStartProps = {
      story: Story;
      onAnswer: () => void;
};
const AgeStart = ({ story, onAnswer, ...props }: AgeStartProps) => {
      // props.action('pause', false)
      const quiz = useAppSelector(selectQuiz);
      useAppDispatch()(setShowProgress(true));
      useAppDispatch()(setBackgroundPicture(getVariantPicture(story.teasers, quiz.variantId)));
      useAppDispatch()(setSize(sizes.small));
      return (
            <div className="quiz">
                  <div
                        className="age-quiz-background"
                        style={{
                              background: `no-repeat top center url(${quiz.backgroundPicture})`
                        }}
                  >
                        <div className="age-start-slider-overlay" />
                        <div className="age-quiz-start-headline-container">
                              <h2 className="id-uiwi-h2">{story.question}</h2>
                              <h3 className="id-uiwi-h3">{story.subtext}</h3>
                              <button onClick={onAnswer} className="id-uiwi-button start_button_age">
                                    <a
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
            </div>
      );
};
export default AgeStart;
