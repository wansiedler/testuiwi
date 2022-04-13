import { initialState, QuizState } from "../../../../store/features/quiz/quizSlice";
import { limbicTypes, quizTypes } from "../../../../types";
import { ageMockStateBase } from "../../Age/Storybook/mockedAgeStates";
import { incomeChoices, incomeUserStory } from "../incomeUserStory";
import { genderUserStory } from "../../Gender/genderUserStory";

export const mockedIncomeStart: QuizState = {
      ...initialState,
      quizType: quizTypes.income,
      stories: incomeUserStory,
      variantId: "variant-1",
      limbicType: limbicTypes.none,
      currentIndex: 0
};

export const mockedIncomeResult: QuizState = {
      ...mockedIncomeStart,
      answeredQuestions: {
            incomeAnswers: [incomeChoices[2]]
      },
      currentIndex: 1
};
