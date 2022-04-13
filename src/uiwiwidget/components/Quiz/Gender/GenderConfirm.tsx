// import {Logo} from "../../Logo/Logo";
import { selectQuiz, useAppDispatch, useAppSelector } from "../../../store/RTKstore";
import { setSize } from "../../../store/features/quiz/quizSlice";
import { sizes } from "../../../types";

export default ({ story, onAnswer, ...props }) => {
      const dispatch = useAppDispatch();
      const quiz = useAppSelector(selectQuiz);
      useAppDispatch()(setSize(sizes.big));
      props.action("pause", false);
      return (
            <div className="quiz">
                  <div className="gender-confirm-text-container">
                        <div className="gender-confirm-intro-text">{story.question}</div>

                        <div className="gender-confirm-question">
                              {story.subtext && <p>{story.subtext}</p>}
                              {story.subtext2 && <p>{story.subtext2}</p>}
                        </div>
                        <button
                              className="id-uiwi-button gender-confirm-btn m"
                              onClick={(event) => {
                                    event.preventDefault();
                                    onAnswer("m");
                              }}
                        >
                              m
                        </button>
                        <button
                              className="id-uiwi-button gender-confirm-btn w"
                              onClick={(event) => {
                                    event.preventDefault();
                                    onAnswer("w");
                              }}
                        >
                              w
                        </button>
                  </div>
                  {/*<Logo/>*/}
            </div>
      );
};
