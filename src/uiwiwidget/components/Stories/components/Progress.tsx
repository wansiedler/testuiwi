import React, { useContext } from "react";
import { ProgressContext, ProgressProps, ProgressWrapperProps } from "../types";
import ProgressCtx from "../context/Progress";

const ProgressWrapper = (props: ProgressWrapperProps) => (
      <div style={{ ...getProgressWrapperStyle(props) }} className="progress_wrapper">
            {props.children}
      </div>
);
const getProgressWrapperStyle = ({ width, pause, showProgress }) => ({
      width: `${width * 100}%`
      // opacity: pause && !showProgress ? 0 : 1,
});
export default (props: ProgressProps) => {
      const { showProgress, pause } = useContext<ProgressContext>(ProgressCtx);
      const getProgressStyle = ({ active }) => {
            switch (active) {
                  case 2:
                        return { width: "100%" };
                  case 1:
                        // return {transform: `scaleX(${props.count / 100})`};
                        return { width: "100%" };
                  case 0:
                        return { width: 0 };
                  default:
                        return { width: 0 };
            }
      };
      const { width, active } = props;
      return (
            <ProgressWrapper width={width} pause={pause} showProgress={showProgress}>
                  <div className="progress" style={{ ...getProgressStyle({ active }) }} />
            </ProgressWrapper>
      );
};
