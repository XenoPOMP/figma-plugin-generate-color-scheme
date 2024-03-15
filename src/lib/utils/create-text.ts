/**
 * Creates figma text and returns it.
 * @param name
 */
export const createText = (name: string) => {
	const text = figma.createText();

	text.name = name;
	text.x = -4800;
	text.y = -1472;

	text.resizeWithoutConstraints(2549, 3203);

	return text;
};
