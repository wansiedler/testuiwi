import React from "react";

export default function ({ finished, currentIndex, debouncePause, currentId, mouseUp, interactive, stories }) {
      const left = (
            <button
                  className="navButton icon__left"
                  // onTouchStart={debouncePause}
                  // onMouseDown={debouncePause}
                  onTouchEnd={mouseUp("previous")}
                  onMouseUp={mouseUp("previous")}
            />
      );
      const right = (
            <button
                  className={`navButton icon__right ${interactive ? "interactive" : ""}`}
                  // onTouchStart={debouncePause}
                  // onMouseDown={debouncePause}
                  onTouchEnd={mouseUp("next")}
                  onMouseUp={mouseUp("next")}
            />
      );
      return (
            <>
                  {!finished && (
                        <div id="controls">
                              {/*{currentIndex > 0 || currentId > 0 && left}*/}
                              {/*{(currentIndex < stories.length - 1 || interactive) && right}*/}
                              {interactive && right}
                              {/*{left}*/}
                              {/*{right}*/}
                        </div>
                  )}
            </>
      );
}
