import React from "react";
// import "./GrillMan.scss";

export type GrillManProps = {
      idx: number;
      threshold?: number;
      data: {
            value: number;
            topic: string;
      };
};

export default function GrillMan({ data, idx, threshold = 10 }: GrillManProps) {
      return (
            <div
                  style={{
                        display: "inline-block",
                        margin: 30,
                        fontWeight: "bold",
                        textAlign: "center"
                  }}
            >
                  {/*<div>*/}
                  {/*      <div className="box" />*/}
                  {/*</div>*/}

                  <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={`url(#color-${idx})`}
                        aria-hidden="true"
                        width="70.211"
                        height="141.749"
                        viewBox="0 0 70.211 141.749"
                  >
                        <defs>
                              <linearGradient id={`color-${idx}`} x1="0%" y1="100%" x2="0%" y2="0%">
                                    <stop offset={`${Math.min(0, threshold)}%`} stopColor="rgb(179, 29, 4)" />
                                    <stop offset={`${data.value}%`} stopColor="rgb(255, 0, 0)" />
                                    <stop stopColor="rgb(227, 227, 227)" />
                              </linearGradient>
                        </defs>

                        <g>
                              <circle cx="11.026" cy="11.026" r="11.026" transform="translate(24.08 6)" />
                              {/*<path*/}
                              {/*      d="M4.477,101.283c.082,0,.164,0,.247-.007a4.21,4.21,0,0,0,3.925-4.468c-.205-3.515-.3-6.716-.3-9.628-.017-12.8,1.825-19.985,3.635-23.737v79.264a6.455,6.455,0,1,0,12.909,0v-47.7h2.42v47.7a6.455,6.455,0,1,0,12.909,0V63.467a23.069,23.069,0,0,1,.929,2.239c1.471,4.128,2.71,10.9,2.705,21.474,0,2.913-.093,6.114-.3,9.629a4.209,4.209,0,0,0,3.926,4.466c.082,0,.164.007.246.007A4.2,4.2,0,0,0,51.9,97.3c.21-3.663.309-7.027.309-10.121-.02-15.95-2.538-24.776-5.969-30.084a14.8,14.8,0,0,0-5.575-5.26,9.845,9.845,0,0,0-4.294-1.128c-.061,0-.121-.009-.183-.009H16.022c-.066,0-.131.007-.2.01a9.827,9.827,0,0,0-4.283,1.127c-2.808,1.409-5.835,4.493-7.953,9.955C1.446,67.276.007,75.205,0,87.179,0,90.273.1,93.639.311,97.3A4.2,4.2,0,0,0,4.477,101.283Z"*/}
                              {/*      transform="translate(9 -19.49)"*/}
                              {/*/>*/}
                              <path
                                    d="M-19164.721-1711.577v-47.7h-2.424v47.7a6.492,6.492,0,0,1-6.453,6.531,6.494,6.494,0,0,1-6.455-6.531v-79.266c-1.811,3.752-3.65,10.943-3.637,23.741,0,2.909.092,6.112.3,9.628a4.206,4.206,0,0,1-3.926,4.465c-.08,0-.162.01-.244.01a4.2,4.2,0,0,1-4.166-3.983c-.213-3.661-.314-7.027-.314-10.12.01-11.974,1.445-19.907,3.594-25.388,2.115-5.467,5.145-8.549,7.951-9.956a9.746,9.746,0,0,1,4.283-1.127c.063,0,.129-.01.2-.01h13.438l6.912,0a9.932,9.932,0,0,1,4.3,1.132,14.82,14.82,0,0,1,5.572,5.26c3.43,5.308,5.949,14.132,5.969,30.084,0,3.092-.1,6.459-.309,10.12a4.2,4.2,0,0,1-4.166,3.983c-.082,0-.164,0-.246-.01a4.206,4.206,0,0,1-3.926-4.465c.2-3.516.293-6.719.293-9.628.006-10.572-1.232-17.349-2.7-21.477a24.042,24.042,0,0,0-.93-2.24v79.242a6.5,6.5,0,0,1-6.459,6.531A6.491,6.491,0,0,1-19164.721-1711.577Zm-12.238-106.191a11.022,11.022,0,0,1,11.023-11.025,11.025,11.025,0,0,1,11.025,11.025,11.025,11.025,0,0,1-11.025,11.025A11.022,11.022,0,0,1-19176.959-1817.768Z"
                                    transform="translate(19201.04 1834.79)"
                              />
                        </g>
                  </svg>

                  <div>{data.topic}</div>
                  <div>{data.value > 0 ? data.value / 50 : data.value} von 2</div>
                  <div>Antworten</div>
                  <div>Richtig</div>
            </div>
      );
}
