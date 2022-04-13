import React from "react";
import { GlobalCtx, StoriesProps } from "./types";
import Container from "./components/Container";
import GlobalContext from "./context/Global";
import { useAppDispatch } from "../../store/RTKstore";

export const Stories = function (props: StoriesProps) {
      const dispatch = useAppDispatch();
      const context: GlobalCtx = {
            // currentIndex: props.currentIndex,
            width: props.width,
            height: props.height,
            loader: props.loader,
            header: props.header,
            storyContainerStyles: props.storyContainerStyles,
            storyStyles: props.storyStyles,
            loop: props.loop,
            defaultInterval: props.defaultInterval,
            isPaused: props.isPaused,
            showProgress: props.showProgress,
            onStoryStart: props.onStoryStart,
            onStoryEnd: props.onStoryEnd,
            onAllStoriesEnd: props.onAllStoriesEnd,
            keyboardNavigation: props.keyboardNavigation,
            progressVisualiser: props.progressVisualiser
      };
      // const [stories, setStories] = useState<{ stories: Story[] }>({
      //     stories: generateStories(props.stories),
      // });
      // useEffect(() => {
      //     const stories = generateStories(props.stories);
      //     setStories({stories: stories});
      //     // dispatch(setStories(stories));
      // }, [props.stories]);
      // const [index, setIndex] = useState<number>(props.currentIndex);
      // useEffect(() => {
      //     setIndex(props.currentIndex);
      // }, [props.currentIndex]);
      return (
            // <IndexContext.Provider value={index}>
            //     <StoriesContext.Provider value={stories}>
            <GlobalContext.Provider value={context}>
                  <Container />
            </GlobalContext.Provider>
            //     </StoriesContext.Provider>
            // </IndexContext.Provider>
      );
};
