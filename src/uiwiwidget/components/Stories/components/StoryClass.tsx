import React, { Component, useEffect } from "react";
import { sendEvent } from "../../../quizAction";
import GlobalContext from "../context/Global";
import { connect } from "react-redux";
import { storyGenerator } from "./storyGenerator";
import { eventTypes, slideTypes as types } from "../../../types";

function useInsideAlerter(ref, quiz) {
      useEffect(() => {
            function handleClickOutside(event) {
                  if (ref.current && ref.current.contains(event.target)) {
                        sendEvent({
                              eventType: eventTypes.CLICK,
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

class Story extends Component<any, any> {
      static contextType = GlobalContext;

      wrapperRef = null;

      constructor(props) {
            super(props);
            this.wrapperRef = React.createRef();
            this.state = {
                  config: {},
                  quiz: this.props.quiz
            };
      }

      componentDidMount() {
            const config = this.context;
            if (
                  this.props.story &&
                  this.props.story.type !== types.idle &&
                  this.props.story &&
                  this.props.story.type !== types.idleGender
            ) {
                  sendEvent({
                        eventType: eventTypes.ACTIVE_VIEW,
                        quiz: this.state.quiz
                  });
            }
            this.setState((prevState) => ({
                  ...this.state,
                  config
            }));
      }

      shouldComponentUpdate(nextProps, nextState) {
            if (this.props.story !== nextProps.story) {
                  if (
                        this.state.story &&
                        nextProps.story &&
                        this.state.story.type !== nextProps.story.type &&
                        nextProps.story.type !== types.idle &&
                        nextProps.story.type !== types.idleGender
                  ) {
                        sendEvent({
                              eventType: eventTypes.ACTIVE_VIEW,
                              quiz: nextProps.quiz
                        });
                  }
                  return true;
            } else if (nextProps.story) {
                  return false;
            }
            return false;
      }

      rendererMessageHandler = (type: string, data: any) => {
            switch (type) {
                  case "UPDATE_VIDEO_DURATION":
                        this.props.setVideoDuration(data.duration);
                        return { ack: "OK" as const };
            }
      };

      getStoryContent = () => {
            if (!this.props.story) return <div>No Story to render</div>;
            const story = storyGenerator(this.props.story);

            try {
                  const Content: React.ElementType = story.originalContent;
                  const config = this.state.config;
                  return (
                        // @ts-ignore
                        <Content
                              config={config}
                              story={this.props.story}
                              limbicType={this.props.limbicType}
                              action={this.props.action}
                              isPaused={this.props.playState}
                              setShowProgress={this.props.setShowProgress}
                              messageHandler={this.rendererMessageHandler}
                              {...this.props}
                        />
                  );
            } catch (error) {
                  console.error(error);
            }
      };

      render() {
            // useInsideAlerter(this.wrapperRef, this.state.quiz);
            return (
                  <div ref={this.wrapperRef} className={"story"}>
                        {this.getStoryContent()}
                  </div>
            );
      }
}

const mapStateToProps = (state) => ({ quiz: state.quiz });
export const StoryClass = connect(mapStateToProps)(Story);
