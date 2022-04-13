import { mapArrToStrings } from "./mapArrToStrings";

describe("mapArrToStrings", () => {
	test("Correct Value", () => {
		expect(mapArrToStrings([1, 2, 3])).toEqual(["1", "2", "3"]);
	});
	test("Mix", () => {
		expect(mapArrToStrings([1, 2, 3, null, undefined, "asfasf"])).toEqual(["1", "2", "3"]);
	});
	test("Empty Array", () => {
		expect(mapArrToStrings([])).toEqual([]);
	});
	test("Minus", () => {
		expect(mapArrToStrings([1, 2, 3])).not.toEqual([1, 2, 3, 4]);
	});
});
