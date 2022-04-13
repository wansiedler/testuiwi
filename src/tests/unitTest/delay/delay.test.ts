import { delay } from "./delay";

describe("delay", () => {
	test("Correct Value", async () => {
		const sum = await delay(() => 5 + 5, 10);
		expect(sum).toBe(10);
	});
});
 
