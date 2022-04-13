import { QuizState } from "../uiwiwidget/store/RTKstore";
import quizSlice, {
	answerVote,
	setDevice,
	setExperimentId,
	setExperimentRoundNr, setMetaExperiment,
	setSubExperiment
	, setStories, initialState
} from "../uiwiwidget/store/features/quiz/quizSlice";

import { ageChoices } from "../uiwiwidget/components/Quiz/Age/ageUserStory";
import { ageMockStateBase } from "../uiwiwidget/components/Quiz/Age/Storybook/mockedAgeStates";

const initState: QuizState = initialState;
 
describe("Edge cases", () => {
	it("Initial redux state shouldn't change after passing empty action", () => {
		const action = { type: "" };
		const result = quizSlice(initState, action);
		expect(result).toEqual(initialState);
	});
});

describe("Event tracking testing", () => {
	it("setExperimentId should set experimentId", () => {
		const experimentIdAction = "myExperimentId";
		const result = quizSlice(initState, setExperimentId(experimentIdAction));
		expect(result).toEqual({ ...initState, experimentId: experimentIdAction });
	});
	it("setDevice should correctly set device in payload object", () => {
		const action = "CLICK_DESKTOP";
		const result = quizSlice(initState, setDevice(action));
		expect(result).toEqual({ ...initState, device: action });
	});
});

/*
describe("Quiz specific tests", () => {
   it("Should ad ", () => {
         const voteAction = ageChoices[0];
         const result = quizSlice(ageMockStateBase, answerVote(voteAction));
         expect(result).toEqual({...ageMockStateBase, answeredQuestions: { voteAction } });
   })
});*/
