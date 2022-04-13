import React from "react";

// import React from 'preact';
// import { useEffect } from 'preact/hooks'
import { ProgressContext } from "../types";

export default React.createContext<ProgressContext>({
      currentId: 0,
      videoDuration: 0,
      showProgress: false,
      pause: false,
      next: () => {}
});
