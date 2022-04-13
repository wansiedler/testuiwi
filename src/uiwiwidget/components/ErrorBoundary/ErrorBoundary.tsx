import React, { ErrorInfo } from "react";
import { sendEvent } from "../../quizAction";
import { eventTypes } from "../../types";
import { connect } from "react-redux";
import { QuizState, selectQuiz } from "../../store/RTKstore";

type ErrorBoundaryProps = { quiz: QuizState; children?: any };

class ErrorBoundary extends React.Component<ErrorBoundaryProps, { error?: Error; errorInfo?: ErrorInfo }> {
      constructor(props) {
            super(props);
            this.state = {};
      }

      static getDerivedStateFromError(error) {
            // Update state so the next render will show the fallback UI.
            return { error };
      }

      componentDidCatch(error, errorInfo) {
            this.setState({
                  error,
                  errorInfo
            });
            // You can also log the error to an error reporting service
            // logErrorToMyService(error, errorInfo);

      }

      render() {
            if (this.state.error) {
                  console.error(this.state.error);
                  const quiz = this.props;
                  sendEvent({
                        eventType: eventTypes.FALLBACK,
                        quiz
                  });
                  // You can render any custom fallback UI
                  return <h1>Something went wrong: {this.state.error}</h1>;
            }

            return this.props.children;
      }
}

const mapStateToProps = (state) => ({ quiz: state.quiz });
export default connect(mapStateToProps, null)(ErrorBoundary);
