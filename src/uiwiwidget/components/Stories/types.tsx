import * as React from "react";

export type StoriesProps = {
      // stories: Story[];
      width?: NumberOrString;
      height?: NumberOrString;
      onAnswer?: Function;
      loader?: JSX.Element;
      header?: Function;
      storyContainerStyles?: Record<string, any>;
      storyStyles?: Object;
      loop?: boolean;
      progressVisualiser?: string;
      defaultInterval?: number;
      isPaused?: boolean;
      showProgress?: boolean;
      currentIndex?: number;
      onAllStoriesEnd?: Function;
      onStoryStart?: Function;
      onStoryEnd?: Function;
      keyboardNavigation?: boolean;
      limbicType?: string;
      play?: boolean;
};
export type GlobalCtx = {
      width?: NumberOrString;
      height?: NumberOrString;
      loader?: JSX.Element;
      header?: Function;
      storyContainerStyles?: Record<string, any>;
      storyStyles?: Object;
      loop?: boolean;
      progressVisualiser?: string;
      defaultInterval?: number;
      isPaused?: boolean;
      showProgress?: boolean;
      currentIndex?: number;
      onAllStoriesEnd?: Function;
      onStoryStart?: Function;
      onStoryEnd?: Function;
      keyboardNavigation?: boolean;
};
type NumberOrString = number | string;
export type StoriesContext = {
      stories: Story[];
};
export type ContainerState = {
      currentId: number;
      pause: boolean;
      count: number;
      storiesDone: number;
};
export type Action = (action: string, showProgress?: boolean) => void;
export type StoryProps = {
      story: Story;
      action: Action;
      playState: boolean;
      setVideoDuration: Function;
      showProgress: boolean;
      setShowProgress: Function;
      setProgressVisualiser: Function;
      limbicType: string;
};
export type StoryState = {
      loaded: boolean;
      showMore: boolean;
};
export type Story = {
      [key: string]: any;
      id?: string;
      name?: string;
      url?: string;
      question?: string;
      subtext?: string;
      subtext2?: string;
      groups?: [];
      seeMore?: Function;
      onAnswer?: Function;
      seeMoreCollapsed?: React.ComponentType<{
            toggleMore: (show: boolean) => void;
            action: Action;
      }>;
      backgroundPicture?: string;
      backgroundPictures?: {
            cookies?: string;
            doll?: string;
            redMan?: string;
      };
      header?: Header;
      type: string;
      duration?: number;
      title?: string;
      styles?: object;
      content?: React.ElementType;
      // content?: Renderer;
      // originalContent?: Renderer
      originalContent?: React.ElementType;
      choices?: object[];
      votes?: string[];
      choiceAmount?: number;
};
export type Header = {
      heading: string;
      subheading: string;
      profileImage: string;
};
export type ProgressProps = {
      width: number;
      active: number;
      count: number;
};
export type ProgressWrapperProps = {
      children: any;
      width: number;
      pause: boolean;
      showProgress: boolean;
};
export type ProgressContext = {
      currentId: number;
      videoDuration: number;
      showProgress: boolean;
      pause: boolean;
      next: Function;
};
