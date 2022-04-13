import { useAppDispatch } from "../../../store/RTKstore";
import { setSize } from "../../../store/features/quiz/quizSlice";
import { sizes } from "../../../types";

export const GenderChoice = ({
      story,
      // answered,
      onAnswer
}) => {
      useAppDispatch()(setSize(sizes.big));
      const label = (answer, idx) => {
            const input = (
                  <input
                        className="id-uiwi-input"
                        id={answer.id}
                        type="radio"
                        key={answer.id}
                        value={answer}
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
                        className={`id-uiwi-label `}
                        // ${answered.includes(answer) ? "selected" : ""}
                  >
                        {input}
                        {answer.text}
                  </label>
            );
      };
      return (
            <>
                  {story.choices &&
                        story.choices.map((answer, idx) => {
                              return label(answer, idx);
                        })}
            </>
      );
};
