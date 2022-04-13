import { selectQuiz, useAppDispatch, useAppSelector } from "../../../../store/RTKstore";
import { setFinished } from "../../../../store/features/quiz/quizSlice";
// import {Logo} from "../Logo/Logo";
import { Newsletter } from "./Newsletter";
import { Question } from "../../Question";

const NewsletterQuiz = ({ story, ...props }) => {
      props.action("pause", false);
      const quiz = useAppSelector(selectQuiz);
      const dispatch = useAppDispatch();
      dispatch(setFinished());
      return (
            <div className="quiz newsletter">
                  <Question question={story.question} />
                  <Newsletter text={"Ihre Nachrichten-Übersicht"} subtext={"Der Politik-Überblick für Bayern, Deutschland und die Welt."} />
                  {/*<Logo/>*/}
            </div>
      );
};
export default NewsletterQuiz;
