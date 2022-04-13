// import {Logo} from "../../Logo/Logo";
import { selectQuiz, useAppDispatch, useAppSelector } from "../../../store/RTKstore";
import React, { useEffect } from "react";
import { restartGender } from "../../../quizAction";
import { setFinished, setSize } from "../../../store/features/quiz/quizSlice";
import { sizes } from "../../../types";

export default ({ story, ...props }) => {
      props.action("pause", false);
      const quiz = useAppSelector(selectQuiz);
      const dispatch = useAppDispatch();
      const { limbicType } = props;
      useAppDispatch()(setSize(sizes.big));
      useEffect(() => {
            dispatch(setFinished());
      }, []);
      const woman = require("./images/woman.jpg");
      const man = require("./images/man.jpg");
      const superhuman = require("./images/superheros.jpg");
      const people = require("./images/people.jpg");
      const genderAnswers = quiz.answeredQuestions.genderAnswers;
      let link;
      let result;
      let header = null;

      if (genderAnswers.filter((answer) => answer.correct).length === 2) {
            result = (
                  <span className="id-uiwi-span">
                        Wow das ist selten. Sie haben beide Fragen richtig gelöst. Das heißt Ihre Wahrnehmung kann nicht
                        eindeutig einem Geschlecht zugeordnet werden.
                  </span>
            );
            link = superhuman;
      } else if (genderAnswers.filter((answer) => answer.correct).length === 0) {
            header = "Bei Ihnen gibt es noch kein Ergebnis...";
            result = (
                  <div>
                        <div>Leider konnten wir Ihre Wahrnehmung nicht zuordnen. Probieren Sie es noch einmal!</div>
                        <button
                              className={`${limbicType ? limbicType : ""} id-uiwi-label id-uiwi-label-no-result`}
                              onClick={() => dispatch(restartGender())}
                        >
                              Klar, auf geht`s!
                        </button>
                        {/*<button className="label"*/}
                        {/*        style={{*/}
                        {/*            font: 'normal normal bold 20px/23px Arial',*/}
                        {/*            letterSpacing: 1.3,*/}
                        {/*            color: '#FFFFFF'*/}
                        {/*        }}*/}
                        {/*        onClick={() => dispatch(newsLetter())}>Nein, danke.*/}
                        {/*</button>*/}
                  </div>
            );
            link = people;
      } else if (genderAnswers[0].correct) {
            result = (
                  <div>
                        Laut der Forschung sollten Sie <strong>dem weiblichen Geschlecht</strong> angehören.
                        {/*<span>     Das stimmt mit deinem angegebenen Geschlecht überein!.</span>*/}
                  </div>
            );
            link = woman;
      } else if (genderAnswers[1].correct) {
            result = (
                  <div>
                        <span className="id-uiwi-span">
                              {" "}
                              Laut der Forschung sollten Sie <strong>dem männlichen Geschlecht</strong> angehören.
                        </span>
                        {/*<span>     Das stimmt mit deinem angegebenen Geschlecht überein!.</span>*/}
                  </div>
            );
            link = man;
      }
      const styles = {
            right: {
                  color: "green"
            },
            wrong: {
                  color: "red"
            }
      };
      const showAnswer = (isCorrect) =>
            isCorrect ? (
                  <span className="id-uiwi-span" style={styles.right}>
                        richtig
                  </span>
            ) : (
                  <span className="id-uiwi-span" style={styles.wrong}>
                        falsch
                  </span>
            );
      return (
            <div className="quiz">
                  <div className="gender-result-title-container">
                        <div className="gender-result-title">
                              <h3 className="id-uiwi-h3">{header || story.question}</h3>
                        </div>

                        <p className="gender-result-paragraph">
                              {/*<p>*/}
                              {/*    <div><strong>Frage*/}
                              {/*        1</strong>: <strong>{showAnswer(genderAnswers[0] && genderAnswers[0].correct)}</strong>*/}
                              {/*    </div>*/}
                              {/*    <div><strong>Frage*/}
                              {/*        2</strong>: <strong>{showAnswer(genderAnswers[1] && genderAnswers[1].correct)}</strong>*/}
                              {/*    </div>*/}
                              {/*</p>*/}

                              {result}
                        </p>
                  </div>
                  <div
                        className="gender-result-image"
                        style={{
                              background: `center center/100% url(${link})`
                        }}
                  />
                  {/*<Logo/>*/}
            </div>
      );
};
