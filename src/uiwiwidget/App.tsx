import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";

import { Stories } from "./components/Stories";
import { getStore, QuizState, selectQuiz, useAppDispatch, useAppSelector } from "./store/RTKstore";
import {
	enableIdleSlide,
	idle,
	setBackgroundPicture,
	setDevice,
	setExperimentId,
	setExperimentRoundNr,
	setIndex,
	setTheme,
	setMetaExperiment,
	setQuizType,
	setSize,
	setStories,
	setSubExperiment,
	setVariantId
} from "./store/features/quiz/quizSlice";
import { fetchExperimentData, fetchMetaExperimentId, fetchStories, getGadget, sendEvent } from "./quizAction";
import IdleTimer from "./components/ReactIdleTimer/IdleTimer";

import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

import { AppProps, eventTypes, hideLogs, isProduction, limbicTypes, quizTypes, sizes, slideTypes } from "./types";

import "./styles/App.scss";

if (hideLogs) {
	console.log = () => {
		return;
	};
	console.error = () => {
		return;
	};
	console.info = () => {
		return;
	};
	console.debug = () => {
		return;
	};
} else {
	console.log("dev mode");
}

export const App = function ({ ...props }: AppProps): JSX.Element {
	return (
		<>
			<Provider store={getStore()}>
				<UiWiWidget {...props} />
			</Provider>
		</>
	);
};
 
// #genuss interest
// #wohnen gender
// #karriere age
export const UiWiWidget = ({
	                           experimentIdProp,
	                           variant,
	                           quizType,
	                           slideID,
	                           categoryName,
	                           uid,
	                           pageViewId,
	                           clientId
                           }: AppProps): JSX.Element => {
	const quiz: QuizState = useAppSelector(selectQuiz);
	const dispatch = useAppDispatch();
	const defaultStoryInterval = isProduction ? 20 : 20;
	// Idle Timer in seconds (disabled for dev mode)
	const idleTimeout = isProduction ? 33 : 33;
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (!categoryName || !clientId) {
			console.error(`categoryName is unset? ${categoryName}`);
			console.error(`clientId is unset? ${clientId}`);
			sendEvent({
				eventType: eventTypes.FALLBACK,
				quiz
			});
		}

		console.log(`categoryName: ${categoryName}`);
		console.log(`clientId: ${clientId}`);
		fetchMetaExperimentId(categoryName, clientId)
			.then((experimentId) => {
				if (experimentIdProp !== "storybook") {
					console.log(`experimentId: ${experimentId}`);
					dispatch(setExperimentId(experimentId));
				}
				return fetchExperimentData(experimentId, uid).then((response) => {
					console.log(`response.result: ${JSON.stringify(response.result)}`);
					const metaExperiment = response.result.meta_experiment_variant;

					dispatch(setMetaExperiment(metaExperiment));

					const variant = response.result.variant;

					dispatch(setVariantId(variant));

					let userStory = quiz.quizType ?? "";
					let theme = quiz.theme;

					const subExperiment = response.result.sub_experiment;
					if (experimentIdProp !== "storybook") {
						userStory = subExperiment.split("-")[0] || "";
						theme = subExperiment.split("-")[1];
						dispatch(setTheme(theme));
						dispatch(setQuizType(userStory));
					}

					dispatch(setSubExperiment(subExperiment));
					dispatch(setQuizType(userStory));

					fetchStories(quiz, userStory, theme, variant).then((stories) => {
						dispatch(setStories(stories));
						dispatch(setSize(sizes[userStory]));
						setLoaded(true);
						if (userStory === quizTypes.squidGame) dispatch(enableIdleSlide(false));
					});

					dispatch(setExperimentRoundNr(0));

					return getGadget()
						.then((deviceId) => {
							dispatch(setDevice(deviceId));
						})
						.catch((error) => {
							dispatch(setDevice("unset"));
						});
				});
			})
			.catch((error) => {
				setLoaded(false);
				console.log(error);
				sendEvent({
					eventType: eventTypes.FALLBACK,
					quiz,
					valueName: "Error",
					value: error
				});
			});
	}, []);

	const handleOnIdle = () => {
		if (
			quiz.enabledIdleSlide &&
			!quiz.isIdle &&
			!quiz.finished &&
			quiz.stories &&
			quiz.stories.length &&
			quiz.currentIndex
		) {
			const reaction = quiz.currentIndex > 0;
			const idleGender = quiz.quizType === quizTypes.gender;
			if (!reaction) {
				sendEvent({
					eventType: eventTypes.USER_IS_IDLE_WITHOUT_REACTION,
					quiz
				});
				dispatch(
					idle({
						question: "Wir erstellen gerade Ihr individuelles Quiz.",
						type: slideTypes.idle,
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
						type: slideTypes.idle,
						idleGender
					})
				);
			}
		}
	};
	return (
		<div id="UIWIWidgetContainer">
			{(quiz.stories && loaded && (
					<div id="UIWIWidget">
						<IdleTimer timeout={1000 * idleTimeout} onIdle={handleOnIdle} debounce={250}/>
						<div
							className={`stories ${quiz.limbicType} ${quiz.quizType} ${quiz.variantId} 
                                    ${quiz.size?.size} ${
								quiz.stories[quiz.currentIndex] && quiz.stories[quiz.currentIndex].type
							}`}
							style={{
								...{
									width: quiz.size?.width,
									height: quiz.size?.height
								},
								margin: "0 auto"
							}}
						>
							<div className={`${quiz.theme}`}>
								<ErrorBoundary>
									{/*{(!(isProduction || quiz.quizType === "squid-game")) ? <SelectLimbicTypes limbicType={quiz.limbicType} limbicTypes={limbicTypes}/> : null}*/}

									<Stories
										// stories={quiz.stories}
										currentIndex={quiz.currentIndex}
										defaultInterval={defaultStoryInterval * 1000}
										height={quiz.size?.height}
										width={quiz.size?.width}
										showProgress={quiz.showProgress}
										isPaused={true}
										loop={false}
										keyboardNavigation={!isProduction}
									/>
								</ErrorBoundary>
							</div>
						</div>
					</div>
				)) ||
				(!hideLogs && `No quiz stories found`)}
		</div>
	);
};
