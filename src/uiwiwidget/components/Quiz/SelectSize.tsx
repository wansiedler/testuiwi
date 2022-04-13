import { useAppDispatch } from "../../store/RTKstore";
import { setSize } from "../../store/features/quiz/quizSlice";

type SelectLimbicTypesProps = {
      sizes: Record<string, unknown>;
      size: string;
};
const SelectSize = ({ sizes, size }: SelectLimbicTypesProps) => {
      const dispatch = useAppDispatch();
      return (
            <div
                  style={{
                        position: "absolute",
                        right: 5,
                        top: 5,
                        zIndex: 10000
                  }}
            >
                  <select
                        value={size}
                        onChange={(event) => {
                              // @ts-ignore

                              // @ts-ignore
                              dispatch(setSize(sizes[event.target.value]));
                        }}
                  >
                        {Object.keys(sizes).map((option, idx) => (
                              <option value={option} key={idx}>
                                    {option}
                              </option>
                        ))}
                  </select>
            </div>
      );
};
export { SelectSize };
