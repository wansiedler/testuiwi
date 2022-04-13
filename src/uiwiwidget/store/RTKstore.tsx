import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import quizSliceReducer from "./features/quiz/quizSlice";

export const getStore = (initStore = null) => {
      return configureStore({
            reducer: {
                  quiz: quizSliceReducer
            },
            // middleware: (getDefaultMiddleware) => {
            //       return getDefaultMiddleware({
            //             // thunk: {
            //             //     extraArgument:
            //             // },
            //             serializableCheck: {
            //                   ignoredActions: ["quiz/setStories"],
            //                   ignoredPaths: ["quiz.stories"]
            //             }
            //       });
            // },
            devTools: process.env.ENVIRONMENT !== "production"
      });
};

const store = getStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type QuizState = ReturnType<typeof quizSliceReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const selectQuiz = (state: RootState): QuizState => state.quiz;
