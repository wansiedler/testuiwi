import { setTheme, setSize } from "../../store/features/quiz/quizSlice";
import { useAppDispatch } from "../../store/RTKstore";

export const SelectLimbicTypes = ({ limbicType, limbicTypes }) => {
      const dispatch = useAppDispatch();
      return (
            <div
                  style={{
                        position: "absolute",
                        top: 5,
                        left: 5,
                        zIndex: 10000
                  }}
            >
                  <select
                        value={limbicType}
                        onChange={(event) => {
                              // @ts-ignore
                              dispatch(setTheme(event.target.value));
                        }}
                  >
                        {Object.keys(limbicTypes).map((option, idx) => (
                              <option value={option} key={idx}>
                                    {option}
                              </option>
                        ))}
                  </select>
            </div>
      );
};
