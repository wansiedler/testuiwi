import { eventTypes, sizes, slideTypes as types } from "../../../types";
import { Story } from "../types";
import { selectQuiz, useAppDispatch, useAppSelector } from "../../../store/RTKstore";
import {
      answerAge,
      answerVote,
      continueQuiz,
      genderAnswer,
      genderQuestionAnswer,
      nextStory,
      selectInterest,
      selectInterestAnswer,
      setIndex,
      setShowProgress,
      setSize,
      setStories,
      squidGameQuestionAnswer,
      incomeAnswer
} from "../../../store/features/quiz/quizSlice";
import Idle from "../../Quiz/Idle/Idle";
// import GenderStart from "../../Quiz/Gender/GenderStart";
import GenderQuestion from "../../Quiz/Gender/GenderQuestion";
import { sendEvent } from "../../../quizAction";
import GenderResult from "../../Quiz/Gender/GenderResult";
import InterestsResult from "../../Quiz/Interests/InterestsResult";
import AnswerInterests from "../../Quiz/Interests/AnswerInterests";
import { useEffect, useState } from "react";
import { interests } from "../../Quiz/Interests/interests";
import AgeResult from "../../Quiz/Age/AgeResult";
import AgeGroup from "../../Quiz/Age/AgeGroup";
import AgeVote from "../../Quiz/Age/AgeVote";
import { getRandomInt, randomize } from "../../../util";
import GenderPicture from "../../Quiz/Gender/GenderPicture";
import GenderConfirm from "../../Quiz/Gender/GenderConfirm";
// import AgeStart from "../../Quiz/Age/AgeStart";
import InterestSelect from "../../Quiz/Interests/InterestSelect";
import NewsletterQuiz from "../../Quiz/Interests/Newsletter/NewsletterQuiz";
import SquidGameStartCounter from "../../Quiz/SquidGame/StartSlides/SquidGameStartCounter";
import SquidGameStartGif from "../../Quiz/SquidGame/StartSlides/SquidGameStartGif";
import SquidGameStartBlank from "../../Quiz/SquidGame/StartSlides/SquidGameStartBlank";
import SquidGameQuestion from "../../Quiz/SquidGame/SquidGameQuestion";
import SquidGameResult from "../../Quiz/SquidGame/SquidGameResult";
import IncomeResult from "../../Quiz/Income/IncomeResult";
import { NewsletterSeparate } from "../../Newsletter/NewsletterSeparate";
import { IncomeStart } from "../../Quiz/Income/IncomeStart";

/**
 * Returns quiz slide based on story type.
 * @param s
 */
export const storyGenerator = (s: Story) => {
      const story: Story = Object.assign({}, s);
      switch (story.type) {
            //NEWSLETTER
            case types.newsletter:
                  story.originalContent = ({
                        // config,
                        // messageHandler,
                        // action,
                        // isPaused,
                        // onAnswer,
                        // story,
                        // showProgress,
                        // setShowProgress,
                        // playState,
                        // setVideoDuration,
                        ...props
                  }) => {
                        return <NewsletterQuiz {...props} />;
                  };
                  break;

            //NEWSLETTER
            case types.newsletterSeparate:
                  story.originalContent = ({
                        // config,
                        // messageHandler,
                        // action,
                        // isPaused,
                        // onAnswer,
                        // story,
                        // showProgress,
                        // setShowProgress,
                        // playState,
                        // setVideoDuration,
                        ...props
                  }) => {
                        return <NewsletterSeparate {...props} />;
                  };
                  break;

            //IDLE
            case types.idle:
                  story.originalContent = (props) => {
                        const dispatch = useAppDispatch();
                        const onAnswer = () => {
                              dispatch(continueQuiz({}));
                        };
                        props.action("pause", false);
                        const quiz = useAppSelector(selectQuiz);
                        return <Idle {...{ onAnswer }} {...props} />;
                  };
                  break;

            //START
            // CANCELLED
            /*case types.genderStart:
                  story.originalContent = (props) => {
                        const dispatch = useAppDispatch();
                        const quiz = useAppSelector(selectQuiz);
                        const onAnswer = () => {
                              sendEvent({
                                    eventType: eventTypes.CLICK,
                                    quiz
                              });
                              setTimeout(() => {
                                    dispatch(nextStory());
                              }, 300);
                        };
                        return <GenderStart {...{ onAnswer }} {...props} />;
                  };
                  break;*/

            //GENDER
            case types.genderPicture:
                  story.originalContent = (props) => {
                        const dispatch = useAppDispatch();
                        const quiz = useAppSelector(selectQuiz);
                        dispatch(setShowProgress(true));
                        props.setProgressVisualiser("counter");
                        props.action("play", true);

                        return <GenderPicture {...props} />;
                  };
                  break;
            case types.genderQuestion:
                  story.originalContent = (props) => {
                        const quiz = useAppSelector(selectQuiz);
                        const dispatch = useAppDispatch();

                        const onAnswer = (answer) => {
                              dispatch(genderQuestionAnswer(answer));
                              setTimeout(() => {
                                    dispatch(nextStory());
                              }, 300);

                              //NOTE: Ax-Core needs this event to get first interaction
                              // (!) Remove if this is no longer the first interactive slide
                              if (quiz.currentIndex === 1) {
                                    sendEvent({
                                          eventType: eventTypes.CLICK,
                                          quiz
                                    });
                              }
                        };
                        return <GenderQuestion {...{ onAnswer }} {...props} />;
                  };
                  break;
            case types.genderConfirm:
                  story.originalContent = (props) => {
                        const dispatch = useAppDispatch();
                        dispatch(setShowProgress(false));
                        const quiz = useAppSelector(selectQuiz);
                        const onAnswer = (value) => {
                              dispatch(genderAnswer(value));
                              sendEvent({
                                    eventType: eventTypes.CHOICE_SELECTED,
                                    valueName: "gender",
                                    value: value.toString(),
                                    quiz
                              });
                              setTimeout(() => {
                                    dispatch(nextStory());
                              }, 300);
                        };
                        return <GenderConfirm onAnswer={onAnswer} {...props} />;
                  };
                  break;
            case types.genderResults:
                  story.originalContent = (props) => {
                        const dispatch = useAppDispatch();
                        const quiz = useAppSelector(selectQuiz);

                        dispatch(setShowProgress(false));
                        return <GenderResult {...props} />;
                  };
                  break;

            //AGE
            /* Cancelled
            case types.ageStart:
                  story.originalContent = (props) => {
                        const quiz = useAppSelector(selectQuiz);
                        const dispatch = useAppDispatch();
                        const onAnswer = () => {
                              sendEvent({
                                    eventType: eventTypes.CLICK,
                                    quiz
                              });
                              setTimeout(() => {
                                    dispatch(nextStory());
                                    dispatch(setSize(sizes.medium));
                              }, 300);
                        };
                        return <AgeStart {...{ onAnswer }} {...props} />;
                  };
                  break;*/
            case types.ageVote:
                  story.originalContent = (props) => {
                        const dispatch = useAppDispatch();
                        const quiz = useAppSelector(selectQuiz);
                        const [completed, setCompleted] = useState(getRandomInt(1000));
                        const teilgenommen = (
                              <div>
                                    <p>Vergleichen Sie jetzt Ihre Meinung mit anderen Merkur Lesern.</p>
                              </div>
                        );
                        useEffect(() => {
                              const timer = setInterval(() => setCompleted(completed + 1), getRandomInt(2000));
                              return () => clearInterval(timer);
                        });
                        return (
                              <AgeVote
                                    onAnswer={(value) => {
                                          dispatch(answerVote(value));
                                          setTimeout(() => {
                                                dispatch(nextStory());
                                          }, 300);

                                          //NOTE: Ax-Core needs this event to get first interaction
                                          // (!) Remove if this is no longer the first interactive slide
                                          sendEvent({
                                                eventType: eventTypes.CLICK,
                                                quiz
                                          });
                                    }}
                                    {...props}
                                    subtext={teilgenommen}
                              />
                        );
                  };
                  break;
            case types.ageGroup:
                  story.originalContent = (props) => {
                        const dispatch = useAppDispatch();
                        const quiz = useAppSelector(selectQuiz);
                        const onAnswer = (answer) => {
                              dispatch(answerAge(answer));
                              sendEvent({
                                    eventType: eventTypes.CHOICE_SELECTED,
                                    valueName: "age",
                                    value: answer.text,
                                    quiz
                              });
                              setTimeout(() => {
                                    dispatch(nextStory());
                              }, 300);
                        };
                        return <AgeGroup {...{ onAnswer }} {...props} />;
                  };
                  break;
            case types.ageResult:
                  story.originalContent = (props) => {
                        const dispatch = useAppDispatch();
                        const quiz = useAppSelector(selectQuiz);
                        const subtext = (
                              <div>
                                    <p>Ihre Meinung stimmt zu 35 Prozent mit ihrer Altersgruppe überein</p>
                              </div>
                        );
                        return (
                              <AgeResult
                                    {...props}
                                    choices={story.choices}
                                    subtext={subtext}
                                    // @ts-ignore
                                    left={quiz.stories[0].votes[0]}
                                    // @ts-ignore
                                    right={quiz.stories[0].votes[1]}
                              />
                        );
                  };
                  break;

            //INTERESTS
            case types.interestsSelect:
                  story.originalContent = (props) => {
                        const quiz = useAppSelector(selectQuiz);
                        const dispatch = useAppDispatch();
                        useEffect(() => {
                              if (
                                    quiz.answeredQuestions.interests &&
                                    quiz.answeredQuestions.interests.length === props.story.choiceAmount
                              ) {
                                    // const value = quiz.answeredQuestions.interests.map(interest => interest.topic).join(",");
                                    quiz.answeredQuestions.interests.forEach((interest) =>
                                          sendEvent({
                                                eventType: eventTypes.CHOICE_SELECTED,
                                                valueName: "interest",
                                                value: interest.topic,
                                                quiz
                                          })
                                    );
                                    // dispatch(nextStory());
                                    dispatch(setIndex(1));
                              }
                        }, [quiz.answeredQuestions.interests]);
                        const onAnswer = (topic) => {
                              topic = topic.toLowerCase();
                              interests[topic] &&
                                    dispatch(
                                          selectInterest({
                                                topic,
                                                stories: interests[topic],
                                                interestsAmount: props.story.choiceAmount
                                          })
                                    );
                        };
                        return (
                              <InterestSelect
                                    // dataAttrib={(quiz.answeredQuestions.interests.length === props.story.choiceAmount - 1) ?
                                    //     `{"experimentId": "${quiz.experimentId}", "experimentVariantId": "${quiz.variantId}","experimentRoundNr":${quiz.experimentRoundNr}}` : ""}
                                    onAnswer={onAnswer}
                                    {...props}
                              />
                        );
                  };
                  break;
            case types.interestsQuestion:
                  story.originalContent = (props) => {
                        const quiz = useAppSelector(selectQuiz);
                        const dispatch = useAppDispatch();
                        // useEffect(() => {
                        //     if (!quiz.stories.length) return;
                        //     let total = quiz.answeredQuestions.interests.length;
                        //     total = quiz.answeredQuestions.interests.reduce(
                        //         (accumulator, interest) => accumulator + interest.values.length,
                        //         total,
                        //     ) + 1;
                        //     if (
                        //         total
                        //         === quiz.answeredQuestions.interests.length
                        //         + quiz.answeredQuestions.interests.length * 2
                        //         && total > 1
                        //     ) {
                        //         dispatch(
                        //             insertStory({
                        //                 question: "Hier ist Ihr Ergebnis! Danke für die Teilnahme.",
                        //                 type: types.interestsResult,
                        //                 choices: quiz.answeredQuestions.interests,
                        //             }),
                        //         );
                        //         setTimeout(() => {

                        //             dispatch(nextStory());
                        //         }, 300);
                        //     }
                        // }, [quiz.answeredQuestions, quiz.stories]);
                        return (
                              <AnswerInterests
                                    onAnswer={(answer) => {
                                          dispatch(
                                                selectInterestAnswer({
                                                      topic: props.story.topic,
                                                      answer
                                                })
                                          );
                                          setTimeout(() => {
                                                dispatch(nextStory());
                                          }, 300);
                                    }}
                                    {...props}
                                    story={story}
                              />
                        );
                  };
                  break;
            case types.interestsResult:
                  story.originalContent = (props) => {
                        const quiz = useAppSelector(selectQuiz);
                        return <InterestsResult {...props} groups={story.groups} />;
                  };
                  break;

            // SQUID GAME
            case types.squidGameStart:
                  story.originalContent = (props) => {
                        const quiz = useAppSelector(selectQuiz);
                        const dispatch = useAppDispatch();
                        const onAnswer = () => {
                              sendEvent({
                                    eventType: eventTypes.CLICK,
                                    quiz
                              });
                              // dispatch(setSize("rectangular"));
                              dispatch(nextStory());
                        };

                        //TODO
                        // "variant-1" no starting slide
                        // "variant-2" man in robe
                        // "variant-3" cookies
                        // "variant-4" the looking doll

                        switch (quiz.variantId) {
                              case "variant-2":
                                    return <SquidGameStartBlank {...{ onAnswer }} {...props} />;
                              case "variant-3":
                                    return <SquidGameStartCounter {...{ onAnswer }} {...props} />;
                              case "variant-4":
                                    return <SquidGameStartGif {...{ onAnswer }} {...props} />;
                              default:
                                    return <SquidGameStartBlank {...{ onAnswer }} {...props} />;
                        }
                  };
                  break;
            case types.squidGameQuestion:
                  story.originalContent = (props) => {
                        const quiz = useAppSelector(selectQuiz);
                        const dispatch = useAppDispatch();
                        const onAnswer = (answer) => {
                              dispatch(squidGameQuestionAnswer(answer.text));
                              sendEvent({
                                    eventType: eventTypes.CHOICE_SELECTED,
                                    valueName: props.story.subtext,
                                    value: answer.text,
                                    quiz
                              });

                              setTimeout(() => {
                                    dispatch(nextStory());
                              }, 300);
                        };
                        return <SquidGameQuestion {...{ onAnswer }} {...props} />;
                  };
                  break;
            case types.squidGameResult:
                  story.originalContent = (props) => {
                        const quiz = useAppSelector(selectQuiz);
                        return <SquidGameResult {...props} />;
                  };
                  break;

            case types.incomeStart:
                  story.originalContent = (props) => {
                        const quiz = useAppSelector(selectQuiz);
                        const dispatch = useAppDispatch();
                        const onAnswer = (answer) => {
                              sendEvent({
                                    eventType: eventTypes.CLICK,
                                    quiz
                              });

                              // dispatch(setSize("rectangular"));
                              //dispatch(nextStory());
                              dispatch(incomeAnswer(answer));
                              sendEvent({
                                    eventType: eventTypes.CHOICE_SELECTED,
                                    valueName: props.story.subtext,
                                    value: answer.text,
                                    quiz
                              });
                              setTimeout(() => {
                                    dispatch(nextStory());
                              }, 300);
                        };
                        return <IncomeStart {...{ onAnswer }} {...props} />;
                  };
                  break;

            case types.incomeResult:
                  story.originalContent = (props) => {
                        const quiz = useAppSelector(selectQuiz);
                        return <IncomeResult {...props} />;
                  };
                  break;

            //NEVER EVER SHOULD WE GET HERE
            default:
                  console.error(`Unknown Type ${story.type} ${JSON.stringify(story)}`);
                  break;
      }
      story.content = (props) => {
            const Content = props.story.originalContent;
            return <Content {...props} />;
      };
      return story;
};
