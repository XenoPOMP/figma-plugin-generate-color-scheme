/**
 * Converts rgb color from figma to
 * hex color code.
 *
 * @param rgb
 * @param opacity
 *
 * @example
 * rgb(0, 0, 0) => #000000
 * rgb(255, 0, 0) => #FF0000
 */
export const rgbToHex = (
	rgb: SolidPaint['color'],
	opacity: SolidPaint['opacity']
) => {
	const { r, g, b } = rgb;

	let result = '';

	if (opacity === 1) {
		const dec2hex = (num: number) => {
			const parsedNum = parseInt(`${num}`).toString(16).toUpperCase();

			return parsedNum.length === 1 ? `0${parsedNum}` : parsedNum;
		};

		const formatRgb = ({
			r,
			g,
			b,
		}: Record<'r' | 'g' | 'b', string>): string => {
			return `#${r}${g}${b}`;
		};

		const redHex = dec2hex(r * 255);
		const greenHex = dec2hex(g * 255);
		const blueHex = dec2hex(b * 255);

		result = formatRgb({
			r: redHex,
			g: greenHex,
			b: blueHex,
		});
	} else {
		result = `rgba(${r * 255} ${g * 255} ${b * 255} / ${opacity})`;
	}

	return result;
};
