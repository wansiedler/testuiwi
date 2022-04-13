import React from "react";
import { StoriesContext as StoriesContextInterface, Story } from "../types";

export const initialContext: { stories: Story[] } = {
      stories: []
};
const StoriesContext = React.createContext<StoriesContextInterface>(initialContext);
export const IndexContext = React.createContext<number>(0);
export default StoriesContext;
