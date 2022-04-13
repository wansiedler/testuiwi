import * as React from "react";
import { Direction, getTrackBackground, Range } from "./ReactRange";

const Slider: React.FC<{
      rtl?: boolean;
      onFinalChange?: (values: number[]) => void;
      disabled?: boolean;
      isSelected?: boolean;
      valuesProps?: number[];
      STEP?: number;
      MIN?: number;
      MAX?: number;
}> = ({
      STEP = 1,
      MIN = 0,
      MAX = 4,
      valuesProps = [2],
      rtl = false,
      onFinalChange,
      disabled = false,
      isSelected = false
}) => {
      const [values, setValues] = React.useState(valuesProps);
      const [dragged, setDragged] = React.useState(false);

      const setSelectedTrackerBackground = () => {
            if (isSelected) {
                  return "selected";
            }
            return "";
      };

      return (
            <>
                  <div className="slider-wrapper">
                        <Range
                              values={values}
                              step={STEP}
                              min={MIN}
                              max={MAX}
                              rtl={rtl}
                              onFinalChange={onFinalChange}
                              onChange={(values) => {
                                    setDragged(true);
                                    setValues(values);
                              }}
                              disabled={disabled}
                              renderMark={({ props, index }) => {
                                    if (props.key === "mark0") {
                                          props.style.transform = null;
                                    }

                                    return (
                                          <div
                                                className="slider-dot"
                                                {...props}
                                                style={{
                                                      ...props.style
                                                }}
                                          />
                                    );
                              }}
                              renderTrack={({ props, children }) => (
                                    <div
                                          className="slider-outer-wrapper"
                                          // @ts-ignore
                                          onMouseDown={props.onMouseDown}
                                          // @ts-ignore
                                          onTouchStart={props.onTouchStart}
                                          /*style={{
                                ...props.style,
                            }}*/
                                    >
                                          <div className="slider-wrapper-background">
                                                <div className="slider-bar-wrapper ">
                                                      <div className="slider-bar-wrapper ">
                                                            <div
                                                                  className="slider-bar-wrapper "
                                                                  ref={props.ref}
                                                                  id={"color"}
                                                                  style={{
                                                                        background: getTrackBackground({
                                                                              values,
                                                                              // opacity: 1,
                                                                              colors: ["transparent", "#84BF06", "red"],
                                                                              min: MIN,
                                                                              max: MAX,
                                                                              direction: Direction.Right,
                                                                              rtl
                                                                        }),
                                                                        alignSelf: "center"
                                                                  }}
                                                            >
                                                                  {children}
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              )}
                              renderThumb={({ props, isDragged }) => {
                                    return (
                                          // @ts-ignore
                                          <div
                                                {...props}
                                                id="renderThumb"
                                                style={{
                                                      ...props.style
                                                }}
                                          >
                                                <div
                                                      className={`slider-thumb ${setSelectedTrackerBackground()}`}
                                                      style={{
                                                            border: "none"
                                                      }}
                                                />
                                          </div>
                                    );
                              }}
                        />
                  </div>
                  {/*<div className="arrows-wrapper">
                        <span className="left-arrows">&lt;&lt;</span>
                        <span className="right-arrows">&gt;&gt;</span>
                  </div>*/}
            </>
      );
};

export default Slider;
