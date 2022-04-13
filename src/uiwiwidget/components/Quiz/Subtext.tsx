import React from "react";

export const Subtext = ({ story }) => {
      return <div>{story.subtext && <p className={"subtext"}>{story.subtext}</p>}</div>;
};
