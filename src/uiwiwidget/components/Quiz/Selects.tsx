export const Selects = ({ choiceAmount = 0, answered }) => {
      return (
            <p
                  style={{
                        lineHeight: 0,
                        fontSize: 10,
                        padding: 0,
                        margin: 0,
                        marginTop: 5,
                        position: "absolute",
                        top: 170,
                        left: "50%",
                        transform: "translate(-50%, -50%)"
                  }}
            >
                  <span className="id-uiwi-span">
                        {/*{choiceAmount > 1 && choiceAmount - answered > 0 ?*/}
                        {/*    `${(answered && choiceAmount - answered) || choiceAmount} Option${(choiceAmount - answered) > 1 ? "en" : ""} */}
                        {/*    ${(choiceAmount - answered) < choiceAmount ? "übrig" : ''}` : null}*/}
                        {choiceAmount > 1 && " *max 3 Bereiche"}
                  </span>
            </p>
      );
};
