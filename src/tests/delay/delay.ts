export const delay = (callback: { (): number; (): unknown; }, ms: number | undefined) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(callback());
		}, ms);
	});
};
