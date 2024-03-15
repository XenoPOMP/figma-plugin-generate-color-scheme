interface TextCreationOptions {
	position?: {
		readonly x: number;
		readonly y: number;
	};

	size?: {
		readonly width: number;
		readonly height: number;
	};
}

/**
 * Creates figma text and returns it.
 * @param name
 * @param options
 */
export const createText = (name: string, options?: TextCreationOptions) => {
	const text = figma.createText();

	text.name = name;
	text.x = options?.position?.x || -4800;
	text.y = options?.position?.y || -1472;

	text.resizeWithoutConstraints(
		options?.size?.width || 2549,
		options?.size?.height || 3203
	);

	return text;
};
