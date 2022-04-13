import React, { useContext, useEffect, useRef } from "react";
import { GlobalCtx, StoryProps } from "../types";
import GlobalContext from "../context/Global";
import { selectQuiz, useAppSelector } from "../../../store/RTKstore";
import { sendEvent } from "../../../quizAction";
import { eventTypes } from "../../../types";

function useInsideAlerter2(ref) {
      const quiz = useAppSelector(selectQuiz);
      useEffect(() => {
            function handleClickOutside(event) {
                  if (ref.current && ref.current.contains(event.target)) {
                        sendEvent({
                              eventType: eventTypes.ACTIVE_VIEW,
                              quiz
                        });
                  }
            }

            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                  // Unbind the event listener on clean up
                  document.removeEventListener("mousedown", handleClickOutside);
            };
      }, [ref]);
}

export const Story = (props: StoryProps) => {
      const quiz = useAppSelector(selectQuiz);

      const globalContext = useContext<GlobalCtx>(GlobalContext);
      const { width, height, loader, header, storyStyles } = globalContext;
      const rendererMessageHandler = (type: string, data: any) => {
            switch (type) {
                  case "UPDATE_VIDEO_DURATION":
                        props.setVideoDuration(data.duration);
                        return { ack: "OK" as const };
            }
      };

      // useEffect(() => {

      //     sendEvent(
      //         {
      //             eventType: "newActiveView",
      //             quiz
      //         }
      //     );
      // }, []);

      useEffect(() => {
            sendEvent({
                  eventType: eventTypes.ACTIVE_VIEW,
                  quiz
            });
      }, [props.story]);

      const getStoryContent = () => {
            if (!props.story) return <div>No Story to render</div>;
            try {
                  const InnerContent: React.ElementType = props.story.content;
                  const config = { width, height, loader, header, storyStyles };

                  return (
                        // <div
                        //     data-id-elavtr={`{"experimentId":"${quiz.experimentId}","experimentVariantId":"${quiz.variantId}","experimentRoundNr":${quiz.experimentRoundNr}}`}
                        // >
                        // @ts-ignore
                        <InnerContent
                              config={config}
                              story={props.story}
                              limbicType={props.limbicType}
                              action={props.action}
                              isPaused={props.playState}
                              setShowProgress={props.setShowProgress}
                              messageHandler={rendererMessageHandler}
                              {...props}
                        />
                        // </div>
                  );
            } catch (error) {
                  console.error(error);
            }
      };

      const wrapperRef = useRef(null);
      useInsideAlerter2(wrapperRef);

      return (
            <div ref={wrapperRef} className={"story"}>
                  {getStoryContent()}
            </div>
      );
};
