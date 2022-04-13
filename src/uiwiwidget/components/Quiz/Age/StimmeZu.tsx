export const StimmeZu = ({ todaleft = false, value = 0, left = "stimme gar nicht zu", right = "stimme voll zu" }) => {
      return (
            <div className="slider-labels-container" {...(todaleft ? { margin: 0 } : {})}>
                  <div className="left-text">{left}</div>
                  <div className="right-text">{right}</div>
            </div>
      );
      // {
      //     /*{dragged &&*/
      // }
      // {
      //     /*<output style={{marginTop: '30px'}}>{meinung[values[0]]}</output>*/
      // }
};
