import { RecursiveKeyValuePair } from 'tailwindcss/types/config';

import { isSolidPaint, rgbToHex } from '@/lib/utils';

type Tree = RecursiveKeyValuePair<string, string>;

/**
 * Creates paint tree from figma styles
 * to better organization of TW variables.
 */
export const getPaintTree = () => {
	const paintStyles = figma.getLocalPaintStyles();
	const tree = {};

	/** Loop over each paint style. */
	paintStyles.forEach(({ paints, name }) => {
		const targetPaint = paints[0];

		let result = '';

		/** Process only solid paints. */
		if (!isSolidPaint(targetPaint)) {
			return result;
		}

		/** Paint is SOLID here. */
		const { opacity, color } = targetPaint;

		/** Convert rgb to hex. */
		result = rgbToHex(color, opacity);

		const parts = name.split(/\//gi);

		console.log(parts);
	});
};
