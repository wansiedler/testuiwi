import React, { useContext, useEffect, useRef, useState } from "react";
import { GlobalCtx, ProgressContext } from "../types";
import ProgressCtx from "../context/Progress";
import GlobalContext from "../context/Global";
import { QuizState } from "../../../store/features/quiz/quizSlice";
import { selectQuiz, useAppSelector } from "../../../store/RTKstore";

/**
 * Used by GenderPicture component.
 */
export default () => {
      const { currentId, next, videoDuration, showProgress, pause } = useContext<ProgressContext>(ProgressCtx);
      // const {stories} = useContext<StoriesContextInterface>(StoriesContext);
      const { stories }: QuizState = useAppSelector(selectQuiz);
      const { defaultInterval, onStoryEnd, onStoryStart, onAllStoriesEnd } = useContext<GlobalCtx>(GlobalContext);
      const getCurrentInterval = () => {
            if (stories[currentId] && stories[currentId].type === "video") return videoDuration;
            if (stories[currentId] && typeof stories[currentId].duration === "number")
                  return stories[currentId].duration;
            return defaultInterval;
      };
      const [decrement, setDecrement] = useState<number>(0);
      const intervalRef = useRef<ReturnType<typeof setInterval>>(null);
      useEffect(() => {
            setDecrement(getCurrentInterval());
      }, [currentId, stories]);
      useEffect(() => {
            if (!pause) {
                  intervalRef.current = setInterval(decrementCount, 1000);
            }
            return () => {
                  clearInterval(intervalRef.current);
            };
      }, [currentId, pause]);
      let decrementCopy = decrement;
      const decrementCount = () => {
            if (decrementCopy === getCurrentInterval()) storyStartCallback();
            setDecrement((count: number) => {
                  const interval = getCurrentInterval();
                  decrementCopy = count - 1000;
                  return count - 1000;
            });
            if (decrementCopy < 0) {
                  storyEndCallback();
                  if (currentId === stories.length - 1) {
                        allStoriesEndCallback();
                  }
                  clearInterval(intervalRef.current);
                  next();
            }
      };
      const storyStartCallback = () => {
            onStoryStart && onStoryStart(currentId, stories[currentId]);
      };
      const storyEndCallback = () => {
            onStoryEnd && onStoryEnd(currentId, stories[currentId]);
      };
      const allStoriesEndCallback = () => {
            onAllStoriesEnd && onAllStoriesEnd(currentId, stories);
      };
      const ProgressWrapper = (props) => (
            <div style={{ ...getProgressWrapperStyle(props) }} id="countdown">
                  {props.children}
            </div>
      );
      const getProgressWrapperStyle = ({ pause, showProgress }) => ({
            opacity: !showProgress ? 0 : 1
      });
      const Progress = (props) => {
            const { showProgress, pause } = useContext<ProgressContext>(ProgressCtx);
            return (
                  <ProgressWrapper pause={pause} showProgress={showProgress}>
                        <div>{Math.round(props.decrement)}</div>
                  </ProgressWrapper>
            );
      };
      return (
            <div>
                  <Progress decrement={decrement / 1000 >= 0 ? decrement / 1000 : 0} />
            </div>
      );
};
