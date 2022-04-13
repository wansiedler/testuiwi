import React, { useContext, useEffect, useRef, useState } from "react";
// import React from 'preact';
// import {useContext, useEffect, useRef, useState} from 'preact/hooks'
import GlobalContext from "../context/Global";
import ProgressContext from "../context/Progress";
import { GlobalCtx } from "../types";
import { selectQuiz, useAppDispatch, useAppSelector } from "../../../store/RTKstore";
import { nextStory, prevStory, QuizState } from "../../../store/features/quiz/quizSlice";
import Controls from "./Controls";
import ProgressCounter from "./ProgressCounter";
import { ProgressArray } from "./ProgressArray";
import { StoryClass } from "./StoryClass";

const Container = () => {
      const [currentId, setCurrentId] = useState<number>(0);
      //"progress" or "counter"
      const [progressVisualiser, setProgressVisualiser] = useState<string>("progress");
      const [sshowProgress, setShowProgress] = useState<boolean>(true);
      const [pause, setPause] = useState<boolean>(true);
      const [videoDuration, ssetVideoDuration] = useState<number>(0);
      const mousedownId = useRef<any>();
      const isMounted = useRef<boolean>(true);
      const quiz = useAppSelector(selectQuiz);

      const {
            // currentIndex,
            // loop,
            width,
            height,
            isPaused,
            showProgress,
            keyboardNavigation,
            storyContainerStyles = {}
      } = useContext<GlobalCtx>(GlobalContext);
      // const currentIndex = useContext<number>(IndexContext);
      // const {stories} = useContext<StoriesContextInterface>(StoriesContext);
      const { currentIndex, finished, interactive, stories }: QuizState = quiz;
      const dispatch = useAppDispatch();
      // console.log(currentIndex)
      useEffect(() => {
            if (typeof currentIndex === "number") {
                  if (currentIndex >= 0 && currentIndex < stories.length) {
                        setCurrentIdWrapper(() => currentIndex);
                  } else {
                        console.error(` ${currentIndex} is out of bounds. The stories length of ${stories.length}`);
                  }
            }
      }, [currentIndex]);
      useEffect(() => {
            if (typeof isPaused === "boolean") {
                  setPause(isPaused);
            }
      }, [isPaused]);
      useEffect(() => {
            if (typeof isPaused === "boolean") {
                  setShowProgress(showProgress);
            }
      }, [showProgress]);
      useEffect(() => {
            setShowProgress(showProgress);
      }, [showProgress]);
      useEffect(() => {
            if (finished) return;
            const isClient = typeof window !== "undefined" && window.document;
            if (isClient && typeof keyboardNavigation === "boolean" && keyboardNavigation) {
                  document.addEventListener("keydown", handleKeyDown);
                  return () => {
                        document.removeEventListener("keydown", handleKeyDown);
                  };
            }
      }, [keyboardNavigation]);
      // Cleanup mounted state - for issue #130 (https://github.com/mohitk05/react-insta-stories/issues/130)
      useEffect(() => {
            return () => {
                  isMounted.current = false;
            };
      }, []);
      const handleKeyDown = (e: KeyboardEvent) => {
            if (finished) return;
            // console.log(e.key)
            if (e.key === "ArrowLeft") {
                  previous();
            } else if (e.key === "ArrowRight") {
                  next();
            } else if (e.code === "Space" || e.code === " ") {
                  debouncePause(e);
                  toggleState("pause", true);
            }
      };
      const toggleState = (action: string, showProgress?: boolean) => {
            if (isMounted.current) {
                  // console.log('===========toggleState')
                  // console.log(`action: ${action}`)
                  // console.log(!!showProgress)
                  setPause(action === "pause");
                  setShowProgress(showProgress);
            }
      };
      const setCurrentIdWrapper = (callback) => {
            setCurrentId(callback);
            toggleState("pause", false);
            // toggleState("pause", true);
            // toggleState('play', true);
      };
      const updateNextStoryIdForLoop = () => {
            setCurrentIdWrapper((prev) => (prev + 1) % stories.length);
      };
      const updateNextStoryId = () => {
            setCurrentIdWrapper((prev) => {
                  if (prev < stories.length - 1) return prev + 1;
                  return prev;
            });
      };
      const next = () => {
            if (isMounted.current) {
                  // if (loop) {
                  //     updateNextStoryIdForLoop()
                  // } else {
                  //     updateNextStoryId()
                  // }
                  // if (interactive) dispatch(newsLetter());
                  // else dispatch(nextStory());

                  dispatch(nextStory());
            }
      };
      const previous = () => {
            // setCurrentIdWrapper(prev => prev > 0 ? prev - 1 : prev)
            dispatch(prevStory({}));
      };
      // const debouncePause = (e: React.MouseEvent | React.TouchEvent | KeyboardEvent) => {
      const debouncePause = (e) => {
            e.preventDefault();

            mousedownId.current = setTimeout(() => {
                  toggleState("pause");
            }, 200);
      };
      // const mouseUp = (type: string) => (e: React.MouseEvent | React.TouchEvent) => {
      const mouseUp = (type: string) => (e) => {
            e.preventDefault();
            mousedownId.current && clearTimeout(mousedownId.current);

            // if (pause) {
            //     toggleState('play')
            // } else {
            //     type === 'next' ? next() : previous()
            // }
            type === "next" ? next() : previous();
      };
      const setVideoDuration = (duration: number) => {
            ssetVideoDuration(duration * 1000);
      };

      const getProgressVisualiser = () => {
            //TODO: showProgress is false if first slide is squidGameQuestion
            //if (stories[currentIndex].type === "squidGameResult") {
            //      return <ProgressArray />;
            //}

            if (
                  (stories[currentIndex] && stories[currentIndex].type === "squidGameQuestion") ||
                  (stories.length > 1 && showProgress)
            ) {
                  if (progressVisualiser === "counter") {
                        return <ProgressCounter />;
                  }
                  return <ProgressArray />;
            }
            return null;
      };
      try {
            // console.log(currentId)
            // console.log(stories[currentId])
            return (
                  stories.length && (
                        <div
                              id="container"
                              style={{
                                    ...storyContainerStyles,
                                    ...{
                                          width,
                                          height
                                    }
                              }}
                        >
                              <ProgressContext.Provider
                                    value={{
                                          showProgress,
                                          videoDuration,
                                          currentId,
                                          pause,
                                          next
                                    }}
                              >
                                    {
                                          getProgressVisualiser()
                                          /*(stories.length > 1 && currentIndex !== 0) ? progressVisualiser === "counter" ?
                            (<ProgressCounter/>) : (<ProgressArray/>) : null*/
                                    }
                              </ProgressContext.Provider>
                              <StoryClass
                                    action={toggleState}
                                    showProgress={showProgress}
                                    setShowProgress={setShowProgress}
                                    playState={pause}
                                    story={stories[currentId]}
                                    setVideoDuration={setVideoDuration}
                                    setProgressVisualiser={setProgressVisualiser}
                              />

                              <Controls
                                    stories={stories}
                                    currentId={currentId}
                                    currentIndex={currentIndex}
                                    debouncePause={debouncePause}
                                    finished={finished}
                                    interactive={interactive}
                                    mouseUp={mouseUp}
                              />
                        </div>
                  )
            );
      } catch (error) {
            console.error(error);
      }
};
export default Container;
