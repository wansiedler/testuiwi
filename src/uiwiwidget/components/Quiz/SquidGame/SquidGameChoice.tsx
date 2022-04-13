export const SquidGameChoice = ({ story, onAnswer }) => {
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
                  <label key={answer.id} htmlFor={answer.id} className="id-uiwi-label">
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
