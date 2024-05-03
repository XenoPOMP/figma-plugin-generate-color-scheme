type NumericRecord<TType extends string | number | symbol> = Record<
	TType,
	number
>;

interface ICreateTextOptions
	extends NumericRecord<'x' | 'y' | 'width' | 'height'> {}

/**
 * Creates figma text and returns it.
 * @param name
 * @param content
 * @param options
 */
export const createText = async (
	name: string,
	content: string,
	options: ICreateTextOptions = {
		x: -4800,
		y: -1472,
		width: 2549,
		height: 3203,
	}
) => {
	/** Created Figma`s text node. */
	const text = figma.createText();

	/** Change metadata of text. */
	text.name = name;
	text.x = options.x;
	text.y = options.y;

	/** Change sizes of text */
	text.resizeWithoutConstraints(options.width, options.height);

	/** Load font asynchronously. */
	await figma.loadFontAsync(text.fontName as FontName);

	/** Set content of text node. */
	text.characters = content;

	/** Change styles of text. */
	text.fontSize = 50;
	text.textAutoResize = 'HEIGHT';
	text.fills = [
		{
			type: 'SOLID',
			color: {
				r: 1,
				g: 1,
				b: 1,
			},
			opacity: 1,
		},
	];

	return text;
};
