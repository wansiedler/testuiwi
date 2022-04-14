import { idle, newsletter, setIndex, setSize, setStories } from "./store/features/quiz/quizSlice";
import {
      data,
      EventProps,
      eventTypes,
      getAxCoreQueryAPI,
      isProduction,
      Payload,
      PayloadBody,
      quizTypes,
      sizes,
      slideTypes as types,
      themes,
      variants
} from "./types";
import { Dispatch } from "@reduxjs/toolkit";
import { QuizState } from "./store/RTKstore";
import { Story } from "./components/Stories/types";
import { ageUserStory } from "./components/Quiz/Age/ageUserStory";
import { interestsUserStory } from "./components/Quiz/Interests/interestsUserStory";
import { genderUserStory } from "./components/Quiz/Gender/genderUserStory";
import { squidGameUserStory } from "./components/Quiz/SquidGame/squidGameUserStory";
import { incomeUserStory } from "./components/Quiz/Income/incomeUserStory";
import { interests } from "./components/Quiz/Interests/interests";
import { flatten } from "./util";

/**
 * Question types
 */
export const stories = {
      [quizTypes.age]: ageUserStory,
      [quizTypes.interest]: interestsUserStory,
      [quizTypes.gender]: genderUserStory,
      [quizTypes.squidGame]: squidGameUserStory,
      [quizTypes.income]: incomeUserStory,
      [quizTypes.age]: ageUserStory
};
export const fetchStories = async (
      quiz: QuizState,
      quizType: quizTypes | "unset" | string,
      theme?: themes | string | undefined,
      variant?: variants | string
): Promise<Story[]> => {
      let result = stories[quizType] ?? [];
      if (quizType === quizTypes.age) {
            result = result[theme];
            result = [...result.variants[variant], ...result.slides];
      }
      if (quizType === quizTypes.interest) {
            const topics = flatten(quiz.answeredQuestions.interests.map(({ topic }) => interests[topic]));
            result = [result[0], ...topics.map((topic) => topic), result[result.length - 1]];
      }

      if (quizType === quizTypes.squidGame && variant === "variant-1") {
            result = result.slice(1);
      }

      if (!result.length)
            throw new Error(`No stories fetched for quizType:${quizType} theme:${theme} variant:${variant}`);

      return result;
};

export const getVariantPicture = (options, variant = "variant-1"): { options: string[]; variant: variants } => {
      switch (variant) {
            case variants["variant-2"]:
                  return options[1];
            case variants["variant-3"]:
                  return options[2];
            case variants["variant-1"]:
            default:
                  return options[0];
      }
};
export const getGadget = async (): Promise<string> => {
      return new Promise((resolve, reject) => {
            return fetch(`${document.location.toString()}?site-currentness-measurement-header=true`).then(
                  (response) => {
                        response.headers.get("x-ua-device")
                              ? resolve(response.headers.get("x-ua-device").replace("-", "_").toUpperCase())
                              : reject(`Gadget?`);
                  }
            );
      });
};

type axCoreAnswer = {
      result: {
            parameters?: {};
            variant: variants;
            sub_experiment: quizTypes | string;
            meta_experiment_variant: string;
      };
};

/**
 * Fetch the experiment data
 * @param experimentId
 * @param uid
 * @param deviceId
 * @returns {Promise<unknown>}
 */
export const fetchExperimentData = async (
      experimentId: string,
      uid: string = undefined,
      deviceId = "CLICK_DESKTOP"
): Promise<axCoreAnswer> => {
      return new Promise((resolve, reject) => {
            const link = getAxCoreQueryAPI(experimentId);

            const userId =
                  uid ??
                  document.cookie
                        .split(";")
                        .find((item) => item.trim().startsWith("cua_uuid="))
                        ?.split("=")[1];

            if (!userId) {
                  reject("Cant find user_id!");
            }
            let url = new URL(link);
            const urlParams = new URLSearchParams(url.search);
            urlParams.set("user_id", userId);
            url.search = urlParams.toString();
            const body = {
                  return_parametrization: true
                  // "context": {
                  // 	device: deviceId,
                  // },
            };
            return fetch(url.toString(), {
                  headers: {
                        "Content-Type": "application/json",
                        accept: "application/json"
                  },
                  method: "POST",
                  body: JSON.stringify(body)
            }).then(async (response) => {
                  !response.ok &&
                        (await response.json().then(({ detail }) => {
                              reject(
                                    `fetchExperimentData doesnt work user_id:${userId} from ${url.href} ${
                                          response.status
                                    } ${response.statusText} => ${JSON.stringify(detail)}`
                              );
                        }));

                  const result = await response.json();
                  result !== "" ? resolve(result) : reject("fetchExperimentData DOESNT WORK");
            });
      });
};

/**
 * Fetch the experiment
 * @param category
 * @param client_id
 * @returns {Promise<string>}
 */
export const fetchMetaExperimentId = async (category, client_id): Promise<string> => {
      return new Promise((resolve, reject) => {
            const url = new URL(
                  `https://public-ax-core-api.${
                        isProduction ? "production" : "staging"
                  }.ippen.space/v1/experiments/mapping/`
            );

            url.searchParams.append("client_id", client_id); //268 for merkur
            url.searchParams.append("category", category); //genusss, karriere, wohnen

            fetch(`${url}`, {
                  headers: { "Content-Type": "application/json" }
            }).then(async (response) => {
                  !response.ok &&
                        (await response.json().then(({ detail }) => {
                              reject(
                                    `askTheExperimentID doesnt work client_id:${client_id} category:${category} from ${
                                          url.href
                                    } ${response.status} ${response.statusText} => ${JSON.stringify(detail)}`
                              );
                        }));

                  const result = await response.json();
                  resolve(result[0]);
            });
      });
};

/**
 * Send the event payload
 * @param eventType
 * @param valueName
 * @param value
 * @param quiz
 */
export const sendEvent = ({
      eventType,
      valueName = "unset",
      value = "unset",
      quiz
}: EventProps & { quiz?: QuizState | any }): void => {
      try {
            const url = `https://idat.${isProduction ? "production" : "staging"}.ippen.space/dev`;

            const totalSlides = quiz.stories.length.toString() ?? "unset";
            const slideId = quiz.currentIndex.toString() ?? "unset";
            const device = quiz.device ?? "unset";
            const componentName = quiz.stories[quiz.currentIndex]?.type ?? "unset";
            const quizType = quiz.quizType ?? "unset";
            const location = quiz.location ?? "unset";
            // USERID
            const userId =
                  document.cookie
                        .split(";")
                        .find((item) => item.trim().startsWith("cua_uuid="))
                        ?.split("=")[1] ?? "unset";
            const elementAttribute = document.getElementById("cxo-widget-host")?.getAttribute("data-cxo-conf");
            // const elementData: data = elementAttribute
            //       ? JSON.parse(elementAttribute)
            //       : {
            //               clientId: "unset",
            //               categoryName: "unset",
            //               pageViewId: "unset",
            //               uid: "unset"
            //         };
            const elementData: data = elementAttribute ? JSON.parse(elementAttribute) : null;
            // JSON.parse()
            // userid = (userid && userid.split("=")[1]) || "unset";
            // CATEGORY
            //https://merkur.idstg.de/west/westwest-teststory-zum-testen-von-internen-verlinkungen-90105811.html
            //TODO: Not used?
            const categoryRegexp = /https:\/\/www.merkur.de\/(leben\/)?(.*?)\//g.exec(window.location.href) ?? "unset";
            const category = categoryRegexp ? categoryRegexp[2] : "unset";
            // CLIENT
            const clientRegexp = /www.(.*)/g.exec(new URL(window.location.href).hostname);
            const client = clientRegexp ? clientRegexp[1] : new URL(window.location.href).hostname;
            const time = Date.now().toString();
            // navigator.geolocation.getCurrentPosition((position) => {
            //     // location = position.toString();
            //     location = position.coords.toString();
            // });

            const innerSend = (experimentId, variantId) => {
                  try {
                        let payload: Payload = {
                              eventType,
                              experimentId,
                              variantId,
                              userId,
                              transientId: elementData?.uid ?? userId ?? "unset",
                              ...elementData,
                              slideId,
                              quizType,
                              componentName,
                              client,
                              category: elementData?.categoryName ?? "unset",
                              device,
                              location,
                              time,
                              totalSlides,
                              valueName,
                              value
                        };

                        console.log(
                              `eventType: ${eventType} experimentId:${experimentId} slideId:${
                                    payload.slideId
                              } slideType:${
                                    quiz.stories[quiz.currentIndex]?.type ?? "unset"
                              } valueName:${valueName} value:${value} variantId:${variantId}`
                        );
                        const body: PayloadBody = {
                              metadata: {
                                    key: "cxo-key",
                                    timestamp: Date.now().toString()
                              },
                              origin: {
                                    system: "cxo-quiz",
                                    useCase: "cxo-quiz-dev"
                              },
                              cmsClientId: elementData?.clientId ?? 268,
                              pageViewId: elementData?.pageViewId ?? "unset",
                              ip: "0.0.0.0",
                              userAgent: navigator.userAgent,
                              payload
                        };
                        const settings = {
                              headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json"
                              },
                              method: "POST",
                              body: JSON.stringify(body)
                        };
                        fetch(url, settings).then().catch();
                  } catch (e) {
                        console.error(e);
                  }
            };

            const experimentId = quiz.experimentId ?? "unset";
            const variantId = quiz.variantId ?? "unset";
            const subExperiment = quiz.subExperiment ?? "unset";
            const metaExperiment = quiz.metaExperiment ?? "unset";

            //First
            //experimentId is experimentID
            //variantId is metaExperiment?

            innerSend(experimentId, metaExperiment);

            //Second
            //experimentId is subexperiment
            //variantId is variant
            innerSend(subExperiment, variantId);

            // if (fallback) {
            // 	//Fallback
            // 	//experimentId is experimentID
            // 	//variantId is -1
            // 	innerSend(experimentId, "-1")
            // } else {
            //
            // }
      } catch (e) {
            console.log(e);
      }
};
export const restartGender =
      () =>
      (dispatch: Dispatch): void => {
            dispatch(setIndex(0));
            dispatch(setSize(sizes.small));
            // dispatch(reset());
            // dispatch(setStories(stories.gender));
      };
export const newsLetter = () => (dispatch: Dispatch) => {
      dispatch(
            newsletter({
                  question: "Wir haben da noch was für Sie!",
                  type: types.newsletter
            })
      );
};
export const userIsIdle =
      ({ quiz, reaction = false, idleGender }) =>
      (dispatch: Dispatch) => {
            if (!reaction) {
                  sendEvent({
                        eventType: eventTypes.USER_IS_IDLE_WITHOUT_REACTION,
                        quiz
                  });
                  dispatch(
                        idle({
                              question: "Wir erstellen gerade Ihr individuelles Quiz.",
                              type: types.idle,
                              idleGender
                        })
                  );
            } else {
                  sendEvent({
                        eventType: eventTypes.USER_IS_IDLE_AFTER_REACTION,
                        quiz
                  });
                  dispatch(
                        idle({
                              question: "Sie sind fast fertig mit ihrem Quiz.",
                              type: types.idle,
                              idleGender
                        })
                  );
            }
      };
