import { initialState, QuizState } from "../../../../store/features/quiz/quizSlice";
import { limbicTypes, quizTypes, themes } from "../../../../types";
import { interestsUserStory, topics } from "../interestsUserStory";
import { interests } from "../interests";

const { wirtschaft, politik, corona } = topics;
export const mockedInterests: QuizState = {
      ...initialState,
      limbicType: limbicTypes.traditionalist,
      quizType: quizTypes.interest,
      size: {
            height: 640,
            size: "big",
            width: 400
      },
      showProgress: true,
      enabledIdleSlide: false,
      currentIndex: 0
};

export const mockedInterestsWithAnswers: QuizState = {
      ...mockedInterests,

      answeredQuestions: {
            interests: [
                  {
                        topic: wirtschaft,
                        values: []
                  },
                  {
                        topic: politik,
                        values: [{ id: "123123", correct: true }]
                  },
                  {
                        topic: corona,
                        values: [
                              { id: "123123", correct: true },
                              { id: "123123", correct: true }
                        ]
                  }
            ]
      }
};
