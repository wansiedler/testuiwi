import React, { useContext, useEffect, useRef, useState } from "react";
import Progress from "./Progress";
import { GlobalCtx, ProgressContext } from "../types";
import ProgressCtx from "../context/Progress";
import GlobalContext from "../context/Global";
import { QuizState } from "../../../store/features/quiz/quizSlice";
import { selectQuiz, useAppSelector } from "../../../store/RTKstore";

export const ProgressArray = () => {
      const [count, setCount] = useState<number>(0);
      const { currentId, next, videoDuration } = useContext<ProgressContext>(ProgressCtx);
      const { defaultInterval, onStoryEnd, onStoryStart, onAllStoriesEnd } = useContext<GlobalCtx>(GlobalContext);
      // const {stories} = useContext<StoriesContextInterface>(StoriesContext);
      const { stories }: QuizState = useAppSelector(selectQuiz);
      const { showProgress, pause } = useContext<ProgressContext>(ProgressCtx);
      useEffect(() => {
            setCount(0);
      }, [currentId, stories]);
      useEffect(() => {
            if (!pause) {
                  animationFrameId.current = requestAnimationFrame(incrementCount);
            }
            return () => {
                  cancelAnimationFrame(animationFrameId.current);
            };
      }, [currentId, pause]);
      const animationFrameId = useRef<number>();
      let countCopy = count;
      const incrementCount = () => {
            if (countCopy === 0) storyStartCallback();
            setCount((count: number) => {
                  const interval = getCurrentInterval();
                  countCopy = count + 100 / ((interval / 1000) * 60);
                  return count + 100 / ((interval / 1000) * 60);
            });
            if (countCopy < 100) {
                  animationFrameId.current = requestAnimationFrame(incrementCount);
            } else {
                  storyEndCallback();
                  if (currentId === stories.length - 1) {
                        allStoriesEndCallback();
                  }
                  cancelAnimationFrame(animationFrameId.current);
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
      const getCurrentInterval = () => {
            if (stories[currentId].type === "video") return videoDuration;
            if (typeof stories[currentId].duration === "number") return stories[currentId].duration;
            return defaultInterval;
      };

      return (
            <div className="progress_array">
                  {stories.map((_, i) => (
                        <Progress
                              key={i}
                              count={count}
                              width={1 / stories.length}
                              active={i === currentId ? 1 : i < currentId ? 2 : 0}
                        />
                  ))}
            </div>
      );
};
