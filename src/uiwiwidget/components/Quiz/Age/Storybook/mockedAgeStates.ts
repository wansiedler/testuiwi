import { initialState, QuizState } from "../../../../store/features/quiz/quizSlice";
import { quizTypes, themes } from "../../../../types";
import { ageChoices, ageUserStory } from "../ageUserStory";

export const ageMockStateBase: QuizState = {
      ...initialState,
      theme: themes.grill,
      quizType: quizTypes.age,
      currentIndex: 0,
      //stories: ageUserStory,
      variantId: "variant-1"
};

export const mockedAgeQuestion2: QuizState = {
      ...ageMockStateBase,
      answeredQuestions: {
            vote: 2
      },
      currentIndex: 1
};

export const mockedAgeResult: QuizState = {
      ...ageMockStateBase,
      answeredQuestions: {
            age: ageChoices[0],
            vote: 2
      },
      currentIndex: 2
};
