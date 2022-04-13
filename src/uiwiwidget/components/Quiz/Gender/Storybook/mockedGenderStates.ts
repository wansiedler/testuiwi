import { choicesFirstQuestion, choicesSecondQuestion, genderUserStory } from "../genderUserStory";
import { initialState, QuizState } from "../../../../store/features/quiz/quizSlice";
import { limbicTypes, quizTypes, themes } from "../../../../types";
import { ageUserStory } from "../../Age/ageUserStory";

export const genderMockStateBase: QuizState = {
      ...initialState,
      theme: themes.grill,
      quizType: quizTypes.gender,
      stories: genderUserStory,
      variantId: "variant-1",
      backgroundPicture: genderUserStory[0].backgroundPicture
};

export const mockedGenderPicture: QuizState = {
      ...genderMockStateBase,
      currentIndex: 0
};

export const mockedGenderQuestion1: QuizState = {
      ...genderMockStateBase,
      currentIndex: 1
};

export const mockedGenderQuestion2: QuizState = {
      ...genderMockStateBase,
      currentIndex: 2
};

export const mockedGenderConfirm: QuizState = {
      ...genderMockStateBase,
      currentIndex: 3
};

export const mockedGenderResultFemale: QuizState = {
      ...genderMockStateBase,
      answeredQuestions: {
            genderAnswers: [choicesFirstQuestion[0], choicesSecondQuestion[0]]
      },
      currentIndex: 4
};

export const mockedGenderResultMale: QuizState = {
      ...genderMockStateBase,
      answeredQuestions: {
            genderAnswers: [choicesFirstQuestion[1], choicesSecondQuestion[2]]
      },
      currentIndex: 4
};

export const mockedGenderResultNone: QuizState = {
      ...genderMockStateBase,
      currentIndex: 4
};
