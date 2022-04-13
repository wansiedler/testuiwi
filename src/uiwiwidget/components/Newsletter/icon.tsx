// import React from "preact/compat";
// <style type="text/css">
//       .st0{fill:none;stroke:current;stroke-miterlimit:10;}
//       .st1{fill:none;stroke:current;stroke-width:5;stroke-miterlimit:10;}
//       .st2{fill:none;}
//       .st3{font-family:'Galvji';}
//       .st4{font-size:66.39px;}
// </style>

import React from "preact/compat";

// const logo = require("./logo.svg") as string;

// import Logo from "./images/icon.svg" ;

export const Icon = () => {
      return (
            <>
                  {/*<Logo />!*/}
                  <img
                        className="newsletter-icon"
                        // src={require("./images/icon.png")}
                        src={require("./images/icon.svg")}
                        alt={"icon"}
                  />
            </>
      );
};
