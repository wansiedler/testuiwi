import React from "react";

const IncomeTitle = ({ title, subtext }) => {
      return (
            <>
                  <div className="income-background" />
                  <div className="title-wrapper">
                        <h2 className="id-uiwi-h2 title-text">
                              {title ? title : null}: <span className="id-uiwi-span title-subtext">{subtext ? subtext : null}</span>
                        </h2>
                  </div>
            </>
      );
};

export default IncomeTitle;
