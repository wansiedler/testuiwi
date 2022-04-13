import { square } from "./square";

describe("square", () => {
	let mockValue;
	// Перед каждым
	beforeEach(() => {
		// ДОБАВИТЬ В БД
	});
	// Один раз перед всеми тестами
	beforeAll(() => {
	});
	test("Correct Value", () => {
		// expect(square(2)).toBe(4);
		// expect(square(2)).toBeLessThan(5);
		// expect(square(2)).toBeGreaterThan(3);
		// expect(square(2)).not.toBeUndefined();
		const spyMathPow = jest.spyOn(Math, "pow");
		square(2);
		expect(spyMathPow).toBeCalledTimes(1);
	});

	test("Correct Value", () => {
		const spyMathPow = jest.spyOn(Math, "pow");
		square(1);
		expect(spyMathPow).toBeCalledTimes(0);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});
	afterAll(() => {
	});
});