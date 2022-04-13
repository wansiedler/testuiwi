import { selectQuiz, useAppDispatch, useAppSelector } from "../../../store/RTKstore";
import { setSize } from "../../../store/features/quiz/quizSlice";
import { sizes } from "../../../types";

export default ({ story }) => {
      const quiz = useAppSelector(selectQuiz);
      console.log(quiz)
      useAppDispatch()(setSize(sizes.big));
      return (
            <div className="quiz">
                  <div className={"question_block"}>
                        <h2 className="id-uiwi-h2">{story.question}</h2>
                  </div>
                  <div
                        className="gender-picture"
                  />
            </div>
      );
};
