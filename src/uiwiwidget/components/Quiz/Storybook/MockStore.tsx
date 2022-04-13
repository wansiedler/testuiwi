import { initialState, initSlice, QuizState } from "../../../store/features/quiz/quizSlice";
import React from "react";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { limbicTypes, quizTypes } from "../../../types";

export const MockStore = ({ initialState, children }) => (
      <Provider
            store={configureStore({
                  reducer: {
                        quiz: createSlice(
                              {
                                    ...initSlice,
                                    initialState
                              }
                        ).reducer
                  }
            })}
      >
            {children}
      </Provider>
);

export const MockStory = (Story, mockedState) => {
      return (
            <MockStore
                  initialState={{
                        ...mockedState
                  }}
            >
                  <Story />
            </MockStore>
      );
};