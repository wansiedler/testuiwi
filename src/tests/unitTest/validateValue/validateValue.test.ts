import { validateValue } from "./validateValue.ts";

test("Value validation", () => {
	expect(validateValue(50)).toBe(true);
});

describe("Value validation", () => {
	test("Value correct", () => {
		expect(validateValue(50)).toBe(true);
	});
	test("Value is less", () => {
		expect(validateValue(-1)).toBe(false);
	});
	test("Value is more", () => {
		expect(validateValue(101)).toBe(false);
	});
	test("Below", () => {
		expect(validateValue(0)).toBe(true);
	});
	test("Above", () => {
		expect(validateValue(100)).toBe(true);
	});
});
